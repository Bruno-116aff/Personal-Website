# SITE-074 — Reconcile design tokens and typography

- Batch: 5
- Area: visual system
- State: COMPLETE
- Depends on: SITE-073

## Goal

Remove visual token drift between the design-system document and implemented CSS.

## Non-goals

- Do not add dark mode, heavy animation or a new visual direction.
- Do not replace the approved light technical-minimalist style.

## Work

- Align hero H1 and global type scale with `DESIGN_SYSTEM.md`.
- Move raw colors/shadows into named CSS tokens.
- Decide whether Tailwind utilities or custom component CSS is the primary styling layer.
- Keep focus, reduced-motion and contrast behavior intact.

## Acceptance criteria

- Implemented values match the documented type and color foundations.
- No unexplained one-off visual values remain in shared styles.
- Contrast and focus checks still pass.
- The page remains light-only and uses restrained motion.

## Focused checks

- `npm run build`
- `npm run verify:accessibility`
- Review CSS token usage with `rg`.

## Deferred batch gate

SITE-059 includes human visual review at supported viewport sizes.

## Implementation evidence

- Reconciled the global body/H1/H2/H3 type scale with the documented design
  tokens and removed the oversized one-off hero H1 override.
- Added named typography tokens for body size, heading scale, line heights and
  heading tracking; the hero now consumes the same H1 token as the global base.
- Removed the raw translucent header color in favor of the page token and kept
  the existing named card shadow token. Custom component CSS is now explicitly
  documented as primary, with Tailwind limited to token-backed helpers.
- Preserved light-only color scheme, visible focus outlines, contrast behavior
  and reduced-motion handling.
- Focused checks passed: `npm run build`, `npm run verify:accessibility` for 6
  generated routes, CSS raw color/shadow token audit via `rg`/PowerShell,
  focus/reduced-motion marker review and `git diff --check`.
- Local Playwright viewport review passed at mobile width; broader supported-
  viewport visual review and the accumulated Batch 5 gate remain deferred to
  SITE-059.
