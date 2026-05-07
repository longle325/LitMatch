import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/game-store";
import { characters } from "@/data/seed";
import { CharacterCard } from "./character-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DiscoverScreen() {
  const matches = useGameStore((s) => s.matches);
  const skipped = useGameStore((s) => s.skipped);
  const points = useGameStore((s) => s.points);
  const completed = useGameStore((s) => s.completed);
  const matchCharacter = useGameStore((s) => s.matchCharacter);
  const skipCharacter = useGameStore((s) => s.skipCharacter);
  const resetSkipped = useGameStore((s) => s.resetSkipped);

  const available = useMemo(
    () =>
      characters.filter(
        (c) => !matches.includes(c.id) && !skipped.includes(c.id)
      ),
    [matches, skipped]
  );

  const current = available[0];

  if (!current) {
    return (
      <section className="mx-auto max-w-lg py-12 text-center">
        <Card>
          <p className="kicker">Hoàn tất bộ thẻ</p>
          <h1 className="mt-2 font-serif text-headline-lg">
            Bạn đã xem hết đợt nội dung đầu tiên.
          </h1>
          <p className="lead mt-2">
            Mở bộ sưu tập để trò chuyện, làm thử thách và hoàn thành trạng thái
            mở khóa.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/collection">
              <Button>Xem nhân vật đã chọn</Button>
            </Link>
            <Button variant="ghost" onClick={resetSkipped}>
              Mở lại thẻ đã bỏ qua
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8 lg:flex-row">
      {/* Swipe card */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.25 }}
          >
            <CharacterCard character={current} />
          </motion.div>
        </AnimatePresence>

        {/* Swipe actions */}
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => skipCharacter(current.id)}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-outline-variant text-ink-muted transition-colors hover:border-cinnabar-bright hover:text-cinnabar-bright"
            aria-label="Bỏ qua"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={() => matchCharacter(current.id)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--cinnabar)] text-white shadow-literary transition-transform hover:scale-105"
            aria-label="Chọn nhân vật"
          >
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Side panel (desktop) */}
      <aside className="hidden w-72 space-y-4 lg:block">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <strong className="text-headline-md">{matches.length}</strong>
            <span className="block text-label-md text-ink-muted">Đã chọn</span>
          </Card>
          <Card className="p-4 text-center">
            <strong className="text-headline-md">{points}</strong>
            <span className="block text-label-md text-ink-muted">Điểm</span>
          </Card>
          <Card className="p-4 text-center">
            <strong className="text-headline-md">
              {Object.keys(completed).length}
            </strong>
            <span className="block text-label-md text-ink-muted">
              Hoàn thành
            </span>
          </Card>
        </div>
        <Card>
          <p className="kicker">Gợi ý học tập</p>
          <h3 className="mt-2 font-serif text-headline-md">
            Chọn để mở trò chuyện
          </h3>
          <p className="lead mt-2 text-body-sm">
            Mỗi nhân vật được chọn cộng 10 điểm và mở phòng trò chuyện. Làm
            thử thách đạt 4/5 để mở khóa hoàn toàn.
          </p>
        </Card>
      </aside>
    </section>
  );
}
