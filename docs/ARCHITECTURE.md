# Architecture

Status: implemented repository layout; application behavior remains unchanged.

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
| unknown primary-host path | branded `404.html` fallback with HTTP 404 |

cv.hubko.me, bare hubko.me and unregistered hubko.me hosts/routes redirect to
the canonical host as specified in docs/03.

## Source boundaries

Use a small two-app workspace and keep content separate from UI:

- `apps/frontend` owns the React/Vite/TypeScript/Tailwind application, its
  `package.json`, lockfile, build configuration, source, public files, brand
  assets, verification scripts and Dockerfiles.
- `apps/frontend/src/content` owns homepage, career, CV, contact and case-study
  data/copy.
- `apps/frontend/src/components` owns reusable visual and semantic components.
- `apps/frontend/src/layouts` owns site shell and case-study/CV layouts.
- `apps/frontend/src/lib` owns metadata, analytics and shared helpers.
- `apps/frontend/src/styles` owns Tailwind entry, tokens and global accessibility
  styles.
- `apps/frontend/public` owns static files copied directly to the site output;
  `apps/frontend/src/assets/brand` owns reusable brand source assets.
- `apps/contact-api` owns the NestJS endpoint, its package manifest, lockfile,
  source, tests and Dockerfiles. It persists submissions in SQLite and has no
  public read endpoint.
- Root `package.json` owns only workspace orchestration and shared checks.
- `infra` owns development, production and production-build Compose files.
- Root `scripts` owns checks that span both applications or inspect deployment
  configuration; frontend-only checks live in `apps/frontend/scripts`.

Do not put internal source notes or restricted Case 4 material in public content
modules.

## Rendering

The six known routes must generate meaningful HTML at build time. The build also
generates a non-indexable `404.html` fallback for unknown primary-host paths.
Client JavaScript
may enhance navigation, analytics and form submission but must not be required for
primary copy or metadata.

The prerender approach must be the lowest-friction React/Vite-compatible solution.
Do not introduce Next.js or a heavy framework against docs/04.

## Data flow

Contact form:

Browser form -> client convenience validation -> public NestJS endpoint ->
server-side validation/sanitization -> rate limit + honeypot check -> SQLite
database for manual processing.

The SQLite path remains server-side and is mounted from the Compose-adjacent
`infra/data/prod/contact-api` volume path. Development dependencies remain in
their owning app directories. Error responses expose only safe user-facing
states.

Analytics uses a configurable GA4 Measurement ID and named events from docs/04.
No fake IDs are committed.

## Deployment

Frontend: static build served from Docker through Traefik.
Contact API: existing NestJS infrastructure, routed securely through Traefik
with a persistent bind-mounted SQLite path under `infra/data`. Production verification must
test real responses, headers, direct routes, hard refresh, contact persistence
and redirects.

The repository deployment contract is `infra/docker-compose.prod.yml` with
`infra/docker-compose.build.yml`: frontend serves only the six known static
routes, a branded `404.html` fallback and SEO assets, while `/api/contact` is
stripped to the API's `/contact` endpoint. Nginx returns HTTP 404 for unknown
paths while internally rendering the fallback. Neither production service publishes a host port; both join the
server-owned external `traffic_net` network.

The server-owned Traefik instance terminates the Cloudflare-origin TLS
connection and receives only the routing labels from this compose: the frontend
serves `ivan.hubko.me`, and `/api/*` is stripped and sent to the contact API.
The separate server Traefik compose owns the catch-all redirect for every host
except `ivan.hubko.me`; unknown paths on the primary host remain with Nginx so
the branded HTTP 404 page is returned.

CI/CD is split by responsibility. `.github/workflows/quality.yml` detects
frontend, contact-API and shared-infrastructure changes, runs the relevant
verification jobs, builds both Docker images only when their inputs changed and
publishes immutable `sha-<commit>` images to GHCR on successful `main` builds.
`.github/workflows/deploy.yml` consumes the CI release manifest, leaves the
server-owned compose and `.env` untouched, passes only image references over SSH
and selectively updates services with `--no-deps`. A manual first-launch
  dispatch requires both image references; the remote compose command prepares
  SQLite storage, waits for health checks and records previous image references
  for rollback. After health and public smoke checks pass, the replaced image for
  each updated service is removed and the rollback state is cleared.

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
