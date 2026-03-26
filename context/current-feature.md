# Current Feature

## Status

Completed

## Goals

Replace all mock/static data in the main dashboard with real database-driven data while keeping the UI unchanged.

- Create `src/lib/db/reports.ts` for all dashboard-related Prisma queries
- Replace Top Summary Cards (Total Reports, Overall Status, Items to Review, Last Report Date)
- Replace Health Metrics Panel (Blood Pressure, Heart Rate, BMI, Glucose) from most recent report
- Replace Cholesterol Trend Chart with historical data across reports
- Replace Recent Reports cards with real report data (title, date, status, counts)
- Replace Recommendations section from `Recommendation` table (sorted by priority and recency)
- Wire up Report Drawer to fetch full report details (lab results, ranges, statuses, units)

## Notes

- All data fetched in server components — no client-side fetching for core data
- All queries scoped to the logged-in user via NextAuth session
- Handle empty/null states gracefully (null-safe display)
- Do NOT change UI layout or introduce new visual elements
- Spec: `context/features/dashboard-data-spec.md`

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Initial Next.js and Tailwind CSS setup committed and pushed to remote
- Dashboard UI Phase 1 completed: ShadCN initialized, `/dashboard` route, layout shell with sidebar and header, dark mode, Raleway font
- Dashboard UI Phase 2 completed: collapsible sidebar, mobile drawer, dark/light mode toggle (dark-emerald default), brand area, nav with active states, user profile with email, data-driven from mock-data.ts
- Dashboard UI Phase 3 completed: summary cards, lab-derived trend charts (2 charts), health metrics panel derived from lab results with View All drawer, report cards with clickable drawer, AI summary + collapsible OTC recommendations in drawer, health recommendations derived from per-report aiRecommendations, Reports page at `/dashboard/reports`, Reports nav item in sidebar
- Database setup completed: Prisma 7 + Neon PostgreSQL — schema with User, Report, LabResult, Recommendation, and NextAuth models (Account, Session, VerificationToken); initial migration applied; seed file with 3 demo reports; prisma.config.ts and PrismaPg adapter configured per Prisma 7 requirements
- Seed data completed: demo@labsense.ai user with bcryptjs-hashed password; 3 reports (Annual Physical, Blood Work Follow-up, Liver Function Panel) with 26 lab results and 7 recommendations; bcryptjs + tsx installed; prisma.config.ts seed command configured; test.db.ts updated to verify seed output
