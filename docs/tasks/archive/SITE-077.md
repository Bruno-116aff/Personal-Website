# SITE-077 — Correct navigation and hidden-field accessibility semantics

- Batch: 5
- Area: accessibility semantics
- State: COMPLETE
- Depends on: SITE-076

## Goal

Make current-navigation and honeypot semantics accurate for assistive technology.

## Non-goals

- Do not remove the honeypot protection.
- Do not hide legitimate navigation from assistive technology.

## Work

- Remove or correct `aria-current="page"` on cross-page Work anchor links.
- Keep current-page state only where it identifies the actual current document.
- Implement the honeypot with a robust non-interactive accessibility strategy.
- Extend the accessibility check for hidden focusable descendants and navigation state.

## Acceptance criteria

- Navigation state is semantically accurate on home, case and CV routes.
- Honeypot is not exposed in the accessibility tree or keyboard order.
- All legitimate fields retain labels, errors and status announcements.
- Accessibility checks remain passing.

## Focused checks

- `npm run verify:accessibility`
- Keyboard walkthrough when browser runtime is available.
- Generated HTML inspection.

## Deferred batch gate

SITE-059 performs the final WCAG-oriented walkthrough.

## Implementation evidence

- Removed `aria-current="page"` from the cross-page Work anchor; current-page
  state now remains only on the actual home and CV documents.
- Made the honeypot subtree `aria-hidden` and `inert`, while retaining
  `tabIndex={-1}` as a keyboard-order safeguard and preserving the spam
  protection field.
- Extended the accessibility verifier to inspect generated navigation state,
  conditional honeypot semantics and hidden focusable descendants.
- Focused checks passed: `npm run build`, `npm run verify:accessibility` for 6
  generated routes, generated HTML inspection and `git diff --check`.
- Local Playwright keyboard/focus walkthrough passed; manual WCAG review and the
  accumulated Batch 5 gate remain deferred to SITE-059.
