import { Link } from "react-router-dom";
import type { Character, ChallengeResult } from "@/types";
import { useGameStore } from "@/stores/game-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  character: Character;
  result: ChallengeResult;
}

export function ResultView({ character, result }: Props) {
  const retryChallenge = useGameStore((s) => s.retryChallenge);

  return (
    <section className="mx-auto max-w-2xl">
      <Card>
        <p className="kicker">Kết quả thử thách</p>
        <h1 className="mt-1 font-serif text-headline-lg">
          {character.name}: {result.score}/5 câu đúng
        </h1>
        <p className="lead mt-2">
          {result.passed
            ? "Đã mở khóa hoàn toàn. Bạn hiểu được các lớp động cơ và bối cảnh chính của nhân vật."
            : "Chưa đạt mốc 4/5. Hãy đọc giải thích rồi làm lại để củng cố kiến thức."}
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <strong className="text-headline-md">+{result.awarded}</strong>
            <span className="block text-label-md text-ink-muted">
              Điểm nhận được
            </span>
          </Card>
          <Card className="p-4 text-center">
            <strong className="text-headline-md">
              {result.passed ? "Đạt" : "Chưa đạt"}
            </strong>
            <span className="block text-label-md text-ink-muted">
              Trạng thái
            </span>
          </Card>
          <Card className="p-4 text-center">
            <strong className="text-headline-md">
              {result.perfect ? "5/5" : "4/5"}
            </strong>
            <span className="block text-label-md text-ink-muted">
              Mốc mở khóa
            </span>
          </Card>
        </div>

        {/* Explanations */}
        <div className="mt-6 space-y-4">
          {character.challenge.map((q, i) => {
            const isCorrect = result.answers[i] === q.answer;
            return (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-4",
                  isCorrect
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-cinnabar/20 bg-cinnabar-container/30"
                )}
              >
                <h3 className="text-body-sm font-semibold">
                  {isCorrect ? "Đúng" : "Cần xem lại"} — Câu {i + 1}
                </h3>
                <p className="mt-1 text-body-md font-medium">{q.text}</p>
                <p className="mt-1 text-body-sm text-ink-muted">
                  Đáp án đúng: {q.options[q.answer]}
                </p>
                <p className="mt-1 text-body-sm text-ink-muted">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/leaderboard">
            <Button>Xem bảng xếp hạng</Button>
          </Link>
          <Link to={`/characters/${character.id}/chat`}>
            <Button variant="secondary">Quay lại trò chuyện</Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => retryChallenge(character.id)}
          >
            Làm lại
          </Button>
        </div>
      </Card>
    </section>
  );
}
