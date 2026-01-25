## Auth (Auth0)

- Auth enforced via `middleware.ts`
- All authenticated routes live under `app/(app)/**`
- Auth routes live under `app/api/auth/[auth0]/route.ts`
- No auth logic inside components or views
- Client components assume authenticated context

Cursor rules:

- Do not add auth checks inside UI components
- Only modify auth in `middleware.ts` or `app/api/auth/**`
