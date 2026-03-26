# 🧬 LabSense AI — Dashboard Data Integration Spec

## Overview

Replace the dummy health data currently displayed in the main dashboard area with real data fetched from the database.

The dashboard should continue to look exactly the same visually, but all data (reports, metrics, trends, and recommendations) must now come from the backend instead of `@src/lib/mock-data.ts`.

---

## Requirements

### Data Fetching Layer

- Create `src/lib/db/reports.ts` for all dashboard-related queries
- Use Prisma to fetch data from Neon PostgreSQL
- All data should be fetched in **server components**

---

### Dashboard Sections to Replace

#### 1. Top Summary Cards

Replace static values with real data:

- **Total Reports**
- **Overall Status**
- **Items to Review (borderline/flagged)**
- **Last Report Date**

Data should be derived from the user's reports.

---

#### 2. Health Metrics Panel

Populate with latest values from most recent report:

- Blood Pressure
- Heart Rate
- BMI
- Glucose (Fasting)

If unavailable, fallback to null-safe display.

---

#### 3. Cholesterol Trend Chart

- Fetch historical report data
- Extract cholesterol values across reports
- Format into chart-friendly structure

Example:

[
  { month: "Jan", value: 200 },
  { month: "Feb", value: 205 }
]

---

#### 4. Recent Reports

Replace mock cards with real reports:

Each card should include:

- Report title
- Date
- Status (normal / borderline / flagged)
- Counts (normal, borderline, flagged)

Keep UI unchanged.

---

#### 5. Recommendations Section

Fetch from `Recommendation` table:

- Title
- Description
- Priority (info, warning, urgent)

Sort by priority and recency.

---

#### 6. Report Drawer (Details View)

When user clicks “View”:

- Fetch full report details
- Include:
  - Summary counts
  - Lab results
  - Ranges and statuses
  - Units

---

## Constraints

- Do NOT change UI layout
- Do NOT introduce client-side fetching for core data
- Keep logic simple and clean
- Avoid over-fetching unnecessary fields

---

## Notes

- Ensure all data is scoped to the logged-in user
- Use NextAuth session for user context
- Handle empty states gracefully
- Maintain consistent formatting with existing UI

---

## Goal

Transition the dashboard from static mock data to fully dynamic, database-driven content while preserving the current UI design and user experience.
