import json
import tempfile
import unittest
from pathlib import Path

from scripts.ingest_knowledge_base import (
    chunk_text,
    load_manifest,
    write_jsonl,
)

BACKEND_DIR = Path(__file__).resolve().parents[1]


class IngestKnowledgeBaseTests(unittest.TestCase):
    def test_manifest_covers_five_character_slugs(self):
        manifest = load_manifest(BACKEND_DIR / "knowledge_base" / "manifest.json")

        self.assertEqual(
            {character["slug"] for character in manifest["characters"]},
            {"chi_pheo", "mi", "xuan_toc_do", "luc_van_tien", "thuy_kieu"},
        )

    def test_chunk_text_attaches_document_metadata(self):
        document = {
            "document_id": "chi_pheo.original.full_text",
            "character_slug": "chi_pheo",
            "character_name": "Chí Phèo",
            "work_title": "Chí Phèo",
            "author": "Nam Cao",
            "doc_type": "original",
            "source_path": "Chi_Pheo/Chí_Phèo.txt",
        }
        text = "Đoạn một về Chí Phèo.\n\nĐoạn hai về Bá Kiến và Thị Nở."

        chunks = chunk_text(document, text, max_chars=32)

        self.assertGreaterEqual(len(chunks), 2)
        self.assertEqual(chunks[0]["character_slug"], "chi_pheo")
        self.assertEqual(chunks[0]["doc_type"], "original")
        self.assertEqual(chunks[0]["source_path"], "Chi_Pheo/Chí_Phèo.txt")
        self.assertTrue(chunks[0]["text"])

    def test_write_jsonl_writes_one_json_object_per_line(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            output_path = Path(temp_dir) / "chunks.jsonl"
            write_jsonl(output_path, [{"id": "a"}, {"id": "b"}])

            rows = [
                json.loads(line)
                for line in output_path.read_text(encoding="utf-8").splitlines()
            ]
            self.assertEqual(rows, [{"id": "a"}, {"id": "b"}])


if __name__ == "__main__":
    unittest.main()
