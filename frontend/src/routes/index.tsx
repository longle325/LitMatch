/**
 * Route configuration with guards.
 *
 * Design pattern: route guards implemented as wrapper components
 * that check Zustand store state and redirect if needed.
 */

import { Navigate, type RouteObject } from "react-router-dom";
import { useGameStore } from "@/stores/game-store";
import { AppShell } from "@/components/layout/app-shell";

// Lazy-loaded feature screens
import { OnboardingScreen } from "@/features/onboarding/onboarding-screen";
import { DiscoverScreen } from "@/features/discover/discover-screen";
import { CollectionScreen } from "@/features/collection/collection-screen";
import { ChatScreen } from "@/features/chat/chat-screen";
import { ChallengeScreen } from "@/features/challenge/challenge-screen";
import { LeaderboardScreen } from "@/features/leaderboard/leaderboard-screen";
import { ProfileScreen } from "@/features/profile/profile-screen";

/* ── Guard: require onboarding ───────────────────────────────── */

function RequireProfile({ children }: { children: React.ReactNode }) {
  const profile = useGameStore((s) => s.profile);
  if (!profile) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

/* ── Guard: redirect away from onboarding if profile exists ─── */

function RedirectIfOnboarded({ children }: { children: React.ReactNode }) {
  const profile = useGameStore((s) => s.profile);
  if (profile) return <Navigate to="/discover" replace />;
  return <>{children}</>;
}

/* ── Route table ─────────────────────────────────────────────── */

export const routes: RouteObject[] = [
  {
    path: "/onboarding",
    element: (
      <RedirectIfOnboarded>
        <OnboardingScreen />
      </RedirectIfOnboarded>
    ),
  },
  {
    path: "/",
    element: (
      <RequireProfile>
        <AppShell />
      </RequireProfile>
    ),
    children: [
      { index: true, element: <Navigate to="/discover" replace /> },
      { path: "discover", element: <DiscoverScreen /> },
      { path: "collection", element: <CollectionScreen /> },
      { path: "characters/:characterId/chat", element: <ChatScreen /> },
      { path: "characters/:characterId/challenge", element: <ChallengeScreen /> },
      { path: "leaderboard", element: <LeaderboardScreen /> },
      { path: "profile", element: <ProfileScreen /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
];
