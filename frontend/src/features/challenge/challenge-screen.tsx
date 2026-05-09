import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGameStore } from "@/stores/game-store";
import { findCharacter } from "@/data/seed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResultView } from "./result-view";
import { cn } from "@/lib/utils";

export function ChallengeScreen() {
  const { characterId } = useParams<{ characterId: string }>();
  const isMatched = useGameStore((s) => s.isMatched);
  const completed = useGameStore((s) => s.completed);

  const character = characterId ? findCharacter(characterId) : undefined;

  if (!character || !characterId || !isMatched(characterId)) {
    return <LockedView />;
  }

  const result = completed[characterId];
  if (result) {
    return <ResultView character={character} result={result} />;
  }

  return <ChallengeFlow characterId={characterId} />;
}

/* ── Challenge flow ──────────────────────────────────────────── */

function ChallengeFlow({ characterId }: { characterId: string }) {
  const character = findCharacter(characterId)!;
  const completeChallenge = useGameStore((s) => s.completeChallenge);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(
    new Array(character.challenge.length).fill(undefined)
  );

  const question = character.challenge[questionIdx];
  const total = character.challenge.length;
  const selectedAnswer = answers[questionIdx];

  const selectAnswer = (idx: number) => {
    const next = [...answers];
    next[questionIdx] = idx;
    setAnswers(next);
  };

  const handleNext = () => {
    if (questionIdx < total - 1) {
      setQuestionIdx(questionIdx + 1);
      return;
    }
    // Submit
    const correctAnswers = character.challenge.map((q) => q.answer);
    completeChallenge(
      characterId,
      answers as number[],
      correctAnswers
    );
  };

  return (
    <section className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-surface-container">
        <div
          className="h-full rounded-full bg-[var(--cinnabar)] transition-all duration-300"
          style={{ width: `${((questionIdx + 1) / total) * 100}%` }}
        />
      </div>

      <p className="kicker">
        Câu hỏi {questionIdx + 1} / {total}
      </p>
      <h1 className="mt-1 font-serif text-headline-lg">
        Thử thách nhân vật: {character.name}
      </h1>

      <Card className="mt-6">
        <p className="text-body-lg font-medium">{question.text}</p>

        <div className="mt-6 space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-body-md transition-colors",
                selectedAnswer === i
                  ? "border-ink bg-ink text-white"
                  : "border-outline-variant hover:bg-surface-container-low"
              )}
            >
              <strong
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-label-md",
                  selectedAnswer === i
                    ? "bg-white text-ink"
                    : "bg-surface-container text-ink-muted"
                )}
              >
                {String.fromCharCode(65 + i)}
              </strong>
              <span>{option}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="ghost"
          disabled={questionIdx === 0}
          onClick={() => setQuestionIdx(Math.max(0, questionIdx - 1))}
        >
          Câu trước
        </Button>
        <Button
          disabled={selectedAnswer === undefined}
          onClick={handleNext}
        >
          {questionIdx === total - 1 ? "Nộp bài" : "Câu tiếp theo"}
        </Button>
      </div>
    </section>
  );
}

/* ── Locked fallback ─────────────────────────────────────────── */

function LockedView() {
  return (
    <section className="mx-auto max-w-lg py-12 text-center">
      <Card>
        <h1 className="font-serif text-headline-lg">Chưa mở khóa thử thách</h1>
        <p className="lead mt-2">
          Bạn cần chọn nhân vật trước khi làm thử thách.
        </p>
        <Link to="/discover" className="mt-6 inline-block">
          <Button>Quay lại Khám phá</Button>
        </Link>
      </Card>
    </section>
  );
}
