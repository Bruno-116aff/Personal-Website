# SITE-113 — Apply final copy to rendered surfaces and metadata

- Batch: 13
- Area: rendered copy / metadata
- State: COMPLETE
- Depends on: SITE-112

## Evidence

- Updated rendered homepage, header/footer, 404, Contact form states, case-study supporting impact and route metadata.
- `npm.cmd --prefix apps/frontend run typecheck` — PASS.
- `npm.cmd --prefix apps/frontend run test -- --runInBand` — PASS.
- `npm.cmd --prefix apps/frontend run verify:meta` — PASS after build.
- User confirmed all Batch 13 tasks were checked and requested closure.

## Goal

Apply the supplied final copy to rendered section labels, navigation, footer,
404, Contact form states and route metadata, including the prerendered shell.

## Non-goals

- Do not change visual tokens, layout behavior, routes, analytics or contact API behavior.
- Do not add testimonials, booking, theme switching or new navigation items.

## Targeted source

- `apps/frontend/src/App.tsx`
- `apps/frontend/src/components/SiteShell.tsx`
- `apps/frontend/src/components/ContactForm.tsx`
- `apps/frontend/src/lib/metadata.ts`
- `apps/frontend/index.html`

## Acceptance criteria

- Header, footer, homepage section labels, 404 and contact copy match the specification.
- Case navigation labels remain descriptive and use the specified arrows.
- Homepage and case-study metadata match the approved public copy and title pattern.
- Generated output does not retain superseded public copy or restricted Case 4 wording.

## Focused checks

- `npm.cmd --prefix apps/frontend run typecheck`
- `npm.cmd --prefix apps/frontend run test -- --runInBand`
- `npm.cmd --prefix apps/frontend run verify:meta`
