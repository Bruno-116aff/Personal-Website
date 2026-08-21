# SITE-040 — Implement the NestJS contact endpoint

- Batch: 4
- Area: contact API
- State: READY
- Depends on: SITE-039

## Goal

Provide a small secure forwarding endpoint on Ivan's existing NestJS infrastructure.

## Targeted context

- docs/01-content-facts.md
- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md
- docs/ARCHITECTURE.md

## Work

- Inspect existing NestJS conventions before choosing the endpoint location.
- Validate and sanitize name, email and message server-side.
- Add rate limiting and honeypot rejection.
- Keep mail/API credentials in environment configuration.
- Return safe success/error responses without internal details.

## Acceptance criteria

- Valid requests reach the approved recipient when credentials are configured.
- Invalid input, honeypot and rate-limit cases are rejected.
- No credentials or recipient secrets are exposed to the frontend bundle.
- Tests cover success and rejection paths.

## Focused checks

- Targeted NestJS tests.
- Typecheck for the API scope.

## Deferred batch gate

End-to-end production mail delivery and security-header verification.
