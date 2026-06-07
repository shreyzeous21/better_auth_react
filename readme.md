# Better Auth React — Full Stack Auth Boilerplate

A full stack authentication boilerplate built with React, Express, and better-auth. Supports email/password auth, JWT sessions, role-based access, and API key protection.

---

## Tech Stack

**Frontend**

- React + Vite
- React Router v7
- Tailwind CSS
- Axios
- better-auth client

**Backend**

- Node.js + Express v5
- better-auth
- Prisma + PostgreSQL
- JWT sessions

---

## Project Structure

```
better_auth_react/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── layouts/        # AuthLayout (protected + auth routes)
│   │   ├── lib/
│   │   │   ├── auth-client.js   # better-auth client
│   │   │   ├── axios.js         # axios instance with api secret
│   │   │   ├── functions.js     # login, register, logout helpers
│   │   │   └── handlers.js      # form submit handlers
│   │   └── App.jsx
│   ├── vercel.json
│   ├── netlify.toml
│   └── railway.json
│
└── server/                 # Express backend
    ├── lib/
    │   ├── auth.js          # better-auth config
    │   ├── prisma.js        # prisma client
    │   └── env.js           # environment variables
    ├── middleware/
    │   └── auth-middleware.js   # requireAuth, requireApiSecret
    ├── routes/
    │   └── test-route.js
    └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

---

### 1. Clone the repo

```bash
git clone https://github.com/shreyzeous21/better_auth_react.git
cd better_auth_react
```

---

### 2. Setup the server

```bash
cd server
npm install
```

Create `.env` in the server folder:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:5173
ADMIN_EMAILS=admin@example.com
```

Generate Prisma client and push schema:

```bash
npx prisma generate
npx prisma db push
```

Start the server:

```bash
npm run dev
```

---

### 3. Setup the client

```bash
cd client
npm install
```

Create `.env` in the client folder:

```env
VITE_API_URL=http://localhost:3000
VITE_API_SECRET=your-super-secret-key
```

Start the frontend:

```bash
npm run dev
```

---

## Features

- Email and password authentication
- JWT-based sessions stored in httpOnly cookies
- Cookie cache for fast session reads (no DB hit every request)
- Role-based users — `SUPERADMIN`, `ADMIN`, `USER`
- Auto-assign `SUPERADMIN` role via `ADMIN_EMAILS` env variable
- API secret middleware — protects all routes from unauthorized access
- Session middleware — protects logged-in only routes
- Global axios instance with API secret header
- Global auth action helpers (`login`, `register`, `logout`)
- Protected and auth route layouts with `AuthLayout`

---

## Environment Variables

### Server

| Variable       | Description                                             |
| -------------- | ------------------------------------------------------- |
| `PORT`         | Server port (default 3000)                              |
| `NODE_ENV`     | `development` or `production`                           |
| `DATABASE_URL` | PostgreSQL connection string                            |
| `API_SECRET`   | Secret key for API access                               |
| `CLIENT_URL`   | Frontend URL (used in production CORS)                  |
| `ADMIN_EMAILS` | Semicolon-separated admin emails e.g. `a@b.com;c@d.com` |

### Client

| Variable          | Description                    |
| ----------------- | ------------------------------ |
| `VITE_API_URL`    | Backend URL                    |
| `VITE_API_SECRET` | Must match server `API_SECRET` |

---

## API Routes

### Auth (handled by better-auth)

| Method | Route                     | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | `/api/auth/sign-up/email` | Register            |
| POST   | `/api/auth/sign-in/email` | Login               |
| POST   | `/api/auth/sign-out`      | Logout              |
| GET    | `/api/auth/get-session`   | Get current session |

### App

| Method | Route                  | Auth                 | Description          |
| ------ | ---------------------- | -------------------- | -------------------- |
| GET    | `/`                    | None                 | API status           |
| GET    | `/health`              | None                 | Health check         |
| GET    | `/api/test`            | Session + API secret | Protected test route |
| GET    | `/api/test/data`       | Session + API secret | Get test items       |
| POST   | `/api/test/create`     | Session + API secret | Create test item     |
| DELETE | `/api/test/delete/:id` | Session + API secret | Delete test item     |

---

## Middleware

### `requireApiSecret`

Checks `x-api-secret` header on every request. Returns `401` if missing or wrong.

### `requireAuth`

Checks session cookie via `auth.api.getSession()`. Returns `401` if not logged in. Attaches `req.user` for use in route handlers.

---

## Deployment

### Frontend on Vercel

Add `vercel.json` to the client root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Frontend on Netlify

Add `netlify.toml` to the client root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Frontend on Railway

Add `railway.json` to the client root:

```json
{
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "npx serve -s dist -l $PORT",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Backend on Render / Railway

Set these environment variables in the dashboard:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=your_production_db_url
API_SECRET=your_secret
CLIENT_URL=https://your-frontend.vercel.app
ADMIN_EMAILS=admin@example.com
```

Build command:

```
npm install && npx prisma generate
```

Start command:

```
node server.js
```

---

## Author

**Shrey Sadhukhan**  
GitHub: [@shreysadhukhan](https://github.com/shreyzeous21)
