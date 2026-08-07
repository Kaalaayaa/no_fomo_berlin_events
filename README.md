# no/fomo

A full-stack events platform for Berlin's queer and FLINTA* scene.

**Live:** [nofomo-pi.vercel.app](https://nofomo-pi.vercel.app)

---

## What it is

no/fomo is an index of queer and FLINTA* events in Berlin — clubs, concerts, readings, workshops, cinema, performances and more. Every listing is reviewed before it goes on.

<img width="1680" height="909" alt="Screenshot 2026-05-27 at 18 15 55" src="https://github.com/user-attachments/assets/086f9cce-6c41-4303-acb9-2871fb9f1a06" />
<img width="1203" height="906" alt="Screenshot 2026-05-27 at 18 16 39" src="https://github.com/user-attachments/assets/f5e509bb-cb27-4884-a8b1-1d34cc8e56aa" />
<img width="1107" height="912" alt="Screenshot 2026-05-27 at 18 17 10" src="https://github.com/user-attachments/assets/40a74400-2720-4bac-892d-5bd157654ea5" />

---

## Tech stack

**Frontend**
- Next.js 14
- TypeScript
- CSS Modules

**Backend**
- Next.js API routes (REST)
- Prisma ORM
- PostgreSQL (hosted on Supabase)

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
- Sign in / Sign up pages
- Fully responsive
- Accessibility — semantic HTML, ARIA labels, keyboard navigation

---

## Running locally

```bash
git clone https://github.com/Kaalaayaa/no-fomo.git
cd no-fomo
npm install
```

Create a `.env` file:
```
DATABASE_URL="your-postgresql-connection-string"
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

---

## Project structure

```
app/
  page.tsx              — homepage
  events/[id]/          — event detail page
  submit/               — submit an event
  about/                — about page
  signin/ signup/       — auth pages
  api/events/           — REST API (GET all, GET by id, POST submit)
components/
  Ticker                — scrolling announcement bar
  Header                — navigation
  Hero                  — homepage headline
  FilterBar             — category, audience and date filters
  EventCard             — card component (rail + grid variants)
  EventsSection         — rail + grid with pagination
  Footer
lib/
  prisma.ts             — Prisma client singleton
prisma/
  schema.prisma         — Event model
  seed.ts               — 12 seeded Berlin events
```

---

Built by [Kalaya Chatelain](https://github.com/Kaalaayaa)
