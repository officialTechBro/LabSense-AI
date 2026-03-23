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
import { mockCholesterolTrend } from "@/lib/mock-data";

export function CholesterolChart() {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">Cholesterol Trend</h2>
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
          Last 6 Months
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={mockCholesterolTrend}
          margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
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
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
          <Line
            type="monotone"
            dataKey="ldl"
            name="LDL"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ef4444" }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="hdl"
            name="HDL"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3">
        Trending upward: Your cholesterol levels show an increasing trend over 6 months.
      </p>
    </div>
  );
}
