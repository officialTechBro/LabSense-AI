import {
  FileText,
  Activity,
  ClipboardList,
  CalendarDays,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";
import {
  getDashboardStats,
  getHealthMetrics,
  getRecommendations,
  getReports,
  type RecommendationData,
} from "@/lib/db/reports";
import { LabTrendCharts } from "@/components/dashboard/lab-trend-charts";
import { ReportsInteractive } from "@/components/dashboard/reports-interactive";
import { HealthMetricsCard } from "@/components/dashboard/health-metrics-card";

const recIcon = {
  warning: <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />,
  info: <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />,
  urgent: <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />,
};

const recBorder = {
  warning: "border-l-amber-400",
  info: "border-l-blue-400",
  urgent: "border-l-red-400",
};

function SummaryCard({
  icon,
  label,
  value,
  sub,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
  iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4 flex items-center gap-4">
      <div className={`rounded-full p-3 ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground leading-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function RecommendationItem({ rec }: { rec: RecommendationData }) {
  return (
    <div
      className={`rounded-xl border border-border border-l-4 ${recBorder[rec.priority]} bg-card px-5 py-4 flex gap-3`}
    >
      {recIcon[rec.priority]}
      <div>
        <p className="text-sm font-semibold text-foreground">{rec.title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{rec.description}</p>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const [stats, metrics, recommendations, reports] = await Promise.all([
    getDashboardStats(),
    getHealthMetrics(),
    getRecommendations(),
    getReports(),
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<FileText size={20} className="text-emerald-600" />}
          iconBg="bg-emerald-100 dark:bg-emerald-900/40"
          label="Total Reports"
          value={stats.totalReports}
          sub={`+${stats.newThisMonth} this month`}
        />
        <SummaryCard
          icon={<Activity size={20} className="text-blue-600" />}
          iconBg="bg-blue-100 dark:bg-blue-900/40"
          label="Overall Status"
          value={stats.overallStatus}
          sub={stats.overallStatusNote}
        />
        <SummaryCard
          icon={<ClipboardList size={20} className="text-amber-600" />}
          iconBg="bg-amber-100 dark:bg-amber-900/40"
          label="Items to Review"
          value={stats.itemsToReview}
          sub={stats.itemsToReviewNote}
        />
        <SummaryCard
          icon={<CalendarDays size={20} className="text-purple-600" />}
          iconBg="bg-purple-100 dark:bg-purple-900/40"
          label="Last Report"
          value={stats.lastReportDate}
          sub={stats.lastReportTitle}
        />
      </div>

      {/* Charts + Health metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LabTrendCharts reports={reports} />
        </div>
        <HealthMetricsCard metrics={metrics} />
      </div>

      {/* Recent reports */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Recent Reports</h2>
          <button className="text-sm text-emerald-600 hover:underline">View All</button>
        </div>
        <ReportsInteractive reports={reports} />
      </div>

      {/* Health recommendations */}
      <div>
        <h2 className="font-semibold text-foreground mb-3">Health Recommendations</h2>
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <RecommendationItem key={rec.id} rec={rec} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
}
