/**
 * AppShell — authenticated layout with sidebar, topbar, and mobile nav.
 *
 * Pattern: composition layout wrapping <Outlet /> from React Router.
 */

import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileNav } from "./mobile-nav";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-page-margin">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
