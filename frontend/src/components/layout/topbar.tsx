import { Flame, Medal } from "lucide-react";
import { useGameStore } from "@/stores/game-store";
import { formatNumber } from "@/lib/utils";

export function Topbar() {
  const points = useGameStore((s) => s.points);
  const streak = useGameStore((s) => s.streak);
  const profile = useGameStore((s) => s.profile);

  return (
    <header className="flex items-center justify-between border-b border-outline-variant bg-white px-page-margin py-3">
      <div className="flex items-center gap-3">
        <span className="font-serif text-headline-md text-[var(--cinnabar)] lg:hidden">
          LitMatch
        </span>
        {profile && (
          <span className="hidden text-body-sm text-ink-muted lg:inline">
            Lớp {profile.grade}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-body-sm text-ink-muted">
          <Flame className="h-4 w-4 text-orange-500" />
          {streak} Ngày
        </span>
        <span className="flex items-center gap-1 text-body-sm text-ink-muted">
          <Medal className="h-4 w-4 text-amber-500" />
          {formatNumber(points)} Điểm
        </span>
      </div>
    </header>
  );
}
