import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/stores/game-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProfileScreen() {
  const profile = useGameStore((s) => s.profile);
  const points = useGameStore((s) => s.points);
  const matches = useGameStore((s) => s.matches);
  const completed = useGameStore((s) => s.completed);
  const resetAll = useGameStore((s) => s.resetAll);
  const navigate = useNavigate();

  const handleReset = () => {
    resetAll();
    navigate("/discover");
  };

  return (
    <section className="mx-auto max-w-lg">
      <Card>
        <p className="kicker">Hồ sơ</p>
        <h1 className="mt-1 font-serif text-headline-lg">
          {profile?.username ?? "Bạn"}
        </h1>
        <p className="lead mt-2">
          Lớp {profile?.grade ?? "?"}. Dữ liệu thử nghiệm đang được lưu cục bộ
          trong trình duyệt.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <strong className="text-headline-md">{points}</strong>
            <span className="block text-label-md text-ink-muted">Điểm</span>
          </Card>
          <Card className="p-4 text-center">
            <strong className="text-headline-md">{matches.length}</strong>
            <span className="block text-label-md text-ink-muted">
              Nhân vật đã chọn
            </span>
          </Card>
          <Card className="p-4 text-center">
            <strong className="text-headline-md">
              {Object.keys(completed).length}
            </strong>
            <span className="block text-label-md text-ink-muted">
              Thử thách đã làm
            </span>
          </Card>
        </div>

        <div className="mt-6">
          <Button variant="ghost" onClick={handleReset}>
            Đặt lại dữ liệu thử nghiệm
          </Button>
        </div>
      </Card>
    </section>
  );
}
