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
