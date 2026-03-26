import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching demo seed data...\n");

  // ─── User ──────────────────────────────────────────────────────────────────

  const user = await prisma.user.findUnique({
    where: { email: "demo@labsense.ai" },
    include: {
      reports: {
        include: {
          results: true,
          recommendations: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    console.error("✗ Demo user not found. Run `npx prisma db seed` first.");
    process.exit(1);
  }

  console.log("─── User ───────────────────────────────────────────────────");
  console.log(`  Name          : ${user.name}`);
  console.log(`  Email         : ${user.email}`);
  console.log(`  isPro         : ${user.isPro}`);
  console.log(`  emailVerified : ${user.emailVerified}`);
  console.log(`  Password hash : ${user.password ? "✓ present" : "✗ missing"}`);
  console.log(`  Reports       : ${user.reports.length}`);

  // ─── Reports ───────────────────────────────────────────────────────────────

  for (const report of user.reports) {
    console.log("\n─── Report ─────────────────────────────────────────────────");
    console.log(`  Title           : ${report.title}`);
    console.log(`  Date            : ${report.createdAt.toDateString()}`);
    console.log(`  Overall Status  : ${report.overallStatus}`);
    console.log(`  Normal          : ${report.normalCount}`);
    console.log(`  Borderline      : ${report.borderlineCount}`);
    console.log(`  Flagged         : ${report.flaggedCount}`);
    console.log(`  AI Summary      : ${report.aiSummary}`);
    console.log(
      `  OTC Recs        : ${(report.otcRecommendations as string[]).length} items`
    );

    console.log(`\n  Lab Results (${report.results.length}):`);
    for (const r of report.results) {
      const flag =
        r.status === "normal"
          ? "✓"
          : r.status === "borderline"
            ? "⚠"
            : "✗";
      console.log(
        `    ${flag} ${r.testName.padEnd(25)} ${r.value} ${r.unit ?? ""} [${r.referenceRange ?? "—"}] — ${r.status}`
      );
    }

    console.log(`\n  Recommendations (${report.recommendations.length}):`);
    for (const rec of report.recommendations) {
      const icon =
        rec.priority === "urgent" ? "🚨" : rec.priority === "warning" ? "⚠" : "ℹ";
      console.log(`    ${icon} [${rec.priority}] ${rec.title}`);
      console.log(`       ${rec.description}`);
    }
  }

  // ─── Summary ───────────────────────────────────────────────────────────────

  const totalResults = user.reports.reduce(
    (sum, r) => sum + r.results.length,
    0
  );
  const totalRecs = user.reports.reduce(
    (sum, r) => sum + r.recommendations.length,
    0
  );

  console.log("\n─── Summary ────────────────────────────────────────────────");
  console.log(`  Total reports      : ${user.reports.length}`);
  console.log(`  Total lab results  : ${totalResults}`);
  console.log(`  Total recs         : ${totalRecs}`);
  console.log(`  Last report date   : ${user.reports[0]?.createdAt.toDateString()}`);
  console.log("\n✓ All demo data verified successfully.");
}

main()
  .catch((err) => {
    console.error("Test failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
