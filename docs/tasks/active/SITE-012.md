# SITE-012 — Implement the semantic site shell

- Batch: 1
- Area: site shell
- State: READY
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
