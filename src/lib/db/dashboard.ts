import { prisma } from "@/lib/prisma";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SidebarReportData = {
  id: string;
  title: string;
  overallStatus: "normal" | "borderline" | "flagged";
  date: string;
};

export type SidebarHealthMetric = {
  name: string;
  value: string;
  unit: string | null;
  status: string;
};

export type SidebarRecommendation = {
  id: string;
  title: string;
  priority: "info" | "warning" | "urgent";
};

export type SidebarUserData = {
  name: string | null;
  email: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PRIORITY_ORDER: Record<string, number> = { urgent: 0, warning: 1, info: 2 };

const SIDEBAR_METRICS = ["Blood Pressure", "Heart Rate", "BMI", "Glucose (Fasting)"];

// ─── Queries ──────────────────────────────────────────────────────────────────

// TODO: Accept userId from NextAuth session once auth is wired up.
// Currently scoped to all reports (single demo user in seed data).

export async function getRecentReports(userId?: string): Promise<SidebarReportData[]> {
  const reports = await prisma.report.findMany({
    where: userId ? { uploadedBy: userId } : undefined,
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, overallStatus: true, createdAt: true },
  });

  return reports.map((r) => ({
    id: r.id,
    title: r.title ?? "Untitled Report",
    overallStatus: r.overallStatus as SidebarReportData["overallStatus"],
    date: formatShortDate(r.createdAt),
  }));
}

export async function getLatestHealthMetrics(userId?: string): Promise<SidebarHealthMetric[]> {
  const report = await prisma.report.findFirst({
    where: userId ? { uploadedBy: userId } : undefined,
    orderBy: { createdAt: "desc" },
    include: { results: true },
  });

  if (!report) return [];

  const metrics: SidebarHealthMetric[] = [];
  for (const name of SIDEBAR_METRICS) {
    const result = report.results.find((r) => r.testName === name);
    if (result) {
      metrics.push({
        name,
        value: result.value,
        unit: result.unit,
        status: result.status,
      });
    }
  }
  return metrics;
}

export async function getTopRecommendations(userId?: string): Promise<SidebarRecommendation[]> {
  const recs = await prisma.recommendation.findMany({
    where: userId ? { report: { uploadedBy: userId } } : undefined,
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { id: true, title: true, priority: true },
  });

  return recs
    .sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 3) - (PRIORITY_ORDER[b.priority] ?? 3))
    .slice(0, 3)
    .map((r) => ({
      id: r.id,
      title: r.title,
      priority: r.priority as SidebarRecommendation["priority"],
    }));
}

export async function getDemoUser(): Promise<SidebarUserData | null> {
  const user = await prisma.user.findFirst({
    select: { name: true, email: true },
  });
  return user;
}
