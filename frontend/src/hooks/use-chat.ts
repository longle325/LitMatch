/**
 * Chat hook — encapsulates mock reply logic for MVP.
 *
 * When the backend is live, replace mockReply with the SSE stream
 * from api-client.ts:streamChat().
 */

import { useCallback } from "react";
import { useGameStore } from "@/stores/game-store";
import type { Character, ChatMessage } from "@/types";

/** Generate a grounded mock reply based on character sources. */
function mockReply(character: Character, text: string): string {
  const lower = text.toLowerCase();

  // Guard: refuse essay generation
  if (
    lower.includes("essay") ||
    lower.includes("bài văn mẫu") ||
    lower.includes("viết bài")
  ) {
    return "Mình không tạo bài văn mẫu hoàn chỉnh. Mình có thể giúp bạn lập dàn ý, tìm luận điểm và dẫn chứng để bạn tự viết bằng giọng của mình.";
  }

  // Guard: uncertainty
  if (lower.includes("không rõ") || lower.includes("ngoài tác phẩm")) {
    return "Phần này chưa có đủ nguồn trong bộ ghi chú hiện có, nên mình không khẳng định như sự thật văn bản. Ta có thể quay lại các chi tiết đã duyệt trước.";
  }

  // Source-grounded reply
  const source =
    character.sources.find((s) =>
      lower.split(/\s+/).some((w) => w.length > 3 && s.toLowerCase().includes(w))
    ) ?? character.sources[0];

  return `Theo giọng của ${character.name}, câu trả lời nên xuất phát từ mâu thuẫn cốt lõi: ${character.conflict} Ghi chú nguồn liên quan: ${source} Đây là diễn giải học tập, không phải trích dẫn nguyên văn toàn bộ tác phẩm.`;
}

export function useChat(character: Character) {
  const addMessage = useGameStore((s) => s.addChatMessage);
  const messages = useGameStore((s) => s.chats[character.id] ?? []);

  const sendMessage = useCallback(
    (text: string) => {
      const userMsg: ChatMessage = { from: "user", text };
      addMessage(character.id, userMsg);

      // Simulate async bot response
      const reply = mockReply(character, text);
      const botMsg: ChatMessage = { from: "bot", text: reply };
      addMessage(character.id, botMsg);
    },
    [character, addMessage]
  );

  // Include welcome message if no history
  const allMessages: ChatMessage[] =
    messages.length > 0
      ? messages
      : [
          {
            from: "bot",
            text: `Chào bạn. Tôi là ${character.name}. Bạn có thể hỏi về động cơ, mâu thuẫn, bối cảnh xã hội hoặc một chi tiết trong tác phẩm.`,
          },
        ];

  return { messages: allMessages, sendMessage };
}
