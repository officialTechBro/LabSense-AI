"use client";

import { useState } from "react";
import { type ReportData } from "@/lib/db/reports";
import ReportDrawer from "./report-drawer";

const reportStatusClass: Record<string, string> = {
  normal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  borderline: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  flagged: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const reportStatusLabel: Record<string, string> = {
  normal: "Normal",
  borderline: "Borderline",
  flagged: "Flagged",
};

function ReportCard({ report, onView }: { report: ReportData; onView: (r: ReportData) => void }) {
  return (
    <div
      onClick={() => onView(report)}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3 cursor-pointer hover:border-emerald-500/50 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-foreground text-sm leading-tight">{report.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{report.date}</p>
        </div>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${reportStatusClass[report.overallStatus]}`}>
          {reportStatusLabel[report.overallStatus]}
        </span>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-muted/50 px-2 py-1.5 text-center">
          <p className="text-lg font-bold text-foreground">{report.normalCount}</p>
          <p className="text-xs text-muted-foreground">Normal</p>
        </div>
        <div className="flex-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-2 py-1.5 text-center">
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{report.borderlineCount}</p>
          <p className="text-xs text-muted-foreground">Borderline</p>
        </div>
        <div className="flex-1 rounded-lg bg-red-50 dark:bg-red-900/20 px-2 py-1.5 text-center">
          <p className="text-lg font-bold text-red-600 dark:text-red-400">{report.flaggedCount}</p>
          <p className="text-xs text-muted-foreground">Flagged</p>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button className="flex-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 transition-colors">
          View
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex-1 rounded-lg border border-border hover:bg-muted text-foreground text-sm font-medium py-2 transition-colors"
        >
          Export
        </button>
      </div>
    </div>
  );
}

type Props = {
  reports: ReportData[];
};

export function ReportsInteractive({ reports }: Props) {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} onView={setSelectedReport} />
        ))}
      </div>
      <ReportDrawer report={selectedReport} onClose={() => setSelectedReport(null)} />
    </>
  );
}
