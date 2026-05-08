import tempfile
import unittest
from pathlib import Path

from scripts.ingest_knowledge_base import write_jsonl
from services.knowledge_retriever import KnowledgeRetriever


class KnowledgeRetrieverTests(unittest.TestCase):
    def test_search_filters_by_character_slug(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            index_path = Path(temp_dir) / "chunks.jsonl"
            write_jsonl(
                index_path,
                [
                    {
                        "chunk_id": "chi.chunk_1",
                        "character_slug": "chi_pheo",
                        "doc_type": "original",
                        "source_path": "Chi_Pheo/Chí_Phèo.txt",
                        "text": "Bát cháo hành của Thị Nở làm Chí Phèo muốn lương thiện.",
                    },
                    {
                        "chunk_id": "mi.chunk_1",
                        "character_slug": "mi",
                        "doc_type": "original",
                        "source_path": "Mi/Vợ_chồng_a_phủ.txt",
                        "text": "Tiếng sáo mùa xuân đánh thức Mị.",
                    },
                ],
            )

            retriever = KnowledgeRetriever(index_path=index_path)
            context = retriever.search_context("chi_pheo", "bát cháo hành")

            self.assertIn("Bát cháo hành", context)
            self.assertIn("Chi_Pheo/Chí_Phèo.txt", context)
            self.assertNotIn("Tiếng sáo", context)

    def test_search_returns_empty_string_when_no_terms_match(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            index_path = Path(temp_dir) / "chunks.jsonl"
            write_jsonl(
                index_path,
                [
                    {
                        "chunk_id": "chi.chunk_1",
                        "character_slug": "chi_pheo",
                        "doc_type": "analysis",
                        "source_path": "Chi_Pheo/analysis.txt",
                        "text": "Bát cháo hành đánh thức phần người.",
                    }
                ],
            )

            retriever = KnowledgeRetriever(index_path=index_path)

            self.assertEqual(retriever.search_context("chi_pheo", "tennis"), "")


if __name__ == "__main__":
    unittest.main()
