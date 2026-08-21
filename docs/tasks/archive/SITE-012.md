# SITE-012 — Implement the semantic site shell

- Batch: 1
- Area: site shell
- State: COMPLETE
- Depends on: SITE-010

## Goal

Create the reusable page shell and navigation primitives shared by all routes.

## Targeted context

- docs/00-brand-brief.md
- docs/03-site-structure-and-domains.md
- docs/DESIGN_SYSTEM.md

## Work

- Add header, minimal navigation, main, footer and skip link.
- Implement homepage anchor behavior from non-home routes.
- Add semantic landmarks and heading-level conventions.
- Add reduced-motion and visible-focus foundations.

## Acceptance criteria

- Navigation matches Work, About, Contact and CV.
- Controls use semantic links/buttons.
- One H1 and logical heading hierarchy are possible on every route.
- Shell works at narrow widths without horizontal overflow.

## Focused checks

- npm run typecheck
- Manual keyboard walkthrough of the shell.

## Deferred batch gate

Responsive/accessibility frontend gate.

## Implementation note

- Added reusable `SiteShell` primitives for the skip link, header, primary
  navigation, semantic main landmark and footer.
- Added Work/About/Contact anchor targets on the homepage and `/#...` links for
  those anchors from non-home routes; CV remains a semantic `/cv` link.
- Added one-H1 route composition, narrow-layout wrapping, visible focus styles,
  light-only system colors and `prefers-reduced-motion` handling.
- Focused evidence: `npm.cmd run typecheck`, `npm.cmd run build`, generated
  HTML landmark/heading/anchor inspection and `git diff --check` passed on
  2026-08-21.
- Manual keyboard walkthrough is DEFERRED because the interactive browser
  runtime is unavailable in the current session; the responsive/accessibility
  frontend gate remains deferred to SITE-014.

## Batch finalization

- SITE-014 static shell audit passed landmarks, one-H1, semantic links, anchors,
  focus/reduced-motion markers and responsive containment on 2026-08-21.
- Interactive keyboard walkthrough remains DEFERRED because no browser runtime
  is available in this environment.
