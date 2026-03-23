// Mock data for dashboard UI — replace with real API/DB data when backend is ready

export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john.doe@example.com",
  isPro: false,
};

export const mockHealthMetrics = {
  bloodPressure: "120/80",
  heartRate: 72,
  bmi: 24.5,
  glucoseFasting: 102,
};

// Cholesterol trend — last 6 months (LDL and HDL)
export const mockCholesterolTrend = [
  { month: "Jan", ldl: 195, hdl: 130 },
  { month: "Feb", ldl: 200, hdl: 128 },
  { month: "Mar", ldl: 210, hdl: 125 },
  { month: "Apr", ldl: 215, hdl: 122 },
  { month: "May", ldl: 220, hdl: 120 },
  { month: "Jun", ldl: 225, hdl: 118 },
];

export type LabResultStatus = "normal" | "borderline" | "high" | "low" | "flagged";

export type LabResult = {
  id: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: LabResultStatus;
};

export type Report = {
  id: string;
  title: string;
  date: string;
  overallStatus: "normal" | "borderline" | "flagged";
  normalCount: number;
  borderlineCount: number;
  flaggedCount: number;
  aiSummary: string;
  results: LabResult[];
};

export const mockReports: Report[] = [
  {
    id: "report_1",
    title: "Annual Physical - 2025",
    date: "March 15, 2025",
    overallStatus: "normal",
    normalCount: 10,
    borderlineCount: 1,
    flaggedCount: 1,
    aiSummary:
      "Most of your results are within normal range. Your cholesterol is slightly elevated and your fasting glucose is above the recommended threshold — both worth discussing with your doctor.",
    results: [
      {
        id: "r1_1",
        testName: "Red Blood Cell Count",
        value: "4.8",
        unit: "M/uL",
        referenceRange: "4.5 – 5.5 M/uL",
        status: "normal",
      },
      {
        id: "r1_2",
        testName: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        referenceRange: "13.5 – 17.5 g/dL",
        status: "normal",
      },
      {
        id: "r1_3",
        testName: "Cholesterol Total",
        value: "185",
        unit: "mg/dL",
        referenceRange: "< 200 mg/dL",
        status: "normal",
      },
      {
        id: "r1_4",
        testName: "Glucose (Fasting)",
        value: "102",
        unit: "mg/dL",
        referenceRange: "70 – 99 mg/dL",
        status: "high",
      },
      {
        id: "r1_5",
        testName: "TSH",
        value: "2.1",
        unit: "mIU/L",
        referenceRange: "0.4 – 4.0 mIU/L",
        status: "normal",
      },
      {
        id: "r1_6",
        testName: "Calcium",
        value: "8.6",
        unit: "mg/dL",
        referenceRange: "8.5 – 10.5 mg/dL",
        status: "normal",
      },
      {
        id: "r1_7",
        testName: "Potassium",
        value: "4.2",
        unit: "mEq/L",
        referenceRange: "3.5 – 5.0 mEq/L",
        status: "normal",
      },
      {
        id: "r1_8",
        testName: "Vitamin D",
        value: "18",
        unit: "ng/mL",
        referenceRange: "20 – 50 ng/mL",
        status: "low",
      },
      {
        id: "r1_9",
        testName: "LDL Cholesterol",
        value: "128",
        unit: "mg/dL",
        referenceRange: "< 100 mg/dL",
        status: "borderline",
      },
      {
        id: "r1_10",
        testName: "HDL Cholesterol",
        value: "48",
        unit: "mg/dL",
        referenceRange: "> 40 mg/dL",
        status: "normal",
      },
      {
        id: "r1_11",
        testName: "Triglycerides",
        value: "145",
        unit: "mg/dL",
        referenceRange: "< 150 mg/dL",
        status: "normal",
      },
      {
        id: "r1_12",
        testName: "Platelet Count",
        value: "230",
        unit: "K/uL",
        referenceRange: "150 – 400 K/uL",
        status: "normal",
      },
    ],
  },
  {
    id: "report_2",
    title: "Blood Work - Follow-up",
    date: "March 10, 2025",
    overallStatus: "borderline",
    normalCount: 6,
    borderlineCount: 2,
    flaggedCount: 0,
    aiSummary:
      "Follow-up results show some borderline values. Your LDL and fasting glucose remain slightly elevated. No urgent concerns, but continued monitoring is recommended.",
    results: [
      {
        id: "r2_1",
        testName: "LDL Cholesterol",
        value: "132",
        unit: "mg/dL",
        referenceRange: "< 100 mg/dL",
        status: "borderline",
      },
      {
        id: "r2_2",
        testName: "HDL Cholesterol",
        value: "46",
        unit: "mg/dL",
        referenceRange: "> 40 mg/dL",
        status: "normal",
      },
      {
        id: "r2_3",
        testName: "Glucose (Fasting)",
        value: "105",
        unit: "mg/dL",
        referenceRange: "70 – 99 mg/dL",
        status: "borderline",
      },
      {
        id: "r2_4",
        testName: "Triglycerides",
        value: "140",
        unit: "mg/dL",
        referenceRange: "< 150 mg/dL",
        status: "normal",
      },
      {
        id: "r2_5",
        testName: "Red Blood Cell Count",
        value: "4.9",
        unit: "M/uL",
        referenceRange: "4.5 – 5.5 M/uL",
        status: "normal",
      },
      {
        id: "r2_6",
        testName: "Hemoglobin",
        value: "14.5",
        unit: "g/dL",
        referenceRange: "13.5 – 17.5 g/dL",
        status: "normal",
      },
      {
        id: "r2_7",
        testName: "Platelet Count",
        value: "220",
        unit: "K/uL",
        referenceRange: "150 – 400 K/uL",
        status: "normal",
      },
      {
        id: "r2_8",
        testName: "TSH",
        value: "2.4",
        unit: "mIU/L",
        referenceRange: "0.4 – 4.0 mIU/L",
        status: "normal",
      },
    ],
  },
  {
    id: "report_3",
    title: "Liver Function Panel",
    date: "February 28, 2025",
    overallStatus: "normal",
    normalCount: 6,
    borderlineCount: 0,
    flaggedCount: 0,
    aiSummary:
      "All liver function markers are within normal range. No concerns detected. Routine monitoring is sufficient.",
    results: [
      {
        id: "r3_1",
        testName: "ALT",
        value: "22",
        unit: "U/L",
        referenceRange: "7 – 56 U/L",
        status: "normal",
      },
      {
        id: "r3_2",
        testName: "AST",
        value: "25",
        unit: "U/L",
        referenceRange: "10 – 40 U/L",
        status: "normal",
      },
      {
        id: "r3_3",
        testName: "Alkaline Phosphatase",
        value: "72",
        unit: "U/L",
        referenceRange: "44 – 147 U/L",
        status: "normal",
      },
      {
        id: "r3_4",
        testName: "Total Bilirubin",
        value: "0.8",
        unit: "mg/dL",
        referenceRange: "0.1 – 1.2 mg/dL",
        status: "normal",
      },
      {
        id: "r3_5",
        testName: "Albumin",
        value: "4.2",
        unit: "g/dL",
        referenceRange: "3.5 – 5.0 g/dL",
        status: "normal",
      },
      {
        id: "r3_6",
        testName: "Total Protein",
        value: "7.1",
        unit: "g/dL",
        referenceRange: "6.3 – 8.2 g/dL",
        status: "normal",
      },
    ],
  },
];

export const mockDashboardStats = {
  totalReports: 12,
  newThisMonth: 3,
  overallStatus: "Good" as const,
  overallStatusNote: "Most results normal",
  itemsToReview: 5,
  itemsToReviewNote: "Borderline or flagged",
  lastReportDate: "March 15",
  lastReportTitle: "Annual Physical",
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  priority: "info" | "warning" | "urgent";
};

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec_1",
    title: "Cholesterol Trending Up",
    description:
      "Your LDL cholesterol has been increasing over the past 6 months. Consider discussing dietary changes with your doctor.",
    priority: "warning",
  },
  {
    id: "rec_2",
    title: "Vitamin D Level Low",
    description:
      "Your Vitamin D is below recommended range. Increase sun exposure or consider supplementation.",
    priority: "info",
  },
  {
    id: "rec_3",
    title: "Schedule Follow-up",
    description:
      "Based on your glucose levels, schedule a follow-up test in 3 months.",
    priority: "info",
  },
];
