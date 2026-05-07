import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import type { Grade } from "@/types";

interface FormValues {
  username: string;
  grade: Grade;
}

const grades: Grade[] = [10, 11, 12];

export default function Onboarding() {
  const setProfile = useAppStore((s) => s.setProfile);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { username: "", grade: 10 },
  });

  const selectedGrade = watch("grade");

  const onSubmit = (values: FormValues) => {
    setProfile(values.username.trim(), Number(values.grade) as Grade);
    navigate("/discover", { replace: true });
  };

  return (
    <section className="onboarding-screen">
      <div className="onboarding-card">
        <p className="kicker">Bắt đầu hành trình</p>
        <h1 className="headline-lg">Chào mừng đến với LitMatch</h1>
        <p className="lead">
          Khám phá nhân vật văn học Việt Nam qua thẻ vuốt, trò chuyện và thử
          thách. Hãy giới thiệu bạn một chút.
        </p>
        <form className="onboarding-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="field">
            <span>Tên hiển thị</span>
            <input
              autoComplete="off"
              placeholder="Ví dụ: Lan Anh"
              {...register("username", {
                required: "Vui lòng nhập tên hiển thị",
                minLength: { value: 1, message: "Tên không được để trống" },
              })}
            />
            {errors.username && (
              <small className="error-text">{errors.username.message}</small>
            )}
          </label>

          <div className="field">
            <span>Khối lớp</span>
            <div className="grade-row">
              {grades.map((grade) => (
                <button
                  type="button"
                  key={grade}
                  className={`chip${selectedGrade === grade ? " active" : ""}`}
                  onClick={() => setValue("grade", grade)}
                >
                  Lớp {grade}
                </button>
              ))}
            </div>
          </div>

          <button className="btn primary" type="submit">
            Vào khám phá
          </button>
        </form>
      </div>
    </section>
  );
}
