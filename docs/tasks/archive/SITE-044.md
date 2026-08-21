# SITE-044 — Close Batch 4 contact integration

- Batch: 4
- Area: batch gate
- State: COMPLETE
- Depends on: SITE-040, SITE-041
- Gate type: mandatory full batch verification

## Goal

Verify the API, form and full application together and close Batch 4 at 100%.

## Full gate

- Run all available API tests, including validation, SQLite persistence,
  honeypot and rate-limit paths.
- npm run typecheck
- npm run build
- npm run verify
- npm run verify:frontend
- Run an end-to-end submission with production-like configuration when available.
- Verify no secret or internal error detail reaches the client.

## Acceptance criteria

- Valid and invalid form flows are verified.
- Duplicate submission prevention and accessible status states work.
- SQLite persistence is confirmed with production-like configuration.
- No in-scope API or frontend failure remains.

## Failure policy

If the configured database volume or public routing is unavailable, record the
exact deferred external input; do not claim public persistence passed and do not
close the batch prematurely.

## Gate evidence

### PASS

- `npm.cmd run test:contact-api`: 4/4 tests passed (validation, forwarding
  adapter, honeypot rejection and rate limiting).
- `npm.cmd run test:contact-form`: 3/3 tests passed (endpoint configuration and
  safe client-side validation).
- `npm.cmd run typecheck:contact-api`, `npm.cmd run typecheck`, `npm.cmd run build`,
  `npm.cmd run verify:frontend`, `npm.cmd run verify:content`,
  `npm.cmd run verify:meta`, and `npm.cmd run verify` all passed.
- The generated build contains all six route HTML files; content and metadata
  verification passed after prerendering. `npm.cmd audit --omit=dev` found zero
  vulnerabilities.
- Quality-gate scanners found no secret-pattern matches in the public build and
  no client code that reads backend response/error detail.

### DEFERRED / BLOCKER

- `npm.cmd run verify:production` is intentionally deferred by the repository:
  there is no deployed VPS/DNS output to inspect.
- The contact endpoint cannot be exercised end to end until the user provides
  `VITE_CONTACT_API_URL`, `CONTACT_RECIPIENT_EMAIL`, SMTP host/user/password/
  sender values, and VPS/Traefik routing. These are required to confirm live
  delivery, public rate limiting and honeypot rejection.
- The interactive browser runtime is unavailable in this environment; the
  keyboard-facing form semantics are covered by source inspection and tests, but
  a deployed browser walkthrough remains part of the deferred public check.

Batch 4 remains open. SITE-040 and SITE-041 stay IMPLEMENTED_PENDING_GATE until
this gate can be rerun with the external inputs above.

## Final gate evidence (supersedes the earlier SMTP blocker)

- User decision: submissions are persisted in SQLite for manual processing;
  SMTP delivery is out of scope for launch.
- `npm.cmd run test:contact-api` passed 5/5 and `npm.cmd run test:contact-form`
  passed 3/3. Both API and frontend typechecks passed.
- A local production-like API process returned `201` for `POST /contact`; its
  configured physical SQLite database contained the normalized submitted record.
- `npm.cmd run build`, `npm.cmd run verify:frontend`, `npm.cmd run verify:content`,
  `npm.cmd run verify:meta`, `npm.cmd run verify`, and the quality-gate scanners
  passed. `npm.cmd audit --omit=dev` found zero vulnerabilities.
- `npm.cmd run verify:production` remains DEFERRED to Batch 5 because VPS/DNS,
  Traefik and real response headers are deployment work. This is not an open
  Batch 4 acceptance criterion after local API persistence verification.
