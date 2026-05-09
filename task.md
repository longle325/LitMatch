# LitMatch Task Tracker

Last updated: 2026-05-07

## Completed

- [x] Read `PRD.md`, `Content_reference.csv`, and provided design references.
- [x] Built initial static prototype (`_legacy/app.js`, `_legacy/styles.css`).
- [x] Implemented all 7 screens (onboarding, discovery, collection, chat, challenge, leaderboard, profile) with Vietnamese localization.
- [x] Seeded the five MVP CSV characters with full content.

## Stack migration to PRD specification (2026-05-07)

- [x] Replaced vanilla JS prototype with React + TypeScript + Vite scaffold.
- [x] Added Tailwind CSS, PostCSS, Autoprefixer.
- [x] Added React Router DOM with nested routing and onboarding guard.
- [x] Added Zustand store with `persist` middleware (key `litmatch-state`).
- [x] Added TanStack Query with mock API client implementing PRD §9 endpoints.
- [x] Added Framer Motion, Lucide icons, react-hook-form, react-tinder-card to deps.
- [x] Defined typed data model in `src/types/`.
- [x] Ported seed characters into typed `src/data/characters.ts`.
- [x] Implemented chunked streaming chat in mock API (replaces single-shot `mockReply`).
- [x] Preserved legacy CSS as `src/styles/legacy.css` for visual parity during polish.
- [x] Moved legacy files into `_legacy/` for diff reference.
- [x] `npm install`, `tsc -b`, `npm run build`, and `npm run dev` all succeed.

## Next (post-migration polish + backend)

- [ ] Browser-verify each screen on the React build (onboarding, discover, collection, chat, challenge, leaderboard, profile).
- [ ] Generate or source real character images for Mị and Lục Vân Tiên (currently CSS art placeholders).
- [ ] Replace expiring `lh3.googleusercontent.com/aida-public/...` URLs with stable assets.
- [ ] Migrate components from legacy CSS to Tailwind utility classes during polish pass.
- [ ] Replace mock API client with real backend (`/deck`, `/characters/:id`, `/match`, `/chat` SSE, `/challenge/submit`, `/leaderboard`).
- [ ] Add Framer Motion animations for swipe, chat streaming, score reveal.
- [ ] Persist in-progress challenge answers across reloads.
- [ ] Add keyboard controls for discovery cards.
- [ ] Add automated UI smoke tests.
