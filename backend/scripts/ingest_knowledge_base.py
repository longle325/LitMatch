from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any, Iterable


DEFAULT_MAX_CHARS = 1600
DEFAULT_OVERLAP_CHARS = 160


def load_manifest(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def normalize_text(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def chunk_text(
    document: dict[str, Any],
    text: str,
    max_chars: int = DEFAULT_MAX_CHARS,
    overlap_chars: int = DEFAULT_OVERLAP_CHARS,
) -> list[dict[str, Any]]:
    """Split a document into metadata-rich chunks."""
    paragraphs = [paragraph.strip() for paragraph in normalize_text(text).split("\n\n")]
    paragraphs = [paragraph for paragraph in paragraphs if paragraph]

    chunks: list[str] = []
    current = ""
    for paragraph in paragraphs:
        candidate = f"{current}\n\n{paragraph}".strip() if current else paragraph
        if len(candidate) <= max_chars:
            current = candidate
            continue
        if current:
            chunks.append(current)
        if len(paragraph) <= max_chars:
            current = paragraph
            continue
        for start in range(0, len(paragraph), max_chars - overlap_chars):
            chunks.append(paragraph[start : start + max_chars].strip())
        current = ""
    if current:
        chunks.append(current)

    enriched_chunks: list[dict[str, Any]] = []
    for index, chunk in enumerate(chunks, start=1):
        enriched_chunks.append(
            {
                "chunk_id": f"{document['document_id']}.chunk_{index:04d}",
                "document_id": document["document_id"],
                "character_slug": document["character_slug"],
                "character_name": document["character_name"],
                "work_title": document["work_title"],
                "author": document["author"],
                "doc_type": document["doc_type"],
                "source_path": document["source_path"],
                "source_url": document.get("source_url", ""),
                "license_status": document.get("license_status", ""),
                "reliability": document.get("reliability", ""),
                "chunk_index": index,
                "text": chunk,
            }
        )
    return enriched_chunks


def iter_documents(
    knowledge_base_dir: Path, manifest: dict[str, Any]
) -> Iterable[dict[str, Any]]:
    for character in manifest["characters"]:
        for source in character["documents"]:
            document = {
                **source,
                "character_slug": character["slug"],
                "character_name": character["name"],
                "work_title": character["work_title"],
                "author": character["author"],
            }
            document_path = knowledge_base_dir / document["source_path"]
            document["text"] = document_path.read_text(encoding="utf-8")
            yield document


def build_index(
    knowledge_base_dir: Path,
    manifest_path: Path,
    max_chars: int = DEFAULT_MAX_CHARS,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    manifest = load_manifest(manifest_path)
    documents: list[dict[str, Any]] = []
    chunks: list[dict[str, Any]] = []

    for document in iter_documents(knowledge_base_dir, manifest):
        text = document.pop("text")
        document_record = {
            **document,
            "char_count": len(text),
        }
        documents.append(document_record)
        chunks.extend(chunk_text(document_record, text, max_chars=max_chars))

    return documents, chunks


def write_jsonl(path: Path, rows: Iterable[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as file:
        for row in rows:
            file.write(json.dumps(row, ensure_ascii=False) + "\n")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build LitMatch knowledge indexes.")
    parser.add_argument(
        "--knowledge-base-dir",
        type=Path,
        default=Path("knowledge_base"),
        help="Path to the backend knowledge_base directory.",
    )
    parser.add_argument(
        "--max-chars",
        type=int,
        default=DEFAULT_MAX_CHARS,
        help="Maximum characters per chunk.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    knowledge_base_dir = args.knowledge_base_dir.resolve()
    manifest_path = knowledge_base_dir / "manifest.json"
    documents, chunks = build_index(
        knowledge_base_dir=knowledge_base_dir,
        manifest_path=manifest_path,
        max_chars=args.max_chars,
    )

    index_dir = knowledge_base_dir / "index"
    write_jsonl(index_dir / "documents.jsonl", documents)
    write_jsonl(index_dir / "chunks.jsonl", chunks)
    print(f"Wrote {len(documents)} documents and {len(chunks)} chunks to {index_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
