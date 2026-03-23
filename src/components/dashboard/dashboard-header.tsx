"use client";

import { Bell, MoreHorizontal, Menu, Sun, Moon, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function DashboardHeader({ onMobileMenuToggle, onToggleCollapse }: DashboardHeaderProps) {
  const today = new Date();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-3 shrink-0">
      <div className="flex items-center gap-2">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
        {/* Desktop sidebar collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex"
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">{formatDate(today)}</span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
