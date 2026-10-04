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
