# Current Feature: Add Pro Badge to Sidebar

## Status

In Progress

## Goals

- Add a "PRO" badge using the ShadCN Badge component next to the user name in the sidebar footer
- Badge should be clean, subtle, and consistent with the LabSense medical-style interface
- Display "PRO" in all uppercase
- Only show the badge on the user name in the sidebar footer
- Preserve existing sidebar layout and spacing

## Notes

- Use the ShadCN UI Badge component
- Do not change the existing sidebar layout or spacing more than necessary
- Spec: `context/features/add-pro-badge-sidebar.md`

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Initial Next.js and Tailwind CSS setup committed and pushed to remote
- Dashboard UI Phase 1 completed: ShadCN initialized, `/dashboard` route, layout shell with sidebar and header, dark mode, Raleway font
- Dashboard UI Phase 2 completed: collapsible sidebar, mobile drawer, dark/light mode toggle (dark-emerald default), brand area, nav with active states, user profile with email, data-driven from mock-data.ts
- Dashboard UI Phase 3 completed: summary cards, lab-derived trend charts (2 charts), health metrics panel derived from lab results with View All drawer, report cards with clickable drawer, AI summary + collapsible OTC recommendations in drawer, health recommendations derived from per-report aiRecommendations, Reports page at `/dashboard/reports`, Reports nav item in sidebar
- Database setup completed: Prisma 7 + Neon PostgreSQL — schema with User, Report, LabResult, Recommendation, and NextAuth models (Account, Session, VerificationToken); initial migration applied; seed file with 3 demo reports; prisma.config.ts and PrismaPg adapter configured per Prisma 7 requirements
- Seed data completed: demo@labsense.ai user with bcryptjs-hashed password; 3 reports (Annual Physical, Blood Work Follow-up, Liver Function Panel) with 26 lab results and 7 recommendations; bcryptjs + tsx installed; prisma.config.ts seed command configured; test.db.ts updated to verify seed output
- Dashboard data integration completed: replaced all mock data with real Prisma/Neon DB queries; src/lib/db/reports.ts with shared types and 4 query functions; dashboard and reports pages converted to async server components; all client components (LabTrendCharts, ReportsInteractive, ReportDrawer, HealthMetricsCard) updated to accept data via props
- Stats & sidebar data integration completed: created src/lib/db/dashboard.ts with getRecentReports, getLatestHealthMetrics, getTopRecommendations, getDemoUser; dashboard layout converted to async server component to fetch sidebar data; DashboardShell and DashboardSidebar updated to accept and render real user profile (name, email, initials), recent reports list with status indicators, and top recommendations preview; mockUser import removed from sidebar
- Report detail page completed: added getReportById query; new /dashboard/reports/[id] page with full lab results, comprehensive AI summary, OTC suggestions, and prioritized recommendations; ReportsInteractive updated with mode prop (drawer vs navigate); Reports page uses navigate mode; ReportDrawer updated with truncated summary and "View Full Report" button linking to detail page
