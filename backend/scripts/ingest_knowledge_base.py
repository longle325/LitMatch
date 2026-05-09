from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Iterable


def load_manifest(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def chunk_text(
    document: dict[str, Any],
    text: str,
    max_chars: int = 1200,
    overlap_chars: int = 150,
) -> list[dict[str, Any]]:
    paragraphs = [paragraph.strip() for paragraph in text.split("\n\n") if paragraph.strip()]
    chunks: list[dict[str, Any]] = []
    current = ""

    for paragraph in paragraphs:
        candidate = f"{current}\n\n{paragraph}".strip() if current else paragraph
        if len(candidate) <= max_chars:
            current = candidate
            continue
        if current:
            chunks.append(_build_chunk(document, current, len(chunks)))
        current = paragraph[-max_chars:] if len(paragraph) > max_chars else paragraph

    if current:
        chunks.append(_build_chunk(document, current, len(chunks)))

    if overlap_chars > 0 and len(chunks) > 1:
        for index in range(1, len(chunks)):
            previous_tail = chunks[index - 1]["text"][-overlap_chars:]
            chunks[index]["text"] = f"{previous_tail}\n\n{chunks[index]['text']}"

    return chunks


def write_jsonl(path: Path, rows: Iterable[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as file:
        for row in rows:
            file.write(json.dumps(row, ensure_ascii=False) + "\n")


def _build_chunk(
    document: dict[str, Any],
    text: str,
    index: int,
) -> dict[str, Any]:
    document_id = document["document_id"]
    return {
        "chunk_id": f"{document_id}.chunk_{index + 1:04d}",
        "document_id": document_id,
        "character_slug": document["character_slug"],
        "character_name": document["character_name"],
        "work_title": document.get("work_title"),
        "author": document.get("author"),
        "doc_type": document["doc_type"],
        "source_path": document["source_path"],
        "text": text,
    }
