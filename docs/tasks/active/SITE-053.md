# SITE-053 — Harden performance

- Batch: 5
- Area: performance
- State: IMPLEMENTED_PENDING_GATE
- Depends on: SITE-044

## Goal

Address concrete Core Web Vitals risks without changing visual or content scope.

## Targeted context

- docs/04-tech-spec.md
- docs/ARCHITECTURE.md
- docs/DESIGN_SYSTEM.md

## Work

- Optimize font loading and prevent font-induced layout shift.
- Add explicit image dimensions and lazy loading where appropriate.
- Inspect production bundle size and remove unnecessary client-side code.
- Run production-like performance checks and record evidence.

## Acceptance criteria

- No image or font creates avoidable layout shift.
- No heavy animation/UI dependency is introduced.
- Primary content remains prerendered and fast to render.
- Remaining field-only Core Web Vitals uncertainty is documented accurately.

## Focused checks

- npm run build.
- Run the available production-like performance audit.

## Deferred batch gate

SITE-059 reruns the complete hardening gate against the final accumulated output.

## Implementation evidence

- Added `npm run verify:performance`, a production-artifact audit for the six
  prerendered routes. It enforces meaningful static primary content, no remote or
  downloadable fonts, no heavy visual runtime elements, image-dimension safety,
  narrow direct dependencies, nonempty share assets and gzip budgets.
- Recorded the launch font strategy: only system-resident font fallbacks are used;
  a future local web font requires WOFF2, metric overrides and `font-display:
  optional` before adoption.
- Focused checks passed: `npm.cmd run build` and
  `npm.cmd run verify:performance` (56 KiB JavaScript gzip, 4 KiB CSS gzip).
- Deferred to production/browser evidence: field LCP, INP and CLS require the
  deployed host, real network/device conditions and post-launch field data. SITE-059
  reruns the static audit against the accumulated Batch 5 output.
