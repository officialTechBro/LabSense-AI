"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FilePlus, TrendingUp, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mock-data";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Report", href: "/dashboard/new", icon: FilePlus },
  { label: "Trends", href: "/dashboard/trends", icon: TrendingUp },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[220px] flex-col border-r bg-background shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm select-none">
          LS
        </div>
        <span className="font-semibold text-foreground">LabSense</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              pathname === href
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="flex items-center gap-2.5 border-t px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground select-none shrink-0">
          {mockUser.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span className="flex-1 truncate text-sm text-foreground">
          {mockUser.name}
        </span>
        <Settings className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
    </aside>
  );
}
