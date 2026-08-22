# Ivan Hubko — Personal Site

Personal website and portfolio for **Ivan Hubko**, positioned as a **Senior Backend Engineer & Tech Lead**.

> I build backend systems that replace manual work with reliable automation.

The site is designed for technical hiring conversations: clear positioning for recruiters and hiring managers, backed by practical case studies about backend systems, automation, integrations and production ownership.

[Primary site](https://ivan.hubko.me) · [LinkedIn](https://www.linkedin.com/in/ivan-hubko-5a635b245)

## What is included

- English-only, light-theme personal site with a restrained technical/product aesthetic.
- Six build-time prerendered routes: homepage, four case studies and `/cv`.
- Structured content kept separate from presentation in `apps/frontend/src/content`.
- Four case studies, ordered from infrastructure reliability to specialized account automation. The last case is intentionally generalized to respect confidentiality boundaries.
- Semantic HTML, keyboard-visible focus states, skip navigation and reduced-motion support.
- Per-route titles, descriptions, canonical URLs, Open Graph/Twitter metadata, JSON-LD, `robots.txt` and `sitemap.xml`.
- Optional GA4 instrumentation with named events; analytics stays disabled until a valid user-owned measurement ID is configured.
- Contact form with client/server validation, honeypot protection, rate limiting and server-side SQLite persistence for manual processing. SMTP delivery is not part of the launch implementation.
- Docker-based deployment through Traefik with HTTPS redirects and security headers.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with positioning, selected work, career, expertise, about and contact sections |
| `/work/infrastructure-reliability` | Proxy/modem infrastructure reliability case study |
| `/work/operations-automation` | Server and domain provisioning pipeline case study |
| `/work/unified-platform` | Unified operational platform case study |
| `/work/account-automation` | Generalized account lifecycle and scheduling case study |
| `/cv` | Primary indexable CV page |

The canonical production host is `ivan.hubko.me`. The separate `cv.hubko.me` instance remains outside this repository and must stay `noindex, follow`.

## Architecture

```text
.
├── apps/
│   ├── frontend/       React + Vite + TypeScript + Tailwind site
│   └── contact-api/    NestJS endpoint with SQLite persistence
├── infra/              Docker Compose and Traefik deployment definitions
├── scripts/            Cross-application and deployment checks
├── docs/               Product, content, architecture and workflow source of truth
└── package.json        Root orchestration scripts
```

### Frontend

The frontend is a static React/Vite application. The Vite build renders all six known routes into HTML at build time, so primary copy and metadata do not depend on client-side JavaScript. The browser then hydrates the output for navigation, analytics and contact-form submission.

### Contact API

The API is a small independent NestJS service. `POST /contact` validates and stores accepted submissions in SQLite. In production, Traefik exposes it as `POST /api/contact` and strips the `/api` prefix before forwarding the request.

## Tech stack

- React 18, Vite 6, TypeScript 5
- Tailwind CSS 3 with CSS custom properties for the visual tokens
- NestJS 11, class-validator and better-sqlite3
- Node.js 20+
- Docker, Docker Compose, Nginx and Traefik

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm
- Docker and Docker Compose for the integrated development or production-like setup

### Install dependencies

Dependencies are owned by each application rather than by the repository root:

```bash
npm install --prefix apps/frontend
npm install --prefix apps/contact-api
```

### Run the frontend

```bash
npm run dev
```

The Vite development server is available at `http://localhost:5173`.

To connect the direct frontend process to a locally running API, create the uncommitted file `apps/frontend/.env.local`:

```dotenv
VITE_CONTACT_API_URL=http://localhost:3001/contact
```

Then start the API with the required local origin configuration:

```powershell
$env:CONTACT_ALLOWED_ORIGIN = "http://localhost:5173"
npm run dev:contact-api
```

### Run the integrated Docker development environment

```bash
npm run dev:up
```

This starts the frontend on `http://localhost:5173` and the contact API on `http://localhost:3001`, with development SQLite data mounted under `infra/data/dev/contact-api`.

Stop the environment with:

```bash
npm run dev:down
```

## Build and verification

The root scripts run the appropriate checks in both applications:

```bash
npm run typecheck
npm run test
npm run build
npm run verify:frontend
npm run verify:accessibility
npm run verify:performance
npm run verify:content
npm run verify:meta
npm run verify:deployment
npm run verify
```

`npm run verify:production` is intentionally deferred until the user-owned VPS, Docker/Traefik, DNS and production response checks are available. It must not be treated as a local pass.

## Production configuration

Copy the example environment file before using the production Compose files:

```powershell
Copy-Item .env.example .env
```

The production setup requires the owner’s Traefik network and certificate resolver. Optional public values include the real GitHub URL, LinkedIn override, GA4 measurement ID and frontend contact API URL. Secrets, credentials and deployment tokens must remain outside Git.

Build and inspect the production images with:

```bash
npm run prod:config
npm run prod:build
```

Start, inspect or stop the production stack with:

```bash
npm run prod:up
npm run prod:logs
npm run prod:down
```

The production Compose files do not publish application ports directly; traffic is expected to enter through the external Traefik network. Contact submissions persist in `infra/data/prod/contact-api`.

## Project documentation

The repository documentation is the source of truth for product decisions and public claims:

- [`docs/00-brand-brief.md`](docs/00-brand-brief.md) — positioning, audience, tone and visual direction.
- [`docs/01-content-facts.md`](docs/01-content-facts.md) — verified career facts, metrics, technologies and confidentiality boundaries.
- [`docs/02-copywriting-guidelines.md`](docs/02-copywriting-guidelines.md) — public copy structure and case-study rules.
- [`docs/03-site-structure-and-domains.md`](docs/03-site-structure-and-domains.md) — routes, navigation and domain behavior.
- [`docs/04-tech-spec.md`](docs/04-tech-spec.md) — stack, rendering, hosting, accessibility and security requirements.
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — approved visual system and reusable UI decisions.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — runtime contracts and repository boundaries.
- [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) — current phase, completed work and known external inputs.

## Current status

The implementation is in **launch hardening**. The application foundation, content routes, contact integration and repository structure are implemented. Production launch still depends on user-owned inputs and external verification, including:

- real public GitHub URL;
- final personal photo;
- original Engineering Philosophy source, if it is to be published;
- GA4 Measurement ID and Search Console verification data;
- VPS, Docker/Traefik, DNS and live production access.

These values are kept configurable or explicitly deferred; they are never guessed or committed as secrets.

## Scope boundaries

Launch deliberately excludes dark mode, a blog/CMS, testimonials, live chat, calendar booking and a Russian version. The public site remains focused on helping a recruiter or technical hiring manager understand Ivan’s backend profile and start a conversation.
