# MarketingOS v8

Vite + React + Supabase implementation of MarketingOS, built per `guide.md`.

## Stack

- **Vite** (build tool)
- **React 18** + React Router v6
- **Supabase** (auth, Postgres, storage)
- **Zustand** (lightweight global state)
- **Tailwind CSS** (utilities) + a hand-written design system (`src/styles/globals.css`) that mirrors the look of the reference design (`reference.html`).
- `date-fns`, `clsx`, `axios`

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev                  # http://localhost:3000
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL in [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor to create the schema described in `guide.md` §2.
3. Create storage buckets named `assets`, `logos`, and `exports`.
4. Drop your project URL and anon key into `.env.local`:

   ```
   VITE_SUPABASE_URL=https://<your-project>.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ…
   ```

## Folder layout (matches `guide.md` §1.4)

```
marketingos-v8/
├─ src/
│  ├─ components/
│  │  ├─ Auth/         LoginScreen · SignupScreen · ProtectedRoute
│  │  ├─ Layout/       Header · Sidebar · MainLayout
│  │  ├─ Dashboard/    Dashboard · StatsCards · RecentActivity
│  │  ├─ Brands/       BrandList · BrandDetail · BrandForm
│  │  ├─ Campaigns/    CampaignList · CampaignDetail · CampaignWizard
│  │  ├─ Tasks/        TaskList · TaskDetail · TaskForm
│  │  ├─ Owner/        OwnerDashboard · ApprovalsTab · AssetsTab · MyBrandTab
│  │  └─ Common/       Modal · Button · Toast · LoadingSpinner
│  ├─ hooks/           useAuth · useSupabase · useAsync
│  ├─ store/           authStore · brandStore · campaignStore · uiStore
│  ├─ services/        supabase · auth · brands · campaigns · tasks · approvals · assets
│  ├─ utils/           constants · helpers · validators
│  └─ styles/          tailwind.css · globals.css
├─ supabase/
│  └─ schema.sql       Database schema + RLS examples
├─ index.html
├─ vite.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ vercel.json         Vercel SPA rewrite
├─ nixpacks.toml       Coolify / Nixpacks deploy config
└─ .env.example
```

## Deploying

- **Vercel** — import the repo, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, and ship. `vercel.json` already declares the SPA rewrite.
- **Coolify** — add the app, pick the `vite` build pack (or let Nixpacks auto-detect from `nixpacks.toml`), set the same env vars, and deploy.

## What's where

| Guide section | Lives in |
| --- | --- |
| §4 Authentication           | `src/services/{supabase,auth}.js`, `src/store/authStore.js`, `src/hooks/useAuth.js`, `src/components/Auth/*` |
| §5.1 MainLayout             | `src/components/Layout/MainLayout.jsx` |
| §5.2 Dashboard              | `src/components/Dashboard/*` |
| §5.3 OwnerDashboard         | `src/components/Owner/OwnerDashboard.jsx` |
| §5.4 ApprovalsTab           | `src/components/Owner/ApprovalsTab.jsx` |
| §5.5 AssetsTab              | `src/components/Owner/AssetsTab.jsx` |
| §5.6 MyBrandTab             | `src/components/Owner/MyBrandTab.jsx` |
| §6 Routing                  | `src/App.jsx` |
| §7 API services             | `src/services/*` |
| §2 Database schema          | `supabase/schema.sql` |
| §8 Deployment               | `vercel.json`, `nixpacks.toml` |
