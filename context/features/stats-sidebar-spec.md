# 🧬 LabSense AI — Stats & Sidebar Data Spec

## Overview

Replace the dummy stats and sidebar data with real data from the database.

The dashboard should maintain the current UI/UX design, but all displayed information (stats, health metrics, report navigation, and recent reports) must be dynamically fetched from the database instead of `@src/lib/mock-data.ts`.

---

## Requirements

### 1. Stats (Top Summary Cards)

Display real user-specific data from the database:

- **Total Reports**
- **Overall Health Status**
- **Items to Review (borderline / flagged results)**
- **Last Report Date**

These values should be derived from the user's reports and lab results.

Keep the existing card design unchanged.

---

### 2. Sidebar Navigation

Update the sidebar to reflect LabSense-specific data:

#### Static Navigation Links

- Dashboard → `/dashboard`
- New Report → `/reports/new`
- Trends → `/trends`

---

### 3. User Profile Section (Sidebar Bottom)

Display authenticated user information:

- User name
- Email
- Avatar (initials fallback)

Data should come from the authenticated session (NextAuth).

---

### 4. Recent Reports (Sidebar / Navigation Context)

Instead of collections, display **recent reports**:

Each item should include:

- Report title
- Status indicator (normal / borderline / flagged)
- Date

Clicking a report should:

- Open report details (drawer or page)

---

### 5. Health Metrics (Sidebar / Right Panel)

Display latest key health metrics from the most recent report:

- Blood Pressure
- Heart Rate
- BMI
- Glucose (Fasting)

Highlight abnormal values using status colors.

---

### 6. Recommendations Preview

Show top recommendations in sidebar or right panel:

- Title
- Priority (info / warning / urgent)

Limit to 2–3 items.

---

### 7. Data Access Layer

Create:

`src/lib/db/dashboard.ts`

Include functions such as:

- `getUserDashboardStats(userId)`
- `getRecentReports(userId)`
- `getLatestHealthMetrics(userId)`
- `getTopRecommendations(userId)`

Use Prisma queries.

---

## Constraints

- Do NOT change layout or styling
- Do NOT introduce mock data
- Use server-side data fetching
- Ensure all data is user-scoped
- Keep queries optimized and minimal

---

## Notes

- Use NextAuth session to identify user
- Handle empty states (no reports yet)
- Maintain consistent UI behavior with current design
- Status colors must match existing UI (green, yellow, red)

---

## Goal

Fully replace all sidebar and stats data with dynamic, database-driven content while preserving the current LabSense dashboard design and ensuring a seamless user experience.
