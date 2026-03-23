# Dashboard UI Phase 2 Spec

## Overview

This is phase 2 of 3 for the dashboard UI. Use the dashboard screenshots referenced below for how the left navigation and drawer behavior should look.

In this phase, build the sidebar structure, navigation links, user profile area, and mobile drawer experience. Use the mock data file directly until the database is implemented.

## Requirements for phase 2

- Collapsible Left sidebar matching the design
- Brand area at the top with:
  - LabSense logo/avatar block
  - product name `LabSense`
- Navigation items with icons and links:
  - Dashboard
  - New Report
  - Trends
- Active state styling for the current route
- User profile area fixed at the bottom of the sidebar showing:
  - user avatar initials
  - user full name
  - user email
  - settings icon
- Sidebar should be visible on desktop
- Sidebar should become a drawer on smaller screens
- Drawer should slide in from the left on mobile
- Add a trigger/icon for opening and closing the drawer on mobile
- Keep the sidebar implementation simple and data-driven from `src/lib/mock-data.ts`

## References

- `@context/screenshots/dashboard-ui-main-1.png`
- `@context/screenshots/dashboard-ui-main-2.png`
- `@context/screenshots/dashboard-ui-main-3.png`
- `@context/screenshots/dashboard-ui-drawer-1.png`
- `@context/screenshots/dashboard-ui-drawer-2.png`
- `@context/project-overview.md`
- `@src/lib/mock-data.ts`
- `@context/features/dashboard-phase-1-spec.md`
- `@context/features/dashboard-phase-3-spec.md`
