import { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Send, Swords, BookOpen } from "lucide-react";
import { useGameStore } from "@/stores/game-store";
import { findCharacter } from "@/data/seed";
import { useChat } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const quickPrompts = ["Hỏi về Thơ ca", "Hỏi về Gia đình"];

export function ChatScreen() {
  const { characterId } = useParams<{ characterId: string }>();
  const isMatched = useGameStore((s) => s.isMatched);
  const character = characterId ? findCharacter(characterId) : undefined;

  if (!character || !characterId || !isMatched(characterId)) {
    return <LockedView />;
  }

  return <ChatView characterId={characterId} />;
}

/* ── Main chat view (only rendered when matched) ─────────────── */

function ChatView({ characterId }: { characterId: string }) {
  const character = findCharacter(characterId)!;
  const { messages, sendMessage } = useChat(character);
  const [input, setInput] = useState("");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    sendMessage(text);
  };

  return (
    <section className="flex gap-6">
      {/* Chat card */}
      <Card className="flex flex-1 flex-col p-0">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-outline-variant p-4">
          <div className="flex items-center gap-3">
            {character.avatar ? (
              <img
                src={character.avatar}
                alt={character.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-serif text-body-md font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${character.artA}, ${character.artB})` }}
              >
                {character.initial}
              </div>
            )}
            <div>
              <h1 className="font-serif text-headline-md">{character.name}</h1>
              <p className="flex items-center gap-1 text-body-sm text-ink-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Đang trò chuyện
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-surface-container-low px-3 py-1 text-label-md text-ink-muted">
            <BookOpen className="h-3.5 w-3.5" />
            {character.work}
          </span>
        </header>

        {/* Thread */}
        <div ref={threadRef} className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: "60vh" }}>
          {messages.map((msg, i) =>
            msg.from === "user" ? (
              <div key={i} className="flex flex-col items-end gap-1">
                <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-body-md text-white">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-2">
                {character.avatar ? (
                  <img src={character.avatar} alt="" className="mt-1 h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${character.artA}, ${character.artB})` }}
                  >
                    {character.initial}
                  </span>
                )}
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-surface-container-low px-4 py-2.5 text-body-md">
                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-outline-variant p-4">
          <div className="mb-3 flex gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => setInput(prompt)}
                className="rounded-full bg-surface-container-low px-3 py-1 text-label-md text-ink-muted transition-colors hover:bg-surface-container-high"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về động cơ, biểu tượng, bối cảnh..."
              className="flex-1 rounded border border-outline-variant bg-white px-4 py-2.5 text-body-md placeholder:text-outline focus:border-ink focus:outline-none"
            />
            <Link to={`/characters/${characterId}/challenge`}>
              <Button variant="secondary" type="button" className="gap-1">
                <Swords className="h-4 w-4" /> Thử thách
              </Button>
            </Link>
            <Button type="submit">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>

      {/* Source panel (desktop) */}
      <aside className="hidden w-72 space-y-4 lg:block">
        <Card>
          <h3 className="font-serif text-headline-md">Nội dung trọng tâm</h3>
          <p className="lead mt-1 text-body-sm">{character.conflict.split(";")[0]}</p>
        </Card>
        <Card>
          <p className="kicker">Bối cảnh văn học</p>
          <div className="mt-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-ink-muted" />
            <div>
              <strong className="text-body-sm">{character.work}</strong>
              <p className="text-label-md text-ink-muted">{character.author}</p>
            </div>
          </div>
        </Card>
        <Card>
          <p className="kicker">Ghi chú đã duyệt</p>
          <div className="mt-2 space-y-2">
            {character.sources.map((s, i) => (
              <p key={i} className="text-body-sm text-ink-muted">{s}</p>
            ))}
          </div>
        </Card>
      </aside>
    </section>
  );
}

/* ── Locked fallback ─────────────────────────────────────────── */

function LockedView() {
  return (
    <section className="mx-auto max-w-lg py-12 text-center">
      <Card>
        <h1 className="font-serif text-headline-lg">Chưa mở khóa trò chuyện</h1>
        <p className="lead mt-2">
          Bạn cần chọn nhân vật trong màn Khám phá trước khi vào trò chuyện.
        </p>
        <Link to="/discover" className="mt-6 inline-block">
          <Button>Quay lại Khám phá</Button>
        </Link>
      </Card>
    </section>
  );
}
