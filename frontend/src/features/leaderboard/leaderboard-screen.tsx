import { useMemo } from "react";
import { useGameStore } from "@/stores/game-store";
import { demoLeaders } from "@/data/seed";
import { Card } from "@/components/ui/card";
import { initials, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LeaderboardScreen() {
  const profile = useGameStore((s) => s.profile);
  const points = useGameStore((s) => s.points);
  const completed = useGameStore((s) => s.completed);

  const currentUser = useMemo(
    () => ({
      name: profile?.username ?? "Bạn",
      points,
      unlocked: Object.values(completed).filter((r) => r.passed).length,
    }),
    [profile, points, completed]
  );

  const rows = useMemo(
    () =>
      [...demoLeaders, currentUser].sort((a, b) => b.points - a.points),
    [currentUser]
  );

  return (
    <section>
      <h1 className="font-serif text-headline-lg">Hào kiệt văn chương</h1>
      <p className="lead mt-1">
        Nơi vinh danh những học giả uyên bác trên hành trình khám phá văn học
        Việt Nam.
      </p>

      {/* Tabs (visual only for MVP) */}
      <div className="mt-6 flex gap-2">
        {["Toàn cầu", "Lớp học", "Hằng tuần"].map((tab, i) => (
          <button
            key={tab}
            className={cn(
              "rounded-full px-4 py-1.5 text-body-sm font-medium transition-colors",
              i === 0
                ? "bg-ink text-white"
                : "bg-surface-container-low text-ink-muted hover:bg-surface-container"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="mt-6 overflow-hidden p-0">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 border-b border-outline-variant bg-surface-container-low px-4 py-3 text-label-md font-semibold text-ink-muted">
          <span>Hạng</span>
          <span>Tên học giả</span>
          <span className="text-center">Nhân vật đã mở khóa</span>
          <span className="text-right">Tổng điểm</span>
        </div>

        {/* Rows */}
        {rows.map((row, idx) => {
          const isCurrent = row.name === currentUser.name;
          return (
            <div
              key={idx}
              className={cn(
                "grid grid-cols-4 items-center gap-4 border-b border-outline-variant px-4 py-3 last:border-b-0",
                isCurrent && "bg-amber-50 font-semibold"
              )}
            >
              <span className="font-serif text-headline-md">{idx + 1}</span>
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-label-md text-white">
                  {initials(row.name)}
                </span>
                <strong className="text-body-md">
                  {isCurrent ? "Bạn" : row.name}
                </strong>
              </span>
              <span className="text-center text-body-md">{row.unlocked}</span>
              <strong className="text-right text-body-md">
                {formatNumber(row.points)}
              </strong>
            </div>
          );
        })}
      </Card>
    </section>
  );
}
