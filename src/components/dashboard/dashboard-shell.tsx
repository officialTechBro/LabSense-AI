"use client";

import { useState } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import type {
  SidebarReportData,
  SidebarRecommendation,
  SidebarUserData,
} from "@/lib/db/dashboard";

interface DashboardShellProps {
  children: React.ReactNode;
  recentReports: SidebarReportData[];
  topRecommendations: SidebarRecommendation[];
  user: SidebarUserData | null;
}

export function DashboardShell({
  children,
  recentReports,
  topRecommendations,
  user,
}: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        recentReports={recentReports}
        topRecommendations={topRecommendations}
        user={user}
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
