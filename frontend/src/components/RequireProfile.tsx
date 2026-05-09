import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { api, ApiError } from "@/api/client";
import { useReal } from "@/api/adapter";

type BootState = "checking" | "ready" | "missing";

export default function RequireProfile({ children }: { children: ReactNode }) {
  const profile = useAppStore((s) => s.profile);
  const setProfile = useAppStore((s) => s.setProfile);
  const location = useLocation();
  const [boot, setBoot] = useState<BootState>("checking");

  useEffect(() => {
    let cancelled = false;
    if (!profile) {
      setBoot("missing");
      return;
    }
    // Already have a backend-issued userId, or we're in mock mode where
    // userId isn't required. Nothing to do.
    if (profile.userId || !useReal("auth")) {
      setBoot("ready");
      return;
    }
    // Stale localStorage from before auth was real. Silently back-fill by
    // re-creating the user; on 409 (username taken), bounce to onboarding.
    api
      .createUser({ username: profile.username, grade: profile.grade })
      .then((created) => {
        if (cancelled) return;
        setProfile(created.username, created.grade, created.userId);
        setBoot("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 409) {
          // Username taken — clear stale session, start fresh
          setBoot("missing");
        } else {
          // Backend unreachable or other error — clear stale profile
          // so user can re-onboard cleanly instead of being stuck
          console.warn("Session recovery failed, redirecting to onboarding:", err);
          setBoot("missing");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [profile, setProfile]);

  if (boot === "checking") {
    return (
      <section className="page narrow">
        <div className="card empty-state">
          <p className="lead">Đang chuẩn bị phiên...</p>
        </div>
      </section>
    );
  }

  if (boot === "missing" || !profile) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
