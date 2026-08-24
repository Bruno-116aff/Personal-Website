# SITE-109 — Add restrained motion system

- Batch: 11
- Area: motion and interaction polish
- State: COMPLETE
- Depends on: SITE-104, SITE-106, SITE-107, SITE-108

## Goal

Add a lightweight motion layer that gives the site a polished sense of arrival
and reading rhythm without changing copy, routes, layout contracts or the
approved dark visual system.

## Non-goals

- Do not add a heavy animation library or visual-effects dependency.
- Do not add parallax, WebGL, custom cursor, typewriter effects, animated motif,
  hover lifts, animated counters or scroll hijacking.
- Do not change public content, metadata, route behavior or contact behavior.

## Targeted source

- `apps/frontend/src/components/motion.tsx`
- `apps/frontend/src/components/SiteShell.tsx`
- `apps/frontend/src/main.tsx`
- `apps/frontend/src/styles/index.css`
- `docs/DESIGN_SYSTEM.md`

## Behavior steps

1. Add progressive-enhancement reveal behavior for hero, section, card, timeline,
   case-study, CV and 404 surfaces using IntersectionObserver with a no-JS-safe
   visible fallback.
2. Add a thin scroll-progress indicator to long Case Study and CV routes only.
3. Keep motion within the approved calm timing range and preserve visible focus,
   semantic HTML, keyboard operation and `prefers-reduced-motion` behavior.
4. Keep the hero node motif static and preserve the existing hover interactions.

## Acceptance criteria

- Homepage, all four case studies, CV and 404 render primary content without
  requiring JavaScript.
- Reveal animations run once, use small opacity/vertical offsets and do not cause
  clipping, horizontal overflow or layout shift.
- Long routes show a non-interactive indigo progress line; homepage does not.
- Reduced-motion users receive no non-essential reveal or progress animation.
- No new runtime dependency is required.
- Existing copy, routes, metadata and contact behavior remain unchanged.

## Focused checks

- `npm.cmd --prefix apps/frontend run typecheck`
- `npm.cmd --prefix apps/frontend run build`
- `npm.cmd --prefix apps/frontend run lint`
- `npm.cmd --prefix apps/frontend run verify:frontend`
- Responsive browser checks at 1440px, 768px and 390px, including reduced motion.

## Deferred batch gate

`SITE-105` will run the complete Batch 11 verification after this task is ready.

## External inputs or blockers

None.

## Evidence

- Added `motion.tsx` with progressive IntersectionObserver reveals, no-JS-safe
  fallback, reduced-motion handling and throttled scroll progress updates.
- Added staged hero arrival, section/card/timeline/case-study/CV/404 reveals and
  a 2px progress line on Case Study and CV routes only.
- Kept the hero node motif static and preserved existing hover/focus behavior.
- `npm.cmd --prefix apps/frontend run typecheck` passed.
- `npm.cmd --prefix apps/frontend run build` passed.
- `npm.cmd --prefix apps/frontend run lint` passed.
- `npm.cmd --prefix apps/frontend run verify:frontend` passed.
- Responsive visual review passed for the reference, six public routes and 404 at
  1440x960, 768x1024 and 390x844.
- Browser behavior check confirmed reveal-on-scroll, 100% scroll progress and
  immediate reduced-motion rendering. Port 4177 used for inspection was stopped.
- Full Batch 11 gate deferred to SITE-105.
