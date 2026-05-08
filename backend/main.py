"""
LitMatch API  –  FastAPI application factory.

Start locally:
    uvicorn main:app --reload --port 8081
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from core.database import Base, engine, ensure_vector_extension

# Route modules
from api.routes import (
    admin,
    challenges,
    characters,
    chat,
    deck,
    interactions,
    leaderboard,
    users,
)

logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
)
logger = logging.getLogger(__name__)


# ── Lifespan ──────────────────────────────────────────────────────────────


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables on startup, dispose engine on shutdown."""
    logger.info("Starting LitMatch API …")
    await ensure_vector_extension()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    logger.info("Shutting down …")
    await engine.dispose()


# ── App ───────────────────────────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_TITLE,
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────────

API_PREFIX = "/api/v1"

app.include_router(users.router, prefix=API_PREFIX)
app.include_router(deck.router, prefix=API_PREFIX)
app.include_router(interactions.router, prefix=API_PREFIX)
app.include_router(chat.router, prefix=API_PREFIX)
app.include_router(challenges.router, prefix=API_PREFIX)
app.include_router(leaderboard.router, prefix=API_PREFIX)
app.include_router(characters.router, prefix=API_PREFIX)
app.include_router(admin.router, prefix=API_PREFIX)


@app.get("/health")
async def health():
    return {"status": "ok"}
