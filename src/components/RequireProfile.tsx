import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { useAppStore } from "@/stores/useAppStore";

export default function RequireProfile({ children }: { children: ReactNode }) {
  const profile = useAppStore((s) => s.profile);
  const location = useLocation();
  if (!profile) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
