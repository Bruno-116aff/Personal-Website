# SITE-061 — Close Batch 6 production release

- Batch: 6
- Area: batch gate / release gate
- State: READY
- Depends on: SITE-060
- Gate type: mandatory final full verification

## Goal

Perform the complete production release gate and close Batch 6 only when the site
is verified at 100%.

## Source-of-truth audit

Re-read docs/00-brand-brief.md through docs/05-task-breakdown-for-codex.md and
AGENTS.md before making the final release decision. This final gate is the explicit
check that the delivered site follows every approved product, factual, copy, route,
technical and launch requirement.

## Full gate

- npm run typecheck
- npm run build
- npm run verify
- npm run verify:content
- npm run verify:meta
- npm run verify:production
- Run the complete live human walkthrough as recruiter/HR and technical hiring reader.
- Verify all six routes, hard refresh, contact delivery, analytics, security headers,
  canonical URLs, DNS, HTTPS, redirects and share assets.
- Recheck every launch-blocking item and every unresolved external input against
  docs/00 through docs/05.

## Acceptance criteria

- No launch-blocking runtime, content, NDA, SEO, security or domain issue remains.
- No requirement from docs/00 through docs/05 is silently omitted or contradicted.
- All remaining external inputs are explicitly listed with exact status.
- PROJECT_STATUS.md and HANDOFF.md contain the final release decision.
- Batch 6 and the project are marked COMPLETE only after every check passes or
  every non-blocking external limitation is explicitly approved.

## Failure policy

Any launch-blocking failure keeps the release open. Never mark the project complete
because the page merely looks finished.
