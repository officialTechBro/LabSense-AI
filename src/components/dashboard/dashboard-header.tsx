"use client";

import { Bell, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export function DashboardHeader() {
  const today = new Date();

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-3 shrink-0">
      <span className="text-sm text-muted-foreground">{formatDate(today)}</span>
      <div className="flex items-center gap-1">
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
