# SITE-044 — Close Batch 4 contact integration

- Batch: 4
- Area: batch gate
- State: READY
- Depends on: SITE-040, SITE-041
- Gate type: mandatory full batch verification

## Goal

Verify the API, form and full application together and close Batch 4 at 100%.

## Full gate

- Run all available API tests, including validation, honeypot, rate-limit and
  mail-forwarding paths.
- npm run typecheck
- npm run build
- npm run verify
- npm run verify:frontend
- Run an end-to-end submission with production-like configuration when available.
- Verify no secret or internal error detail reaches the client.

## Acceptance criteria

- Valid and invalid form flows are verified.
- Duplicate submission prevention and accessible status states work.
- Mail delivery is confirmed when credentials/environment are available.
- No in-scope API or frontend failure remains.

## Failure policy

If production credentials are unavailable, record the exact deferred external
input; do not claim delivery passed and do not close the batch prematurely.
