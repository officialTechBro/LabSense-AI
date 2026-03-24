import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...\n");

  // ─── User ──────────────────────────────────────────────────────────────────

  const user = await prisma.user.upsert({
    where: { email: "john.doe@labsense.ai" },
    update: {},
    create: {
      name: "John Doe",
      email: "john.doe@labsense.ai",
      isPro: false,
    },
  });
  console.log("✓ User:", user.email);

  // ─── Report 1 — Annual Physical ────────────────────────────────────────────

  const report1 = await prisma.report.upsert({
    where: { id: "seed_report_1" },
    update: {},
    create: {
      id: "seed_report_1",
      title: "Annual Physical - 2025",
      overallStatus: "borderline",
      normalCount: 10,
      borderlineCount: 1,
      flaggedCount: 1,
      aiSummary:
        "Most of your results are within normal range. Your cholesterol is slightly elevated and your fasting glucose is above the recommended threshold — both worth discussing with your doctor.",
      otcRecommendations: [
        "Consider a Vitamin D3 supplement (1,000–2,000 IU/day) to address low Vitamin D levels.",
        "Reduce saturated fat intake to help lower LDL cholesterol.",
        "Aim for 30 minutes of moderate exercise at least 5 days a week.",
        "Limit refined carbohydrates and sugary drinks to help manage fasting glucose.",
        "Monitor blood pressure weekly using a home cuff.",
      ],
      uploadedBy: user.id,
      createdAt: new Date("2025-03-15"),
      results: {
        create: [
          {
            testName: "Red Blood Cell Count",
            value: "4.8",
            unit: "M/uL",
            referenceRange: "4.5 – 5.5 M/uL",
            status: "normal",
            explanation: "Your red blood cell count is within the healthy range, indicating good oxygen-carrying capacity.",
          },
          {
            testName: "Hemoglobin",
            value: "14.2",
            unit: "g/dL",
            referenceRange: "13.5 – 17.5 g/dL",
            status: "normal",
            explanation: "Hemoglobin levels are normal, suggesting no signs of anemia.",
          },
          {
            testName: "Cholesterol Total",
            value: "185",
            unit: "mg/dL",
            referenceRange: "< 200 mg/dL",
            status: "normal",
            explanation: "Total cholesterol is within the desirable range.",
          },
          {
            testName: "Glucose (Fasting)",
            value: "102",
            unit: "mg/dL",
            referenceRange: "70 – 99 mg/dL",
            status: "high",
            explanation: "Fasting glucose is slightly above the normal range, which may indicate early insulin resistance or prediabetes.",
          },
          {
            testName: "TSH",
            value: "2.1",
            unit: "mIU/L",
            referenceRange: "0.4 – 4.0 mIU/L",
            status: "normal",
            explanation: "Thyroid-stimulating hormone is normal, indicating healthy thyroid function.",
          },
          {
            testName: "Calcium",
            value: "8.6",
            unit: "mg/dL",
            referenceRange: "8.5 – 10.5 mg/dL",
            status: "normal",
            explanation: "Calcium levels are within the normal range, supporting healthy bones and nerve function.",
          },
          {
            testName: "Potassium",
            value: "4.2",
            unit: "mEq/L",
            referenceRange: "3.5 – 5.0 mEq/L",
            status: "normal",
            explanation: "Potassium is normal, indicating proper muscle and heart function.",
          },
          {
            testName: "Vitamin D",
            value: "18",
            unit: "ng/mL",
            referenceRange: "20 – 50 ng/mL",
            status: "low",
            explanation: "Vitamin D is below the recommended range. This is common and can affect bone health and immune function.",
          },
          {
            testName: "LDL Cholesterol",
            value: "128",
            unit: "mg/dL",
            referenceRange: "< 100 mg/dL",
            status: "borderline",
            explanation: "LDL (bad) cholesterol is above the optimal level. Dietary changes and increased activity may help.",
          },
          {
            testName: "HDL Cholesterol",
            value: "48",
            unit: "mg/dL",
            referenceRange: "> 40 mg/dL",
            status: "normal",
            explanation: "HDL (good) cholesterol is within the acceptable range.",
          },
          {
            testName: "Triglycerides",
            value: "145",
            unit: "mg/dL",
            referenceRange: "< 150 mg/dL",
            status: "normal",
            explanation: "Triglycerides are just within the normal range.",
          },
          {
            testName: "Platelet Count",
            value: "230",
            unit: "K/uL",
            referenceRange: "150 – 400 K/uL",
            status: "normal",
            explanation: "Platelet count is normal, indicating healthy blood clotting function.",
          },
        ],
      },
      recommendations: {
        create: [
          {
            title: "Elevated Fasting Glucose",
            description:
              "Your fasting glucose of 102 mg/dL is above the normal threshold. Consider discussing dietary changes and a follow-up glucose test with your doctor.",
            priority: "warning",
          },
          {
            title: "LDL Cholesterol Borderline",
            description:
              "LDL at 128 mg/dL exceeds the recommended level. A heart-healthy diet low in saturated fats may help reduce this over time.",
            priority: "warning",
          },
          {
            title: "Low Vitamin D",
            description:
              "Your Vitamin D level of 18 ng/mL is below the recommended range. Sun exposure and supplementation are commonly suggested.",
            priority: "info",
          },
        ],
      },
    },
  });
  console.log("✓ Report 1:", report1.title);

  // ─── Report 2 — Blood Work Follow-up ───────────────────────────────────────

  const report2 = await prisma.report.upsert({
    where: { id: "seed_report_2" },
    update: {},
    create: {
      id: "seed_report_2",
      title: "Blood Work - Follow-up",
      overallStatus: "borderline",
      normalCount: 6,
      borderlineCount: 2,
      flaggedCount: 0,
      aiSummary:
        "Follow-up results show some borderline values. Your LDL and fasting glucose remain slightly elevated. No urgent concerns, but continued monitoring is recommended.",
      otcRecommendations: [
        "Increase dietary fiber (oats, beans, flaxseed) to help reduce LDL over time.",
        "Consider omega-3 fish oil supplements to support cardiovascular health.",
        "Track fasting glucose at home and log readings before your next visit.",
        "Avoid late-night meals to help stabilize blood sugar levels.",
      ],
      uploadedBy: user.id,
      createdAt: new Date("2025-03-10"),
      results: {
        create: [
          {
            testName: "LDL Cholesterol",
            value: "132",
            unit: "mg/dL",
            referenceRange: "< 100 mg/dL",
            status: "borderline",
            explanation: "LDL has increased slightly since your last report.",
          },
          {
            testName: "HDL Cholesterol",
            value: "46",
            unit: "mg/dL",
            referenceRange: "> 40 mg/dL",
            status: "normal",
            explanation: "HDL cholesterol remains within the acceptable range.",
          },
          {
            testName: "Glucose (Fasting)",
            value: "105",
            unit: "mg/dL",
            referenceRange: "70 – 99 mg/dL",
            status: "borderline",
            explanation: "Fasting glucose remains above normal. Continued monitoring is advised.",
          },
          {
            testName: "Triglycerides",
            value: "140",
            unit: "mg/dL",
            referenceRange: "< 150 mg/dL",
            status: "normal",
            explanation: "Triglycerides are within the normal range.",
          },
          {
            testName: "Red Blood Cell Count",
            value: "4.9",
            unit: "M/uL",
            referenceRange: "4.5 – 5.5 M/uL",
            status: "normal",
            explanation: "Red blood cell count is healthy.",
          },
          {
            testName: "Hemoglobin",
            value: "14.5",
            unit: "g/dL",
            referenceRange: "13.5 – 17.5 g/dL",
            status: "normal",
            explanation: "Hemoglobin remains in the normal range.",
          },
          {
            testName: "Platelet Count",
            value: "220",
            unit: "K/uL",
            referenceRange: "150 – 400 K/uL",
            status: "normal",
            explanation: "Platelet count is within the healthy range.",
          },
          {
            testName: "TSH",
            value: "2.4",
            unit: "mIU/L",
            referenceRange: "0.4 – 4.0 mIU/L",
            status: "normal",
            explanation: "Thyroid function remains normal.",
          },
        ],
      },
      recommendations: {
        create: [
          {
            title: "LDL Still Elevated",
            description:
              "LDL has increased slightly to 132 mg/dL since your last report. A dietary and lifestyle review with your doctor is recommended.",
            priority: "warning",
          },
          {
            title: "Glucose Monitoring Advised",
            description:
              "Fasting glucose at 105 mg/dL remains above normal. Regular home monitoring and reduced sugar intake are advised.",
            priority: "info",
          },
        ],
      },
    },
  });
  console.log("✓ Report 2:", report2.title);

  // ─── Report 3 — Liver Function Panel ───────────────────────────────────────

  const report3 = await prisma.report.upsert({
    where: { id: "seed_report_3" },
    update: {},
    create: {
      id: "seed_report_3",
      title: "Liver Function Panel",
      overallStatus: "normal",
      normalCount: 6,
      borderlineCount: 0,
      flaggedCount: 0,
      aiSummary:
        "All liver function markers are within normal range. No concerns detected. Routine monitoring is sufficient.",
      otcRecommendations: [
        "Stay well hydrated — aim for 8 glasses of water daily to support liver function.",
        "Limit alcohol consumption to maintain healthy liver enzyme levels.",
        "Include cruciferous vegetables (broccoli, cauliflower) in your diet to support liver health.",
      ],
      uploadedBy: user.id,
      createdAt: new Date("2025-02-28"),
      results: {
        create: [
          {
            testName: "ALT",
            value: "22",
            unit: "U/L",
            referenceRange: "7 – 56 U/L",
            status: "normal",
            explanation: "Alanine aminotransferase is normal, indicating no signs of liver stress.",
          },
          {
            testName: "AST",
            value: "25",
            unit: "U/L",
            referenceRange: "10 – 40 U/L",
            status: "normal",
            explanation: "Aspartate aminotransferase is within the healthy range.",
          },
          {
            testName: "Alkaline Phosphatase",
            value: "72",
            unit: "U/L",
            referenceRange: "44 – 147 U/L",
            status: "normal",
            explanation: "Alkaline phosphatase is normal.",
          },
          {
            testName: "Total Bilirubin",
            value: "0.8",
            unit: "mg/dL",
            referenceRange: "0.1 – 1.2 mg/dL",
            status: "normal",
            explanation: "Bilirubin is within range, suggesting healthy liver processing.",
          },
          {
            testName: "Albumin",
            value: "4.2",
            unit: "g/dL",
            referenceRange: "3.5 – 5.0 g/dL",
            status: "normal",
            explanation: "Albumin is normal, reflecting good liver protein production.",
          },
          {
            testName: "Total Protein",
            value: "7.1",
            unit: "g/dL",
            referenceRange: "6.3 – 8.2 g/dL",
            status: "normal",
            explanation: "Total protein is within the healthy range.",
          },
        ],
      },
      recommendations: {
        create: [
          {
            title: "Liver Function Normal",
            description:
              "All markers including ALT, AST, and Bilirubin are within healthy range. Continue current lifestyle habits.",
            priority: "info",
          },
        ],
      },
    },
  });
  console.log("✓ Report 3:", report3.title);

  console.log("\nSeeding complete.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
