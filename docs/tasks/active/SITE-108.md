# SITE-108 — Restore approved GitHub contact

- Batch: 11
- Area: homepage contact
- State: IMPLEMENTED_PENDING_GATE
- Depends on: none

## Goal

Keep the approved public GitHub profile visible and actionable in the homepage
Contact section even when `VITE_GITHUB_URL` is not supplied to the local build.

## Non-goals

- Do not change the approved GitHub profile, contact copy or visual system.
- Do not add a GitHub repository widget or imply public contribution history.
- Do not change unrelated contact links or form behavior.

## Targeted source

- `apps/frontend/src/content/contact.ts`
- `apps/frontend/src/App.tsx`
- `apps/frontend/src/lib/metadata.ts`
- `docs/01-content-facts.md`

## Behavior steps

1. Keep the approved GitHub profile in the shared contact data.
2. Use the approved profile as the safe fallback when the optional build override
   is absent or blank.
3. Keep a valid configured HTTPS URL as an explicit override.
4. Include the same fallback profile in homepage structured data.

## Acceptance criteria

- Homepage Contact renders GitHub as an active external link to
  `https://github.com/Bruno-116aff` without requiring an environment variable.
- A valid `VITE_GITHUB_URL` can still override the fallback.
- Homepage `Person.sameAs` includes the approved GitHub profile when no override
  is supplied.
- No unsupported GitHub activity claims are added.

## Focused checks

- `npm.cmd --prefix apps/frontend run typecheck`
- `npm.cmd --prefix apps/frontend run build`
- `npm.cmd --prefix apps/frontend run lint`
- `npm.cmd --prefix apps/frontend run verify:meta`
- Generated homepage inspection confirms the active GitHub link and structured
  data profile.

## Deferred batch gate

`SITE-105` will run the complete Batch 11 verification after all implementation
tasks are ready.

## Evidence

- Added the approved GitHub profile to shared contact data.
- Homepage Contact now falls back to the approved profile when
  `VITE_GITHUB_URL` is absent, while preserving valid HTTPS overrides.
- Homepage structured data uses the same approved profile as the fallback in
  `Person.sameAs`.
- `npm.cmd --prefix apps/frontend run typecheck` passed.
- `npm.cmd --prefix apps/frontend run build` passed.
- `npm.cmd --prefix apps/frontend run lint` passed.
- `npm.cmd --prefix apps/frontend run verify:meta` passed for all six generated
  routes.
- Generated homepage output contains an active GitHub link and the approved
  profile in `Person.sameAs`.
- Full Batch 11 gate remains deferred to SITE-105.
