# Build Steps

Each step includes the files to edit, exact output, and done criteria.

## 1) Auth first (middleware + Auth0 routes)

- Files to edit:
  - `middleware.ts`
  - `src/app/api/auth/[auth0]/route.ts`
- Exact output:
  - Auth middleware gates protected routes.
  - Auth routes handle login/logout/callback.
- Done criteria:
  - Protected routes are blocked when unauthenticated.
  - Auth routes complete the login flow.

## 2) Add Jotai Provider (placeholder wiring)

- Files to edit:
  - `src/app/layout.tsx`
- Exact output:
  - App root is ready to host the Jotai provider (wiring only).
- Done criteria:
  - Provider wiring exists with no functional store usage yet.

## 3) Create shell + routes with placeholders

- Files to edit:
  - `src/app/(app)/layout.tsx`
  - `src/app/(app)/page.tsx`
  - `src/components/shell/*`
- Exact output:
  - App shell renders top nav + content outlet.
  - Routes render placeholder views for dashboard/history/settings.
- Done criteria:
  - Navigating routes shows the correct placeholder view.

## 4) Create jotai atoms (purchases/settings)

- Files to edit:
  - `src/stores/purchases.ts` (new)
  - `src/stores/settings.ts` (new)
- Exact output:
  - Jotai atoms represent purchases and settings slices.
- Done criteria:
  - Atoms are defined and usable by client components.

## 5) Build LogImpulseDialog + persist to store

- Files to edit:
  - `src/components/dashboard/LogImpulseDialog.tsx` (new)
  - `src/components/dashboard/DashboardView.tsx`
- Exact output:
  - Dialog captures amount, merchant, category, note, mood, date and writes to store.
- Done criteria:
  - New entry appears in store after submit; dialog closes on success.

## 6) Wire KPIs

- Files to edit:
  - `src/components/dashboard/KpiRow.tsx` (new)
  - `src/components/dashboard/DashboardView.tsx`
- Exact output:
  - KPI row reads from store and renders totals + trends.
- Done criteria:
  - KPI values update when purchases change.

## 7) Wire WeeklyBarChart + MonthlyLineChart

- Files to edit:
  - `src/components/dashboard/WeeklyBarChart.tsx` (new)
  - `src/components/dashboard/MonthlyLineChart.tsx` (new)
  - `src/components/dashboard/DashboardView.tsx`
- Exact output:
  - Charts render weekly bars and monthly line from store data.
- Done criteria:
  - Charts re-render when store updates.

## 8) Add History page minimal

- Files to edit:
  - `src/app/(app)/history/page.tsx` (new)
  - `src/components/history/HistoryView.tsx` (new)
- Exact output:
  - History page shows list placeholder wired to store later.
- Done criteria:
  - `/history` loads without errors and shows the placeholder.

## 9) Add Settings page minimal

- Files to edit:
  - `src/app/(app)/settings/page.tsx` (new)
  - `src/components/settings/SettingsView.tsx` (new)
- Exact output:
  - Settings page shows baseline + weekly threshold placeholders.
- Done criteria:
  - `/settings` loads without errors and shows the placeholders.
