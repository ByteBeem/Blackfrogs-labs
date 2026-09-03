# Black Frog Labs — Online Store

A full rewrite of the Black Frog Labs website into a professional, black &amp;
white online store, built with Next.js 16, React 19, TypeScript, and Tailwind
CSS v4. It combines an e-commerce storefront (accounts, cart, checkout, order
history, wishlist) with the original mobile-repair booking experience.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```bash
npm run build
npm run start
```

## What's Included

- **Storefront** — `/shop` with search, category filters, price filter and
  sorting; individual product pages at `/shop/[slug]` with a related-products
  section.
- **Cart & Checkout** — a persistent slide-over cart plus a full `/cart` page,
  a 3-step `/checkout` flow (shipping → payment → review), and an order
  confirmation page.
- **Accounts** — `/login` and `/signup`, plus a protected `/account` page
  with profile editing, order history, and a wishlist tab.
- **Repair services** — `/services`, `/book-repair`, `/track-repair`, and
  `/gallery`, carried over from the original site and restyled to match.
- **Trust & policy pages** — `/about`, `/contact`, `/faq`, and five policy
  pages under `/policies/` (Privacy Policy, Terms of Service, Refund &
  Returns, Shipping Policy, Disclaimer).
- **Design system** — a monochrome black/white/gray theme, a serif display
  font for headings paired with Inter for body text, and consistent
  rounded-corner, high-contrast components across the whole site.

## Important: This Is a Front-End Demo

To keep this a self-contained deliverable, a few pieces run entirely in the
browser rather than against a real backend:

- **Accounts** (`context/AuthContext.tsx`) are stored in `localStorage`, with
  a very simple hash — not real password security. Replace this with a real
  auth provider (e.g. NextAuth.js, Clerk, Supabase Auth, or your own API with
  bcrypt/argon2 hashing and server-side sessions) before launch.
- **Cart, wishlist and orders** (`context/CartContext.tsx`,
  `lib/orders.ts`) also persist to `localStorage`. Wire these up to a real
  database and order-management system for production use.
- **Checkout payment** is simulated — no card details are transmitted
  anywhere. Integrate a real payment gateway (e.g. PayFast, Yoco, Stripe,
  Paystack) before accepting real orders.
- **Product images** are drawn as monochrome icon graphics
  (`components/ProductVisual.tsx`) rather than photographs, so the store
  works without needing any image assets. Swap in real product photography
  by replacing `ProductVisual` usage with `next/image` and updating
  `lib/products.ts`.
- **Repair booking / tracking** also uses `localStorage` as a stand-in for a
  real booking system or CRM.

None of this affects the UI/UX, layout, or responsiveness — it's simply the
data layer that should be connected to real services for a live launch.

## Project Structure

```
app/                Next.js App Router pages
  shop/              Product listing + [slug] detail page
  cart/, checkout/   Cart & multi-step checkout
  login/, signup/    Auth pages
  account/           Protected account dashboard
  policies/          Privacy, Terms, Refunds, Shipping, Disclaimer
  services/, book-repair/, track-repair/, gallery/   Repair services
components/          Header, Footer, ProductCard, CartDrawer, etc.
context/             CartContext, AuthContext, ToastContext
lib/                 Product catalog, types, formatting, order helpers
```

## Customizing

- **Products**: edit `lib/products.ts`.
- **Brand colors**: the theme is intentionally monochrome — tweak shades of
  black/gray in `app/globals.css` and component files if you want a subtle
  accent color.
- **Contact details**: update the phone number, email, and address in
  `components/Footer.tsx`, `components/Header.tsx`, `app/contact/page.tsx`,
  and the structured data in `app/layout.tsx`.
