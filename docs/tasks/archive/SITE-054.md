# SITE-054 — Configure Docker, Traefik and security

- Batch: 5
- Area: deployment/security
- State: COMPLETE
- Depends on: SITE-044

## Goal

Make the static site and contact API deployable through the existing VPS/Traefik
conventions with secure routing and documented redirects.

## Targeted context

- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md
- docs/ARCHITECTURE.md
- AGENTS.md

## Work

- Inspect existing infrastructure before selecting file locations or labels.
- Add Docker and Traefik configuration for frontend and contact API.
- Configure HTTPS, HSTS, CSP, X-Content-Type-Options, Referrer-Policy and
  Permissions-Policy.
- Define documented canonical-host, catch-all and redirect behaviour.
- Keep all credentials in environment/secret configuration.

## Acceptance criteria

- The deployment configuration contains no hardcoded secret.
- All six known routes and the contact endpoint have an intended production path.
- Required headers are configured with the narrowest practical policy.
- Main-host and bare-domain redirect rules follow docs/03.

## Focused checks

- Validate Docker/Traefik configuration when the environment is available.
- Inspect configuration and build output for secrets.

## Deferred batch gate

SITE-059 verifies real or production-like response headers, routes and redirects.

## Implementation evidence

- Added the frontend image, contact API image, frontend Nginx route
  configuration, app-local `.dockerignore` files and deployment verification
  script. SITE-055 moved these concerns into their app and `infra` boundaries.
- Configured environment-owned build values and deployment inputs; no secrets or
  host ports are hardcoded. Traefik routes cover the six public site routes,
  `/api/contact`, HTTPS, canonical host redirects and unregistered subdomains.
- Configured HSTS, CSP, X-Content-Type-Options, Referrer-Policy and
  Permissions-Policy through the shared Traefik security middleware.
- Focused checks passed: `npm.cmd run build`,
  `npm.cmd run verify:deployment`,
  `docker compose --env-file .env.example config --quiet` (with a validation
  certificate-resolver value), generated-output secret scan, and `git diff --check`.
- Deferred: a complete local Docker image build was not completed in this
  Windows/Unicode workspace. BuildKit failed on the context session header;
  the non-Bake fallback reached the native `better-sqlite3` compilation but
  exceeded the execution window. SITE-059 must perform the production-like
  image/runtime, header, route and redirect checks against the real Traefik
  environment.
