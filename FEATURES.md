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
