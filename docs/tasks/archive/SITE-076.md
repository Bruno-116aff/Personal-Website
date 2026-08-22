# SITE-076 — Add contact request timeout and retry state

- Batch: 5
- Area: contact UX
- State: COMPLETE
- Depends on: SITE-075

## Goal

Prevent the contact form from remaining in a submitting state indefinitely when
the API or network is unavailable.

## Non-goals

- Do not expose backend errors or implementation details.
- Do not add a second submission channel.

## Work

- Add an AbortController timeout to the client request.
- Treat timeout as the existing safe error state.
- Allow a clear retry without losing useful user input where possible.
- Add tests for timeout/error state and duplicate-submit protection.

## Acceptance criteria

- A stalled request resolves to a visible accessible error state.
- The submit button cannot cause duplicate in-flight requests.
- Retry behavior is understandable and does not leak server details.
- Valid, invalid, honeypot and API-error flows remain covered.

## Focused checks

- `npm run test:contact-form`
- `npm run typecheck:frontend`
- Manual form-state check when browser runtime is available.

## Deferred batch gate

SITE-059 verifies the form against the production-like API.

## Implementation evidence

- Added a 10-second `AbortController` timeout around the client contact
  request; timeout and non-2xx responses remain behind the existing generic
  accessible error state.
- Added a submission lock in addition to the disabled submit button, preventing
  duplicate in-flight requests while releasing cleanly for retry.
- Kept form values on error/timeout and reset them only after a successful
  response, so retry does not discard useful input.
- Added focused tests for timeout cancellation, safe API error handling and
  duplicate-submit protection; existing validation coverage remains intact.
- Focused checks passed: `npm run test:contact-form` (6 tests),
  `npm run typecheck:frontend` and `git diff --check`.
- Deferred to SITE-059: manual form-state walkthrough against the
  production-like API and the accumulated Batch 5 gate.
