"use client";

import { useState } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          onMobileMenuToggle={() => setIsMobileOpen((o) => !o)}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((c) => !c)}
        />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
