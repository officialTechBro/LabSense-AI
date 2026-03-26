import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Printer, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { getReportById } from "@/lib/db/reports";

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

const overallStatusClass: Record<string, string> = {
  normal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  borderline: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  flagged: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const overallStatusLabel: Record<string, string> = {
  normal: "Normal",
  borderline: "Borderline",
  flagged: "Needs Attention",
};

const priorityIcon = {
  urgent: <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />,
  warning: <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />,
  info: <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />,
};

const priorityBadgeClass: Record<string, string> = {
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ReportDetailPage({ params }: Props) {
  const { id } = await params;
  const report = await getReportById(id);

  if (!report) notFound();

  const normalResults = report.results.filter((r) => r.status === "normal");
  const abnormalResults = report.results.filter((r) => r.status !== "normal");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back link + header */}
      <div>
        <Link
          href="/dashboard/reports"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={15} />
          Back to Reports
        </Link>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-foreground">{report.title}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{report.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${overallStatusClass[report.overallStatus]}`}>
              {overallStatusLabel[report.overallStatus]}
            </span>
            <button className="flex items-center gap-1.5 rounded-lg border border-border hover:bg-muted text-foreground text-sm font-medium px-3 py-1.5 transition-colors">
              <Download size={14} />
              Export
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-border hover:bg-muted text-foreground text-sm font-medium px-3 py-1.5 transition-colors">
              <Printer size={14} />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Summary counters */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card px-4 py-4 text-center">
          <p className="text-3xl font-bold text-foreground">{report.normalCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Normal</p>
        </div>
        <div className="rounded-xl border border-border bg-amber-50 dark:bg-amber-900/10 px-4 py-4 text-center">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{report.borderlineCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Borderline</p>
        </div>
        <div className="rounded-xl border border-border bg-red-50 dark:bg-red-900/10 px-4 py-4 text-center">
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{report.flaggedCount}</p>
          <p className="text-sm text-muted-foreground mt-1">Flagged</p>
        </div>
      </div>

      {/* AI Summary — comprehensive */}
      {report.aiSummary && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <h2 className="font-semibold text-foreground">AI Summary</h2>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{report.aiSummary}</p>

          {/* OTC Recommendations inline */}
          {report.otcRecommendations.length > 0 && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Over-the-Counter &amp; Lifestyle Suggestions
              </p>
              <ul className="space-y-2">
                {report.otcRecommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {report.aiRecommendations.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Recommendations</h2>
          <div className="space-y-3">
            {report.aiRecommendations.map((rec) => (
              <div key={rec.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/40 border border-border">
                {priorityIcon[rec.priority]}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground">{rec.title}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityBadgeClass[rec.priority]}`}>
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Abnormal results */}
      {abnormalResults.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Results Needing Attention</h2>
          <div className="space-y-3">
            {abnormalResults.map((result) => (
              <div key={result.id} className="rounded-lg border border-border bg-background px-4 py-3">
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
                <p className="text-xs text-muted-foreground mt-0.5">Reference range: {result.referenceRange}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All lab results */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-semibold text-foreground">
          All Lab Results
          <span className="ml-2 text-sm font-normal text-muted-foreground">({report.results.length} tests)</span>
        </h2>
        <div className="space-y-3">
          {report.results.map((result) => (
            <div key={result.id} className="rounded-lg border border-border bg-background px-4 py-3">
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
              <p className="text-xs text-muted-foreground mt-0.5">Reference range: {result.referenceRange}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Normal results summary (collapsed view) */}
      {normalResults.length > 0 && (
        <p className="text-xs text-muted-foreground text-center pb-4">
          {normalResults.length} result{normalResults.length !== 1 ? "s" : ""} within normal range
        </p>
      )}
    </div>
  );
}
