import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";

interface NavItem {
  key: string;
  to: string;
  label: string;
  icon: string;
}

const items: NavItem[] = [
  { key: "discover", to: "/discover", label: "Khám phá", icon: "explore" },
  { key: "collection", to: "/collection", label: "Nhân vật đã chọn", icon: "book_2" },
  { key: "leaderboard", to: "/leaderboard", label: "Bảng xếp hạng", icon: "emoji_events" },
  { key: "profile", to: "/profile", label: "Hồ sơ", icon: "account_circle" },
];

export default function AppShell() {
  const profile = useAppStore((s) => s.profile);
  const points = useAppStore((s) => s.points);
  const streak = useAppStore((s) => s.streak);
  const location = useLocation();
  const isLeaderboard = location.pathname.startsWith("/leaderboard");

  return (
    <div className="app-shell">
      <aside className="side-nav">
        <div className="brand">
          <h1 className="brand-title">LitMatch</h1>
          <p className="brand-subtitle">Văn học Việt Nam</p>
        </div>
        <nav className="nav-links">
          {items.map((item) => (
            <NavLink
              key={item.key}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <header className="topbar">
        <div>
          <strong
            style={{
              color: "var(--cinnabar)",
              fontFamily: "'Noto Serif', serif",
              fontSize: 24,
            }}
          >
            LitMatch
          </strong>
          {profile && (
            <span style={{ marginLeft: 10, color: "var(--muted)", fontSize: 13 }}>
              Lớp {profile.grade}
            </span>
          )}
        </div>
        <div className="topbar-metrics">
          <span className="metric">
            <span className="material-symbols-outlined">local_fire_department</span>
            {isLeaderboard ? "Thành tích: " : ""}
            {streak} Ngày
          </span>
          <span className="metric">
            <span className="material-symbols-outlined">military_tech</span>
            {isLeaderboard ? "Điểm: " : ""}
            {points.toLocaleString("vi-VN")} Điểm
          </span>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      {profile && (
        <nav className="mobile-nav">
          {items
            .filter((item) => item.key !== "profile")
            .map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
        </nav>
      )}
    </div>
  );
}
