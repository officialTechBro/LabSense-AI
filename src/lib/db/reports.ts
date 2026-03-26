import { prisma } from "@/lib/prisma";

// ─── Types ───────────────────────────────────────────────────────────────────

export type LabResultStatus = "normal" | "borderline" | "high" | "low" | "flagged";

export type LabResultData = {
  id: string;
  testName: string;
  value: string;
  unit: string | null;
  referenceRange: string | null;
  status: LabResultStatus;
};

export type RecommendationData = {
  id: string;
  title: string;
  description: string;
  priority: "info" | "warning" | "urgent";
};

export type ReportData = {
  id: string;
  title: string;
  date: string;
  overallStatus: "normal" | "borderline" | "flagged";
  normalCount: number;
  borderlineCount: number;
  flaggedCount: number;
  aiSummary: string | null;
  otcRecommendations: string[];
  aiRecommendations: RecommendationData[];
  results: LabResultData[];
};

export type DashboardStats = {
  totalReports: number;
  newThisMonth: number;
  overallStatus: string;
  overallStatusNote: string;
  itemsToReview: number;
  itemsToReviewNote: string;
  lastReportDate: string;
  lastReportTitle: string;
};

export type HealthMetric = {
  name: string;
  result: LabResultData;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

const PRIORITY_ORDER: Record<string, number> = { urgent: 0, warning: 1, info: 2 };

// ─── Queries ──────────────────────────────────────────────────────────────────

// TODO: Accept userId from NextAuth session once auth is implemented.
// Currently returns all reports (single demo user in seed data).

export async function getReports(): Promise<ReportData[]> {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { results: true, recommendations: true },
  });

  return reports.map((r) => ({
    id: r.id,
    title: r.title ?? "Untitled Report",
    date: formatDate(r.createdAt),
    overallStatus: r.overallStatus as ReportData["overallStatus"],
    normalCount: r.normalCount,
    borderlineCount: r.borderlineCount,
    flaggedCount: r.flaggedCount,
    aiSummary: r.aiSummary,
    otcRecommendations: Array.isArray(r.otcRecommendations)
      ? (r.otcRecommendations as string[])
      : [],
    aiRecommendations: r.recommendations.map((rec) => ({
      id: rec.id,
      title: rec.title,
      description: rec.description,
      priority: rec.priority as RecommendationData["priority"],
    })),
    results: r.results.map((res) => ({
      id: res.id,
      testName: res.testName,
      value: res.value,
      unit: res.unit,
      referenceRange: res.referenceRange,
      status: res.status as LabResultStatus,
    })),
  }));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      overallStatus: true,
      borderlineCount: true,
      flaggedCount: true,
      createdAt: true,
      title: true,
    },
  });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalReports = reports.length;
  const newThisMonth = reports.filter((r) => r.createdAt >= startOfMonth).length;
  const itemsToReview = reports.reduce(
    (sum, r) => sum + r.borderlineCount + r.flaggedCount,
    0,
  );

  const hasFlagged = reports.some((r) => r.overallStatus === "flagged");
  const hasBorderline = reports.some((r) => r.overallStatus === "borderline");
  const overallStatus = hasFlagged
    ? "Needs Attention"
    : hasBorderline
      ? "Borderline"
      : "Good";
  const overallStatusNote = hasFlagged
    ? "Review required"
    : hasBorderline
      ? "Some borderline values"
      : "Most results normal";

  const latest = reports[0];

  return {
    totalReports,
    newThisMonth,
    overallStatus,
    overallStatusNote,
    itemsToReview,
    itemsToReviewNote: "Borderline or flagged",
    lastReportDate: latest ? formatShortDate(latest.createdAt) : "—",
    lastReportTitle: latest?.title ?? "—",
  };
}

const KEY_METRICS = [
  "LDL Cholesterol",
  "HDL Cholesterol",
  "Glucose (Fasting)",
  "Triglycerides",
  "Hemoglobin",
  "TSH",
];

export async function getHealthMetrics(): Promise<HealthMetric[]> {
  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { results: true },
  });

  const metrics: HealthMetric[] = [];

  for (const metricName of KEY_METRICS) {
    for (const report of reports) {
      const result = report.results.find((r) => r.testName === metricName);
      if (result) {
        metrics.push({
          name: metricName,
          result: {
            id: result.id,
            testName: result.testName,
            value: result.value,
            unit: result.unit,
            referenceRange: result.referenceRange,
            status: result.status as LabResultStatus,
          },
        });
        break;
      }
    }
  }

  return metrics;
}

export async function getReportById(id: string): Promise<ReportData | null> {
  const r = await prisma.report.findUnique({
    where: { id },
    include: { results: true, recommendations: true },
  });

  if (!r) return null;

  return {
    id: r.id,
    title: r.title ?? "Untitled Report",
    date: formatDate(r.createdAt),
    overallStatus: r.overallStatus as ReportData["overallStatus"],
    normalCount: r.normalCount,
    borderlineCount: r.borderlineCount,
    flaggedCount: r.flaggedCount,
    aiSummary: r.aiSummary,
    otcRecommendations: Array.isArray(r.otcRecommendations)
      ? (r.otcRecommendations as string[])
      : [],
    aiRecommendations: r.recommendations
      .sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3))
      .map((rec) => ({
        id: rec.id,
        title: rec.title,
        description: rec.description,
        priority: rec.priority as RecommendationData["priority"],
      })),
    results: r.results.map((res) => ({
      id: res.id,
      testName: res.testName,
      value: res.value,
      unit: res.unit,
      referenceRange: res.referenceRange,
      status: res.status as LabResultStatus,
    })),
  };
}

export async function getRecommendations(): Promise<RecommendationData[]> {
  const recs = await prisma.recommendation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return recs
    .sort(
      (a, b) =>
        (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3),
    )
    .map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      priority: r.priority as RecommendationData["priority"],
    }));
}
