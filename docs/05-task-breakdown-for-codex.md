# Task Breakdown for Codex

Read `00-brand-brief.md` through `04-tech-spec.md` in full before starting anything.
This file is the execution order and launch Definition of Done; it does not replace
those documents. Work autonomously through each phase and stop only at the marked
**CHECKPOINT**s for Ivan/Claude review. Do not wait for approval on decisions already
made in `00–04`.

## Source-of-truth order and execution rules

When documents overlap, use them for these purposes:

1. `00-brand-brief.md` — positioning, audience, tone, visual direction, hard design
   constraints.
2. `01-content-facts.md` — source of truth for factual claims, dates, metrics,
   technologies, career history, case-study facts and NDA boundaries.
3. `02-copywriting-guidelines.md` — voice, case-study structure, confidentiality
   wording, engineering-lessons direction and SEO copy rules.
4. `03-site-structure-and-domains.md` — routes, navigation, domain/canonical behavior,
   structured data and contact requirements.
5. `04-tech-spec.md` — stack, prerendering, hosting, performance, accessibility,
   analytics and security requirements.
6. This file (`05`) — implementation order, checkpoints and verification criteria.

Non-negotiable rules for the whole build:

- Do not invent facts, numbers, dates, achievements, employers, technologies or
  project details that are not supported by `01-content-facts.md`.
- Do not expose internal-only Case 4 material. Only the explicitly safe framing from
  `01` may reach public copy, source content shipped to the browser, metadata,
  structured data or generated assets. When in doubt, remove the detail.
- Use English only for the public site at launch.
- Position Ivan as **Senior Backend Engineer & Tech Lead**. Frontend, infrastructure,
  leadership and AI-assisted tooling are supporting breadth, not separate identities.
- Keep the visual direction calm, technical, minimal and product-like. Do not drift
  into generic developer-portfolio aesthetics.
- Do not add features listed as out of scope in `04`.
- Prefer the conservative/minimal interpretation when implementation details are
  genuinely unspecified. Do not invent product requirements just to fill space.
- Keep case-study content separate from layout/component code so copy can be reviewed
  and edited without changing UI implementation.
- Never put secrets, API keys, GA credentials or deployment tokens
  in source control. Use the existing infrastructure's environment/secret pattern.

### External inputs — use approved documentation as truth

The brand brief, content facts and copywriting guidelines are the authoritative
source for the Engineering Approach themes. Do not invent attributed principles
or add a separate philosophy document. The implemented section uses only the
defensible themes approved in `00–02`.

`01` says a GitHub profile exists, and the owner-supplied public URL is now
configured as `https://github.com/Bruno-116aff`.

Other environment-owned values such as the GA4 Measurement ID
verification data should likewise be wired through configuration
and never invented. Missing credentials should not block implementation, but any
required production integration must be verified before launch is called complete.

---

## Phase 0 — Scaffolding and deployment skeleton

- Set up the project with **React + Vite + TypeScript** and Tailwind.
- Implement the light-theme palette and typography direction from
  `00-brand-brief.md`; no theme switcher or dark-mode infrastructure.
- Set up a React/Vite-compatible build-time prerender/static-generation approach for
  all 6 known routes:
  - `/`
  - `/work/infrastructure-reliability`
  - `/work/operations-automation`
  - `/work/unified-platform`
  - `/work/account-automation`
  - `/cv`
- Verify the primary meaningful page content will exist in generated HTML and is not
  dependent on client-side JavaScript to appear.
- Establish a clean content/data layer for case studies (structured TS/JSON or MDX,
  whichever is lower-friction in this stack) separate from presentation components.
- Add the base site shell and semantic layout primitives: header, nav, main content,
  footer, article/section patterns and skip-to-content support.
- Add the parameterized `<head>`/metadata system for per-route:
  - title
  - meta description
  - canonical URL
  - Open Graph metadata
  - Twitter/X card metadata
  - per-page structured data hooks
- Add `robots.txt` and `sitemap.xml` generation/scaffolding for the known public routes.
- Set up Docker + Traefik deployment configuration following Ivan's existing infra
  conventions, including HTTPS routing. Reuse the patterns from his other projects
  when available rather than introducing a new deployment model.
- Add environment/configuration handling for production-owned values such as contact
  backend URL/credentials, GA4 ID and any verification tokens.
- Ensure production builds do not publish development placeholders, source-only notes
  or sensitive draft material as public assets.

**CHECKPOINT 1:** confirm the project installs, type-checks/builds, deploys through the
intended Docker/Traefik path, and a minimal prerendered page is reachable on
`ivan.hubko.me` before filling it with final content.

---

## Phase 1 — Content authoring and factual/NDA review

### Homepage

Write the full homepage content in the structure defined by `03`:

- Hero — use the positioning and brand promise from `00`; communicate Senior Backend,
  Node.js/TypeScript, automation/production ownership, Cyprus and openness to
  remote/hybrid/relocation without turning the hero into a keyword list.
- Impact Strip — use only metrics explicitly approved in the numbers summary in `01`.
  Never substitute the larger unverified proxy-savings figure or expose prohibited
  Case 4 context.
- "What I Do" — three concise pillars that support the backend-engineer positioning,
  grounded in the capabilities in `01` rather than generic marketing claims.
- Featured Work — four case-study teasers in this exact order:
  1. Infrastructure Reliability
  2. Operations Automation
  3. Unified Platform
  4. Account Automation
- Career Story — preserve the actual timeline from `01`; do not smooth over frontend
  beginnings or rewrite titles to make the progression look more senior earlier.
- Engineering Approach / Philosophy — use the original concept source if it is
  available. If it is not, do not fabricate attributed "five principles"; prepare the
  section for review using only wording that can be defended from `00–02` and flag the
  missing source at CHECKPOINT 2.
- Technical Expertise — grouped text/categories, not skill percentages and not a logo
  wall. Frontend is supporting breadth, not the headline identity. AI-assisted
  engineering is a brief working-style note, not a headline skill.
- About — concise, career-relevant context with the supplied final photo in the
  properly sized image treatment.
- Contact — Email, LinkedIn, Telegram and GitHub treatment per `01/03`, plus the
  contact form. GitHub must remain non-prominent and must not imply an active public
  contribution history.

### Four case studies

Write all four case-study pages using the standard template in
`02-copywriting-guidelines.md`:

1. Context
2. Problem
3. Constraints
4. Approach
5. Architecture
6. Technology
7. Result
8. Engineering lessons

Requirements for every case:

- Use the exact standardized confidentiality sentence from `02` consistently across
  all four cases, not only the sensitive one.
- Explain engineering decisions and trade-offs; do not produce a technology inventory
  disguised as a case study.
- Keep architecture descriptions in plain language/text flow for launch. Do not create
  decorative architecture diagrams just because they are possible.
- Use only technologies and metrics supported by `01` for that case.
- Use the engineering-lessons drafts in `02` as grounded direction, adapting them so
  they are specific and not repeated verbatim across all cases.
- Internal links use descriptive anchor text, never generic "Read more" labels.

Case-specific safeguards:

- **Infrastructure Reliability:** publish the direct proxy line-item reduction
  (~$3.5K/year / acceptable `$3–4K/year` framing) and qualitative reliability impact.
  Do **not** publish `$15–20K/year` as a hard savings number. Fold the approved private
  network/access-control capability in as supporting context without explaining the
  threat model.
- **Operations Automation:** the defensible result is 1–3 hours to ~15 minutes,
  ~$7K/year direct savings, elimination of a dedicated manual role and near-zero
  manual processing errors. Keep the internal tracking system generalized exactly as
  required by `01/02`.
- **Unified Platform:** lead with cross-system reconciliation and the architecture
  maturity story (modular monolith → microservices as scope grew). Do not invent a
  dollar impact. Fold approved supporting systems into this case rather than creating
  extra standalone routes; the short-link/domain redirect capability may use the
  approved ~$6K/year combined savings and ~8% traffic-quality/click-through figure
  from `01` if included.
- **Account Automation:** use only the explicitly SAFE engineering framing from `01`.
  Never expose the prohibited business/activity details. If the attrition metric is
  used, only use the approved relative framing (`~5x reduction in operational account
attrition`) with no explanation of what attrition represents. Keep this case fourth.

### CV page

- Implement `/cv` as the main-site CV route described in `03`.
- It may mirror the existing `cv.hubko.me` _structure_ if that is accessible, but all
  factual claims must still be reconciled against `01-content-facts.md`; do not import
  unsupported claims just because they exist on the old CV.
- Include education only in the CV/footer-level context as specified in `01`.
- Keep the same primary positioning as the main site.

### Content QA before approval

Before CHECKPOINT 2:

- Search all public copy for the banned marketing phrases from `00` and remove them.
- Search all public copy for Case 4 prohibited terms/details from `01`; none may ship.
- Verify every numeric claim against `01`.
- Verify career dates/titles against `01`.
- Verify the site is English-only.
- Verify PS Simple Traffic is treated correctly: the employer/general AdTech domain
  can be named; internal implementation details still follow the case-specific rules.
- Verify all four cases use the standard confidentiality phrasing.
- Verify no placeholder testimonial, fake quote or unsupported achievement exists.

**CHECKPOINT 2 — mandatory, do not skip:** surface the complete text of the homepage,
all four case studies and `/cv` for a human read-through **before** final visual polish
or public launch. Explicitly flag (a) any unresolved Engineering Approach content and
(b) the missing GitHub URL if still unresolved. Case 4 receives a second NDA-focused
read. Public career copy with real confidentiality constraints must not bypass this
checkpoint.

---

## Phase 2 — Visual build and interaction

- Build the visual system from `00-brand-brief.md`:
  - light theme only
  - single restrained blue accent
  - generous whitespace
  - Inter or Geist Sans for body/headings
  - JetBrains Mono or Geist Mono only for technologies, metrics, labels and code-like
    fragments, never full body paragraphs
  - minimal `IH` wordmark/monogram only
  - subtle motion in the specified 150–250ms range
- Use `leerob.com` as the primary structural/typographic reference, `brianlovin.com`
  for clean career presentation and `paulstamatiou.com` for long-form article rhythm.
  Do not copy them literally and do not use `rauno.me` as a styling reference.
- Build reusable components for:
  - site navigation
  - Impact Strip
  - case-study cards/teasers
  - career timeline/cards
  - grouped Technical Expertise
  - long-form case-study layout
  - About/photo area
  - Contact area/form
- Navigation stays minimal: `Work`, `About`, `Contact`, `CV →`; no dropdown or
  mega-menu. From non-home routes, Work/About/Contact must correctly link back to the
  corresponding homepage sections.
- `CV` points to `/cv`; it is not the primary hero CTA.
- Do not add skill bars, a first-screen tech-logo wall, terminal/matrix visuals,
  green-on-black styling, stock developer photography, parallax, WebGL, typewriter
  effects, custom cursors or scroll hijacking.
- If the optional nodes/connections motif is used, keep it decorative and sparse; do
  not turn every section into an architecture diagram.
- Keep motion non-essential and support `prefers-reduced-motion`.
- Make the layout intentionally responsive rather than relying on accidental wrapping;
  long case-study text, metrics, navigation and form controls must remain usable on
  narrow screens.

### Contact form implementation

Build the form UI (`name`, `email`, `message`) and a small NestJS contact endpoint
on Ivan's existing infrastructure:

- store accepted submissions in a server-side SQLite database for manual processing
- keep the `gubko360@gmail.com` contact button as a direct `mailto:` destination;
- use the existing NestJS conventions where available
- validate/sanitize expected inputs server-side; client validation is convenience,
  not the security boundary
- implement rate limiting
- implement a honeypot field at minimum
- add Cloudflare Turnstile only if it fits easily; it is not a launch blocker
- show clear accessible submitting/success/error states without leaking internal
  backend implementation details
- prevent duplicate accidental submissions while a request is in flight
- keep any API credentials server-side via environment/secret configuration
- verify the deployed frontend can reach the endpoint through the intended production
  routing without weakening security unnecessarily

### Structured data

- Homepage: `WebSite` + `Person` as specified in `03`.
- `Person.jobTitle`: `Senior Backend Engineer & Tech Lead`.
- `Person.sameAs`: LinkedIn plus the configured GitHub URL; never invent the
  GitHub handle.
- Each case study: `Article` with headline, author/Person relationship and valid
  publication/modified dates representing the page publication/update, not invented
  project dates. Include `image` only when a real page/share image exists.

**CHECKPOINT 3:** review the visual result against `00`. Flag and fix anything that
looks like a generic developer template or adds noise without improving recruiter/CTO
understanding. Also verify the site still communicates the core positioning and
measurable impact in one scroll for a non-technical reader.

---

## Phase 3 — SEO, accessibility, performance, analytics and security

### SEO / discoverability

- Populate a unique title and meta description for every public route.
- Use the naming rules in `02`:
  - homepage: `Ivan Hubko — Senior Backend Engineer & Tech Lead`
  - case studies: `[Page Topic] — Ivan Hubko`
- Add a correct self-referencing canonical URL for each `ivan.hubko.me` page.
- Ensure `/cv` on the primary site is the indexable main CV location; the
  separate `cv.hubko.me` host redirects to the canonical site as required by
  `03`.
- Finish `robots.txt` and `sitemap.xml` with the actual launch routes/canonical URLs.
- Create per-page OG/Twitter metadata and 1200×630 share images. Simple text-on-brand
  images are sufficient; do not over-design them.
- Verify descriptive internal link text and no keyword stuffing.
- Verify generated page source contains the primary copy, title/meta/canonical and
  structured data without requiring client-side rendering.

### Accessibility — target WCAG 2.2 AA

- Normal text contrast ≥ 4.5:1; large text ≥ 3:1.
- Visible keyboard focus states.
- Full keyboard navigation.
- Semantic buttons/links; no clickable `div` substitutes.
- Meaningful alt text for content-bearing images; decorative images handled as such.
- Do not communicate information by color alone.
- Respect `prefers-reduced-motion`.
- Provide and test a skip-to-content link.
- Use semantic landmarks and a clean heading hierarchy: one H1 per page, logical
  H2/H3 nesting.
- Verify form labels, validation messages, status messages and error states are
  accessible to assistive technology.

### Performance

Work toward the `04` Core Web Vitals targets at the 75th percentile:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1

Implementation requirements:

- keep client JavaScript minimal
- do not add a heavy UI/animation library for effects that can be done simply
- use AVIF/WebP where practical
- include explicit image width/height to prevent layout shift
- lazy-load below-the-fold images
- no video backgrounds
- optimize font loading/subsetting/preloading and avoid font-induced layout shift
- inspect the production build for unexpectedly large client bundles and remove
  unnecessary code/dependencies

Before launch, use production-like lab checks to catch obvious regressions. The stated
75th-percentile target is ultimately a field metric, so do not pretend local Lighthouse
scores are the same thing; monitor real data after traffic exists.

### Analytics

- Add GA4 using a configurable production Measurement ID.
- Track at minimum these named events:
  - `case_study_open`
  - `cv_click`
  - `email_click`
  - `linkedin_click`
  - `telegram_click`
  - `github_click`
- Verify each event fires once for the intended user action and is not duplicated by
  hydration/rerendering.

### Security

Configure at Traefik where practical, as required by `04`:

- HTTPS
- HSTS
- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Also verify:

- security headers are present on real production responses, not only in config files
- CSP allows only the resources actually needed by the site (including GA4/contact
  infrastructure where applicable) and is not disabled with an unnecessarily broad
  policy just to make errors disappear
- no private credentials or internal Case 4 source material are included in public
  client bundles, generated HTML, source maps or static assets

---

## Phase 4 — Domain, redirect and production wiring

- Point `ivan.hubko.me` to the production deployment and confirm HTTPS/certificate
  behavior through Traefik.
- Confirm all six registered routes load directly by URL and after a hard refresh.
- Redirect `cv.hubko.me`, the bare domain and all other `hubko.me` subdomains to
  the primary site through the server-owned Traefik catch-all.
- Configure `hubko.me` bare domain to **301** redirect to `ivan.hubko.me`.
- Configure the required catch-all for other unregistered `hubko.me` subdomains/routes
  to **301** redirect to the primary site, using the available DNS/Traefik conventions.
- On `ivan.hubko.me`, any unmatched route must remain a branded HTTP 404 page;
  only unmatched hosts redirect to the primary site, per `03`.
- Verify canonical URLs always point to the intended `ivan.hubko.me` route and do not
  inherit the redirecting host.
- Verify `robots.txt`, `sitemap.xml`, share images and any static assets resolve on the
  production host.
- Verify the public production form reaches the contact endpoint and accepted
  submissions are persisted for manual processing.

---

## Phase 5 — Production verification / Definition of Done

Do not call the project complete because it "looks finished." Run the checks below on
the deployed production build.

### Build/runtime

- Fresh install/build succeeds using the documented project commands.
- TypeScript/type-checking passes; lint/tests configured by the project pass.
- No production-breaking console errors or uncaught runtime errors on any registered
  route.
- All 6 known routes return the intended page and contain meaningful prerendered HTML.
- Direct navigation and hard refresh work on every registered route.
- No visible `TODO`, `Lorem ipsum`, fake testimonial, dead button or development-only
  placeholder remains, except the explicitly allowed neutral photo placeholder if Ivan
  has not supplied the final photo.

### Content/NDA

- Re-check every public number against `01`.
- Re-check career dates/titles against `01`.
- Re-check banned marketing phrases from `00`.
- Re-check Case 4 prohibited details/terminology from `01` across rendered pages,
  metadata, JSON-LD and share text.
- Confirm all four cases contain the standard confidentiality sentence from `02`.
- Confirm Case 4 is last and no sensitive internal explanation is needed to understand
  the public engineering story.
- Confirm no unsupported GitHub activity, project result or employer claim has been
  introduced.

### UX/accessibility

- Keyboard-only walkthrough succeeds across navigation, case studies, `/cv` and form.
- Focus states are visible.
- Skip link works.
- Heading structure and landmarks are valid on every route.
- Form labels/status/errors are understandable without relying on color.
- Reduced-motion mode removes non-essential motion.
- Check the important layouts on phone-width, tablet-width and desktop-width viewports;
  no horizontal overflow, clipped text or unusable controls.

### SEO/social

- Unique title/meta description on every route.
- Correct canonical on every route.
- Correct `robots.txt` and sitemap contents.
- Valid homepage `WebSite` + `Person` data.
- Valid `Article` data on all four case-study pages.
- OG/Twitter metadata is populated and the referenced 1200×630 assets resolve.
- Primary content is visible in raw/generated HTML.
- `ivan.hubko.me/cv` is the primary CV page; `cv.hubko.me` redirects to the
  canonical host.

### Performance/security

- Production-like performance audit shows no obvious blocker to the CWV targets.
- Images use explicit dimensions and below-fold images lazy-load.
- Font loading does not create obvious layout shift.
- HTTPS works and the required HSTS/CSP/X-Content-Type-Options/Referrer-Policy/
  Permissions-Policy headers are visible on actual production responses.
- No secrets or sensitive draft content are present in the client bundle/static output.

### Integrations

- Contact form succeeds with a valid submission and the accepted record is stored
  in server-side SQLite for manual processing.
- Invalid form input is rejected cleanly.
- Honeypot/rate limiting are active on the deployed endpoint.
- Email, LinkedIn and Telegram actions point to the approved destinations; the
  email action uses `mailto:gubko360@gmail.com`.
- GitHub action is enabled only after the real profile URL is supplied.
- All required GA4 events are verified.

### Domains/redirects

- `ivan.hubko.me` is the canonical production host.
- `hubko.me` redirects with 301 to the primary host.
- Required unregistered host/route catch-alls behave as specified in `03`.
- Unknown routes on the main site return the branded HTTP 404 page.
- No redirect loop exists between `hubko.me`, `ivan.hubko.me` and `cv.hubko.me`.

**CHECKPOINT 4 — launch review, mandatory:** perform a complete human walkthrough of
the locally built site after all automated/manual verification above. Review it once
as a recruiter/HR reader (positioning, clarity, measurable impact) and once as a
technical hiring reader (architecture signal, credibility, trade-offs, NDA safety).
Resolve every launch-blocking item before calling the site done or sending it to
recruiters.

At this checkpoint, explicitly list any remaining input that code cannot supply.
Do not silently replace user-owned data with guesses.

---

## Launch is complete only when

All of the following are true:

- CHECKPOINTS 1–4 have been completed.
- The six intended routes are deployed, prerendered and working.
- Public copy has passed factual and NDA review.
- The visual result matches the brand brief without portfolio-template drift.
- Contact works end to end with spam protection.
- SEO metadata, structured data, sitemap, robots and share assets are live.
- WCAG-oriented accessibility checks and performance checks are complete.
- GA4 events are configured and verified in the local browser runtime.
- Required security headers are confirmed on production responses.
- Domain, canonical and redirect behavior matches `03`.
- No unresolved **launch-blocking** placeholder, secret, invented fact or sensitive
  Case 4 detail remains.

If a requirement cannot be completed because a user-owned value/source is genuinely
missing, do not invent it and do not hide the gap: mark it explicitly in CHECKPOINT 4
with the exact missing input and the already-completed implementation waiting for it.

---

## Explicitly deferred — do not build now

Do not scope, implement or repeatedly ask about these during this launch round:

- dark mode / theme switcher
- `/notes`, blog or CMS
- testimonials component unless real testimonials are actually received before launch
- multi-language / Russian version
- live chat
- calendar booking

If Codex reaches a natural extension point for one of these, skip it and continue with
the launch plan rather than expanding scope.
