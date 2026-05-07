# LitMatch Task Tracker

Last updated: 2026-05-07

## Completed

- [x] Read `PRD.md`, `Content_reference.csv`, and provided design references.
- [x] Created a no-install static app shell with `index.html`, `styles.css`, and `app.js`.
- [x] Added `package.json` with Vite scripts so the app can run with `npm run dev`.
- [x] Installed npm dependencies and verified Vite serves the app at `http://127.0.0.1:5173/`.
- [x] Implemented Vietnamese onboarding with username and grade selection.
- [x] Recreated the missing onboarding/start screen from the provided screenshot using only the Modern Literary design system and existing reference-screen patterns.
- [x] Made onboarding a standalone first-run screen outside the authenticated sidebar/topbar app shell.
- [x] Reworked the authenticated app shell to follow the design-reference sidebar, top metrics, typography, and Material Symbols icon treatment.
- [x] Recreated the discovery screen from `design reference/Thuy_Kieu card/screen.png` with the image-first literary card, centered character content, quote panel, conflict tile, trait chips, and bottom swipe actions.
- [x] Recreated the collection screen from `design reference/Character screen/screen.png` with the literary-circle header, sort control, portrait cards, status badges, and progress bars.
- [x] Recreated the chat screen from `design reference/chat/screen.png` with character header, chapter divider, message rows, contextual quick prompts, challenge CTA, and side context panel.
- [x] Recreated the challenge screen from `design reference/challenge/screen.png` with the centered progress line, large question card, answer rows, selected state, source-review action, and submit/next action.
- [x] Recreated the leaderboard screen from `design reference/Leaderboard/screen.png` with tabs, metric chips, ranked table, unlocked-character column, and current-user highlight.
- [x] Seeded the five MVP characters from the CSV content batch: Chí Phèo, Mị, Xuân Tóc Đỏ, Lục Vân Tiên, and Thúy Kiều.
- [x] Built discovery cards with Modern Literary styling, Vietnamese labels, profile content, quotes, personality notes, conflict notes, and context notes.
- [x] Added left/right discovery actions with persistent local session state.
- [x] Added pointer-based swipe gestures on discovery cards, with `Bỏ qua` and `Chọn` decision stamps.
- [x] Added matched character collection with challenge status and chat/challenge actions.
- [x] Added guarded character chat route with local source-grounded mock responses.
- [x] Added five-question character challenges with score, explanations, pass state, and points.
- [x] Added leaderboard with demo users and current-user ranking.
- [x] Added profile view and local demo reset.
- [x] Verified JavaScript syntax with `node --check app.js`.

## Next

- [ ] Visually verify the onboarding screen in a browser or Playwright once local browser tooling is available.
- [ ] Visually verify every recreated reference screen in a browser or Playwright once local browser tooling is available.
- [ ] Split inline app data into a dedicated data module or JSON seed file.
- [ ] Add real generated or selected character image assets for each `Image or illustration` brief.
- [ ] Improve chat response simulation with visible streaming text behavior.
- [ ] Persist in-progress challenge answers across route changes and reloads.
- [ ] Add keyboard controls for discovery cards.
- [ ] Add a React + TypeScript scaffold if the prototype needs a framework migration.
- [ ] Move local state into a typed store during the React migration.
- [ ] Add automated UI smoke tests after the app has a dev-server setup.
