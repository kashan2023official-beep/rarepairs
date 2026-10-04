# RarePairs — Master Setup File for Antigravity

> **READ THIS ENTIRE FILE FIRST.**
> Then execute the **Setup Instructions** section at the very bottom to
> generate the supporting docs and begin Phase 1 of the build.

---

## 🔧 SETUP INSTRUCTIONS (do this first)

You are building **RarePairs**, a thrifted sneaker storefront.

**Step 1.** Create these supporting files at the repo root, using the
content from the corresponding sections below:

| File to create | Content from section |
|---|---|
| `README.md` | § README |
| `BRAND.md` | § BRAND |
| `ARCHITECTURE.md` | § ARCHITECTURE |
| `FEATURES.md` | § FEATURES |
| `DEPLOYMENT.md` | § DEPLOYMENT |
| `ROADMAP.md` | § ROADMAP |

**Step 2.** After creating the files, scaffold the project per § ROADMAP → Phase 1.

**Step 3.** For every build task, treat the numbered sections below as the
single source of truth. If anything is ambiguous, match the closest pattern
in the visual mockup (§ MOCKUP) and ask before inventing new patterns.

**Step 4.** The brand name is **RarePairs** — one word, capital R and capital P.
Never write "RarePais". Never split it ("Rare Pairs") in the logo or UI,
except where a sentence specifically calls for it.

**Step 5.** Two features are **mandatory and non-negotiable** on every screen:
**dark mode** (with full color inversion) and **mobile responsiveness**
(375px is the primary design target, 2-column product grid on mobile).
No component ships without both.

---

## § PROJECT OVERVIEW

**RarePairs** — a single-vendor e-commerce storefront for a thrifted sneaker brand.
Curated, authenticated, cleaned pairs. Sold one at a time.

- **Storefront:** customers browse, filter, view product detail, and check out.
- **Checkout:** submits an order → opens WhatsApp with order details pre-filled → sends a confirmation email to the customer.
- **Admin:** one admin logs in, uploads products (with images), toggles sold/available status.
- **No payments, no customer accounts.** Each pair is 1-of-1.
- **Dark mode + mobile-first are first-class features**, not afterthoughts.

**Stack:** React + Vite + Tailwind + Supabase + Netlify Functions + Resend.
**Host:** Netlify (free tier explicitly allows commercial use; Vercel free tier does not).

---

## § README

```markdown
# RarePairs

A thrifted sneaker storefront. Curated pairs, authenticated and cleaned,
sold one at a time.

## What this is

A single-vendor e-commerce site for a thrift sneaker brand. Products are
managed by one admin. Customers browse, filter, and check out by sending
their order to the admin's WhatsApp. A confirmation email is sent to the
customer automatically.

Ships with light + dark mode and is designed mobile-first (most customers
will be on phones).

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Supabase (Postgres + Storage + Auth)
- Serverless: Netlify Functions
- Email: Resend
- WhatsApp: wa.me deep link (no API needed)
- Hosting: Netlify

## Docs

| File | Purpose |
|---|---|
| BRAND.md | Colors (light + dark), typography, logo, voice |
| ARCHITECTURE.md | Stack, schema, RLS, env vars, theme system |
| FEATURES.md | Every feature, fully specced |
| DEPLOYMENT.md | Setup + deploy guide |
| ROADMAP.md | Build order, phase by phase |

## Quick start

    npm install
    cp .env.example .env.local   # fill in Supabase + Resend keys
    npm run dev
```

---

## § BRAND

```markdown
# Brand Guidelines — RarePairs

## Identity

Name: RarePairs (one word, capital R and P)
Tagline: Rare pairs, second chances.
Positioning: Curated thrifted sneakers. Authenticated. Cleaned. Ready for their next miles.

## Colors — Light Mode

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Warm Oatmeal | #F4F1EA | 244, 241, 234 | Page background, canvas |
| Dark Navy | #1A2B42 | 26, 43, 66 | Text, line art, primary buttons, footer bg |
| White | #FFFFFF | 255, 255, 255 | Product card backgrounds |
| Available Green | #2D6A4F | 45, 106, 79 | "Available" badge text |
| Sold Red | #9B2226 | 155, 34, 38 | "SOLD" badge + stamp |
| Rare Amber | #B45309 | 180, 83, 9 | "Rare Find" badge |

Opacity scale for navy (light mode):
- 100% — headings, primary text
- 70% — body text, secondary
- 40% — labels, meta, disabled
- 10% — borders, dividers
- 5% — subtle fills

## Colors — Dark Mode

The rule: **the primary color becomes the text, the text color becomes the
primary.** Navy and cream swap roles. Badge colors lighten so they stay
readable on navy.

| Element | Light | Dark |
|---|---|---|
| Page background | Cream `#F4F1EA` | Navy `#1A2B42` |
| Primary text | Navy `#1A2B42` | Cream `#F4F1EA` |
| Product card bg | White `#FFFFFF` | Lighter navy `#23364F` |
| Card border | `rgba(26,43,66,0.05)` | `rgba(244,241,234,0.10)` |
| Header bg | `rgba(244,241,234,0.92)` | `rgba(26,43,66,0.92)` |
| Footer bg | Navy `#1A2B42` | Cream `#F4F1EA` |
| Footer text | Cream `#F4F1EA` | Navy `#1A2B42` |
| Line-art logo strokes | Navy `#1A2B42` | Cream `#F4F1EA` |
| Skeleton shimmer | `rgba(26,43,66,0.05)` | `rgba(244,241,234,0.05)` |

### Badges — Dark Mode (lightened for contrast)

| Badge | Light text | Dark text | Dark bg |
|---|---|---|---|
| Available | `#2D6A4F` | `#6EE7B7` (mint) | `rgba(110,231,183,0.12)` |
| Sold | `#9B2226` | `#FCA5A5` (soft coral) | `rgba(252,165,165,0.12)` |
| Rare | `#B45309` | `#FCD34D` (gold) | `rgba(252,211,77,0.12)` |

**Important:** In dark mode, "Sold" overlay uses `rgba(26,43,66,0.55)`
instead of `rgba(244,241,234,0.55)` — the overlay dims toward navy, not cream.

## Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Logo | Pacifico | 400 | Script, matches the hand-drawn logo |
| Headings | Playfair Display | 600–800 | Editorial serif, tight tracking (-0.5 to -1.5px) |
| Body | Inter | 400–500 | Clean sans, 1.6–1.8 line height |
| Labels | Inter | 600–700 | Uppercase, 1–1.5px letter-spacing, 11–12px |

Scale:
- Hero h1: 64px / 42px tablet / 34px mobile
- Section title: 32px / 24px mobile
- Product detail h2: 38px / 28px mobile
- Body: 15–17px / 15px mobile
- Meta/labels: 11–13px

## Logo

The logo is a hand-drawn line-art collage of sneakers, with "RarePairs" in a
bold script at the center.

Usage:
- Minimum clear space: 1x the height of the "R" on all sides
- Minimum size: 80px wide (digital)
- Do not recolor, outline, add effects, or rotate
- Light mode: navy strokes on cream
- Dark mode: cream strokes on navy

Favicon: use a single sneaker from the collage, cropped tight.

## Voice & Tone

- Warm, not salesy. "Second chances" not "limited time offer."
- Confident, not arrogant. We know sneakers but we're not gatekeeping.
- Honest about condition. "Minor creasing on toe box" builds trust.
- Short sentences. Editorial, not marketing copy.

Do: "Worn twice indoors. Original box included."
Don't: "GENTLY USED!! MUST GO!! 🔥🔥"

## Imagery

- Product photos: shot on cream/white, soft natural light, no harsh shadows
- Product photos stay on cream/white in BOTH themes — do NOT invert them
- Line-art illustrations: navy strokes on cream (light) / cream strokes on navy (dark)
- No stock photos, no lifestyle imagery of people wearing shoes (yet)

## Iconography

- Stroke icons, 1.5–2px, rounded caps
- Match the line-art aesthetic of the logo
- Lucide or Phosphor icon set preferred
- Icons inherit `currentColor` so they flip with the theme automatically
```

---

## § ARCHITECTURE

```markdown
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
```

---

## § FEATURES

```markdown
# Features — RarePairs

## 1. Storefront

### 1.1 Homepage / Shop
- Hero section with brand statement + CTA
- Sticky filter bar (size, condition, status, sort)
- Product grid: 4 cols desktop / 3 cols tablet / **2 cols mobile (mandatory)**
- Each card shows: image, name, size, condition, price, status badge
- Sold items: red badge + diagonal "SOLD" overlay + reduced opacity
- Rare items: amber "Rare Find" badge
- Empty state: "No pairs match your filters" + clear filters button
- Loading state: skeleton cards (not a spinner)

### 1.2 Filtering
- Size: chips (All, UK 6–12). Multi-select.
- Condition: dropdown (All, New, Like New, Good, Fair)
- Status: toggle (All, Available, Sold) — default: Available
- Sort: Newest, Price low→high, Price high→low
- Filters sync to URL query params so links are shareable
- Filter state persists on back/forward navigation
- **Mobile: chips scroll horizontally (swipe), do not wrap**

### 1.3 Product Detail
- Route: /product/:slug
- Large image gallery (main + thumbnails)
- Name, price, compare-at price (if on sale)
- Specs grid: size (UK/US/EU), condition + score, category, brand, status
- Full description
- "Buy on WhatsApp" primary CTA
- "Size Guide" secondary button → opens modal
- Related products (same category or size) below
- If sold: disable CTA, show "This pair has found a new home"
- **Mobile: sticky bottom bar with "Buy on WhatsApp" (thumb-reachable)**

## 2. Checkout Flow

1. Customer clicks Buy on WhatsApp on product detail
2. Modal opens with form: name, email, phone, address, notes (optional)
3. Client validates, POSTs to /api/checkout
4. Serverless function:
   - Validates again
   - Checks product still available (race condition guard)
   - Creates order row
   - Marks product sold
   - Sends confirmation email to customer
   - Returns WhatsApp deep link
5. Frontend opens WhatsApp in new tab (pre-filled with order details)
6. Success screen: "Order sent! Check WhatsApp to confirm with us."
7. If product sold between load and checkout: show "Sorry, this pair just sold" + suggest similar

Edge cases:
- Product already sold → 409 error, show friendly message
- Invalid email → 400 error, inline form error
- Resend fails → log error, still return WhatsApp URL (email is best-effort)
- WhatsApp number invalid → shouldn't happen, it's env var

**Mobile:** checkout modal becomes a full-screen sheet on <768px.

## 3. Admin Panel

Route: /admin (protected by Supabase Auth)

### 3.1 Login
- Email + password
- Only allowlisted emails can access
- Session persists via Supabase Auth

### 3.2 Dashboard
- List all products (table view on desktop, card list on mobile)
- Columns: image thumb, name, size, price, condition, status, actions
- Quick actions: edit, mark sold, mark available, delete
- Filter: status, search by name
- "Add Product" button top-right

### 3.3 Add / Edit Product

Form fields:
- Name (required)
- Slug (auto-generated from name, editable)
- Description (textarea)
- Price (required, number)
- Compare-at price (optional)
- Size UK (required), Size US, Size EU
- Condition (required, dropdown)
- Condition score (1–10)
- Category (dropdown: Sneakers, Boots, Formal, Running, Basketball, Skate)
- Brand (text)
- Status (Available / Sold / Reserved)
- Is Rare (toggle)
- Tags (multi-input, e.g. "vintage", "og", "limited")
- Images (multi-upload, drag to reorder, first = cover)

### 3.4 Image Upload
- Drag & drop or click to select
- Upload to Supabase Storage at product-images/{product-id}/
- Compress client-side before upload (max 1200px, 80% quality, WebP output)
- Reorder by drag
- Delete individual images
- First image is the cover

### 3.5 Orders View
- Table: date, customer, product, amount, status
- Click to expand full details
- "Open in WhatsApp" button per order
- Mark as confirmed / shipped / delivered

## 4. Sold / Available Logic

- status column on products: available | sold | reserved
- When order is placed: status → sold (atomic, in the same transaction)
- Admin can manually toggle status back to available (e.g. buyer ghosted)
- Storefront default filter: available only
- Sold items still visible if user explicitly filters by "Sold" or "All"
- Sold items show red badge + overlay, CTA disabled

## 5. WhatsApp Integration

No WhatsApp Business API. Use wa.me deep links.

Format:

    https://wa.me/{ADMIN_WHATSAPP_NUMBER}?text={urlEncodedMessage}

Message template:

    🛒 New Order — RarePairs

    Product: {name}
    Size: {size_uk}
    Price: ₹{price}

    Customer: {name}
    Phone: {phone}
    Email: {email}
    Address: {address}
    Notes: {notes}

    Order ID: {order_id}

Opens WhatsApp with the message pre-filled. Admin taps send.

## 6. Email (Resend)

Trigger: successful order creation.
To: customer email
From: orders@rarepairs.com (verified domain in Resend)
Subject: Your RarePairs order — {product_name}

Template: Clean HTML matching brand (cream bg, navy text in light mode
inbox; scales fine in dark-mode clients via `prefers-color-scheme` media
query in the email CSS). Includes logo, order summary, and "we'll confirm
on WhatsApp shortly".

Also send a BCC copy to admin email for records.

## 7. Non-Features (Explicitly Out of Scope for v1)

- User accounts (customers check out as guests)
- Payment processing (WhatsApp handles it)
- Inventory quantity (each pair is 1-of-1)
- Reviews / ratings
- Wishlist
- Blog / editorial
- Multi-currency
- Shipping calculator

---

## 8. Dark Mode (MANDATORY)

The site ships with a fully functional dark mode. This is not optional.

### 8.1 Behavior
- Default theme on first visit: follows OS `prefers-color-scheme`
- User toggle (sun/moon icon in header) overrides and persists to `localStorage`
- On every subsequent visit: `localStorage` wins, falls back to system
- Toggle is instant — no page reload, no transition flicker
- Anti-flash inline script in `<head>` prevents cream flash for dark users

### 8.2 Color Rules
- **Primary color swaps with text color.** Navy ↔ Cream.
- Page bg and primary text fully invert.
- Product card bg: white → `#23364F` (lighter navy)
- Borders, dividers, subtle fills: navy @ 10% → cream @ 10%
- Line-art logo and illustrations: navy → cream strokes
- **Product photos do NOT change.** They were shot on cream and stay on cream.
- Badges lighten (see § BRAND → Badges — Dark Mode)

### 8.3 Toggle
- Located in the header, between Search and Cart
- 40×40px minimum tap target on mobile (44×44 on iOS)
- Icon-only: moon in light mode, sun in dark mode
- Accessible: `aria-label` switches with state
- Inherits `currentColor`, no separate icon assets needed

### 8.4 Test Requirement
Every screen must be visually verified in **both** themes at **375px,
768px, and 1440px** before being marked done.

---

## 9. Mobile Responsiveness (MANDATORY)

Most customers will be on mobile. **Design for 375px first, then scale up.**
This is the primary target, not a secondary concern.

### 9.1 Breakpoints

    sm:  640px
    md:  768px
    lg:  1024px
    xl:  1280px

Default styles target mobile. `md:` and up add desktop refinements.

### 9.2 Layout Rules
- **Product grid: 2 cols on mobile** (mandatory), 3 cols at `md`, 4 at `lg`
- Hero: stacked on mobile (text top, illustration below), split on `md`+
- Product detail: single column on mobile, split on `md`+
- Footer: single column on mobile, 2 cols at `sm`, 4 cols at `md`+
- Header nav collapses into a hamburger drawer below `md`
- Filter chips scroll horizontally — never wrap to multiple lines on mobile

### 9.3 Touch
- Every tappable element: minimum 44×44px
- Spacing between adjacent taps: minimum 8px
- No hover-only interactions (all hovers have a tap equivalent)

### 9.4 Mobile-Specific UI
- **Sticky bottom bar** on product detail with "Buy on WhatsApp" CTA
  (thumb-reachable, hidden on desktop where CTA is already visible)
- Checkout modal becomes a **full-screen sheet** on mobile
- Admin image upload uses `<input type="file" accept="image/*">` for
  camera capture on mobile
- Toast notifications appear at the top on mobile (below header),
  bottom-right on desktop

### 9.5 Performance on Mobile
- Lighthouse mobile score ≥ 90 for Performance, Accessibility, Best Practices
- First Contentful Paint < 1.8s on simulated 4G
- Images: lazy-loaded below the fold, WebP format, `srcset` for retina
- No layout shift (CLS < 0.1)
- Total JS bundle for storefront < 250 KB gzipped

### 9.6 Test Requirement
Every screen tested at 375px width on a real device (or Chrome DevTools
iPhone SE preset) before being marked done. Test with thumb navigation,
not mouse.
```

---

## § DEPLOYMENT

```markdown
# Deployment Guide — RarePairs

## Prerequisites

- Node.js 20+
- A GitHub account
- A Netlify account
- A Supabase account
- A Resend account
- Your WhatsApp number

## Step 1 — Supabase Setup

1. Go to supabase.com → New project
2. Name: rarepairs, region: closest to your customers, strong DB password
3. Wait for provisioning (~2 min)

### 1.1 Create tables

Open SQL Editor and run the schema from ARCHITECTURE.md
(products + orders + RLS policies).

### 1.2 Create storage bucket

- Storage → New bucket → name: product-images → Public bucket: ON
- Policies → add:
  - SELECT for public (anyone can view)
  - INSERT, UPDATE, DELETE for authenticated admin only

### 1.3 Create admin user

- Authentication → Users → Add user
- Email: admin@rarepairs.com, set a strong password
- Copy the user's email — you'll use it in the RLS policy

### 1.4 Grab API keys

- Settings → API
- Copy Project URL, anon public, service_role (keep service_role secret!)

## Step 2 — Resend Setup

1. Go to resend.com → Sign up
2. Add your domain (e.g. rarepairs.com) → verify DNS records
3. If no domain yet, use onboarding@resend.dev for testing
   (only sends to your own email)
4. API Keys → Create → copy re_xxx...

## Step 3 — Local Development

    git clone <your-repo>
    cd rarepairs
    npm install
    cp .env.example .env.local
    # fill in the values from steps 1 and 2
    npm run dev

Visit http://localhost:5173.

Test in both themes: toggle the header switch, refresh, confirm persistence.
Test at 375px width in DevTools.

## Step 4 — Netlify Deploy

### 4.1 Push to GitHub

    git add .
    git commit -m "initial commit"
    git push origin main

### 4.2 Connect to Netlify

1. app.netlify.com → Add new site → Import from Git
2. Pick your repo
3. Build settings:
   - Build command: npm run build
   - Publish directory: dist
   - Functions directory: netlify/functions
4. Add environment variables (Site settings → Environment variables):

    VITE_SUPABASE_URL=...
    VITE_SUPABASE_ANON_KEY=...
    SUPABASE_SERVICE_ROLE_KEY=...
    RESEND_API_KEY=...
    ADMIN_WHATSAPP_NUMBER=91XXXXXXXXXX
    ADMIN_EMAIL=admin@rarepairs.com
    FROM_EMAIL=orders@rarepairs.com

5. Deploy

### 4.3 Custom domain

- Domain settings → Add custom domain → follow DNS instructions
- SSL is automatic via Let's Encrypt

## Step 5 — Post-Deploy Checklist

- [ ] Storefront loads, products appear
- [ ] Filters work (size, condition, status)
- [ ] Product detail page loads for each product
- [ ] Checkout form submits → WhatsApp opens with correct message
- [ ] Customer receives confirmation email
- [ ] Admin login works at /admin
- [ ] Adding a product from admin works, image uploads
- [ ] Marking a product sold updates the storefront
- [ ] **Dark mode toggle works, persists across refresh, no flash on load**
- [ ] **Every screen verified on a real phone at 375px**
- [ ] **Lighthouse mobile ≥ 90 on the homepage**

## Free Tier Limits

| Service | Limit | What happens if exceeded |
|---|---|---|
| Netlify bandwidth | 100 GB/mo | Site stays up, warning; upgrade $20/mo |
| Netlify functions | 125k invocations/mo | Same |
| Supabase DB | 500 MB | Reads still work, writes pause |
| Supabase storage | 1 GB | Uploads fail |
| Resend | 3,000 emails/mo, 100/day | Emails fail, orders still work |

For a thrift store: 500 MB DB ≈ tens of thousands of products.
1 GB storage ≈ 2,000–4,000 images. You will not hit these for a long time.

## Monitoring

- Netlify: Analytics tab, function logs
- Supabase: Logs & Reports
- Resend: Emails tab (see delivered/bounced)
- Uptime: Free UptimeRobot monitor on homepage

## Backups

- Supabase → Database → Backups (daily on free tier, 7-day retention)
- Export products monthly: SQL Editor → select * from products → download CSV
```

---

## § ROADMAP

```markdown
# Roadmap — RarePairs

## Phase 1 — Foundation + Theme System (Day 1)

- [ ] Scaffold Vite + React project
- [ ] Install Tailwind, configure brand tokens + `darkMode: 'class'`
- [ ] Install React Router, TanStack Query, React Hook Form, Zod, date-fns, sonner
- [ ] Add anti-flash theme script to index.html
- [ ] Build ThemeProvider + useTheme hook + ThemeToggle component
- [ ] Set up Supabase project + schema + storage bucket
- [ ] Create src/lib/supabase.js
- [ ] Build Layout, Header, Footer
- [ ] Verify: blank themed page, header/footer, dark mode toggle works,
      persists across refresh, no flash on load

## Phase 2 — Storefront (Day 2–3)

- [ ] useProducts hook (fetch + filter)
- [ ] ProductCard component (light + dark states)
- [ ] ProductGrid with responsive columns (2 mobile / 3 tablet / 4 desktop)
- [ ] ProductFilters with URL query param sync
- [ ] Size chips (horizontal scroll on mobile), condition dropdown,
      status toggle, sort
- [ ] ProductDetail page with gallery
- [ ] Related products section
- [ ] Loading skeletons (theme-aware)
- [ ] Empty state ("No pairs match your filters")
- [ ] Verify: browse, filter, view detail — all working, in both themes,
      at 375px width

## Phase 3 — Checkout (Day 4)

- [ ] CheckoutModal form (name, email, phone, address, notes)
- [ ] Full-screen sheet on mobile, centered modal on desktop
- [ ] Zod schema for validation
- [ ] netlify/functions/checkout.js
  - [ ] Validate input
  - [ ] Fetch product, check availability
  - [ ] Insert order row
  - [ ] Mark product sold
  - [ ] Send Resend email
  - [ ] Build WhatsApp URL
- [ ] Resend email template (branded HTML, works in dark-mode email clients)
- [ ] Success screen + "Open WhatsApp" auto-trigger
- [ ] Error handling (sold out, invalid input, email fail)
- [ ] Sticky mobile "Buy on WhatsApp" bar on product detail
- [ ] Verify: full checkout → WhatsApp opens → email arrives, on a real phone

## Phase 4 — Admin (Day 5–6)

- [ ] Supabase Auth login page
- [ ] Protected route wrapper
- [ ] Admin dashboard (product table desktop / card list mobile)
- [ ] Quick actions (mark sold/available, delete)
- [ ] ProductForm (create + edit)
- [ ] Image upload to Supabase Storage (camera capture on mobile)
- [ ] Image reorder + delete
- [ ] Orders view with WhatsApp link
- [ ] Verify: add product → appears on storefront → can mark sold

## Phase 5 — Polish, Mobile Audit, Deploy (Day 7)

- [ ] **Mobile-first audit: every screen at 375px, 768px, 1440px**
- [ ] **Dark mode audit: every screen in both themes at all three widths**
- [ ] Lighthouse mobile run — target ≥ 90 across the board
- [ ] Image optimization pass (WebP, srcset, lazy load)
- [ ] SEO meta tags (title, description, OG image)
- [ ] Favicon from logo
- [ ] 404 page
- [ ] Accessibility pass (focus rings, alt text, keyboard nav, contrast)
- [ ] Deploy to Netlify
- [ ] Custom domain + SSL
- [ ] Run post-deploy checklist from DEPLOYMENT.md
- [ ] Set up UptimeRobot monitor

## Phase 6 — Post-Launch (Later)

- [ ] Analytics (Plausible or Umami — privacy-friendly)
- [ ] Instagram feed embed
- [ ] Size guide page
- [ ] "Notify me" for sold items (email capture)
- [ ] Bulk product import (CSV)
- [ ] Order status emails (shipped, delivered)
- [ ] Multi-image lightbox on product detail
- [ ] PWA support (install to home screen, offline browsing)

## Success Metrics

- v1 launch: storefront live, admin can add products, checkout works
  end-to-end, dark mode toggle works, mobile-first design verified
- Week 1: 10+ products listed, first order via WhatsApp
- Month 1: 50+ products, 20+ orders, <5% email bounce rate
- Month 3: Evaluate paid tiers (Netlify Pro if bandwidth > 100 GB,
  Supabase Pro if DB > 500 MB)
```

---

## § MOCKUP (visual reference)

The approved mockup is a single HTML file (mockup.html) using:
- **Light mode:** cream background `#F4F1EA`, navy text `#1A2B42`
- **Dark mode:** navy background `#1A2B42`, cream text `#F4F1EA`,
  cards at `#23364F`, badges lightened
- Pacifico script logo "RarePairs" beside a line-art sneaker mark
- Sticky header: logo | nav | search + theme toggle + cart
- Hero: split layout — headline left ("Rare pairs, second chances."),
  large line-art sneaker illustration right
- Sticky filter bar: size chips (horizontal scroll on mobile) | condition
  dropdown | status toggle | sort
- Product grid: 4-col desktop / 3-col tablet / **2-col mobile**
  - Available items: green "Available" badge
  - Sold items: red "Sold" badge + rotated "SOLD" stamp overlay + reduced opacity
  - Rare items: amber "Rare Find" badge
  - Sold overlay dims toward navy in dark mode, toward cream in light mode
- Product detail: split layout on desktop, stacked on mobile;
  specs grid, description, "Buy on WhatsApp" CTA;
  sticky bottom bar on mobile
- Footer: navy bg + cream text in light mode, cream bg + navy text in dark mode;
  4-column layout on desktop, stacked on mobile

All styling should reproduce this mockup exactly. If a screen isn't in
the mockup, match the closest existing pattern.

---

## § CODING CONVENTIONS

- **Components:** PascalCase files, named exports, one component per file
- **Hooks:** use prefix, in src/hooks/
- **Styles:** Tailwind utility classes only. No CSS modules, no styled-components.
- **Dark mode:** every visual component MUST have `dark:` variants for bg,
  text, and border. No exceptions.
- **Mobile-first:** default Tailwind classes target mobile. `md:` and up
  add desktop refinements. Never the reverse.
- **Data fetching:** TanStack Query. No raw useEffect for fetching.
- **Forms:** React Hook Form + Zod validation
- **Errors:** Toast notifications (sonner or react-hot-toast)
- **Currency:** Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
- **Dates:** date-fns with formatDistanceToNow for relative times
- **Images:** always Supabase Storage URLs, always lazy-loaded below the fold

## § FILE STRUCTURE

    rarepairs/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── context/
    │   │   └── ThemeContext.jsx
    │   ├── lib/
    │   │   ├── supabase.js          # client (anon key)
    │   │   └── api.js               # fetch wrappers
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Header.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── MobileNav.jsx    # hamburger drawer
    │   │   │   └── Layout.jsx
    │   │   ├── product/
    │   │   │   ├── ProductCard.jsx
    │   │   │   ├── ProductGrid.jsx
    │   │   │   ├── ProductFilters.jsx
    │   │   │   ├── ProductGallery.jsx
    │   │   │   └── StickyBuyBar.jsx # mobile-only bottom CTA
    │   │   ├── ui/
    │   │   │   ├── Badge.jsx
    │   │   │   ├── Button.jsx
    │   │   │   ├── Chip.jsx
    │   │   │   ├── Modal.jsx
    │   │   │   ├── Skeleton.jsx
    │   │   │   └── ThemeToggle.jsx
    │   │   └── checkout/
    │   │       └── CheckoutModal.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── admin/
    │   │   │   ├── Login.jsx
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── ProductForm.jsx
    │   │   │   └── Orders.jsx
    │   │   └── NotFound.jsx
    │   ├── hooks/
    │   │   ├── useProducts.js
    │   │   ├── useProduct.js
    │   │   ├── useAuth.js
    │   │   └── useTheme.js
    │   └── utils/
    │       ├── format.js            # currency, dates
    │       └── slug.js
    ├── netlify/
    │   └── functions/
    │       └── checkout.js
    ├── supabase/
    │   └── schema.sql
    ├── .env.example
    ├── tailwind.config.js
    ├── vite.config.js
    ├── package.json
    └── AGENTS.md

## § TAILWIND CONFIG (brand tokens + dark mode)

    // tailwind.config.js
    export default {
      darkMode: 'class',
      content: ['./index.html', './src/**/*.{js,jsx}'],
      theme: {
        extend: {
          colors: {
            cream: '#F4F1EA',
            navy: '#1A2B42',
            'navy-card': '#23364F',
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

## § EXAMPLE — Themed + Mobile-Ready Component

    // A single product card, correct in both themes and at 375px.
    <a
      href={`/product/${slug}`}
      className="group block"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden
                      bg-white dark:bg-navy-card
                      border border-navy/5 dark:border-cream/10
                      transition-transform group-hover:-translate-y-1">
        {/* Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                         text-[10px] font-bold uppercase tracking-wider
                         bg-available/10 text-available
                         dark:bg-available-dark/10 dark:text-available-dark">
          Available
        </span>

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain p-6"
        />
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-[13px] sm:text-[15px] font-semibold leading-snug
                       text-navy dark:text-cream">
          {name}
        </h3>
        <p className="text-[11px] sm:text-[12px] mt-1
                      text-navy/40 dark:text-cream/40">
          UK {size} · {condition}
        </p>
        <p className="text-[13px] sm:text-[15px] font-bold mt-1
                      text-navy dark:text-cream">
          ₹{price}
        </p>
      </div>
    </a>

## § EXAMPLE — Mobile Product Grid

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                    gap-3 md:gap-6">
      {products.map((p) => <ProductCard key={p.id} {...p} />)}
    </div>

## § EXAMPLE — Mobile Filter Chips (horizontal scroll)

    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4
                    scrollbar-hide snap-x">
      {sizes.map((s) => (
        <button
          key={s}
          className="flex-shrink-0 snap-start px-4 py-2 rounded-full
                     text-xs font-medium
                     border border-navy/10 text-navy/70
                     dark:border-cream/10 dark:text-cream/70
                     data-[active=true]:bg-navy data-[active=true]:text-cream
                     dark:data-[active=true]:bg-cream dark:data-[active=true]:text-navy"
        >
          {s}
        </button>
      ))}
    </div>

## § EXAMPLE — Sticky Mobile Buy Bar

    <div className="fixed bottom-0 inset-x-0 z-50 p-4
                    bg-cream/95 dark:bg-navy/95 backdrop-blur
                    border-t border-navy/10 dark:border-cream/10
                    md:hidden">
      <button className="w-full py-4 rounded-full font-semibold
                         bg-navy text-cream
                         dark:bg-cream dark:text-navy">
        Buy on WhatsApp
      </button>
    </div>

---

## § NON-NEGOTIABLES

1. **Use only the brand colors.** No arbitrary Tailwind colors.
2. **Typography:** Playfair Display for headings, Inter for body,
   Pacifico for logo only.
3. **Mobile-first.** 375px is the primary design target. Product grid is
   **2 columns on mobile**. Filter chips scroll horizontally, never wrap.
4. **Dark mode is mandatory on every screen.** Every visual component ships
   with `dark:` variants for background, text, and border. No exceptions.
5. **No payment processing.** Checkout = WhatsApp deep link.
6. **No user accounts.** Customers check out as guests.
7. **Sold items stay visible** when explicitly filtered. Don't delete them.
8. **Images:** always use Supabase Storage URLs, never local imports
   for product images. Product photos do NOT invert in dark mode.
9. **Secrets:** never expose SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY
   to the client. They live in Netlify Function env vars only.
10. **Brand name is RarePairs.** One word, capital R and capital P.
    Never "RarePais". Never split as "Rare Pairs" in the logo or UI.
11. **No flash of wrong theme.** The anti-flash script in `index.html`
    must run before React mounts.

## § DO NOT

- Add authentication for customers
- Add payment processing
- Add a cart (each pair is 1-of-1; checkout is per-product)
- Use Vercel (use Netlify — commercial use allowed on free tier)
- Use EmailJS (use Resend)
- Use WhatsApp Business API (use wa.me deep links)
- Store product images in the repo (use Supabase Storage)
- Hardcode product data (always fetch from Supabase)
- Ship any component without dark mode support
- Ship any layout that breaks at 375px
- Use a 1-column product grid on mobile (must be 2 columns)

## § DEFINITION OF DONE (per feature)

1. It matches the spec in § FEATURES
2. It matches the visual mockup in § MOCKUP
3. It works in **both light and dark mode** at **375px, 768px, and 1440px**
4. Tappable elements are ≥ 44×44px
5. It has loading, error, and empty states (theme-aware)
6. No console errors, no layout shift
7. Lighthouse mobile score stays ≥ 90
8. It's committed with a clear message

---

## ▶ START HERE

1. Create the six supporting files (README, BRAND, ARCHITECTURE, FEATURES,
   DEPLOYMENT, ROADMAP) using the § sections above. Make sure BRAND.md
   includes the Dark Mode palette, ARCHITECTURE.md includes the theme
   system, and FEATURES.md includes § 8 Dark Mode and § 9 Mobile
   Responsiveness.
2. Begin **Phase 1** of the ROADMAP: scaffold Vite + React + Tailwind,
   configure brand tokens with `darkMode: 'class'`, add the anti-flash
   script to `index.html`, build ThemeProvider + useTheme + ThemeToggle,
   set up the Supabase client, and build the Layout / Header / Footer.
3. Stop after Phase 1 and report back with a summary of files created and
   a screenshot or description of the blank themed page in both light and
   dark at 375px width.