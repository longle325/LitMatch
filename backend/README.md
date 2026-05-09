# LitMatch Backend

FastAPI backend for LitMatch.

## Setup

From the repository root:

```bash
cd backend
python3 -m venv .venv
./.venv/bin/pip install -r requirements.txt
cp .env.example .env
```

The default database URL is:

```text
postgresql+asyncpg://postgres:postgres@localhost:5432/litmatch
```

## Run Postgres

If you do not already have a local Postgres running on port `5432`, start the
development database from the repository root:

```bash
docker compose up -d postgres
```

Check readiness:

```bash
docker compose ps postgres
```

## Seed Data

After Postgres is ready:

```bash
cd backend
./.venv/bin/python scripts/seed_database.py
```

This seeds the five MVP characters, their challenges, and demo leaderboard users.

## Embed Knowledge Base

The backend uses hybrid RAG:

- OpenAI `text-embedding-3-large` embeds chunks from `knowledge_base/index/chunks.jsonl`.
- Postgres + pgvector stores vectors in `knowledge_chunks`.
- Chat falls back to the local lexical retriever if vector retrieval is unavailable.

Make sure `.env` has:

```text
OPENAI_API_KEY=sk-...
EMBEDDING_MODEL=text-embedding-3-large
EMBEDDING_DIMENSIONS=3072
RAG_TOP_K=5
```

Then run:

```bash
cd backend
./.venv/bin/python scripts/embed_knowledge_base.py --batch-size 64
```

The script upserts by stable `chunk_id` and skips unchanged chunks on later runs.

## Run API

```bash
cd backend
./.venv/bin/python -m uvicorn main:app --reload --port 8081
```

Health check:

```bash
curl http://127.0.0.1:8081/health
```

## Tests

```bash
cd backend
./.venv/bin/python -m unittest discover -s tests
```
