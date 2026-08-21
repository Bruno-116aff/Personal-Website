# SITE-054 — Configure Docker, Traefik and security

- Batch: 5
- Area: deployment/security
- State: READY
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
