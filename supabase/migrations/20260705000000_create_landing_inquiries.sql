create table if not exists public.landing_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'tv-display-web',
  academy_name text not null,
  contact_name text,
  phone text not null,
  student_count text,
  memo text,
  page_url text,
  user_agent text,
  status text not null default 'new'
);

alter table public.landing_inquiries enable row level security;

create index if not exists landing_inquiries_created_at_idx
  on public.landing_inquiries (created_at desc);
