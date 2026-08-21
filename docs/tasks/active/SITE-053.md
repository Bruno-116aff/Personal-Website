# SITE-053 — Harden performance

- Batch: 5
- Area: performance
- State: READY
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
