from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Optional

from core.config import settings


TOKEN_RE = re.compile(r"\w+", re.UNICODE)


class KnowledgeRetriever:
    """Local character-scoped retriever over the generated JSONL chunk index."""

    def __init__(self, index_path: Optional[Path] = None, top_k: int = 5):
        self.index_path = index_path or (
            Path(settings.KNOWLEDGE_BASE_DIR) / "index" / "chunks.jsonl"
        )
        self.top_k = top_k
        self._chunks: Optional[list[dict[str, Any]]] = None

    def search_context(self, character_slug: str, user_query: str) -> str:
        terms = self._tokenize(user_query)
        if not terms:
            return ""

        scored: list[tuple[float, dict[str, Any]]] = []
        for chunk in self._load_chunks():
            if chunk.get("character_slug") != character_slug:
                continue
            score = self._score_chunk(chunk, terms, user_query)
            if score > 0:
                scored.append((score, chunk))

        scored.sort(key=lambda item: item[0], reverse=True)
        selected = [chunk for _, chunk in scored[: self.top_k]]
        return self._format_context(selected)

    def _load_chunks(self) -> list[dict[str, Any]]:
        if self._chunks is not None:
            return self._chunks
        if not self.index_path.exists():
            self._chunks = []
            return self._chunks

        chunks: list[dict[str, Any]] = []
        with self.index_path.open("r", encoding="utf-8") as file:
            for line in file:
                line = line.strip()
                if line:
                    chunks.append(json.loads(line))
        self._chunks = chunks
        return chunks

    @staticmethod
    def _tokenize(text: str) -> set[str]:
        return {
            token.lower()
            for token in TOKEN_RE.findall(text)
            if len(token) >= 2
        }

    def _score_chunk(
        self, chunk: dict[str, Any], terms: set[str], user_query: str
    ) -> float:
        text = chunk.get("text", "")
        text_lower = text.lower()
        chunk_terms = self._tokenize(text)
        score = float(len(terms & chunk_terms))

        normalized_query = " ".join(user_query.lower().split())
        if normalized_query and normalized_query in " ".join(text_lower.split()):
            score += 5.0

        if score > 0 and chunk.get("doc_type") == "analysis":
            score += 0.25
        return score

    @staticmethod
    def _format_context(chunks: list[dict[str, Any]]) -> str:
        if not chunks:
            return ""
        sections = []
        for chunk in chunks:
            sections.append(
                "\n".join(
                    [
                        f"[Nguồn: {chunk.get('source_path')} | {chunk.get('chunk_id')}]",
                        chunk.get("text", ""),
                    ]
                )
            )
        return "\n\n---\n\n".join(sections)


_retriever: Optional[KnowledgeRetriever] = None


def get_knowledge_retriever() -> KnowledgeRetriever:
    global _retriever
    if _retriever is None:
        _retriever = KnowledgeRetriever()
    return _retriever
