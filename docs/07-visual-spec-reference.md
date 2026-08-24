# Visual Spec v3 — Reference Implementation (Dark)

This specification pairs with a real rendered file: **`style-reference.html`**.
Open it in a browser before touching any code. The HTML file wins if it and this
document disagree, except for the explicit WCAG AA refinements below.

## How to use this
1. Open `style-reference.html` in a browser. This is the target register —
   not a mockup to loosely riff on, but the literal source of the design
   tokens, spacing, and component patterns for the real site.
2. Copy the CSS custom properties in the `:root` block verbatim into the
   Tailwind config (as theme colors) or as global CSS variables.
3. Rebuild the shared components (nav, hero, impact strip, work card, tag,
   button, section header) to match the reference file's HTML/CSS exactly —
   same border treatment, same spacing, same hover behavior.
4. Content, copy, and page structure are unchanged from `01-content-facts.md`
   / `02-copywriting-guidelines.md` / `03-site-structure-and-domains.md` —
   this pass only replaces how it's styled, not what it says or how pages
   are organized.

## Design rationale (why these choices, not just what they are)
- **Palette:** graphite base (`#0A0B0F`), not pure black — pure black plus a
  bright accent is the generic "AI dark theme" default; graphite + a single
  restrained indigo (`#5B78F6`, not neon/acid) reads as Linear/Raycast/Vercel,
  not terminal/hacker.
- **Type:** Inter Tight (600 weight) for display/headings, regular Inter (400)
  for body, JetBrains Mono for eyebrows/labels/data only. The condensed
  display face paired with a separate body face is a deliberate two-face
  system, not the same font doing both jobs at different sizes — this is
  what keeps the type from feeling like a Tailwind default.
- **Impact Strip is NOT boxed cards** — it's a single row with hairline
  vertical dividers (`border-left: 1px solid var(--border-subtle)`). This was
  a specific fix: boxed metric cards are the single most common template
  pattern; a divided row reads more considered and matches the reference
  sites' register.
- **Tags have no borders** — either mono-font pills with a flat
  `--bg-surface` background and no border (used in the hero tag row), or
  plain text joined by a middle-dot separator (used in Technical Expertise).
  Never mix bordered and unbordered tag styles across sections — pick one
  per context and stay consistent.
- **Work cards form a single bordered grid** (border on the container, 1px
  hairline between cells via background-color trick — see `.work-grid` CSS)
  rather than each card having its own independent border + gap + shadow.
  This reads as one connected system rather than four separate boxes, which
  fits an engineer's "systems" identity better than a generic card grid.
- **Hero motif:** a low-opacity node/line graph held in the top-right of the
  centered hero composition, built as inline SVG (see `.hero-motif`). Its size
  scales fluidly and its right edge follows the content container rather than
  the viewport edge. This is the one signature element — restrained, on-brand
  for backend/systems work, present only in the hero, not repeated elsewhere
  on the page.
- **Numbered case studies (01/02/03/04):** justified here specifically
  because the four cases are in a deliberately curated priority order
  (strongest/safest first, per `03-site-structure-and-domains.md`) — the
  numbering communicates real information (read-priority), not decoration.

## Exact tokens (copy verbatim — also present in the HTML file's `:root`)
```css
--bg-base:        #0A0B0F;
--bg-surface:     #14161C;
--bg-surface-hi:  #191B22;
--border-subtle:  rgba(255,255,255,0.08);
--border-visible: rgba(255,255,255,0.16);
--text-primary:   #EDEEF1;
--text-secondary: #8B92A3;
--text-tertiary:  #788191;   /* AA on --bg-surface */
--accent:         #5B78F6;
--accent-text:    #8AA0FF;
--accent-soft:    rgba(91,120,246,0.12);
--accent-control: #4A67E5;   /* white text = 4.81:1 */
--accent-control-hover: #405FD5;
--metric:         #34D399;   /* use only for standout result numbers, sparingly */

--font-display: 'Inter Tight', 'Inter', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', ui-monospace, monospace;

--radius: 12px;
--max-w: 1180px;
```
Google Fonts import used in the reference (swap for self-hosted fonts in
production for performance, per `04-tech-spec.md`'s Core Web Vitals targets —
don't ship a render-blocking Google Fonts request on the live site):
`Inter:wght@400;500;600`, `Inter+Tight:wght@500;600;700`, `JetBrains+Mono:wght@400;500`

Production font contract: use self-hosted WOFF2 assets only, with metric
overrides and `font-display: optional` defined before enabling each local face.
The Google Fonts import above belongs to this visual reference artifact only;
the live site must not request a remote font.

Contrast contract: the approved public pairs are `--text-primary` on
`--bg-base` (16.95:1), `--text-secondary` on `--bg-base` (6.31:1),
`--text-tertiary` on `--bg-surface` (4.60:1), and `--accent-text` on `--bg-base`
(8.01:1). Tertiary text must not be placed on `--bg-surface-hi` (4.38:1).
White button text uses `--accent-control` (`#4A67E5`) and its hover token
(`#405FD5`), never the brand accent `#5B78F6`; the control pairs are 4.81:1 at
rest and 5.50:1 on hover.

## Type scale (exact px/weight — see reference file's "Type & token reference" section)
| Role | Size | Weight | Letter-spacing | Font |
|---|---|---|---|---|
| H1 | 56px | 600 | -0.02em | Inter Tight |
| H2 | 34px | 600 | -0.015em | Inter Tight |
| H3 (card titles) | 21px | 600 | normal | Inter Tight |
| Body | 17px | 400 | normal | Inter |
| Small / secondary | 14px | 400 | normal | Inter |
| Eyebrow / mono label | 12px | 500 | 0.06–0.08em, uppercase | JetBrains Mono |

## Components to rebuild exactly as in the reference file
- `nav` — logo mark (monogram badge) + nav links + CV link with arrow
- `.hero` + `.hero-motif` — headline, subhead, tag row, primary/secondary CTA;
  the motif uses a bounded fluid size and container-aligned right inset, with a
  16px viewport inset on narrow screens.
- `.impact` / `.impact-inner` / `.impact-item` — hairline-divided stat row
- `.work-grid` / `.work-card` — bordered grid, hover background shift, arrow
  micro-interaction on hover (`.work-link span` gap animation)
- `.expertise-grid` / `.expertise-list` — grouped, unbordered, dot-separated
- `.btn-primary` / `.btn-secondary` — exact padding, radius, hover states

## Photo (About section) — still unresolved, do not guess
No photo until Ivan provides one. The About section is text-only for now and the
current public photo asset must be removed. When a real photo arrives, apply a
duotone treatment tinted toward `--accent` rather than showing it full-color —
implement that as a follow-up task, not now.

## Rollout — same checkpoint structure as before, now against a concrete target
1. Implement tokens + rebuild shared components to visually match
   `style-reference.html` pixel-for-pixel where feasible.
2. **CHECKPOINT:** screenshot the real homepage next to the reference file's
   render, side by side. They should look like the same design system. If
   they don't, the gap is the thing to fix before moving to the other 5 pages.
3. Roll out to all pages (homepage, 4 case studies, CV) once the homepage
   checkpoint is approved.
4. Final full-site screenshot review, desktop + mobile.
