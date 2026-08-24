# SITE-094 — Rebuild homepage hero and impact strip

- Batch: 8
- Area: homepage hero / impact
- State: COMPLETE
- Depends on: SITE-093

## Goal

Match the reference hero and metric treatment while preserving all approved homepage
copy and the existing section order.

## Non-goals

- Do not change hero words, metric values, CTA targets or analytics.
- Do not animate the motif or add decorative diagrams elsewhere.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/App.tsx
- apps/frontend/src/content/home.ts
- apps/frontend/src/styles/index.css

## Work

- Add the static, `aria-hidden`, low-opacity inline SVG nodes/connections motif to
  the hero top-right only.
- Match reference hero type, measure, eyebrow, metadata tags, CTA spacing and 120px
  desktop rhythm; retain responsive reductions.
- Convert the metric card row into one hairline-divided impact strip. Preserve any
  existing approved section-intro copy above it rather than deleting content.

## Acceptance criteria

- Hero and impact visually read as the same system as the reference.
- The motif never obscures copy, captures pointer events or affects reduced motion.
- Four metrics remain semantic, readable and responsive without boxed-card styling.

## Focused checks

- Frontend typecheck.
- Homepage hero/impact screenshots at 1440px, 768px and 390px.

## Deferred batch gate

SITE-097 performs the homepage visual checkpoint and full gate.

## Implementation evidence

- Added the static, `aria-hidden` hero node motif with `pointer-events: none`.
- Rebuilt hero rhythm/type/measure and metadata/CTA spacing against the dark reference;
  preserved all approved homepage copy and targets.
- Replaced boxed metric wrappers with semantic articles in a hairline-divided,
  responsive impact strip; retained the approved section intro.
- Focused checks passed: `npm run typecheck:frontend`; homepage hero/impact screenshots
  passed at 1440x960, 768x1024 and 390x844 with four metrics and no horizontal overflow.
- Batch gate evidence: SITE-097 passed the complete Batch 8 gate on 2026-08-24;
  Batch 8 closed at 100% with no deferred work.
