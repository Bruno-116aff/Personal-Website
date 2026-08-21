# Technical Spec

## Stack
- **React + Vite + TypeScript** (Ivan's existing stack — no Astro/Next, stick
  with what he already knows and operates).
- **Must be prerendered/static, not a client-only SPA.** Use a static-site
  generation approach compatible with React/Vite (e.g. vite-plugin-ssr / a
  prerender step per route) so content is in the actual HTML for SEO and fast
  LCP — this is non-negotiable given the SEO goals in 03. If full SSR is more
  effort than it's worth for a small, mostly-static content site, a build-time
  prerender of the known routes (home + 4 case studies + /cv) is sufficient —
  there is no dynamic per-request content on this site besides the contact form
  submission, which is a client-side POST to a backend endpoint and doesn't need
  SSR.
- Tailwind for styling (matches Ivan's usual stack).
- Content for case studies can live as structured data (JSON/TS objects) or MDX —
  Codex's choice, whichever is less friction in a React/Vite prerendered setup.
  Keep case-study content separate from layout components so copy edits don't
  require touching component code.
- Contact form backend: a small NestJS endpoint on Ivan's existing infra,
  forwarding submissions to gubko360@gmail.com. Reuse his standard patterns
  (validation, rate limiting) rather than introducing a new framework for this
  one endpoint.

## Hosting
- Ivan's own VPS via **Docker + Traefik**, same as his other infrastructure.
  Standard container + Traefik label routing, HTTPS via Traefik's usual cert
  resolver setup. No Vercel/Netlify/Cloudflare Pages — this stays on his own infra.

## Performance targets (Core Web Vitals, 75th percentile)
- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Practical requirements to hit these:
- Minimum JavaScript, no heavy UI library beyond what's already in the stack.
- AVIF/WebP images with explicit width/height attributes.
- Lazy-load below-the-fold images.
- No video backgrounds, no heavy animation dependencies.
- Font loading optimized (subset/preload, avoid layout shift from web fonts).

## Accessibility
Target: **WCAG 2.2 AA**.
- Normal text contrast ≥ 4.5:1, large text ≥ 3:1 (the palette in 00-brand-brief.md
  was chosen with this in mind — don't introduce new colors without checking
  contrast).
- Visible keyboard focus states — do not remove/hide focus outlines for
  aesthetic reasons.
- Full keyboard navigation, semantic buttons/links (no click-handlers on divs).
- Meaningful `alt` text on all content-bearing images.
- No information conveyed by color alone.
- Respect `prefers-reduced-motion`.
- Skip-to-content link.

## Semantic HTML
Use real `<header> <nav> <main> <section> <article> <aside> <footer>` and a
clean heading hierarchy (single H1 per page, logical H2/H3 nesting). All
meaningful text must exist as real DOM content — nothing rendered only via
canvas or as a background image with no text alternative.

## Analytics & tracking
- **Google Analytics 4** (Ivan's choice — not Plausible/Umami).
- Google Search Console — set up regardless.
- Track at minimum: case_study_open, cv_click, email_click, linkedin_click,
  telegram_click, github_click.

## Security headers (even for a static/mostly-static site)
HTTPS, HSTS, Content-Security-Policy, X-Content-Type-Options, Referrer-Policy,
Permissions-Policy. Configure at the Traefik layer where possible rather than
in application code.

## What's explicitly out of scope for launch
- Dark mode / theme switcher
- `/notes` or any blog/CMS functionality
- Testimonials component
- Live chat, calendar booking
- Multi-language (Russian) version
