import unittest

from services.chat_service import ChatService


class ChatServiceCompletionOptionsTests(unittest.TestCase):
    def test_gpt_5_models_use_max_completion_tokens(self):
        service = ChatService(
            codex_agent=None,
            openai_client=object(),
            chat_model="gpt-5.1",
        )

        kwargs = service._completion_kwargs("system", "message")

        self.assertEqual(kwargs["max_completion_tokens"], 1024)
        self.assertNotIn("max_tokens", kwargs)
        self.assertNotIn("temperature", kwargs)

    def test_legacy_chat_models_use_max_tokens(self):
        service = ChatService(
            codex_agent=None,
            openai_client=object(),
            chat_model="gpt-4o",
        )

        kwargs = service._completion_kwargs("system", "message")

        self.assertEqual(kwargs["max_tokens"], 1024)
        self.assertEqual(kwargs["temperature"], 0.7)
        self.assertNotIn("max_completion_tokens", kwargs)


if __name__ == "__main__":
    unittest.main()
