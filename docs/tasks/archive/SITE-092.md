# SITE-092 — Restyle shared form and interaction states

- Batch: 7
- Area: shared form states
- State: COMPLETE
- Depends on: SITE-091

## Goal

Bring contact controls, links, validation states, disabled states and status messages
into the dark system without changing the contact contract.

## Non-goals

- Do not change contact validation, API payloads, rate limiting or analytics.
- Do not modify public contact destinations.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/components/ContactForm.tsx
- apps/frontend/src/lib/contact-form.ts
- apps/frontend/src/styles/index.css

## Work

- Apply dark input, label, status, disabled and error styling with AA contrast.
- Use the shared button contract for submit and disabled GitHub states.
- Preserve labels, `aria-invalid`, live status messaging, honeypot invisibility and
  keyboard order.

## Acceptance criteria

- Valid, invalid, submitting, success and error states are readable without color.
- Contact links and form controls remain usable at 390px.
- Existing contact unit tests and accessibility wiring remain unchanged functionally.

## Focused checks

- Contact-form tests.
- Accessibility verifier and mobile contact screenshot.

## Batch 7 gate finalization

SITE-093 completed the full foundation gate at 100% on 2026-08-24. Contact controls,
form states, focus treatment and accessibility wiring are closed without changing
the contact contract.

## Evidence

- Restyled contact links, form surface, labels, graphite inputs, focus outlines,
  invalid field errors, idle/submitting status, success/error status and disabled
  GitHub state against the dark reference tokens. No ContactForm or contact API
  behavior was changed.
- Preserved `aria-invalid`, live status roles, keyboard order, honeypot invisibility,
  shared Button usage and all existing contact destinations.
- `npm.cmd run test:contact-form` (from `apps/frontend`) — PASS; 7 tests passed.
- `npm.cmd run verify:accessibility` (from `apps/frontend`) — PASS; 6 generated
  routes verified.
- Mobile contact screenshot at 390×844 passed. Browser smoke verified readable
  idle and invalid states, focus outline, 12px dark surfaces, hidden honeypot and
  no horizontal overflow.
