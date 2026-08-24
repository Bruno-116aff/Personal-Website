# SITE-089 — Implement dark tokens, local fonts and platform color surfaces

- Batch: 7
- Area: frontend foundations
- State: COMPLETE
- Depends on: SITE-088

## Goal

Replace the light token foundation with the approved dark system before changing
individual components.

## Non-goals

- Do not restyle route-specific sections or alter page content.
- Do not fetch Google Fonts or introduce a theme switcher.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/DESIGN_SYSTEM.md
- apps/frontend/src/styles/index.css
- apps/frontend/tailwind.config.ts

## Work

- Define canonical dark CSS variables, 1180px container, 12px radius and 150ms motion.
- Add self-hosted Inter, Inter Tight and JetBrains Mono WOFF2 faces with required
  weights, metric overrides and `font-display: optional`.
- Update the Tailwind token bridge, `color-scheme`, HTML theme color and web manifest.
- Preserve system fallbacks and prevent synthetic font rendering/layout shift.

## Acceptance criteria

- No live page needs a light token, remote font or duplicated hard-coded palette.
- Desktop type scale exactly follows the reference; mobile reductions remain usable.
- The brand accent and accessible primary-control token stay distinct.

## Focused checks

- Frontend typecheck and build.
- Performance verifier and remote-font scan.

## Evidence

- `npm.cmd run typecheck` — passed.
- `npm.cmd run build` — passed; production bundle emitted with local font assets.
- `npm.cmd run verify:performance` — passed for 6 prerendered routes, 57 KiB JS gzip and 5 KiB CSS gzip.
- Scoped remote-font/light-token scan — passed; all eight required local WOFF2 faces are present.

## Batch 7 gate finalization

SITE-093 completed the full foundation gate at 100% on 2026-08-24. The local font,
token and theme foundation is closed with the shared shell, primitives and form
states preserved across all generated routes.
