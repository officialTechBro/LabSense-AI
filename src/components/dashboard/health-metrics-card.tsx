"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { LabResult, LabResultStatus } from "@/lib/mock-data";

const statusClass: Record<LabResultStatus, string> = {
  normal: "text-emerald-600 dark:text-emerald-400",
  borderline: "text-amber-600 dark:text-amber-400",
  high: "text-red-600 dark:text-red-400",
  low: "text-blue-600 dark:text-blue-400",
  flagged: "text-red-600 dark:text-red-400",
};

const statusBadgeClass: Record<LabResultStatus, string> = {
  normal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  borderline: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  flagged: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const statusLabel: Record<LabResultStatus, string> = {
  normal: "Normal",
  borderline: "Borderline",
  high: "High",
  low: "Low",
  flagged: "Flagged",
};

const PREVIEW_COUNT = 4;

type Metric = { name: string; result: LabResult };

type Props = {
  metrics: Metric[];
};

export function HealthMetricsCard({ metrics }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const preview = metrics.slice(0, PREVIEW_COUNT);
  const hasMore = metrics.length > PREVIEW_COUNT;

  return (
    <>
      {/* Card */}
      <div className="rounded-xl border border-border bg-card p-5 h-full flex flex-col">
        <h2 className="font-semibold text-foreground">Health Metrics</h2>
        <p className="text-xs text-muted-foreground mt-0.5 mb-3">Latest values from lab results</p>

        <div className="flex-1 space-y-2">
          {preview.map(({ name, result }) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
            >
              <p className="text-xs text-muted-foreground">{name}</p>
              <p className={`text-sm font-semibold ${statusClass[result.status]}`}>
                {result.value}{" "}
                <span className="text-xs font-normal text-muted-foreground">{result.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 hover:underline self-start transition-colors"
          >
            View All ({metrics.length})
          </button>
        )}
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-background shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground text-lg">All Health Metrics</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Latest values from lab results</p>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors ml-4"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {metrics.map(({ name, result }) => (
            <div key={name} className="rounded-lg border border-border bg-card px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{name}</p>
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusBadgeClass[result.status]}`}>
                  {statusLabel[result.status]}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mt-1">
                {result.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">{result.unit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Range: {result.referenceRange}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
