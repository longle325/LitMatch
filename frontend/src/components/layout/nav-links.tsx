import { NavLink } from "react-router-dom";
import { Compass, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/discover", label: "Khám phá", icon: Compass },
  { to: "/collection", label: "Nhân vật đã chọn", icon: BookOpen },
  { to: "/leaderboard", label: "Bảng xếp hạng", icon: Trophy },
  { to: "/profile", label: "Hồ sơ", icon: User },
] as const;

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-body-sm font-medium transition-colors",
              mobile
                ? "flex-1 flex-col gap-0.5 rounded-none py-2 text-center text-[11px]"
                : "",
              isActive
                ? "bg-surface-container-high text-ink font-semibold"
                : "text-ink-muted hover:text-ink hover:bg-surface-container-low"
            )
          }
        >
          <Icon className={cn("shrink-0", mobile ? "h-5 w-5" : "h-4 w-4")} />
          <span>{label}</span>
        </NavLink>
      ))}
    </>
  );
}
