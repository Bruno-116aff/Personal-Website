# SITE-023 — Build Contact section and form UI

- Batch: 2
- Area: homepage contact UI
- State: COMPLETE
- Depends on: SITE-020

## Goal

Implement the homepage Contact section and an accessible, non-functional-yet form
shell ready for later endpoint integration.

## Targeted context

- docs/01-content-facts.md
- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md
- docs/DESIGN_SYSTEM.md

## Work

- Add approved Email, LinkedIn and Telegram actions.
- Add a non-prominent configurable GitHub action; do not enable it without the URL.
- Implement labelled name, email, message and honeypot controls.
- Add accessible idle, submitting, success and error UI states without endpoint wiring.

## Acceptance criteria

- The section is reachable from homepage and cross-route navigation.
- Form controls are semantic, keyboard-operable and labelled.
- No client-side secret, fake success or invented GitHub URL appears.
- The implementation can be connected to SITE-040 without redesigning the UI.

## Focused checks

- npm run typecheck.
- Manual keyboard/focus walkthrough of links and form controls.

## Deferred batch gate

SITE-024 runs the full homepage accessibility, content and visual gate.

## Implementation note

- Added the homepage Contact section with approved Email, LinkedIn and Telegram
  actions and a non-prominent disabled GitHub action pending the real public URL.
- Added an accessible form shell with labelled name, email and message controls,
  a labelled keyboard-skipped honeypot, submit control and idle/submitting/
  success/error status rendering.
- Kept the form non-functional by default: no endpoint, secret, fake success or
  invented GitHub URL was added. `ContactForm` accepts status and submit props for
  later SITE-041 integration without changing the layout.
- Focused evidence: `npm.cmd run typecheck`, `npm.cmd run build`,
  `npm.cmd run verify:content`, generated DOM audit and `git diff --check` passed.
- Deferred: interactive browser keyboard/focus walkthrough and SITE-024 full
  homepage accessibility, content and responsive visual gate.
