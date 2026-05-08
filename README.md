# LitMatch

A gamified Vietnamese literature learning app. Students discover literary characters through swipe cards, chat with source-grounded AI personas, complete character challenges, and compete on a leaderboard.

## Stack

- **Frontend**: React 18 + TypeScript + Vite, Zustand (persisted), TanStack Query, React Router DOM, react-tinder-card, Framer Motion
- **Backend**: FastAPI + SQLAlchemy (async) + Alembic, pgvector for hybrid RAG, OpenAI Codex/GPT-4o for chat, SSE streaming via `sse-starlette`
- **Infra**: Postgres in Docker (`pgvector/pgvector:pg17`), `.env` at repo root for both sides

## Prerequisites

- **Node 18+** (developed against 22.x), npm
- **Python 3.11+** (developed against 3.13)
- **Docker Desktop** running (for the Postgres container)
- **OpenAI API key** in `.env` (`OPENAI_API_KEY=...`) — needed for chat streaming and the embed script

Copy `.env.example` to `.env` and fill in your key. The same `.env` holds the FE `VITE_*` flags too — Vite ignores backend keys and vice versa.

## First-time setup

```sh
# 1. Frontend deps
npm install

# 2. Backend deps
cd backend
python3 -m venv .venv
./.venv/bin/pip install -r requirements.txt
cd ..

# 3. Postgres + schema + characters/challenges/demo users
docker compose up -d postgres
cd backend && ./.venv/bin/python scripts/seed_database.py && cd ..

# 4. Knowledge-base embeddings (542 RAG chunks, ~$0.02 of OpenAI tokens
#    if you embed locally). Skip the cost by restoring the team dump:
bash scripts/restore-knowledge-chunks.sh
# (Default DUMP_URL points at the team Drive copy. Override with
#  DUMP_URL=... if you've moved it.)
```

If you ever change `backend/knowledge_base/index/chunks.jsonl`, re-run the embed script and refresh the Drive dump:

```sh
cd backend && ./.venv/bin/python scripts/embed_knowledge_base.py --batch-size 24
cd ..
bash scripts/dump-knowledge-chunks.sh
# Then upload backend/data/knowledge_chunks.sql.gz to the team Drive
```

## Run locally (3 terminals)

```sh
# T1 — postgres (one-shot, stays running)
docker compose up -d postgres

# T2 — backend
cd backend && ./.venv/bin/python -m uvicorn main:app --reload --port 8081

# T3 — frontend
npm run dev
```

Open <http://127.0.0.1:5173/>. First load redirects to `/onboarding`.

## Mock vs real backend

`VITE_REAL_ENDPOINTS` in `.env` is a comma-separated whitelist of endpoints that hit the real backend; anything not listed stays on the in-memory mock. Recognised keys: `auth, deck, characters, match, challenge, leaderboard, chat`. Empty string = all mock (no backend needed).

For a quick offline UI demo: set it to empty. For full RAG-grounded chat: include `chat`.

## NPM scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start Vite dev server on `127.0.0.1:5173` |
| `npm run build` | Type-check (`tsc -b`) then produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Type-check only, no emit |

## Knowledge-base team workflow

The pgvector embeddings (542 chunks, 3072-dim, ~7.4 MB compressed) live in the team's Google Drive instead of git so the repo stays lean. The dump artifact is gitignored under `backend/data/knowledge_chunks.sql.gz`.

- **Refresh** (after changing chunks): `bash scripts/dump-knowledge-chunks.sh` → upload to Drive
- **Restore** (fresh setup or after DB wipe): `bash scripts/restore-knowledge-chunks.sh`

The current dump: <https://drive.google.com/file/d/1cGlRIXH9EOJEwfb22USsUhSV6NCAcq_D/view>

## Project layout

```
src/                 Frontend (React + TS)
  api/               Per-endpoint mock/real router; SSE parser
  components/        AppShell, route guards, shared UI
  data/              Seed characters (FE-side lore: art, prompts, themes)
  routes/            One file per route
  stores/            Zustand store (persisted to localStorage)
  styles/            Global CSS (Tailwind directives + folk-woodblock theme)
  types/             Shared TypeScript types

backend/             FastAPI service
  api/routes/        FastAPI routers per resource
  services/          Chat orchestration, RAG retriever, Codex agent, DB access
  models/            SQLAlchemy + Pydantic schemas
  knowledge_base/    Per-character source texts + analyses + chunks.jsonl
  scripts/           Python: seed_database, embed_knowledge_base, ingest tools
  migrations/        Alembic migrations

scripts/             Bash: dump-knowledge-chunks.sh, restore-knowledge-chunks.sh
docs/API.md          Backend API contract
PRD.md               Product requirements
task.md              Running task tracker
```

## How state works

Frontend user-state (profile, `userId` from `POST /users`, points, matches, completed challenges, chat cache) lives in Zustand and persists to `localStorage` under `litmatch-state`. To reset: `/profile` → **Đặt lại dữ liệu thử nghiệm**, or clear that key in devtools.

Backend persists everything authoritative — users, swipes, challenge attempts, full chat history — in Postgres. When `chat` is real, opening a conversation rehydrates from `GET /chat/history`.

## Documentation

- [PRD.md](./PRD.md) — product requirements
- [docs/API.md](./docs/API.md) — backend API contract
- [task.md](./task.md) — task tracker
