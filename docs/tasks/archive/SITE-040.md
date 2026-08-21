# SITE-040 — Implement the NestJS contact endpoint

- Batch: 4
- Area: contact API
- State: COMPLETE
- Depends on: SITE-039

## Goal

Provide a small secure persistence endpoint on Ivan's existing NestJS infrastructure.

## Targeted context

- docs/01-content-facts.md
- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md
- docs/ARCHITECTURE.md

## Work

- Inspect existing NestJS conventions before choosing the endpoint location.
- Validate and sanitize name, email and message server-side.
- Add rate limiting and honeypot rejection.
- Persist accepted submissions to a server-side SQLite database.
- Return safe success/error responses without internal details.

## Acceptance criteria

- Valid requests are stored durably in the configured SQLite database.
- Invalid input, honeypot and rate-limit cases are rejected.
- No credentials or recipient secrets are exposed to the frontend bundle.
- Tests cover success and rejection paths.

## Focused checks

- Targeted NestJS tests.
- Typecheck for the API scope.

## Deferred batch gate

Production database-volume persistence and security-header verification.

## Implementation note

- User decision on 2026-08-21: store contact submissions in SQLite for manual
  processing; do not send email at launch. The implementation evidence above is
  superseded while the persistence change is in progress.

### Final implementation evidence

- `POST /contact` stores sanitized valid submissions in SQLite and returns only
  `{ "status": "accepted" }`. It has no public read endpoint.
- A local HTTP check started the API with a physical SQLite file, received `201`,
  and confirmed the normalized record in `contact_submissions`.
- `npm.cmd run test:contact-api` passed 5/5 tests, including a real SQLite
  persistence test, validation, honeypot and rate-limit rejection paths.
