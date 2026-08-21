# Site Structure & Domains

## Domains
- `ivan.hubko.me` — **primary site**, canonical host for everything below.
- `ivan.hubko.me/cv` — duplicates the CV content (see note below).
- `cv.hubko.me` — stays live independently as-is (existing resume tool). Keep
  `noindex, follow` on it so it doesn't compete with the main site in search.
- `hubko.me` (bare) and any other unregistered subdomain/route on `hubko.me` →
  **301 redirect to `ivan.hubko.me`**. Catch-all: any route not explicitly
  registered on the main site redirects to the `ivan.hubko.me` homepage, not a
  404 page — this is a personal brand site, not a large app, a dead-end 404 is
  worse than a redirect to home.

## Routes (MVP)
```
ivan.hubko.me/                          → Home (single scroll: Hero, Impact,
                                           What I Do, Featured Work, Career Story,
                                           Engineering Approach, Technical
                                           Expertise, About, Contact)
ivan.hubko.me/work/infrastructure-reliability
ivan.hubko.me/work/operations-automation
ivan.hubko.me/work/unified-platform
ivan.hubko.me/work/account-automation
ivan.hubko.me/cv                        → duplicate/embed of cv.hubko.me content
```

No `/notes`, no `/about`, no `/contact` as standalone routes for launch — About
and Contact are sections on the homepage (Ivan's explicit call). Nav can still
anchor-link to `#about` and `#contact` from other pages.

## Navigation
```
Ivan Hubko          [wordmark/monogram, links home]

Work   About   Contact   CV →
```
`Work`, `About`, `Contact` scroll/link to homepage sections when not already on
the homepage. `CV` links to `/cv`. Keep nav minimal — no dropdown, no mega-menu.

## Case study order (as it appears in Featured Work + nav/sitemap)
1. Infrastructure Reliability
2. Operations Automation
3. Unified Platform
4. Account Automation

## Structured data (schema.org)
- Homepage: `WebSite` (name: Ivan Hubko, url: https://ivan.hubko.me/) + `Person`
  (name, url, jobTitle: "Senior Backend Engineer & Tech Lead", sameAs: [LinkedIn
  URL, GitHub URL]).
- Case study pages: `Article` (headline, datePublished, dateModified, author →
  Person entity, image if available).
- `robots.txt`, `sitemap.xml` at root, canonical URL on every page, OG metadata
  + Twitter/X card metadata on every page (1200×630 OG images — can be simple
  text-on-brand-color images, no need for elaborate design).

## Contact
- Buttons: Email (mailto: gubko360@gmail.com for now), LinkedIn, Telegram, GitHub
  (present but not emphasized — see 01-content-facts.md).
- Plus a contact form (name, email, message) that stores submissions in a
  server-side SQLite database for manual processing. Backend: simple NestJS
  endpoint using Ivan's existing infrastructure conventions. It needs basic spam
  protection: rate limit + honeypot at minimum; Cloudflare Turnstile is not a
  launch blocker.
- No live chat, no calendar booking widget — out of scope for launch.
