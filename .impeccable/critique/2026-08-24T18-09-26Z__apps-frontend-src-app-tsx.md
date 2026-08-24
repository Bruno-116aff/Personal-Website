---
target: homepage
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-24T18-09-26Z
slug: apps-frontend-src-app-tsx
---
## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | Form states are clear, but long-page orientation and active section state are weak. |
| 2 | Match Between System and Real World | 4/4 | Problem → system → outcome language feels credible and domain-appropriate. |
| 3 | User Control and Freedom | 3/4 | Anchors and fallback email work; there is no stronger orientation or return path on the long homepage. |
| 4 | Consistency and Standards | 3/4 | The system is disciplined, but the hero story adds a second visual grammar beside the motif. |
| 5 | Error Prevention | 3/4 | Validation, limits, honeypot, focus recovery and submission locking are strong. |
| 6 | Recognition Rather Than Recall | 3/4 | Labels are clear, but the hiring case must be reconstructed across many sections. |
| 7 | Flexibility and Efficiency | 2/4 | Multiple entry points exist, but recruiters have no compact shortcut through the long page. |
| 8 | Aesthetic and Minimalist Design | 2/4 | The visual surface is restrained; the information architecture is not. |
| 9 | Error Recovery | 3/4 | Errors are actionable and preserve the form; direct email is a useful recovery path. |
| 10 | Help and Documentation | 2/4 | Terms such as reconciliation and operational accounts are not contextualized. |
| **Total** |  | **27/40** | **Acceptable: significant hierarchy and compression work remain.** |

## Design Specificity Verdict

The homepage feels authored for Ivan’s backend identity, not like a generic engineer portfolio. The graphite/indigo system, problem → system → measurable outcome framing, curated case ordering and explicit production language create a clear point of view. The deterministic detector found 0 findings in `App.tsx`.

The main weakness is repetition of the same systems-thinking idea: hero motif, operating-model panel, metric strip, capabilities, work grid, approach cards, expertise groups and timeline all make a similar argument. Individually these are strong; together they flatten the persuasion arc.

Visual verification passed at 1440×960, 768×1024 and 390×844 with no reported horizontal overflow. The required browser overlay was unavailable, and the visual verifier captures before scrolling, so below-the-fold reveal behavior is not fully evidenced.

## Overall Impression

A credible, technically mature portfolio with a strong first impression. It currently reads like a complete CV rendered as a landing page. The single biggest opportunity is to make the hiring decision easier: establish fit, prove it with the best work, then make contact feel inevitable.

## What’s Working

1. The proposition is specific and defensible: Ivan replaces manual work with reliable backend automation ([home.ts](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/content/home.ts:19>)).
2. The work section has real signal: featured first case, explicit outcomes, curated ordering and a quiet treatment for the confidential case ([App.tsx](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/App.tsx:205>)).
3. The visual system is disciplined: dark tokens, self-hosted typography, hairline dividers, consistent focus treatment and responsive touch targets ([index.css](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/styles/index.css:101>)).

## Priority Issues

### [P1] The hero carries three competing narratives

The left side sells the proposition, the right side explains “Manual friction → System design → Measured outcome,” and the SVG motif adds another systems metaphor ([App.tsx](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/App.tsx:107>)).

Why it matters: the first viewport should create one decisive mental model. Visitors may admire the composition without knowing what to read or click first.

Fix: keep one hero narrative. Either retain the operating model and reduce the motif to a quiet accent, or move the operating model below the first proof block. Keep “View selected work” aimed at the strongest case.

Suggested command: `$impeccable layout`

### [P1] The homepage is over-complete for a hiring decision

Impact, capabilities, work, career, approach, expertise, about and contact all appear in one continuous route ([App.tsx](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/App.tsx:171>)).

Why it matters: recruiters and mobile visitors may not reach the strongest proof or the conversion surface before attention drops.

Fix: preserve the approved sections and factual content, but compress their presentation. Let the first three cases carry the proof; reduce supporting expertise and career detail to a tighter scan; keep the confidential case last and quiet.

Suggested command: `$impeccable distill`

### [P2] Repeated section grammar flattens importance

Capabilities, work, approach, expertise, timeline and contact use variations of cards, bordered rows and repeated section intros.

Why it matters: every section feels like an equally weighted proof block, so decisive evidence does not separate enough from supporting context.

Fix: give each section one visual job: impact as a sparse editorial strip, work as the only connected grid, career as a timeline, approach as plain prose, expertise as compact text, and contact as the only high-emphasis conversion surface.

Suggested command: `$impeccable layout`

### [P2] Contact presents too many equivalent exits

Email, LinkedIn, Telegram, GitHub and the form are exposed together ([App.tsx](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/App.tsx:314>)).

Why it matters: five paths at the final decision point dilute the call to action. GitHub is particularly weak if the public profile is empty.

Fix: make email or the form primary; keep LinkedIn and Telegram secondary; demote GitHub to CV/footer context. If the API is unavailable, present an email-first CTA instead of leaving a visibly inert form panel ([ContactForm.tsx](<C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/components/ContactForm.tsx:31>)).

Suggested command: `$impeccable clarify`

### [P2] Long-page orientation is under-signaled

The homepage has no active section indicator, progress cue or compact recruiter path. The shared nav provides anchors, but not current location once the user scrolls.

Why it matters: a visitor who arrives from a deep link or scrolls through the middle has to reconstruct where they are and how much relevant proof remains.

Fix: add a restrained orientation mechanism only if it supports the approved dark system: stronger section labels, a compact “jump to” rhythm, or a visible CV/contact shortcut. Avoid adding another decorative progress widget.

Suggested command: `$impeccable adapt`

## Cognitive Load

High across the full homepage. The hero contains headline, tags, two CTAs, motif and a second narrative. The middle stacks multiple card/grid systems and asks the visitor to process identity, proof, capabilities, work, career, philosophy, expertise, biography and contact. Progressive disclosure is weak: supporting breadth is visible immediately rather than deferred.

The page’s grouping and copy structure are otherwise sound; the problem is cumulative competition, not any single broken component.

## Emotional Journey

- Entry: calm, precise and credible.
- Early proof: metrics and the featured case create the strongest confidence peak.
- Middle: repeated grids make the experience increasingly résumé-like and create an emotional valley.
- End: contact is functional, but not climactic because the visitor still chooses among several equivalent routes.

## Persona Red Flags

### Jordan — recruiter / first-timer

- The first action is not singular: two CTAs compete with the operating-model panel.
- “Business-critical workflows,” “production ownership,” “reconciliation” and “operational accounts” require interpretation.
- There is no compact “best fit for teams needing…” route before the technical inventory.

### Riley — deliberate stress tester

- The visual verifier does not scroll before capture, so reveal behavior below the fold needs a real scroll-based check; `IntersectionObserver` controls visibility ([motion.tsx](C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/components/motion.tsx:42>)).
- The long page has no visible orientation aid.
- The semantic `<ol>` plus explicit `01`, `02`, `03` labels may produce redundant announcements in some assistive technologies ([App.tsx](C:/worck/CV/CV_Ivan_Hubko/Личный сайт/apps/frontend/src/App.tsx:150>)).

### Casey — distracted mobile user

- The mobile path stacks hero copy, tags, two buttons and the operating model before the first metrics.
- Four impact metrics then extend the route before featured work.
- The contact form requires three fields; email should remain the dominant low-effort action.

## Minor Observations

- Availability is repeated in the header and hero tags; one occurrence could carry the signal more cleanly.
- The “Selected signal” intro before the metric strip weakens the crispness of the first proof moment.
- The generic `aria-label` on the tag wrapper may not create a meaningful accessible group; the visible tag text remains available, so impact is low.
- The added story panel means the homepage is no longer a literal translation of the approved reference hero; that is fine if the hierarchy is intentional, but it should not accumulate another motif layer.

## Questions to Consider

- What if the first viewport had one job only: identify Ivan and point directly to the strongest case?
- Should the operating model become the signature section below the first proof instead of a second hero?
- Which matters more for launch: showing the complete technical range, or making the best three systems impossible to miss?
