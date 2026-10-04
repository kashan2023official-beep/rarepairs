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
