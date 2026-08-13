# no/fomo

A full-stack events platform for Berlin's queer and FLINTA* scene.

**Live:** [nofomo-pi.vercel.app](https://nofomo-pi.vercel.app)

[![CI](https://github.com/Kaalaayaa/no_fomo_berlin_events/actions/workflows/ci.yml/badge.svg)](https://github.com/Kaalaayaa/no_fomo_berlin_events/actions/workflows/ci.yml)

---

## What it is

no/fomo is an index of queer and FLINTA* events in Berlin — clubs, concerts, readings, workshops, cinema, performances and more. Every listing is reviewed before it goes on.

<img width="1680" height="909" alt="Screenshot 2026-05-27 at 18 15 55" src="https://github.com/user-attachments/assets/086f9cce-6c41-4303-acb9-2871fb9f1a06" />
<img width="1203" height="906" alt="Screenshot 2026-05-27 at 18 16 39" src="https://github.com/user-attachments/assets/f5e509bb-cb27-4884-a8b1-1d34cc8e56aa" />
<img width="1107" height="912" alt="Screenshot 2026-05-27 at 18 17 10" src="https://github.com/user-attachments/assets/40a74400-2720-4bac-892d-5bd157654ea5" />

---

## Tech stack

**Frontend**
- Next.js 16
- TypeScript
- CSS Modules

**Backend**
- Next.js API routes (REST) + Server Actions
- Custom auth — bcrypt password hashing, signed JWT sessions (`jose`), httpOnly cookies
- Prisma ORM
- PostgreSQL (hosted on Supabase)

**Testing**
- Vitest — unit tests for auth validation, session tokens, route protection, and login security

**Deployment**
- Vercel (frontend)
- Supabase (database)

---

## Features

- Filterable events grid — by category (Club, Concert, Workshop, Cinema...), audience (FLINTA*, Queer, All welcome) and date
- Horizontal scroll rail for upcoming events
- Event detail pages with lineup, venue, pricing and related events
- Submit an event form — saves to database as pending, reviewed before publishing
- About page
- Accounts — sign up / sign in / sign out, edit profile, delete account
- Save events to your account (bookmark), see them on a "My Events" page alongside your own submissions
- Fully responsive
- Accessibility — semantic HTML, ARIA labels, keyboard navigation

---

## Running locally

```bash
git clone https://github.com/Kaalaayaa/no_fomo_berlin_events.git
cd no_fomo_berlin_events
npm install
```

Create a `.env` file:
```
DATABASE_URL="your-postgresql-connection-string"
SESSION_SECRET="generate one with: openssl rand -base64 32"
```

Run migrations and seed:
```bash
npx prisma migrate dev
npx prisma db seed
```

Start the dev server:
```bash
npm run dev
```

Run the test suite:
```bash
npm test
```

---

## Project structure

```
app/
  page.tsx              — homepage
  events/[id]/          — event detail page
  submit/               — submit an event
  about/                — about page
  account/               — account settings (protected)
  my-events/             — saved events + your submissions (protected)
  signin/ signup/       — auth pages
  actions/               — Server Actions: auth.ts, account.ts, events.ts
  api/events/           — REST API (GET all, GET by id, POST submit)
components/
  Ticker                — scrolling announcement bar
  Header, UserMenu      — navigation, session-aware account menu
  Hero                  — homepage headline
  FilterBar             — category, audience and date filters
  EventCard, SaveButton — card component + bookmark toggle
  EventsSection         — rail + grid with pagination
  ProfileForm, DeleteAccountButton
  Footer
lib/
  prisma.ts             — Prisma client singleton
  session.ts            — JWT session encrypt/decrypt, cookie handling
  dal.ts                — auth checks (verifySession, requireUser, getCurrentUser)
  definitions.ts        — zod validation schemas
prisma/
  schema.prisma         — Event, User, SavedEvent models
  seed.ts               — 12 seeded Berlin events
.github/workflows/
  ci.yml                 — runs lint + tests on every push/PR
```

---

Built by [Kalaya Chatelain](https://github.com/Kaalaayaa)
