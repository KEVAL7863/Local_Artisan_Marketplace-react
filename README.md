# Local Artisan Marketplace

A React + Vite marketplace with a Node.js/Express backend and **MongoDB** database. Three roles: Collector (buyer), Artisan (seller), Admin.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, React Router v6, Tailwind CSS (CDN), Context API |
| Backend | Node.js, Express, JWT auth, bcryptjs |
| Database | MongoDB (via Mongoose) |

---

## Folder Structure

```
artisan-react/
├── index.html
├── package.json              ← frontend deps
├── vite.config.js            ← Vite proxy /api → :5000
├── src/                      ← React app
│   ├── main.jsx, App.jsx
│   ├── context/              ← Auth, Cart, Notification contexts
│   ├── components/           ← Sidebars, NotificationBell
│   ├── pages/                ← 18 pages (collector/artisan/admin)
│   └── utils/api.js          ← fetch wrapper with JWT
└── server/
    ├── index.js              ← Express entry
    ├── package.json          ← backend deps
    ├── .env                  ← MONGODB_URI, JWT_SECRET, PORT
    ├── config/db.js          ← mongoose connect
    ├── models/               ← Mongoose schemas
    ├── routes/               ← 7 route files
    ├── controllers/          ← 7 controller files
    ├── middleware/           ← JWT auth + roleGuard
    └── db/migrate.js         ← seed script
```

---

## Prerequisites

- Node.js 18+
- MongoDB running locally on `mongodb://127.0.0.1:27017` (or update `MONGODB_URI` in `server/.env`)

---

## Setup

```bash
# 1. Install frontend deps
npm install

# 2. Install backend deps
cd server
npm install

# 3. Seed the MongoDB database (creates default accounts + sample data)
npm run migrate

# 4. Start backend (runs on http://localhost:5000)
npm start

# 5. In another terminal — start frontend (runs on http://localhost:5173)
cd ..
npm run dev
```

---

## Default Accounts

| Role | Email | Password |
|---|---|---|
| Customer | collector@artisan.com | collector123 |
| Artisan  | artisan@artisan.com   | artisan123 |
| Admin    | admin@artisan.com     | admin123 |

Login redirects:
- `user` → `/` (Home)
- `artist` → `/artisan` (Artisan Dashboard)
- `admin` → `/admin` (Admin Dashboard)

---

## MongoDB Collections

| Collection | Purpose |
|---|---|
| `users` | name, email, password_hash, role, studio, craft, status, ... |
| `products` | slug, title, category, price, stock, artisan_id (ref users) |
| `orders` | order_number, customer_id, amount, status, items[] embedded |
| `approvals` | artisan application name, tag, logo_url, status |
| `notifications` | admin-visible activity feed with unique notification_key |
| `settings` | key-value admin settings |

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Route | Auth |
|---|---|---|
| POST | `/auth/register` | — |
| POST | `/auth/login` | — |
| GET  | `/auth/me` | JWT |
| GET  | `/users` | Admin |
| PATCH | `/users/:id/status` | Admin |
| PUT | `/users/:id/profile` | JWT (self) |
| GET | `/products` | — |
| GET | `/products/mine` | Artist |
| POST | `/products` | Artist |
| PUT | `/products/:id` | Artist / Admin |
| DELETE | `/products/:id` | Artist / Admin |
| GET | `/orders` | Admin |
| GET | `/orders/mine` | Artist |
| POST | `/orders` | JWT |
| PATCH | `/orders/:id/status` | Admin / Artist |
| GET | `/approvals` | Admin |
| PATCH | `/approvals/:id` | Admin |
| GET | `/notifications` | Admin |
| PATCH | `/notifications/:id/read` | Admin |
| PATCH | `/notifications/read-all` | Admin |
| DELETE | `/notifications` | Admin |
| GET | `/settings` | Admin |
| PUT | `/settings` | Admin |
| GET | `/health` | — |


