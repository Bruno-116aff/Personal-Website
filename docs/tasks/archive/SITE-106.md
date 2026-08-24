# SITE-106 — Normalize case-study result metrics

- Batch: 11
- Area: case-study presentation
- State: COMPLETE
- Depends on: SITE-104

## Goal

Use the neutral primary text color for every case-study Result value and remove
the inconsistent green metric treatment.

## Non-goals

- Do not change result copy, metrics, case-study content or route behavior.
- Do not alter the intentional `01–04` Featured Work numbering.

## Targeted source

- `apps/frontend/src/styles/index.css`
- `docs/style-reference.html`
- `docs/07-visual-spec-reference.md`

## Behavior steps

1. Remove the green metric token from the live visual tokens.
2. Remove the case-study Result override that paints values green.
3. Keep the shared metric value rule as the neutral Result appearance.
4. Update the visual reference and implementation contract to match.

## Acceptance criteria

- Result values on all four case-study routes use the same neutral primary color.
- No live CSS rule uses `--metric` or the green `#34D399` token.
- Result labels, details and all public content remain unchanged.

## Focused checks

- `npm --prefix apps/frontend run typecheck`
- `npm --prefix apps/frontend run build`
- `npm --prefix apps/frontend run lint`
- Generated case-study HTML/CSS inspection confirms no green metric declaration and consistent Result styling.

## Deferred batch gate

SITE-105 will run the complete Batch 11 verification after SITE-104 and SITE-106
are both implementation-ready.

## Evidence

- Removed the green `--metric` token and case-study Result color overrides from
  the live CSS; all Result values now use the shared `--text-primary` metric rule.
- Removed the unused green token from `style-reference.html` and documented the
  neutral Result treatment in `07-visual-spec-reference.md`.
- `npm.cmd --prefix apps/frontend run typecheck` passed.
- `npm.cmd --prefix apps/frontend run build` passed and generated all six public
  route artifacts.
- `npm.cmd --prefix apps/frontend run lint` passed.
- Each of the four generated case-study routes contains three Result values, and
  no source or generated output contains `--metric` or `#34D399`.
- Full Batch 11 gate deferred to SITE-105.
