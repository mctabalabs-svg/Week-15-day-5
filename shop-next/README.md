# Mctaba Shop

A Next.js 16 shop application with cart state management, products powered by Postgres (Neon), and client-rendered interactive cart features.

## Features

- Product catalog fetched from Postgres
- Product detail pages with add-to-cart
- Cart state machine managed via React Context + useReducer
- Persistent cart using localStorage
- Responsive layout with Tailwind CSS

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Configure the database in `.env.local`

```env
PG_HOST=your-neon-host
PG_PORT=5432
PG_USER=your-user
PG_PASSWORD=your-password
PG_DATABASE=neondb
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Commands

- `npm run dev` — start the development server
- `npm run build` — build for production
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Project Structure

- `app/(shop)/` — shop route group (layout, products, cart, about)
- `app/cart/` — cart state machine (reducer, context, button, badge)
- `lib/db.js` — Postgres pool + retry helpers
- `db/` — schema, seeds, and seed scripts
