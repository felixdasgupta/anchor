# Cursor Guardrails

## Route + Rendering Rules

- Rule: `app/**` routes are tiny SSR wrappers only.
- Rule: Anything using Jotai atoms (`useAtom`), Recharts, modals, form state = `"use client"`.
- Rule: No mega files: page views max ~150 lines; split into components.

## Store + State Rules

- Rule: Store lives in `src/stores/**` and uses Jotai atoms.
- Rule: Atoms are small, single-purpose (“atomic stores”).
- Rule: Avoid cross-importing between atom files.
- Rule: Atoms are client-only; any file using Jotai atoms is `"use client"`.
- Rule: Only components/hooks should use `useAtom`.
- Rule: Shared domain types live in `src/lib/domain/**` (importable by both server/client).

```
app/
  layout.tsx                  # root HTML + ThemeProvider
  globals.css

  api/
    auth/
      [auth0]/
        route.ts              # Auth0 login / logout / callback

  (app)/                      # AUTHENTICATED APP (gated by middleware)
    layout.tsx                # header/nav shell (SSR)
    page.tsx                  # dashboard route (SSR wrapper)
    history/page.tsx          # history route (SSR wrapper)
    settings/page.tsx         # settings route (SSR wrapper)

  login/
    page.tsx                  # optional public login page (SSR)

middleware.ts                 # Auth gate (Auth0, edge)

components/
  shell/
    AppShell.tsx              # SSR layout grid + slots
    TopNav.tsx                # CSR (active route + CTA)
    MobileNav.tsx             # CSR
  views/
    dashboard/
      DashboardView.tsx       # CSR (KPIs + charts)
      KpiRow.tsx              # CSR (or SSR later)
      WeeklyBarChart.tsx      # CSR (Recharts)
      MonthlyLineChart.tsx    # CSR (Recharts)
    log-impulse/
      LogImpulseDialog.tsx    # CSR (Radix / shadcn Dialog)
  ui/                         # shadcn components (generated)
    button.tsx
    card.tsx
    dialog.tsx
    ...

lib/
  domain/
    types.ts                  # shared types (safe everywhere)
  utils/
    money.ts                  # format cents
    dates.ts                  # date helpers

stores/
  purchases.ts                # jotai atoms (client only)
  settings.ts                 # jotai atoms (client only)

docs/
  architecture.mmd            # mermaid (LR architecture)
  00-architecture.md          # rules + SSR/CSR + auth rules
  01-routes-and-views.md      # route responsibilities
  02-ui-system.md             # shadcn + theme rules
  03-build-plan.md            # step-by-step implementation
```
