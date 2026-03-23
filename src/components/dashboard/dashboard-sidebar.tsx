"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FilePlus, TrendingUp, FileText, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "New Report", href: "/dashboard/new", icon: FilePlus },
  { label: "Trends", href: "/dashboard/trends", icon: TrendingUp },
];

interface DashboardSidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const userInitials = mockUser.name
  .split(" ")
  .map((n) => n[0])
  .join("");

function SidebarContent({
  isCollapsed,
  onClose,
  showClose,
}: {
  isCollapsed: boolean;
  onClose?: () => void;
  showClose?: boolean;
}) {
  const pathname = usePathname();

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
      <nav className="flex-1 px-2 py-2 space-y-0.5">
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

      {/* User */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-t px-4 py-4 shrink-0",
          isCollapsed && "justify-center px-2"
        )}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground select-none shrink-0">
          {userInitials}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {mockUser.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {mockUser.email}
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
        <SidebarContent isCollapsed={isCollapsed} />
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
        <SidebarContent isCollapsed={false} onClose={onMobileClose} showClose />
      </aside>
    </>
  );
}
