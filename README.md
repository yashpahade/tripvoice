# TripNest 🌍✈️

A full-stack online travel booking platform (MakeMyTrip-style) built as a learning/portfolio project.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Redux Toolkit, React Router v6, React Query, Framer Motion |
| **Backend** | Node.js, Express, MongoDB, Mongoose, JWT Auth |
| **Tooling** | ESLint, Prettier, Concurrently |

## Quick Start

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally on port 27017 (or update `MONGODB_URI`)
- npm / pnpm / yarn

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd tripnest
npm run install:all

# 2. Configure environment
cp .env.example server/.env
cp .env.example client/.env

# 3. Seed the database (Phase 10)
npm run seed

# 4. Start development servers
npm run dev
```

- **Client:** http://localhost:5173
- **Server API:** http://localhost:5000/api

### Demo Credentials
| Type | Value |
|------|-------|
| Test OTP | `123456` |
| Admin email | `admin@tripnest.com` |
| Admin password | `Admin@123` |
| Test card | `4111 1111 1111 1111` (any future expiry, any CVV) |

## Project Structure

```
tripnest/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── assets/         # SVG logos, icons, images
│   │   ├── components/     # Reusable UI & layout components
│   │   ├── config/         # Brand, navigation, currencies config
│   │   ├── features/       # Feature-specific components (flights, hotels…)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Route page components
│   │   ├── services/       # API service layer (Axios)
│   │   ├── store/          # Redux Toolkit store & slices
│   │   └── styles/         # Global CSS, Tailwind directives
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Express + MongoDB backend
│   ├── src/
│   │   ├── config/         # Database, env config
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/      # Auth, error handling, rate limiting
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express route definitions
│   │   ├── seed/           # Database seed scripts
│   │   └── utils/          # Helpers (API response, PDF, email…)
│   └── package.json
├── .env.example
├── package.json            # Root workspace scripts
└── README.md
```

## Build Phases

- [x] **Phase 1:** Project setup, design tokens, layout, routing, shared components
- [ ] **Phase 2:** Authentication (OTP/password), user account, protected routes
- [ ] **Phase 3:** Home page, tabbed search widget, autosuggest, date picker
- [ ] **Phase 4:** Flights (search, results, filters, booking, seat map)
- [ ] **Phase 5:** Hotels + Homestays (search, map view, details, booking)
- [ ] **Phase 6:** Buses + Trains (seat layout, PNR, live status, booking)
- [ ] **Phase 7:** Payment, tickets/PDF, My Trips, cancellation/refund, wallet
- [ ] **Phase 8:** Holidays, Cabs, Forex, Insurance, Visa, Offers
- [ ] **Phase 9:** Static/legal pages, blog, SEO templates, error pages
- [ ] **Phase 10:** Admin panel, seed data, tests, performance, final README

## Known Limitations (Phase 1)
- Most pages render placeholder/coming-soon content
- No database seed data yet (Phase 10)
- Authentication is scaffolded but not functional (Phase 2)
- Search widgets are not yet interactive (Phase 3)

## License

This is a learning/portfolio project. Not affiliated with MakeMyTrip.

---

**© TripNest** — Built with ❤️ for learning
