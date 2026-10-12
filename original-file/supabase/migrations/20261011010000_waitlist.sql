-- Waitlist for pre-launch email capture. Public can insert (join);
-- nobody can read through the API (export via admin tooling only).

create table if not exists public.waitlist (
  id uuid not null default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  source text not null default 'landing',
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

drop policy if exists "Anyone can join the waitlist" on public.waitlist;
create policy "Anyone can join the waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policies: reads happen via service-role tooling.
