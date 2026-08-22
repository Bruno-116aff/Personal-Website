# SITE-072 — Improve route SEO metadata

- Batch: 5
- Area: SEO/social copy
- State: COMPLETE
- Depends on: SITE-071

## Goal

Replace generic route descriptions with concise, factual descriptions that help
recruiters and search engines understand each page.

## Non-goals

- Do not keyword-stuff descriptions.
- Do not add unsupported metrics or Case 4 details.

## Work

- Write unique homepage, case-study and CV descriptions from approved public copy.
- Add useful OG metadata such as image alt text and site name where appropriate.
- Keep title naming rules from the copywriting guidelines.
- Extend metadata checks for minimum quality and uniqueness.

## Acceptance criteria

- Every route has a useful, unique, English description.
- Descriptions contain only verified claims.
- OG/Twitter metadata remains valid and route-specific.
- Content scanner and metadata checks pass.

## Focused checks

- `npm run verify:content`
- `npm run verify:meta`
- Inspect generated `<head>` for all six routes.

## Deferred batch gate

SITE-059 performs the final public copy review.

## Implementation evidence

- Replaced generic route descriptions with unique, factual English copy for the
  homepage, four case studies and the CV route. Descriptions are grounded in
  approved public content and stay within the 80–160 character quality range.
- Added route-specific social image alt text plus `og:site_name`, OG image alt
  and Twitter image alt metadata. Updated the homepage metadata template to
  match the generated social head.
- Extended metadata verification with description quality/uniqueness checks,
  required social site/image metadata and route-specific alt-text assertions.
- Focused checks passed: `npm run build:frontend`,
  `npm run verify:content`, `npm run verify:meta` for 6 generated routes,
  frontend route-manifest tests (2/2), generated `<head>` inspection for all
  six routes and `git diff --check`.
- Deferred to SITE-059: final public copy/NDA review and the accumulated Batch 5
  gate.
