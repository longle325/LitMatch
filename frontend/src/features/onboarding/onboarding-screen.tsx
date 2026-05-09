import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/stores/game-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface FormValues {
  username: string;
  grade: number;
}

export function OnboardingScreen() {
  const setProfile = useGameStore((s) => s.setProfile);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { username: "", grade: 10 } });

  const onSubmit = (data: FormValues) => {
    setProfile({ username: data.username, grade: data.grade });
    navigate("/discover");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface p-6">
      <Card className="w-full max-w-md">
        <h1 className="font-serif text-headline-lg text-ink">
          Chào mừng đến LitMatch
        </h1>
        <p className="lead mt-2">
          Khám phá nhân vật văn học Việt Nam qua trò chuyện, thử thách và bảng
          xếp hạng.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label className="kicker mb-2 block">Tên của bạn</label>
            <Input
              placeholder="Nhập tên hiển thị"
              {...register("username", {
                required: "Vui lòng nhập tên",
                minLength: { value: 1, message: "Tên quá ngắn" },
              })}
            />
            {errors.username && (
              <p className="mt-1 text-body-sm text-cinnabar-bright">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="kicker mb-2 block">Lớp</label>
            <div className="flex gap-3">
              {[10, 11, 12].map((g) => (
                <label
                  key={g}
                  className="flex flex-1 cursor-pointer items-center justify-center rounded border border-outline-variant px-4 py-3 text-body-md font-semibold transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    value={g}
                    className="sr-only"
                    {...register("grade", { valueAsNumber: true })}
                  />
                  Lớp {g}
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Bắt đầu khám phá
          </Button>
        </form>
      </Card>
    </div>
  );
}
