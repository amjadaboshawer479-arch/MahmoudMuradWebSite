# Dr. Mahmoud Murad — Website Frontend (Next.js + TypeScript)

Public site + `/admin` moderation dashboard, both in this one Next.js app
(App Router). Talks to the `../backend` API for reviews — see the
top-level project README for how the two fit together.

## What's here

1. **Public site** (`/`) — same design, colors, typography, spacing and
   animations as the approved prototype, rebuilt as real React components.

2. **Patient Reviews section** (`#reviews`) — glass/3D review cards, a
   5-star rating system (reusable `StarRating` component, both read-only
   and interactive), and a review form. Submitted reviews go to the
   backend as `pending` and only appear once approved.

3. **Location card instead of the embedded Google Map** — a premium card
   with the clinic address and an "Open in Google Maps" button.

4. **`/admin` dashboard** — login screen + a simple moderation UI
   (Approve / Reject / Delete, filterable by status). Not linked from the
   public nav — Dr. Mahmoud / you navigate to it directly.

## Stack

- **Next.js 16 (App Router) + TypeScript** — same stack as ClinicOS's frontend
- Plain CSS (design tokens preserved 1:1 from the approved prototype)
- No UI kit / no page builder — hand-built components
- Everything is a client component (`'use client'`) since the whole site
  is interactive (language toggle, animations, live data) — there's no
  server-rendered data on this project, so there was no benefit to mixing
  in server components here

## Project structure

```
src/
  app/
    layout.tsx          root layout — fonts, metadata, wraps app/globals.css
    page.tsx             public site ("/") — assembles every section
    globals.css           full design system (colors, type, layout, responsive)
    admin/
      layout.tsx           sets the admin page's <title>, noindex
      page.tsx              renders <AdminApp />
  components/
    Splash/         intro splash screen
    Nav/             sticky nav + mobile menu
    Hero/            hero with 3D portrait tilt
    Marquee/         scrolling gold marquee
    About/           philosophy section
    Services/        areas of focus (3 cards)
    Journey/         timeline
    Reviews/         reviews grid, StarRating, ReviewForm, ReviewCard
    Booking/         booking CTA
    Contact/         contact cards + LocationCard (replaces the map)
    Signature/       doctor's signature
    Footer/
    admin/
      AdminApp.tsx      login vs. dashboard switch
      AdminLogin.tsx
      AdminDashboard.tsx
      admin.css
    Reveal.tsx        scroll-reveal wrapper (IntersectionObserver)
  context/
    LanguageContext.tsx   AR/EN toggle, persisted to localStorage
  data/
    reviews.ts        review types + API calls (fetch/submit)
  lib/
    api.ts             small fetch wrapper (adds base URL + auth header)
public/                logo, logo-icon, doctor photo, signature, favicon
```

## Running it

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your backend
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # run the production build locally
npm run lint      # ESLint
```

The backend must be running (see `../backend/README.md`) for reviews to
load or submit — without it, the reviews section shows a friendly
"couldn't load" message instead of breaking.

## Deploying

Deploy the `frontend/` folder to Vercel like any Next.js app (framework
preset auto-detected — no extra config needed). Set `NEXT_PUBLIC_API_URL`
in Vercel's environment variables to your deployed backend's URL, e.g.
`https://drmahmoud-api.onrender.com/api`.

## Language

Arabic is the default language on the public site (matches the approved
prototype). The AR/EN toggle in the nav switches instantly and remembers
the visitor's choice. The `/admin` dashboard is English-only (internal
tool, not patient-facing).

## Responsiveness

Mobile-first breakpoints at ~400px, 640px, 900px, 1024px and 1600px+ cover
phones, large phones, tablets, laptops, desktops and large displays. No
horizontal scrolling, no overlapping elements, and all buttons/tap targets
are sized for touch on mobile.
