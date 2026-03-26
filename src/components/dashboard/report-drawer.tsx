"use client";

import { useState } from "react";
import { X, Download, Printer, ChevronDown } from "lucide-react";
import { ReportData } from "@/lib/db/reports";

type Props = {
  report: ReportData | null;
  onClose: () => void;
};

const statusLabel: Record<string, string> = {
  normal: "Normal",
  borderline: "Borderline",
  high: "High",
  low: "Low",
  flagged: "Flagged",
};

const statusClass: Record<string, string> = {
  normal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  borderline: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  flagged: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

export default function ReportDrawer({ report, onClose }: Props) {
  const [otcOpen, setOtcOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${report ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${report ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground text-lg leading-tight">
              {report?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{report?.date}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors ml-4 mt-0.5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Summary counters */}
        <div className="px-6 py-4 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Summary</p>
          <div className="flex gap-3">
            <div className="flex-1 rounded-lg bg-muted/50 px-3 py-2 text-center">
              <p className="text-2xl font-bold text-foreground">{report?.normalCount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Normal</p>
            </div>
            <div className="flex-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-center">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{report?.borderlineCount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Borderline</p>
            </div>
            <div className="flex-1 rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-2 text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{report?.flaggedCount}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Flagged</p>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* AI Summary */}
          {report?.aiSummary && (
            <div className="px-6 py-4 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">AI Summary</p>
              <p className="text-sm text-foreground leading-relaxed">{report.aiSummary}</p>

              {/* OTC Recommendations — collapsible */}
              {report.otcRecommendations?.length > 0 && (
                <div className="mt-3">
                  <button
                    onClick={() => setOtcOpen((o) => !o)}
                    className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${otcOpen ? "rotate-180" : ""}`}
                    />
                    {otcOpen ? "Hide" : "Show"} OTC Recommendations
                  </button>
                  {otcOpen && (
                    <ul className="mt-2 space-y-1.5">
                      {report.otcRecommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Lab results list */}
          <div className="px-6 py-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Lab Results</p>
            {report?.results.map((result) => (
              <div key={result.id} className="rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{result.testName}</p>
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${statusClass[result.status]}`}>
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

        {/* Actions */}
        <div className="px-6 py-4 border-t border-border space-y-2">
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2.5 transition-colors">
            <Download size={16} />
            Download PDF
          </button>
          <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-border hover:bg-muted text-foreground text-sm font-medium px-4 py-2.5 transition-colors">
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>
    </>
  );
}
