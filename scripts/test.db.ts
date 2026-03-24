import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  // Create a test user
  const user = await prisma.user.create({
    data: {
      email: "test@labsense.ai",
      name: "Test User",
    },
  });
  console.log("✓ Created user:", user.id);

  // Create a test report with results and recommendations
  const report = await prisma.report.create({
    data: {
      title: "Test Report",
      overallStatus: "borderline",
      normalCount: 2,
      borderlineCount: 1,
      flaggedCount: 0,
      aiSummary: "This is a test AI summary.",
      otcRecommendations: ["Drink more water.", "Exercise regularly."],
      uploadedBy: user.id,
      results: {
        create: [
          {
            testName: "Hemoglobin",
            value: "14.2",
            unit: "g/dL",
            referenceRange: "13.5 – 17.5 g/dL",
            status: "normal",
          },
          {
            testName: "LDL Cholesterol",
            value: "128",
            unit: "mg/dL",
            referenceRange: "< 100 mg/dL",
            status: "borderline",
          },
        ],
      },
      recommendations: {
        create: [
          {
            title: "LDL Cholesterol Borderline",
            description: "Consider dietary changes to reduce LDL.",
            priority: "warning",
          },
        ],
      },
    },
    include: { results: true, recommendations: true },
  });
  console.log("✓ Created report:", report.id);
  console.log("  Results:", report.results.length);
  console.log("  Recommendations:", report.recommendations.length);

  // Read back the user with reports
  const fetched = await prisma.user.findUnique({
    where: { email: "test@labsense.ai" },
    include: { reports: true },
  });
  console.log("✓ Fetched user with reports:", fetched?.reports.length);

  // Clean up
  await prisma.report.delete({ where: { id: report.id } });
  await prisma.user.delete({ where: { id: user.id } });
  console.log("\n✓ Cleanup complete — all test records deleted");

  console.log("\nDatabase connection test passed.");
}

main()
  .catch((err) => {
    console.error("Database test failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
