"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockReports } from "@/lib/mock-data";

type ChartGroup = {
  title: string;
  tests: string[];
};

const chartGroups: ChartGroup[] = [
  { title: "Cardiovascular & Metabolic", tests: ["LDL Cholesterol", "HDL Cholesterol", "Glucose (Fasting)", "Triglycerides"] },
  { title: "Blood & Organ Health", tests: ["Hemoglobin", "ALT", "AST", "TSH"] },
];

const lineColors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Sort reports oldest → newest
const sortedReports = [...mockReports].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

function buildChartData(tests: string[]) {
  return sortedReports.map((report) => {
    const point: Record<string, string | number> = { date: formatDate(report.date) };
    for (const testName of tests) {
      const result = report.results.find((r) => r.testName === testName);
      if (result) point[testName] = parseFloat(result.value);
    }
    return point;
  });
}

function hasEnoughData(data: Record<string, string | number>[], tests: string[]): boolean {
  const pointsWithData = data.filter((point) => tests.some((t) => t in point));
  return pointsWithData.length >= 2;
}

type TrendChartProps = {
  group: ChartGroup;
};

function TrendChart({ group }: TrendChartProps) {
  const data = buildChartData(group.tests);
  const hasData = hasEnoughData(data, group.tests);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold text-foreground mb-4">{group.title}</h2>

      {hasData ? (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            {group.tests.length > 1 && (
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
            )}
            {group.tests.map((testName, i) => (
              <Line
                key={testName}
                type="monotone"
                dataKey={testName}
                stroke={lineColors[i % lineColors.length]}
                strokeWidth={2}
                dot={{ r: 4, fill: lineColors[i % lineColors.length] }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-44 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Not enough data to show a trend.</p>
        </div>
      )}
    </div>
  );
}

export function LabTrendCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {chartGroups.map((group) => (
        <TrendChart key={group.title} group={group} />
      ))}
    </div>
  );
}
