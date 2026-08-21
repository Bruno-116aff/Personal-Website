# SITE-051 — Add configurable GA4 events

- Batch: 5
- Area: analytics
- State: IMPLEMENTED_PENDING_GATE
- Depends on: SITE-044

## Goal

Track approved user actions without inventing account-owned configuration.

## Targeted context

- docs/04-tech-spec.md
- docs/03-site-structure-and-domains.md
- docs/ARCHITECTURE.md

## Work

- Add configurable GA4 Measurement ID.
- Track case_study_open, cv_click, email_click, linkedin_click, telegram_click and github_click.
- Ensure events fire once per intended action.
- Keep analytics disabled or inert when no production ID is supplied.
- Document consent/configuration assumptions if applicable.

## Acceptance criteria

- No fake Measurement ID is committed.
- Events are not duplicated by hydration/rerendering.
- CSP allows only configured analytics resources.

## Focused checks

- Typecheck/build.
- Inspect rendered event wiring.

## Deferred batch gate

Configured GA4 event verification in a real browser session.

## Implementation evidence

- Added a client-only GA4 loader behind `VITE_GA4_MEASUREMENT_ID`. Empty or invalid
  configuration emits no GA4 script or analytics request.
- Added `case_study_open`, `cv_click`, `email_click`, `linkedin_click`,
  `telegram_click` and `github_click`. Case-study events use a module-level key
  set so React Strict Mode hydration and rerenders cannot duplicate them.
- GitHub remains disabled without its user-owned public URL; when configured, its
  contact link tracks `github_click`.
- Documented the consent/configuration assumption and the narrow GA4 CSP sources
  required for the later Traefik configuration.
- Focused checks passed: `npm.cmd run typecheck`, `npm.cmd run build`, generated
  HTML inspection without a configured Measurement ID, and client event-wiring
  inspection.
- Deferred to SITE-054/SITE-059: apply and audit the Traefik CSP header. Deferred
  to a configured browser session: verify live GA4 requests and event collection.
