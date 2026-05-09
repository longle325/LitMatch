import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCharacter } from "@/api/queries";
import { api } from "@/api/client";
import { useAppStore } from "@/stores/useAppStore";
import type { Character, ChatMessage } from "@/types";

const QUICK_PROMPTS = ["Hỏi về Thơ ca", "Hỏi về Gia đình"];

function MessageRow({
  message,
  character,
}: {
  message: ChatMessage;
  character: Character;
}) {
  if (message.from === "user") {
    return (
      <div className="message-row user">
        <div className="message user">{message.text}</div>
        <small>Read</small>
      </div>
    );
  }
  const avatar = character.avatar ? (
    <img className="message-avatar" src={character.avatar} alt={character.name} />
  ) : (
    <span className="message-avatar fallback">{character.initial}</span>
  );
  return (
    <div className="message-row bot">
      {avatar}
      <div className="message bot">{message.text}</div>
    </div>
  );
}

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const matches = useAppStore((s) => s.matches);
  const chats = useAppStore((s) => s.chats);
  const appendChat = useAppStore((s) => s.appendChat);
  const { data: character, isLoading } = useCharacter(id);

  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState("");
  const [error, setError] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  const messages: ChatMessage[] =
    id && chats[id]?.length
      ? chats[id]
      : character
        ? [
            {
              from: "bot",
              text: `Chào bạn. Tôi là ${character.name}. Bạn có thể hỏi về động cơ, mâu thuẫn, bối cảnh xã hội hoặc một chi tiết trong tác phẩm.`,
            },
          ]
        : [];

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, streaming]);

  if (!id) return <Navigate to="/discover" replace />;
  if (isLoading) return null;
  if (!character || !matches.includes(id)) {
    return (
      <section className="page narrow">
        <div className="card empty-state">
          <h1 className="headline-lg">Chưa mở khóa trò chuyện</h1>
          <p className="lead">
            Bạn cần chọn nhân vật trong màn Khám phá trước khi vào trò chuyện
            hoặc thử thách.
          </p>
          <Link className="btn primary" to="/discover">
            Quay lại Khám phá
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || streaming) return;
    setDraft("");
    setError(null);
    appendChat(id, { from: "user", text });

    let buffer = "";
    setStreaming("");
    try {
      for await (const chunk of api.streamChat({
        characterId: id,
        message: text,
      })) {
        buffer += chunk;
        setStreaming(buffer);
      }
      appendChat(id, { from: "bot", text: buffer });
    } catch (err) {
      console.error("chat stream failed", err);
      if (buffer) {
        appendChat(id, { from: "bot", text: buffer });
      }
      setError(
        "Không tạo được phản hồi. Vui lòng kiểm tra kết nối và thử lại.",
      );
    } finally {
      setStreaming("");
    }
  };

  return (
    <section className="page chat-layout reference-chat">
      <div className="chat-card">
        <header className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {character.avatar ? (
              <img
                className="avatar image-avatar"
                src={character.avatar}
                alt={character.name}
              />
            ) : (
              <div
                className="avatar"
                style={
                  {
                    "--art-a": character.artA,
                    "--art-b": character.artB,
                  } as React.CSSProperties
                }
              >
                {character.initial}
              </div>
            )}
            <div>
              <h1 style={{ fontSize: 28 }}>{character.name}</h1>
              <p style={{ margin: "4px 0 0", color: "var(--muted)" }}>
                <span className="online-dot" />
                Đang trò chuyện
              </p>
            </div>
          </div>
          <span className="work-pill">
            <span className="material-symbols-outlined">local_library</span>
            {character.work}
          </span>
        </header>
        <div className="chat-thread" ref={threadRef}>
          <div className="chapter-pill">Chương I: Cuộc gặp đầu tiên</div>
          {messages.map((message, index) => (
            <MessageRow
              key={index}
              message={message}
              character={character}
            />
          ))}
          {streaming && (
            <MessageRow
              message={{ from: "bot", text: streaming }}
              character={character}
            />
          )}
          {streaming && (
            <div className="typing-line">
              <span className="material-symbols-outlined">edit</span>
              {character.name} đang suy ngẫm...
            </div>
          )}
          {error && !streaming && (
            <div className="chat-error" role="alert">
              <span className="material-symbols-outlined">error</span>
              <span>{error}</span>
            </div>
          )}
        </div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <div className="quick-row">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                className="chip"
                type="button"
                onClick={() => setDraft(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="off"
            placeholder="Hỏi về động cơ, biểu tượng, bối cảnh..."
          />
          <Link
            className="btn secondary"
            to={`/characters/${id}/challenge`}
          >
            <span className="material-symbols-outlined">swords</span>
            Thử thách tôi
          </Link>
          <button
            className="btn primary"
            type="submit"
            disabled={!!streaming || !draft.trim()}
          >
            Gửi
          </button>
        </form>
      </div>
      <aside className="panel source-panel">
        <h2 style={{ fontSize: 24 }}>Nội dung trọng tâm</h2>
        <p className="lead" style={{ fontSize: 15, marginTop: 6 }}>
          {character.conflict.split(";")[0]}
        </p>
        <div className="understanding">
          <span>Mức độ thấu hiểu</span>
          <strong>Level 2</strong>
          <i style={{ width: "35%" }} />
        </div>
        <p className="kicker">Bối cảnh văn học</p>
        <div className="source-book">
          <span className="material-symbols-outlined">menu_book</span>
          <div>
            <strong>{character.work}</strong>
            <small>{character.author}</small>
          </div>
        </div>
        <p className="kicker">Ghi chú đã duyệt</p>
        <div className="source-list">
          {character.sources.map((source) => (
            <div key={source} className="source-item">
              {source}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
