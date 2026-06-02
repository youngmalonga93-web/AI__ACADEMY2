create extension if not exists pgcrypto;

create type public.user_role as enum ('learner', 'mentor', 'admin');
create type public.prompt_tier as enum ('POWER', 'ADVANCED', 'ESSENTIAL');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role public.user_role not null default 'learner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.modules (
  id bigint primary key,
  course_id bigint not null references public.courses(id) on delete cascade,
  phase text not null,
  title text not null,
  subtitle text,
  duration text,
  difficulty text,
  lesson_count integer not null default 0,
  display_order integer not null,
  objectives text[] not null default '{}',
  skills text[] not null default '{}',
  key_takeaways text[] not null default '{}',
  common_mistakes text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id bigint not null references public.modules(id) on delete cascade,
  slug text not null unique,
  lesson_number text not null,
  title text not null,
  hook text,
  concept text,
  application text,
  exercise text,
  duration text,
  display_order integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  module_id bigint references public.modules(id) on delete cascade,
  title text not null,
  description text,
  deliverable text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.prompt_categories (
  id text primary key,
  label text not null,
  icon text
);

create table public.prompt_tools (
  id text primary key,
  label text not null,
  color text
);

create table public.prompt_templates (
  id bigint primary key,
  category_id text not null references public.prompt_categories(id),
  tier public.prompt_tier not null,
  title text not null,
  task text not null,
  prompt text not null,
  tags text[] not null default '{}',
  tip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.prompt_template_tools (
  prompt_template_id bigint not null references public.prompt_templates(id) on delete cascade,
  prompt_tool_id text not null references public.prompt_tools(id) on delete cascade,
  primary key (prompt_template_id, prompt_tool_id)
);

create table public.certifications (
  id bigint generated always as identity primary key,
  level integer not null unique,
  name text not null,
  color text,
  modules text not null,
  requirement text not null,
  outcome text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index modules_course_id_idx on public.modules(course_id);
create index lessons_module_id_idx on public.lessons(module_id);
create index projects_module_id_idx on public.projects(module_id);
create index prompt_templates_category_id_idx on public.prompt_templates(category_id);
create index user_progress_user_id_idx on public.user_progress(user_id);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.projects enable row level security;
alter table public.prompt_categories enable row level security;
alter table public.prompt_tools enable row level security;
alter table public.prompt_templates enable row level security;
alter table public.prompt_template_tools enable row level security;
alter table public.certifications enable row level security;
alter table public.user_progress enable row level security;

create policy "Profiles are readable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are writable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Courses are public"
  on public.courses for select
  using (true);

create policy "Modules are public"
  on public.modules for select
  using (true);

create policy "Lessons are public"
  on public.lessons for select
  using (true);

create policy "Projects are public"
  on public.projects for select
  using (true);

create policy "Prompt categories are public"
  on public.prompt_categories for select
  using (true);

create policy "Prompt tools are public"
  on public.prompt_tools for select
  using (true);

create policy "Prompt templates are public"
  on public.prompt_templates for select
  using (true);

create policy "Prompt template tools are public"
  on public.prompt_template_tools for select
  using (true);

create policy "Certifications are public"
  on public.certifications for select
  using (true);

create policy "Progress is readable by owner"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Progress is writable by owner"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Progress is updatable by owner"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
