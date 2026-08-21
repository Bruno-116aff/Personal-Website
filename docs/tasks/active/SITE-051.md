# SITE-051 — Add configurable GA4 events

- Batch: 5
- Area: analytics
- State: READY
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
