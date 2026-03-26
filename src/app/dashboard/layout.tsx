import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  getRecentReports,
  getTopRecommendations,
  getDemoUser,
} from "@/lib/db/dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentReports, topRecommendations, user] = await Promise.all([
    getRecentReports(),
    getTopRecommendations(),
    getDemoUser(),
  ]);

  return (
    <DashboardShell
      recentReports={recentReports}
      topRecommendations={topRecommendations}
      user={user}
    >
      {children}
    </DashboardShell>
  );
}
