# SITE-041 — Connect and harden the contact form

- Batch: 4
- Area: contact UI
- State: READY
- Depends on: SITE-023, SITE-040

## Goal

Connect the accessible form to the endpoint with clear user-facing states.

## Targeted context

- docs/02-copywriting-guidelines.md
- docs/03-site-structure-and-domains.md
- docs/DESIGN_SYSTEM.md
- docs/ARCHITECTURE.md

## Work

- Add client convenience validation.
- Prevent duplicate submission while a request is in flight.
- Implement accessible submitting, success and error states.
- Keep backend errors generalized.
- Add configured endpoint URL handling.

## Acceptance criteria

- Labels, validation and status messages work with keyboard and assistive technology.
- A failed request does not leak implementation details.
- Success does not imply delivery if the endpoint cannot confirm it.
- Contact actions and form destination are correct.

## Focused checks

- Frontend targeted tests or manual keyboard submission.
- npm run typecheck.

## Deferred batch gate

End-to-end public-form submission with spam controls active.
