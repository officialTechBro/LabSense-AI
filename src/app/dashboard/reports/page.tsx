import { mockReports } from "@/lib/mock-data";
import { ReportsInteractive } from "@/components/dashboard/reports-interactive";

export default function ReportsPage() {
  const total = mockReports.length;
  const flagged = mockReports.filter((r) => r.overallStatus === "flagged").length;
  const borderline = mockReports.filter((r) => r.overallStatus === "borderline").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">All Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {total} report{total !== 1 ? "s" : ""} &middot; {borderline} borderline &middot; {flagged} flagged
          </p>
        </div>
      </div>

      {/* Reports grid */}
      <ReportsInteractive />
    </div>
  );
}
