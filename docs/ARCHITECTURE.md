# Architecture

Status: target architecture; implementation pending.

## Runtime routes

The canonical host is ivan.hubko.me.

| Route | Purpose |
| --- | --- |
| / | prerendered homepage with anchored About and Contact sections |
| /work/infrastructure-reliability | case study 1 |
| /work/operations-automation | case study 2 |
| /work/unified-platform | case study 3 |
| /work/account-automation | case study 4, always last in work ordering |
| /cv | primary indexable CV page |

cv.hubko.me remains an independent noindex, follow instance. Bare hubko.me and
unregistered hubko.me hosts/routes redirect as specified in docs/03.

## Planned source boundaries

Use a simple Vite-compatible structure and keep content separate from UI:

- src/content — homepage, career, expertise and case-study data/copy.
- src/components — reusable visual and semantic components.
- src/layouts — site shell and case-study/CV layouts.
- src/pages — route-level composition.
- src/lib — metadata, analytics and shared helpers.
- src/styles — Tailwind entry, tokens and global accessibility styles.
- public — static fonts, photos, OG images, robots and sitemap inputs.
- scripts — prerender, metadata and verification helpers when needed.
- contact API — small NestJS endpoint using the existing infrastructure convention;
  it persists submissions in SQLite and has no public read endpoint.

Do not put internal source notes or restricted Case 4 material in public content
modules.

## Rendering

The six known routes must generate meaningful HTML at build time. Client JavaScript
may enhance navigation, analytics and form submission but must not be required for
primary copy or metadata.

The prerender approach must be the lowest-friction React/Vite-compatible solution.
Do not introduce Next.js or a heavy framework against docs/04.

## Data flow

Contact form:

Browser form -> client convenience validation -> public NestJS endpoint ->
server-side validation/sanitization -> rate limit + honeypot check -> SQLite
database for manual processing.

The SQLite path remains server-side. Error responses expose only safe
user-facing states.

Analytics uses a configurable GA4 Measurement ID and named events from docs/04.
No fake IDs are committed.

## Deployment

Frontend: static build served from Docker through Traefik.
Contact API: existing NestJS infrastructure, routed securely through Traefik
with a persistent volume for the SQLite database. Production verification must
test real responses, headers, direct routes, hard refresh, contact persistence
and redirects.

The repository deployment contract is `compose.yml`: frontend serves only the
six known static routes plus SEO assets, while `/api/contact` is stripped to the
API's `/contact` endpoint. Neither service publishes a host port; both join the
user-owned Traefik network. Required VPS-owned inputs stay in `.env`: the Traefik
network and certificate resolver, hosts and optional analytics CSP sources.

Traefik terminates TLS, redirects HTTP to HTTPS, applies HSTS, CSP,
X-Content-Type-Options, Referrer-Policy and Permissions-Policy, routes the bare
domain and otherwise-unclaimed `*.hubko.me` hosts to the canonical home page, and
does not capture `cv.hubko.me`. Existing host-specific routers take priority over
the low-priority unregistered-subdomain router.

## Verification commands

The scaffolding task must create and document:

- npm run typecheck
- npm run build
- npm run verify:frontend
- npm run verify:content
- npm run verify:meta
- npm run verify:production
- npm run verify

Until they exist, a gate is DEFERRED rather than PASS.
