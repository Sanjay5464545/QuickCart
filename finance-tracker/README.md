# Finance Tracker (Next.js + Tailwind + Supabase)

A responsive personal finance tracker with authentication, dashboard summaries, CRUD transactions, filters, and dark mode.

## Tech
- Next.js App Router (TypeScript)
- Tailwind CSS (dark mode)
- Supabase (Postgres, Auth, RLS)

## Setup
1. Copy `.env.example` to `.env.local` and set Supabase URL and anon key.
2. In Supabase SQL editor, run `supabase/schema.sql`.
3. Install deps and run:
   ```bash
   npm install
   npm run dev
   ```

## Deploy
- Vercel: set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars.