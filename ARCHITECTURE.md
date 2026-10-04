# Architecture — RarePairs

## Stack

| Layer | Tool | Why | Free tier |
|---|---|---|---|
| Frontend | React + Vite | Fast, component-based, easy deploy | Free |
| Styling | Tailwind CSS | Utility-first, dark mode via class strategy | Free |
| Routing | React Router | Client-side routing | Free |
| Data fetching | TanStack Query | Caching, loading states, mutations | Free |
| Backend | Supabase | Postgres + Storage + Auth in one | 500 MB DB, 1 GB storage |
| Serverless | Netlify Functions | Checkout handler, email sender | Included in credits |
| Email | Resend | Transactional email, generous free tier | 3,000/month |
| WhatsApp | wa.me deep link | No API approval, works everywhere | Free |
| Hosting | Netlify | Commercial use allowed on free tier | 100 GB bandwidth |
| Theme | React Context + Tailwind class | localStorage + system preference | Free |

Total monthly cost: $0 until you outgrow free tiers.

## System Diagram

    CUSTOMER (browser)
    React SPA on Netlify — browse, filter, view, checkout
    Theme: light | dark (persisted, system-aware)
        │
        │ read products           │ submit order
        ▼                         ▼
    SUPABASE                  NETLIFY FUNCTION
    • Postgres (products)     /api/checkout
    • Storage (images)        1. validate order
    • Auth (admin only)       2. insert order row
    • RLS policies            3. mark product sold
                              4. send email via Resend
                              5. return WhatsApp URL
                                  │
                                  ▼
                              RESEND → customer email
                              wa.me  → admin WhatsApp

## Database Schema

### products

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

### orders

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

### admin_users

Managed entirely by Supabase Auth. No custom table needed — admin access
is granted by adding the user's email to an allowlist in the RLS policy.

## RLS Policies

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

## Storage

Bucket: product-images (public read)

    product-images/
      └── {product-id}/
          ├── 01.jpg
          ├── 02.jpg
          └── 03.jpg

Upload policy: authenticated admin only. Read: public.

## Environment Variables

    VITE_SUPABASE_URL=https://xxxxx.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJxxx...
    SUPABASE_SERVICE_ROLE_KEY=eyJxxx...   # server-side only
    RESEND_API_KEY=re_xxx...
    ADMIN_WHATSAPP_NUMBER=91XXXXXXXXXX
    ADMIN_EMAIL=admin@rarepairs.com
    FROM_EMAIL=orders@rarepairs.com

Never expose SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY to the client.
They live only in Netlify Function env vars.

## Theme System

**Approach:** Tailwind `darkMode: 'class'`. The `<html>` element gets a
`dark` class when dark mode is active. Every component uses `dark:` variants.

### tailwind.config.js

    export default {
      darkMode: 'class',
      content: ['./index.html', './src/**/*.{js,jsx}'],
      theme: {
        extend: {
          colors: {
            cream: '#F4F1EA',
            navy: '#1A2B42',
            'navy-card': '#23364F',      // dark-mode card bg
            available: '#2D6A4F',
            'available-dark': '#6EE7B7',
            sold: '#9B2226',
            'sold-dark': '#FCA5A5',
            rare: '#B45309',
            'rare-dark': '#FCD34D',
          },
          fontFamily: {
            logo: ['Pacifico', 'cursive'],
            display: ['"Playfair Display"', 'serif'],
            sans: ['Inter', 'sans-serif'],
          },
        },
      },
    }

### Anti-flash script (paste in index.html <head>, before React)

    <script>
      (function () {
        try {
          var stored = localStorage.getItem('theme');
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
          }
        } catch (e) {}
      })();
    </script>

### ThemeProvider (src/context/ThemeContext.jsx)

    import { createContext, useContext, useEffect, useState } from 'react';

    const ThemeContext = createContext();

    export function ThemeProvider({ children }) {
      const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      });

      useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        localStorage.setItem('theme', theme);
      }, [theme]);

      const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

      return (
        <ThemeContext.Provider value={{ theme, toggle }}>
          {children}
        </ThemeContext.Provider>
      );
    }

    export const useTheme = () => useContext(ThemeContext);

### ThemeToggle (src/components/ui/ThemeToggle.jsx)

A 40x40px button in the header (between Search and Cart) showing a sun icon
in dark mode and a moon icon in light mode. Uses `currentColor`. Accessible
label: "Switch to dark mode" / "Switch to light mode".

## Netlify Function: /api/checkout

Input:

    {
      "product_id": "uuid",
      "customer_name": "string",
      "customer_email": "string",
      "customer_phone": "string",
      "customer_address": "string",
      "notes": "string"
    }

Flow:
1. Validate input (Zod schema)
2. Fetch product from Supabase (service role)
3. Check product is still available
4. Insert order row
5. Update product status = 'sold'
6. Send email to customer via Resend
7. Build wa.me URL with order details
8. Return { order_id, whatsapp_url }

Output:

    {
      "order_id": "uuid",
      "whatsapp_url": "https://wa.me/91XXXXXXXXXX?text=..."
    }

The frontend then opens whatsapp_url in a new tab.
