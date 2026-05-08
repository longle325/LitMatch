"""
Codex Knowledge Agent — searches literary knowledge files using OpenAI Codex.

Reads character-specific text files from knowledge_base/, passes them as
context to the Codex model (gpt-5.2-codex), and returns the most relevant
excerpts for the character chat prompt.

Architecture
------------
  user query ──► CodexKnowledgeAgent
                   │
                   ├── reads knowledge_base/{character}/*.txt locally
                   ├── sends files + query to gpt-5.2-codex
                   └── returns extracted literary context
                         │
                         ▼
                   ChatService builds prompt and streams LLM response
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Optional

from openai import AsyncOpenAI

from core.config import settings

logger = logging.getLogger(__name__)

# Map character names to knowledge_base folder names
CHARACTER_FOLDER_MAP: dict[str, str] = {
    "Chí Phèo": "Chi_Pheo",
    "chi_pheo": "Chi_Pheo",
    "Mị": "Mi",
    "mi": "Mi",
    "Xuân Tóc Đỏ": "Xuan_red_hair",
    "xuan_toc_do": "Xuan_red_hair",
    "Lục Vân Tiên": "Luc_Van_Tien",
    "luc_van_tien": "Luc_Van_Tien",
    "Thúy Kiều": "Thuy_Kieu",
    "thuy_kieu": "Thuy_Kieu",
}

MAX_CONTEXT_CHARS = 12_000  # Stay within token limits


class CodexKnowledgeAgent:
    """
    Searches the literary knowledge base using OpenAI Codex model.

    Reads character knowledge files from disk, passes them as context
    to the Codex model, and asks it to extract relevant passages.
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        knowledge_dir: Optional[str] = None,
        model: Optional[str] = None,
    ):
        self.client = AsyncOpenAI(api_key=api_key or settings.OPENAI_API_KEY)
        self.knowledge_dir = Path(knowledge_dir or settings.KNOWLEDGE_BASE_DIR)
        self.model = model or settings.CHAT_MODEL  # gpt-5-mini

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------
    async def search_context(
        self,
        character_name: str,
        user_query: str,
    ) -> str:
        """
        Search the knowledge base for literary context relevant to the
        user's question about *character_name*.

        Returns a plain-text block of retrieved excerpts that can be
        injected into the character chat prompt.
        """
        knowledge_text = self._load_character_files(character_name)
        if not knowledge_text:
            logger.warning("No knowledge files found for %s", character_name)
            return ""

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a literary research assistant specialising "
                            "in Vietnamese literature. Extract ONLY the passages, "
                            "quotes, events, relationships, and historical context "
                            "that are relevant to the user's question from the "
                            "provided knowledge files. Output only the extracted "
                            "excerpts — no commentary, no summarisation. "
                            "If nothing is relevant, say so."
                        ),
                    },
                    {
                        "role": "user",
                        "content": (
                            f"=== KNOWLEDGE FILES FOR {character_name.upper()} ===\n\n"
                            f"{knowledge_text}\n\n"
                            f"=== QUESTION ===\n{user_query}"
                        ),
                    },
                ],
                max_completion_tokens=1024,
            )
            return response.choices[0].message.content or ""

        except Exception:
            logger.exception("Codex search failed for %s", character_name)
            return ""

    # ------------------------------------------------------------------
    # Internals
    # ------------------------------------------------------------------
    def _load_character_files(self, character_name: str) -> str:
        """Read all .txt and .md files for a character, concatenated."""
        folder_name = CHARACTER_FOLDER_MAP.get(character_name)
        if not folder_name:
            # Try matching by folder name directly
            folder_name = character_name.replace(" ", "_").replace("-", "_")

        char_dir = self.knowledge_dir / folder_name
        if not char_dir.is_dir():
            return ""

        parts: list[str] = []
        total_chars = 0
        for path in sorted(char_dir.glob("*.txt")):
            text = path.read_text(encoding="utf-8", errors="replace").strip()
            if not text:
                continue
            # Prefer analysis files over full text to stay within limits
            if total_chars + len(text) > MAX_CONTEXT_CHARS:
                remaining = MAX_CONTEXT_CHARS - total_chars
                if remaining > 500:
                    parts.append(f"--- {path.name} (truncated) ---\n{text[:remaining]}")
                break
            parts.append(f"--- {path.name} ---\n{text}")
            total_chars += len(text)

        # Also check .md files
        for path in sorted(char_dir.glob("*.md")):
            text = path.read_text(encoding="utf-8", errors="replace").strip()
            if not text or total_chars + len(text) > MAX_CONTEXT_CHARS:
                break
            parts.append(f"--- {path.name} ---\n{text}")
            total_chars += len(text)

        return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# Module-level singleton
# ---------------------------------------------------------------------------
_agent: Optional[CodexKnowledgeAgent] = None


def get_codex_agent() -> CodexKnowledgeAgent:
    global _agent
    if _agent is None:
        _agent = CodexKnowledgeAgent()
    return _agent
