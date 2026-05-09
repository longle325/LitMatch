import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import { useGameStore } from "@/stores/game-store";
import { characters } from "@/data/seed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CollectionScreen() {
  const matches = useGameStore((s) => s.matches);
  const completed = useGameStore((s) => s.completed);

  const matched = useMemo(
    () => characters.filter((c) => matches.includes(c.id)),
    [matches]
  );

  return (
    <section>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-headline-lg">Vòng tròn văn chương</h1>
          <p className="lead mt-1">
            Những nhân vật bạn đã khám phá trong hành trình học tập.
          </p>
        </div>
      </div>

      {matched.length === 0 ? (
        <Card className="text-center">
          <h2 className="font-serif text-headline-md">Chưa có nhân vật nào</h2>
          <p className="lead mt-2">
            Hãy vào Khám phá và chọn một nhân vật để mở trò chuyện.
          </p>
          <Link to="/discover" className="mt-4 inline-block">
            <Button>Đi khám phá</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matched.map((character) => {
            const result = completed[character.id];
            const progress = result?.passed
              ? 100
              : result
                ? Math.round((result.score / 5) * 100)
                : 33;

            return (
              <Card key={character.id} className="overflow-hidden p-0">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  {character.portrait || character.image ? (
                    <img
                      src={character.portrait ?? character.image}
                      alt={character.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="art-gradient flex h-full items-center justify-center text-5xl font-bold text-white/60"
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
                  <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-label-md text-white">
                    {result?.passed ? (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    ) : (
                      <Lock className="h-3.5 w-3.5" />
                    )}
                    {result?.passed ? "Đã mở khóa" : "Chờ thử thách"}
                  </span>
                </div>

                {/* Body */}
                <div className="space-y-3 p-4">
                  <div>
                    <h2 className="font-serif text-headline-md">
                      {character.name}
                    </h2>
                    <p className="text-body-sm text-ink-muted">
                      {character.work}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-label-md text-ink-muted">
                      {progress}% khám phá
                    </p>
                  </div>

                  <Badge variant={result?.passed ? "success" : "pending"}>
                    {result?.passed
                      ? "Đã mở khóa hoàn toàn"
                      : "Chưa hoàn thành thử thách"}
                  </Badge>

                  <div className="flex gap-2">
                    <Link
                      to={`/characters/${character.id}/chat`}
                      className="flex-1"
                    >
                      <Button variant="secondary" className="w-full">
                        Trò chuyện
                      </Button>
                    </Link>
                    <Link
                      to={`/characters/${character.id}/challenge`}
                      className="flex-1"
                    >
                      <Button variant="ghost" className="w-full">
                        Làm thử thách
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
