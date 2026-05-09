import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BookOpen, Send, Sparkles } from "lucide-react";
import { useCharacter } from "@/api/queries";
import { api } from "@/api/client";
import { useAppStore } from "@/stores/useAppStore";
import type { Character, ChatMessage, ChatSource } from "@/types";

const defaultOpening = (character: Character) =>
  `Tôi là ${character.name}. Hãy hỏi tôi về một biểu tượng, xung đột hoặc lựa chọn khiến nhân vật trong ${character.work} trở nên đáng suy nghĩ.`;

const legacyOpening = (character: Character) =>
  `Chào bạn. Tôi là ${character.name}. Bạn có thể hỏi về động cơ, mâu thuẫn, bối cảnh xã hội hoặc một chi tiết trong tác phẩm.`;

const getCharacterImage = (character: Character) =>
  character.avatar || character.images?.[0] || character.image;

function CharacterProfileCard({ character }: { character: Character }) {
  return (
    <div className="character-profile-card" aria-label="Tác phẩm">
      <BookOpen size={20} strokeWidth={1.8} />
      <span>
        <strong>{character.work}</strong>
        <small>{character.author}</small>
      </span>
    </div>
  );
}

function ChatHeader({ character }: { character: Character }) {
  const chatImage = getCharacterImage(character);

  return (
    <header className="chat-header">
      <div className="chat-identity">
        {chatImage ? (
          <img
            className="avatar image-avatar"
            src={chatImage}
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
          <h1>{character.name}</h1>
          <p>
            <span className="online-dot" />
            Đang trò chuyện
          </p>
        </div>
      </div>
      <CharacterProfileCard character={character} />
    </header>
  );
}

function CharacterMessage({
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
      </div>
    );
  }
  const avatarImage = getCharacterImage(character);
  const avatar = avatarImage ? (
    <img className="message-avatar" src={avatarImage} alt={character.name} />
  ) : (
    <span className="message-avatar fallback">{character.initial}</span>
  );
  return (
    <div className="message-row bot">
      {avatar}
      <div className="message bot">
        {message.text}
        {message.sources && message.sources.length > 0 && (
          <ChatSourceChips sources={message.sources} />
        )}
      </div>
    </div>
  );
}

function ChatSourceChips({ sources }: { sources: ChatSource[] }) {
  // De-duplicate by title so the same work doesn't render twice when the
  // retriever surfaces multiple chunks from one document.
  const seen = new Set<string>();
  const unique: ChatSource[] = [];
  for (const s of sources) {
    if (seen.has(s.title)) continue;
    seen.add(s.title);
    unique.push(s);
  }
  return (
    <ul className="chat-sources" aria-label="Nguồn dẫn">
      {unique.map((source, index) => (
        <li key={`${source.title}-${index}`} className="chat-source-chip">
          <span className="chat-source-title">{source.title}</span>
          {source.snippet && (
            <span className="chat-source-snippet">{source.snippet}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function SuggestedQuestionChips({
  prompts,
  onSelect,
}: {
  prompts: string[];
  onSelect: (prompt: string) => void;
}) {
  if (!prompts.length) return null;

  return (
    <div className="quick-row" aria-label="Câu hỏi gợi ý">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          className="chip literary-chip"
          type="button"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

function ChatInput({
  characterId,
  character,
  draft,
  streaming,
  suggestedQuestions,
  onDraftChange,
  onPromptSelect,
  onSubmit,
}: {
  characterId: string;
  character: Character;
  draft: string;
  streaming: string;
  suggestedQuestions: string[];
  onDraftChange: (draft: string) => void;
  onPromptSelect: (prompt: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}) {
  const handleTextAreaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Guard against the dupe-message bug with Vietnamese IME (macOS, Telex,
    // Bộ gõ tiếng Việt, etc.): when the user finalises a tone-marked word
    // and presses Enter, the browser fires *two* keydown events — one from
    // compositionend (which has `isComposing = true` or `keyCode === 229`)
    // and a real one. Without this guard, the first call submits the full
    // draft and the second submits the trailing word residue.
    if (
      event.key !== "Enter" ||
      event.shiftKey ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229
    ) {
      return;
    }
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form className="chat-form literary-chat-form" onSubmit={onSubmit}>
      <SuggestedQuestionChips
        prompts={suggestedQuestions}
        onSelect={onPromptSelect}
      />
      <textarea
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        onKeyDown={handleTextAreaKeyDown}
        autoComplete="off"
        rows={2}
        placeholder={`Hỏi ${character.name} về bi kịch, biểu tượng, mâu thuẫn...`}
      />
      <Link
        className="btn secondary deeper-button"
        to={`/characters/${characterId}/challenge`}
      >
        <Sparkles size={19} strokeWidth={1.8} />
        Hỏi sâu hơn
      </Link>
      <button
        className="btn ghost send-button"
        type="submit"
        disabled={!!streaming || !draft.trim()}
      >
        <Send size={17} strokeWidth={1.8} />
        Gửi
      </button>
    </form>
  );
}

function ThemeTags({
  themes,
  character,
  onSelect,
}: {
  themes: string[];
  character: Character;
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="theme-tags">
      {themes.map((theme) => (
        <button
          key={theme}
          type="button"
          onClick={() =>
            onSelect(`${theme} được thể hiện như thế nào trong ${character.work}?`)
          }
        >
          {theme}
        </button>
      ))}
    </div>
  );
}

function SymbolList({
  symbols,
  character,
  onSelect,
}: {
  symbols: string[];
  character: Character;
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="symbol-list">
      {symbols.map((symbol) => (
        <button
          key={symbol}
          type="button"
          onClick={() =>
            onSelect(`${symbol} có vai trò gì trong bi kịch của ${character.name}?`)
          }
        >
          <span>{symbol}</span>
        </button>
      ))}
    </div>
  );
}

function InsightPanel({
  character,
  onSelect,
}: {
  character: Character;
  onSelect: (prompt: string) => void;
}) {
  const themes = character.interpretationThemes ?? [
    character.conflict.split(";")[0],
  ];
  const symbols = character.symbols ?? character.sources.map((source) => source.split(" ")[0]);

  return (
    <aside className="panel source-panel insight-panel">
      <section>
        <h2>Chủ đề nên khám phá</h2>
        <ThemeTags
          themes={themes}
          character={character}
          onSelect={onSelect}
        />
      </section>
      <section>
        <h2>Biểu tượng quan trọng</h2>
        <SymbolList
          symbols={symbols}
          character={character}
          onSelect={onSelect}
        />
      </section>
    </aside>
  );
}

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const matches = useAppStore((s) => s.matches);
  const chats = useAppStore((s) => s.chats);
  const appendChat = useAppStore((s) => s.appendChat);
  const setChat = useAppStore((s) => s.setChat);
  const { data: character, isLoading } = useCharacter(id);

  // Rehydrate chat history from the backend on mount. Mock returns [] so
  // existing local-only state is left untouched.
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    api.getChatHistory(id).then(
      (history) => {
        if (cancelled || history.length === 0) return;
        setChat(id, history);
      },
      () => {
        // Backend down or chat flag off — fall back to whatever Zustand has.
      },
    );
    return () => {
      cancelled = true;
    };
  }, [id, setChat]);

  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState("");
  const [error, setError] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  const initialMessage: ChatMessage | null = character
    ? {
        from: "bot",
        text: character.chatOpening ?? defaultOpening(character),
      }
    : null;
  const storedMessages = id ? chats[id] ?? [] : [];
  const messages: ChatMessage[] =
    character && initialMessage
      ? storedMessages.length
        ? storedMessages.map((message, index) =>
            index === 0 &&
            message.from === "bot" &&
            message.text === legacyOpening(character)
              ? initialMessage
              : message,
          )
        : [initialMessage]
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
    const sources: ChatSource[] = [];
    setStreaming("");
    try {
      for await (const event of api.streamChat({
        characterId: id,
        message: text,
      })) {
        if (event.kind === "token") {
          buffer += event.text;
          setStreaming(buffer);
        } else if (event.kind === "source") {
          sources.push(event.source);
        }
      }
      appendChat(id, {
        from: "bot",
        text: buffer,
        sources: sources.length ? sources : undefined,
      });
    } catch (err) {
      console.error("chat stream failed", err);
      if (buffer) {
        appendChat(id, {
          from: "bot",
          text: buffer,
          sources: sources.length ? sources : undefined,
        });
      }
      setError(
        "Không tạo được phản hồi. Vui lòng kiểm tra kết nối và thử lại.",
      );
    } finally {
      setStreaming("");
    }
  };

  const suggestedQuestions =
    character.suggestedQuestions ?? character.challenge.slice(0, 3).map((q) => q.text);

  return (
    <section className="page chat-layout reference-chat">
      <div className="chat-card">
        <ChatHeader character={character} />
        <div className="chat-thread" ref={threadRef}>
          {messages.map((message, index) => (
            <CharacterMessage
              key={index}
              message={message}
              character={character}
            />
          ))}
          {streaming && (
            <CharacterMessage
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
        <ChatInput
          characterId={id}
          character={character}
          draft={draft}
          streaming={streaming}
          suggestedQuestions={suggestedQuestions}
          onDraftChange={setDraft}
          onPromptSelect={setDraft}
          onSubmit={handleSubmit}
        />
      </div>
      <InsightPanel character={character} onSelect={setDraft} />
    </section>
  );
}
