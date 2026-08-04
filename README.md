# Dr. Mahmoud Murad Website — Full Stack

Two folders, one project:

```
mahmoudwebsite/
  frontend/   Next.js + TypeScript website (public site + /admin dashboard)
              — same stack as ClinicOS's frontend
  backend/    Node + Express + MongoDB API (reviews + moderation)
              — same stack as ClinicOS's / Qash's backend
```

## How the review system works end-to-end

1. A patient opens the site, clicks **"Write a review" / "اكتب تقييمك"**,
   picks a star rating, writes their review, and submits.
2. The **backend** saves it with `status: "pending"` — it is **not** shown
   on the public site yet.
3. You (or Dr. Mahmoud) open **`/admin`** on the deployed frontend, log in,
   and see the pending review with **Approve / Reject / Delete** buttons.
4. Once approved, the review instantly becomes visible to every visitor
   on the public `#reviews` section, and the average rating updates.

This protects the clinic from spam, fake reviews, or anything abusive going
live without a human checking it first. There's also basic automatic spam
filtering (blocks links, phone-number spam, an IP-based rate limit of 5
review submissions per hour, and a honeypot field bots tend to fill in).

## Running everything locally

**1. Backend**

```bash
cd backend
cp .env.example .env
# edit .env: put your MongoDB Atlas URI, a JWT_SECRET, ADMIN_EMAIL/PASSWORD
npm install
npm run seed     # creates your admin login + a few sample approved reviews
npm run dev      # http://localhost:4000
```

**2. Frontend**

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:4000/api  (already the default)
npm install
npm run dev       # http://localhost:3000
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
for the moderation dashboard (log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD`
you set in `backend/.env` before running `npm run seed`).

## Deploying

- **Backend → Render** (same as the ClinicOS API): connect the `backend/`
  folder as a Web Service, set the same environment variables from
  `.env.example` in Render's dashboard, and set the start command to
  `npm start`. Run `npm run seed` once (Render Shell, or locally against
  the Atlas URI) to create the admin account.
- **Frontend → Vercel** (same as before): deploy the `frontend/` folder —
  Vercel auto-detects Next.js, no extra config needed. Set
  `NEXT_PUBLIC_API_URL` to your deployed backend's URL
  (e.g. `https://drmahmoud-api.onrender.com/api`) in Vercel's environment
  variables. `/admin` works out of the box since it's a normal Next.js
  route, no rewrites needed.
- Update `CORS_ORIGIN` in the backend's environment variables to your
  real frontend domain(s) once deployed (comma-separated if you have more
  than one, e.g. `https://drmahmoudmurad.com,https://www.drmahmoudmurad.com`).

## Security notes

- Admin passwords are hashed with bcrypt — never stored in plain text.
- Admin routes require a JWT bearer token that expires after 12 hours.
- IP addresses are never stored in plain text — only a salted one-way hash,
  just enough to support rate limiting.
- Change `JWT_SECRET` and `IP_HASH_SALT` in production to long random
  values (not the placeholders in `.env.example`).

See `frontend/README.md` and `backend/README.md` for details specific to
each half of the project.

