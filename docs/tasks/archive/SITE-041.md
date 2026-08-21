# SITE-041 — Connect and harden the contact form

- Batch: 4
- Area: contact UI
- State: COMPLETE
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

## Implementation note

- Connected `ContactForm` to the configured `VITE_CONTACT_API_URL` with a JSON
  `POST` request. A missing endpoint and every failed request have the same safe
  user-facing response; no API response body or error detail is rendered.
- Added client-side bounded name, email and message validation. Field errors are
  connected with `aria-invalid` and `aria-describedby`, and the form announces
  validation, submitting, success and failure states. The submit control is
  disabled while a request is in flight.
- The success copy confirms only that the request was accepted, not final email
  delivery. Existing email, LinkedIn and Telegram actions remain unchanged.
- Focused evidence: `npm.cmd run test:contact-form` (3/3 pass) and
  `npm.cmd run typecheck` (pass).
- Deferred to Batch 4 gate: a public browser submission against the deployed
  endpoint, including the active honeypot and rate-limit path, requires the
  configured endpoint, SMTP credentials and VPS/Traefik routing.
