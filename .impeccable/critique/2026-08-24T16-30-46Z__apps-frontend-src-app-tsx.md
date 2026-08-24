---
target: homepage and shared shell
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 4
timestamp: 2026-08-24T16-30-46Z
slug: apps-frontend-src-app-tsx
---
## Design Health Score

Mode: Persuade, with portfolio/experience qualities. Heuristics 7 and 10 are n/a.

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | No homepage section/progress signal, and the browser pass reproduced a React hydration mismatch. |
| 2 | Match System / Real World | 3/4 | Credible engineering language, but the conversion language partly reads like consulting rather than hiring. |
| 3 | User Control and Freedom | 3/4 | Native links and skip navigation are strong; recovery through the long homepage is weak. |
| 4 | Consistency and Standards | 3/4 | Cohesive visual system, but work-card hover/cursor behavior implies a larger click target than exists. |
| 5 | Error Prevention | 3/4 | Contact form labels, limits, validation and honeypot are solid. |
| 6 | Recognition Rather Than Recall | 3/4 | Clear headings and primary nav, but deeper sections are not represented in navigation. |
| 7 | Flexibility and Efficiency | n/a | Not materially applicable to this Persuade surface. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Restrained visual language, but nine sequential sections create cumulative density. |
| 9 | Error Recovery | 2/4 | Form recovery is good, but hydration errors can undermine client enhancements and runtime flows. |
| 10 | Help and Documentation | n/a | Not materially applicable to this Persuade surface. |
| **Total** |  | **22/32** | **Good foundation; fix runtime stability and sharpen the information architecture.** |

## Design Specificity Verdict

**7/10 — authored and coherent, but not yet unmistakably Ivan.**

The graphite/indigo palette, Inter Tight/Inter/JetBrains Mono pairing, node motif, hairline metrics and connected work grid clearly follow the approved visual language. The fact-backed copy adds genuine specificity. However, most of the page still relies on the familiar senior-engineer portfolio grammar of repeated section headers, cards, grids and technology lists. The strongest product character is in the copy rather than the interaction or information architecture.

The deterministic source scan was clean for `App.tsx` and `SiteShell.tsx` (0 findings each). The browser detector reported 10 findings: 8 repeated `kicker-above-heading` instances at `App.tsx:125, 141, 159, 188, 209, 226, 247, 262`; one intentional `all-caps-body` finding for the role eyebrow at `App.tsx:110` / `home.ts:19`; and one `overused-font` finding for Inter as the primary font, with CSS locations at `styles/index.css:6, 18, 30, 42, 54, 66`. The detector's kicker and all-caps findings are intentional under the approved design contract; the font finding is technically accurate but not actionable by itself.

During the browser pass, mutable injection succeeded and the `[Human]` overlay loaded. The console also reported five runtime errors, including a reproducible React hydration mismatch (`Expected server HTML to contain a matching <div> in <div>` and `An error occurred during hydration`) with stack references to `SiteShell.tsx:23:37` and `App.tsx:36:31`.

## Overall Impression

Calm, credible, technically literate and visually disciplined. The main weakness is focus: the homepage is simultaneously a landing page, case-study index, résumé, engineering philosophy, expertise catalog and contact page. The single biggest opportunity is to make measurable work the emotional and informational center of the page, then let the remaining sections support that decision.

## What's Working

- **Strong first-screen positioning.** The hero states role, outcome, stack, location and availability with little fluff (`App.tsx:93-121`, `content/home.ts:18-24`).
- **Fact-backed credibility.** Metrics and case teasers use approved, defensible claims, and the four-case ordering communicates priority (`content/home.ts:26-47`, `App.tsx:157-184`).
- **Strong shell foundations.** Semantic `header/nav/main/footer`, skip navigation, visible focus treatment, reduced-motion support and descriptive case-study links are all good implementation choices (`SiteShell.tsx:24-71`, `styles/index.css:195-198`).

## Priority Issues

### [P1] React hydration mismatch is a runtime release risk

**Why it matters:** The page renders, but hydration errors can disable or destabilize client enhancements such as motion, analytics, form behavior and navigation state. This is more serious than a visual defect.

**Fix:** Compare the prerendered homepage HTML with the first client render and remove the divergence rather than suppressing the warning. Recheck the production-like static route, direct navigation and form submission after the fix.

**Suggested command:** `$impeccable harden`

### [P1] The strongest proof is buried

**Why it matters:** Visitors see hero → metrics → capabilities → work. For a recruiter or CTO, the case studies are the highest-signal content, but they arrive after another explanatory section.

**Fix:** Prefer `Hero → Impact → Featured Work → compact capabilities/approach → Career → Expertise → About → Contact`. If the documented order must remain, add a compact proof bridge directly after the metrics: one sentence, one case link and one hiring-oriented action.

**Suggested command:** `$impeccable distill`

### [P1] Hiring intent is blurred by client/problem language

**Why it matters:** “Have a backend problem worth solving?” and “Start a conversation” make Ivan sound partly like an independent consultant, which weakens the stated Senior Backend Engineer & Tech Lead positioning for recruiters and hiring managers.

**Fix:** Make the primary conversion explicit: “Discuss a role or technical leadership opportunity” or “View CV.” Keep a secondary route for founders or product teams with a backend problem. This requires copy approval because public copy is authoritative project content.

**Suggested command:** `$impeccable clarify`

### [P1] Wayfinding collapses after the header

**Why it matters:** The homepage contains nine major sections, but the shared nav exposes only Work, About, Contact and CV. Homepage scroll progress is disabled, so visitors must build their own map and cannot see where they are in the long page (`SiteShell.tsx:15-21`, `App.tsx:123-326`).

**Fix:** Shorten/merge the secondary sections or add a compact in-page section index after the hero. Do not simply add more top-nav links; that would conflict with the approved minimal shell.

**Suggested command:** `$impeccable layout`

### [P2] Work cards create a false click affordance

**Why it matters:** The whole card has pointer cursor and hover treatment, but only the nested text link navigates (`App.tsx:166-181`, `styles/index.css:1239-1258`). Clicking the empty card surface does nothing.

**Fix:** Either remove the pointer cursor and make the text link the obvious target, or make the entire card one accessible link without nesting interactive elements.

**Suggested command:** `$impeccable harden`

### [P2] The mobile shell has measurable horizontal overflow

**Why it matters:** At 390×844, the browser measured `document.scrollWidth` at 383px against an effective 375px document width; the hero bounds extended to about 8px of horizontal overflow. This creates an avoidable sideways-scroll artifact on the most constrained viewport.

**Fix:** Reconcile the full-bleed `.hero` (`styles/index.css:1088-1107`) with the padded `.site-main` (`styles/index.css:624-631`) at the narrow breakpoint. Verify 320px, 360px and 390px widths with the detector overlay disabled.

**Suggested command:** `$impeccable adapt`

### [P2] Repeated section rhythm makes the page feel templated

**Why it matters:** Almost every section uses the same eyebrow → heading → description pattern. “Engineering approach” repeats the same phrase as eyebrow and title (`App.tsx:207-222`), and “What I do,” “Engineering Approach” and “Technical Expertise” partially overlap.

**Fix:** Reserve the full `SectionIntro` treatment for Impact, Work and Contact. Make Career, Approach, Expertise and About more compact and differentiated; remove or rename the duplicated Approach label.

**Suggested command:** `$impeccable distill`

## Cognitive Load

The page avoids badge walls, competing colors and obvious decorative clutter. The main load is structural:

- Nine sequential sections require visitors to maintain a mental map.
- “What I do,” “Engineering Approach” and “Technical Expertise” overlap conceptually.
- The contact area presents five routes: Email, LinkedIn, Telegram, GitHub and the form (`App.tsx:267-323`).
- The hero's two CTAs are appropriately limited; the problem is the amount of content after the initial decision.

## Emotional Journey

The journey begins with calm competence and gains trust through metrics, then loses momentum in the middle taxonomy. The emotional peak should be case-study evidence, but the current sequence makes it feel like one item among many. Contact then feels like an administrative endpoint rather than the natural conclusion of a convincing story.

A stronger arc is: **positioning → measurable proof → strongest case → working philosophy → invitation to talk**.

## Persona Red Flags

### Jordan — confused first-timer

- Understands the role and stack quickly, but may not know whether the site is for hiring Ivan or commissioning backend work.
- Encounters several abstract sections before concrete work.
- Has no explicit answer to “What should I do next?” beyond the generic “Start a conversation.”

### Riley — deliberate stress tester

- The work card appears clickable but only the inner link works.
- The GitHub fallback references `github-config-note`, but no element with that ID exists (`App.tsx:309-319`).
- External links open in new tabs while their accessible names only say “Profile”; the new-tab behavior is not communicated.

### Casey — distracted mobile user

- Mobile CTA buttons expand well, but contact is far down a long page.
- The stacked nine-section experience is expensive to resume after interruption.
- The full-bleed hero introduces measured horizontal overflow at 390px.

## Minor Observations

- “Selected signal” adds an explanatory layer before the metrics, while the literal reference places the impact strip directly after the hero (`App.tsx:123-137`, `docs/style-reference.html:107-125`).
- The minimal footer only links to Ivan's name and offers no return-to-contact or CV action (`SiteShell.tsx:67-71`).
- The text-only About section is correct under the approved no-photo boundary and should not be treated as a defect.

## Questions to Consider

- If the primary goal is hiring, should the first CTA name a role or team conversation instead of a generic conversation?
- Which case study should be the emotional peak, and why does it currently appear after another explanatory section?
- Can all nine sections remain without requiring visitors to build their own navigation map?
