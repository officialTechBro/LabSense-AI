"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus,
  TrendingUp,
  FileText,
  Settings,
  X,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type {
  SidebarReportData,
  SidebarRecommendation,
  SidebarUserData,
} from "@/lib/db/dashboard";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "New Report", href: "/dashboard/new", icon: FilePlus },
  { label: "Trends", href: "/dashboard/trends", icon: TrendingUp },
];

const statusDot: Record<string, string> = {
  normal: "bg-emerald-500",
  borderline: "bg-amber-400",
  flagged: "bg-red-500",
};

const recIcon = {
  warning: <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />,
  info: <Info className="h-3 w-3 text-blue-500 shrink-0" />,
  urgent: <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />,
};

function getInitials(name: string | null, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  return email[0].toUpperCase();
}

interface DashboardSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  recentReports: SidebarReportData[];
  topRecommendations: SidebarRecommendation[];
  user: SidebarUserData | null;
}

function SidebarContent({
  isCollapsed,
  onClose,
  showClose,
  recentReports,
  topRecommendations,
  user,
}: {
  isCollapsed: boolean;
  onClose?: () => void;
  showClose?: boolean;
  recentReports: SidebarReportData[];
  topRecommendations: SidebarRecommendation[];
  user: SidebarUserData | null;
}) {
  const pathname = usePathname();
  const initials = user ? getInitials(user.name, user.email) : "?";

  return (
    <div className="flex h-full flex-col bg-background border-r">
      {/* Brand */}
      <div
        className={cn(
          "flex items-center gap-2.5 px-4 py-5 shrink-0",
          isCollapsed && "justify-center px-2"
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm select-none shrink-0">
          LS
        </div>
        {!isCollapsed && (
          <span className="font-semibold text-foreground">LabSense</span>
        )}
        {showClose && (
          <button
            onClick={onClose}
            className="ml-auto text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="px-2 py-2 space-y-0.5 shrink-0">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              isCollapsed && "justify-center px-2",
              pathname === href
                ? "bg-emerald-50 text-emerald-700 font-medium dark:bg-emerald-600/15 dark:text-emerald-400"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={isCollapsed ? label : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!isCollapsed && label}
          </Link>
        ))}
      </nav>

      {/* Recent Reports */}
      {!isCollapsed && recentReports.length > 0 && (
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1 min-h-0">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Recent Reports
          </p>
          {recentReports.map((report) => (
            <Link
              key={report.id}
              href="/dashboard/reports"
              className="flex items-start gap-2.5 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted group"
            >
              <span
                className={cn(
                  "mt-1.5 h-2 w-2 rounded-full shrink-0",
                  statusDot[report.overallStatus] ?? "bg-muted-foreground"
                )}
              />
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground group-hover:text-foreground leading-tight">
                  {report.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{report.date}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Recommendations Preview */}
      {!isCollapsed && topRecommendations.length > 0 && (
        <div className="px-2 py-3 border-t space-y-1 shrink-0">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Top Recommendations
          </p>
          {topRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex items-start gap-2 rounded-md px-3 py-1.5"
            >
              {recIcon[rec.priority]}
              <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                {rec.title}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* User */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-t px-4 py-4 shrink-0",
          isCollapsed && "justify-center px-2"
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground select-none shrink-0">
          {initials}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-medium text-foreground">
                {user?.name ?? user?.email ?? "—"}
              </p>
              {user?.isPro && (
                <Badge className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 h-auto shrink-0">
                  PRO
                </Badge>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email ?? ""}
            </p>
          </div>
        )}
        {!isCollapsed && (
          <Settings className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </div>
    </div>
  );
}

export function DashboardSidebar({
  isCollapsed,
  isMobileOpen,
  onMobileClose,
  recentReports,
  topRecommendations,
  user,
}: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col shrink-0 transition-all duration-200",
          isCollapsed ? "w-15" : "w-55"
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          recentReports={recentReports}
          topRecommendations={topRecommendations}
          user={user}
        />
      </aside>

      {/* Mobile drawer overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-55 flex flex-col md:hidden transition-transform duration-200",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          isCollapsed={false}
          onClose={onMobileClose}
          showClose
          recentReports={recentReports}
          topRecommendations={topRecommendations}
          user={user}
        />
      </aside>
    </>
  );
}
