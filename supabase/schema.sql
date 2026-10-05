create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  size_uk text not null,
  size_us text,
  size_eu text,
  condition text not null check (condition in ('New','Like New','Good','Fair')),
  condition_score int check (condition_score between 1 and 10),
  category text,
  brand text,
  status text not null default 'available' check (status in ('available','sold','reserved')),
  is_rare boolean default false,
  images text[] not null default '{}',
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index products_status_idx on products(status);
create index products_size_idx on products(size_uk);
create index products_condition_idx on products(condition);
create index products_created_idx on products(created_at desc);

create table orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_address text not null,
  notes text,
  amount numeric(10,2) not null,
  status text default 'pending' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "Public read products"
  on products for select
  using (true);

create policy "Admin write products"
  on products for all
  using (auth.jwt() ->> 'email' = 'admin@rarepairs.com');

alter table orders enable row level security;

create policy "Anyone can create an order"
  on orders for insert
  with check (true);

create policy "Admin reads orders"
  on orders for select
  using (auth.jwt() ->> 'email' = 'admin@rarepairs.com');
