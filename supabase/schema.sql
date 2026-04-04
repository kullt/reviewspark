-- ReviewSpark Database Schema
-- Run this in Supabase SQL Editor

-- Users table (extends Supabase auth.users)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'starter', 'pro')),
  subscription_status text default 'inactive' check (subscription_status in ('active', 'inactive', 'cancelled', 'past_due')),
  stripe_customer_id text,
  stripe_subscription_id text,
  posts_used_this_month integer default 0,
  posts_limit integer default 10, -- free tier
  month_reset_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.users enable row level security;

-- Users can read/update their own data
create policy "Users can view own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own data" on public.users
  for update using (auth.uid() = id);

-- Businesses table
create table if not exists public.businesses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  google_places_id text,
  name text not null,
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.businesses enable row level security;

create policy "Users can view own businesses" on public.businesses
  for select using (auth.uid() = user_id);

create policy "Users can create own businesses" on public.businesses
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own businesses" on public.businesses
  for delete using (auth.uid() = user_id);

-- Reviews table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  author text not null,
  rating integer check (rating >= 1 and rating <= 5),
  text text not null,
  review_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.reviews enable row level security;

create policy "Users can view reviews for own businesses" on public.reviews
  for select using (
    business_id in (
      select id from public.businesses where user_id = auth.uid()
    )
  );

-- Generated posts table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  review_id uuid references public.reviews(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  content text not null,
  platform text check (platform in ('twitter', 'instagram', 'facebook', 'linkedin')),
  status text default 'draft' check (status in ('draft', 'scheduled', 'published')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone
);

alter table public.posts enable row level security;

create policy "Users can view own posts" on public.posts
  for select using (auth.uid() = user_id);

create policy "Users can create own posts" on public.posts
  for insert with check (auth.uid() = user_id);

create policy "Users can update own posts" on public.posts
  for update using (auth.uid() = user_id);

create policy "Users can delete own posts" on public.posts
  for delete using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, subscription_tier, posts_limit)
  values (new.id, new.email, 'free', 10);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create user record on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
