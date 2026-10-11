-- AI usage tracking for Supabase-backed per-user rate limits.
--
-- Replaces the in-memory limiter in lib/security.ts, which kept buckets in a
-- per-instance Map. On Vercel's serverless runtime each instance had its own
-- bucket, so the limits did not actually apply and one user could burn the
-- OpenAI/Anthropic budget unchecked.

create table if not exists public.ai_usage (
  user_id uuid not null,
  endpoint text not null,
  window_start timestamptz not null,
  request_count integer not null default 1,
  created_at timestamptz not null default now(),
  primary key (user_id, endpoint, window_start)
);

create index if not exists ai_usage_user_day_idx
  on public.ai_usage (user_id, endpoint, window_start desc);

alter table public.ai_usage enable row level security;

drop policy if exists "Users can view their own AI usage" on public.ai_usage;
create policy "Users can view their own AI usage"
  on public.ai_usage for select
  to authenticated
  using (auth.uid() = user_id);

-- Atomic per-minute-bucket increment used by lib/ai/limits.ts.
-- Security definer so the increment works regardless of RLS; per-user
-- isolation is enforced because callers always pass the authenticated
-- user's id from supabase.auth.getUser().
create or replace function public.increment_ai_usage(
  p_user_id uuid,
  p_endpoint text,
  p_window timestamptz
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.ai_usage (user_id, endpoint, window_start, request_count)
  values (p_user_id, p_endpoint, p_window, 1)
  on conflict (user_id, endpoint, window_start)
  do update set request_count = public.ai_usage.request_count + 1
  returning public.ai_usage.request_count into v_count;
  return v_count;
end;
$$;

grant execute on function public.increment_ai_usage(uuid, text, timestamptz) to authenticated;
