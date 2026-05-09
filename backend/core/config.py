"""
Application settings loaded from environment variables.
"""

from pydantic_settings import BaseSettings
from typing import List


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
        "http://localhost:3000",
        "capacitor://localhost",  # iOS Capacitor
        "https://localhost",  # Android Capacitor
    ]

    # --- App ---
    APP_TITLE: str = "LitMatch API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    # --- Points ---
    POINTS_MATCH: int = 10
    POINTS_CHALLENGE_COMPLETE: int = 50
    POINTS_CHALLENGE_PASS_BONUS: int = 40  # >= 4/5
    POINTS_PERFECT_SCORE_BONUS: int = 25  # 5/5
    CHALLENGE_PASS_THRESHOLD: int = 4  # out of 5

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
