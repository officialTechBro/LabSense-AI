# Dashboard UI Phase 3 Spec

## Overview

This is phase 3 of 3 for the dashboard UI. Use the dashboard screenshots referenced below for the final structure and presentation.

This phase covers the full dashboard content area using the mock data file. Import the data directly for now until the database and backend integrations are implemented.

## Requirements for phase 3

- Main dashboard content area to the right of the sidebar
- Four summary cards at the top:
  - Total Reports
  - Overall Status
  - Items to Review
  - Last Report
- Cholesterol trend chart section
- Health metrics panel showing values such as:
  - Blood Pressure
  - Heart Rate
  - BMI
  - Glucose (Fasting)
- Top recommendations panel
- Recent reports section with report cards
- Each report card should include:
  - report title
  - report date
  - status badge
  - counts for normal, borderline, and flagged results
  - `View` button
  - `Export` button
- Health recommendations section with alert-style recommendation cards
- Report details drawer matching the provided drawer screenshots
- Report details drawer should include:
  - report title
  - report date
  - summary counters
  - list of lab result cards
  - status labels per result
  - result value and unit
  - reference range text
  - action buttons such as `Download PDF` and `Print`
- Use only simple imported mock data from `src/lib/mock-data.ts`
- Do not add backend logic yet

## References

- `@context/screenshots/dashboard-ui-main-1.png`
- `@context/screenshots/dashboard-ui-main-2.png`
- `@context/screenshots/dashboard-ui-main-3.png`
- `@context/screenshots/dashboard-ui-drawer-1.png`
- `@context/screenshots/dashboard-ui-drawer-2.png`
- `@context/project-overview.md`
- `@src/lib/mock-data.ts`
- `@context/features/dashboard-phase-1-spec.md`
- `@context/features/dashboard-phase-2-spec.md`
