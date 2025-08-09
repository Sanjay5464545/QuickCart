-- Enable pgcrypto for gen_random_uuid if not enabled
create extension if not exists pgcrypto;

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  amount numeric not null check (amount > 0),
  type text not null check (type in ('income','expense')),
  category text not null,
  note text,
  occurred_at date not null default (now()::date),
  inserted_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy if not exists "Users can select own transactions"
  on public.transactions for select
  using (user_id = auth.uid());

create policy if not exists "Users can insert own transactions"
  on public.transactions for insert
  with check (user_id = auth.uid());

create policy if not exists "Users can update own transactions"
  on public.transactions for update
  using (user_id = auth.uid());

create policy if not exists "Users can delete own transactions"
  on public.transactions for delete
  using (user_id = auth.uid());