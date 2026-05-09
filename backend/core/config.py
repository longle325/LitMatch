"""
Application settings loaded from environment variables.

Single-source-of-truth for secrets is the repository-root `.env` file
(also used by Vite for the `VITE_*` flags). Resolved relative to this
file so the backend can be launched from any working directory.
"""

from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List

# backend/core/config.py  →  parents[2] is the repo root.
ROOT_ENV_FILE = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    # --- Database ---
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/litmatch"

    # --- OpenAI ---
    OPENAI_API_KEY: str = ""
    CODEX_MODEL: str = "codex-mini"
    CHAT_MODEL: str = "gpt-4o"
    EMBEDDING_MODEL: str = "text-embedding-3-large"
    EMBEDDING_DIMENSIONS: int = 3072

    # --- Codex Knowledge Base ---
    KNOWLEDGE_BASE_DIR: str = "./knowledge_base"
    RAG_TOP_K: int = 5
    RAG_MIN_SIMILARITY: float = 0.0

    # --- CORS ---
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "capacitor://localhost",  # iOS Capacitor
        "https://localhost",  # Android Capacitor
    ]

    # --- App ---
    APP_TITLE: str = "LitMatch API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    # --- Points ---
    # Mirrors PRD §6.5 (and FE `src/lib/scoring.ts`): match awards, completion
    # bonus, pass bonus only. No perfect-score bonus — the FE explicitly
    # removed it for parity with the PRD; keep the backend in lockstep.
    POINTS_MATCH: int = 10
    POINTS_CHALLENGE_COMPLETE: int = 50
    POINTS_CHALLENGE_PASS_BONUS: int = 40  # >= 4/5
    CHALLENGE_PASS_THRESHOLD: int = 4  # out of 5

    # Root `.env` is canonical. Vite-only `VITE_*` keys in the same file are
    # ignored by pydantic-settings (no matching field), so co-living is safe.
    model_config = {
        "env_file": str(ROOT_ENV_FILE),
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


settings = Settings()
