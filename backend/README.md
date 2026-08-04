# Backend — Dr. Mahmoud Murad Website API

Node.js + Express + MongoDB (Mongoose). Handles patient reviews with an
approval workflow, and a small admin API to moderate them.

## Setup

```bash
cp .env.example .env
# fill in MONGODB_URI, JWT_SECRET, IP_HASH_SALT, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed   # one-time: creates the admin login + sample approved reviews
npm run dev    # nodemon, http://localhost:4000
npm start      # production
```

If your network has DNS issues resolving the `mongodb+srv://` shorthand
(same issue you hit with the Qash backend), use the direct-shard,
non-SRV connection string from your Atlas cluster's "Standard connection
string" option instead.

## Environment variables

| Variable        | Purpose                                              |
|------------------|-------------------------------------------------------|
| `MONGODB_URI`    | MongoDB Atlas connection string                       |
| `JWT_SECRET`     | Signs admin login tokens — long random string          |
| `IP_HASH_SALT`   | Salts the stored IP hash (never store raw IPs)        |
| `CORS_ORIGIN`    | Comma-separated list of allowed frontend origins       |
| `PORT`           | Defaults to 4000                                       |
| `ADMIN_EMAIL`    | Used once by `npm run seed` to create the admin login   |
| `ADMIN_PASSWORD` | Used once by `npm run seed` to create the admin login   |

## API reference

### Public

| Method | Path                  | Body                                | Notes                                    |
|--------|------------------------|--------------------------------------|-------------------------------------------|
| GET    | `/api/reviews`          | —                                    | Approved reviews, newest first            |
| GET    | `/api/reviews/average`  | —                                    | `{ average, count }` of approved reviews  |
| POST   | `/api/reviews`          | `{ name, rating, text, website }`    | `website` is a honeypot — must stay empty. Rate-limited to 5/hour per IP. Always starts as `pending`. |

### Admin (require `Authorization: Bearer <token>`)

| Method | Path                        | Body                | Notes                              |
|--------|------------------------------|----------------------|-------------------------------------|
| POST   | `/api/admin/login`            | `{ email, password }`| Returns `{ token, name, email }`    |
| GET    | `/api/admin/reviews?status=`  | —                     | `status`: pending / approved / rejected / all |
| PATCH  | `/api/admin/reviews/:id`      | `{ status }`          | Approve / reject / re-pend a review |
| DELETE | `/api/admin/reviews/:id`      | —                     | Permanently deletes a review        |

## Project structure

```
src/
  server.js              Express app entry point
  config/db.js            Mongoose connection
  models/
    Review.js
    Admin.js
  routes/
    reviews.js             public routes
    admin.js                admin routes (protected)
  controllers/
    reviewController.js
    adminController.js
  middleware/
    auth.js                 JWT verification
    rateLimit.js             submit/login/general rate limits
  utils/
    spamGuard.js             basic link/spam pattern filter
    hashIp.js                 salted IP hashing
    asyncHandler.js           forwards async errors to Express
  seed.js                  creates the admin account + sample reviews
```
