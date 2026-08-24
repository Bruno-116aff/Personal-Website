# SITE-110 — Constrain the desktop site header to the shared container

- Batch: 12
- Area: shell/layout polish
- State: COMPLETE
- Depends on: Batch 11 gate COMPLETE

## Goal

Make the desktop site header align with the same `1180px` outer container used by
the page content, while preserving the current navigation behavior and mobile
layout.

## Non-goals

- Do not change navigation labels, routes, metadata or public copy.
- Do not redesign the approved dark visual system or add a new header treatment.
- Do not alter the existing motion, focus, responsive or footer behavior.

## Targeted source

- `apps/frontend/src/styles/index.css`
- `docs/style-reference.html`
- `docs/07-visual-spec-reference.md`
- `docs/DESIGN_SYSTEM.md`

## Behavior steps

1. Apply the shared container width and centered alignment to the site header.
2. Keep the header navigation readable and visually balanced inside that bound.
3. Preserve the existing narrow-screen padding and stacked navigation behavior.

## Acceptance criteria

- At desktop widths wider than the shared container, the header outer edge and
  bottom border stop at `var(--container-width)` and align with page containers.
- At viewport widths at or below the container, the header remains full available
  width without horizontal overflow.
- Desktop navigation remains horizontally balanced; mobile navigation still stacks
  at the existing breakpoint and retains its touch-safe spacing.
- No unrelated shell, route, content, metadata or motion behavior changes.

## Focused checks

- `npm.cmd --prefix apps/frontend run typecheck`
- `npm.cmd --prefix apps/frontend run build`
- `npm.cmd --prefix apps/frontend run lint`
- `npm.cmd --prefix apps/frontend run verify:frontend`
- Responsive browser inspection at 1440px, 768px and 390px for header bounds,
  navigation visibility and horizontal overflow.

## Batch closure

SITE-111 closed Batch 12 after the user confirmed completion of both tasks.

## External inputs or blockers

None.

## Evidence

- Constrained `.site-header` with `width: 100%`, `max-width: var(--container-width)`
  and centered margins; navigation padding and mobile stacking remain unchanged.
- `npm.cmd --prefix apps/frontend run typecheck` passed.
- `npm.cmd --prefix apps/frontend run build` passed.
- `npm.cmd --prefix apps/frontend run lint` passed.
- `npm.cmd --prefix apps/frontend run verify:frontend` passed.
- `npm.cmd --prefix apps/frontend run verify:visual` passed for the reference,
  six public routes and 404 at 1440px, 768px and 390px; no horizontal overflow
  was reported. The task-owned Vite process on port 4178 was stopped; the
  pre-existing process on port 4177 was preserved.
- Batch 12 closure was confirmed by the user; no additional verification commands
  were run during the close-only operation.
