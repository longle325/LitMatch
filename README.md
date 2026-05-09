# LitMatch

A gamified Vietnamese literature learning app. Students discover literary characters through swipe cards, chat with source-grounded AI personas, complete character challenges, and compete on a leaderboard.

> **Status:** Frontend prototype. No backend wired yet — all data is mocked locally. See [docs/API.md](./docs/API.md) for the backend contract that will replace the mock layer.

## Stack

- **React 18 + TypeScript** with Vite
- **React Router DOM** for routing
- **Zustand** (with `persist` middleware) for client state
- **TanStack Query** for API state
- **Tailwind CSS** + legacy custom CSS (in `src/styles/legacy.css`)
- **react-tinder-card** for the swipe deck
- **React Hook Form** for onboarding/forms
- **Framer Motion**, **Lucide React** (installed; used during polish phase)

## Prerequisites

- **Node.js 18+** (developed against 22.x)
- **npm** (ships with Node)

## Local development

```sh
npm install
npm run dev
```

Open <http://127.0.0.1:5173/>. First load redirects to `/onboarding` — enter a username and pick a grade to enter the app.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start Vite dev server on `127.0.0.1:5173` |
| `npm run build` | Type-check (`tsc -b`) then produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only, no emit |

## Project layout

```
src/
  api/          API client (mock now; swap to HTTP later) and TanStack Query hooks
  components/   AppShell, RequireProfile guard, CharacterCard, CharacterArt
  data/         Seed characters and demo leaderboard
  lib/          Pure helpers (challenge scoring)
  routes/       One file per route (Onboarding, Discover, Chat, Challenge, Collection, Leaderboard, Profile)
  stores/       Zustand store (persisted to localStorage)
  styles/       Global CSS (Tailwind directives + ported legacy stylesheet)
  types/        Shared TypeScript types
```

Other top-level folders:

- `design reference/` — design mockups and screenshots used as visual targets
- `_legacy/` — original vanilla-JS prototype kept for diff reference; not part of the build
- `Content_reference.csv` / `Content for Hackathon game - Sheet1.pdf` — source content for the five MVP characters

## How state works

User-facing state (profile, points, matches, completed challenges, chat history) lives in a Zustand store and is persisted to `localStorage` under the key `litmatch-state`. To reset: open `/profile` and click **Đặt lại dữ liệu thử nghiệm**, or clear the key from devtools.

The seed character data, demo leaderboard users, and AI replies are all read from local files in `src/data/` and `src/api/client.ts`. None of this hits a network. When the backend is ready, the only file that needs to change is `src/api/client.ts` — the contract is documented in [docs/API.md](./docs/API.md).

## Documentation

- [PRD.md](./PRD.md) — product requirements
- [docs/API.md](./docs/API.md) — backend API contract
- [task.md](./task.md) — task tracker
