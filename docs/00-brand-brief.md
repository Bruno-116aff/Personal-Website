# Ivan Hubko — Brand Brief

## Who this is for
Codex: this file is the source of truth for tone, positioning and visual direction.
Don't re-derive strategy — just execute against this. If something is ambiguous,
default to the more conservative/minimal choice and flag it in the PR/commit message
rather than guessing loudly.

## Goal of the project
Active job search, target window: 1–3 months from launch. This is a career tool,
not a long-term content platform. Ship a complete, polished multi-page site — but
don't gold-plate anything that doesn't move the needle on "does a CTO/recruiter
understand who this person is and want to talk to them."

## One-line positioning
**Senior Backend Engineer & Tech Lead** — Node.js / TypeScript, backend systems,
automation, production ownership. Cyprus-based, open to remote/hybrid/relocation.

Do NOT position as: Full-Stack Developer, Frontend Developer, DevOps Engineer,
Engineering Manager, or AI Engineer. Frontend/infra/leadership are shown as the
*width* of a backend engineer, not as separate identities.

## Brand promise (use as hero copy basis)
> I build backend systems that replace manual work with reliable automation.

Extended version:
> I design and build Node.js and TypeScript backend systems, integrations and
> automation for business-critical workflows.

## Character / tone
**Calm. Technical. Precise. Reliable. Senior.**

Not: hacker, crypto, cyberpunk, gamer, AI-hype.

Explicitly banned words/phrases anywhere on the site:
`innovative`, `passionate`, `cutting-edge`, `results-driven`, `highly motivated`,
`rockstar`, `ninja`, `10x developer`, `coding is my passion`.

Prefer plain, declarative sentences: problem → decision → result. Avoid marketing
adjectives stacked in front of nouns ("robust scalable cutting-edge solution").

## Target audience (in priority order)
1. CTO / Head of Engineering / Engineering Manager
2. Technical Lead / Senior Engineer involved in hiring
3. Recruiter / HR
4. Founder / PM at a small product or startup

The site must work on two levels simultaneously — a non-technical HR reader should
get "Senior Backend, Node/TS, 5 yrs, Cyprus, measurable impact" in one scroll; a
technical reader should get real signal from the architecture/queue/integration
vocabulary used in case studies.

## Visual identity
- **Dark theme only.** Do not build a theme switcher or an alternate light theme.
- `style-reference.html` and `07-visual-spec-reference.md` are the approved
  implementation reference for palette, typography, spacing and component treatment.
- Direction: **technical minimalism, premium product aesthetic** — closer to a
  well-made SaaS/product site or engineering documentation than a typical
  "developer portfolio template."
- Palette: graphite surfaces with one restrained indigo accent, generous whitespace
  and restrained motion.
- Typography: Inter Tight for headings, Inter for body and JetBrains Mono
  only for technologies, metrics, small labels, code snippets — never full
  paragraphs in mono.
- Visual motif (optional, don't overbuild): thin-line "nodes/connections" motif
  (systems/data-flow), used sparingly — hero accent, section dividers. Not a
  literal architecture diagram on every page.
- Logo: minimal monogram "IH" only. No full logo design pass — a clean wordmark
  or simple monogram badge is enough. Don't spend design budget here.
- Motion: fade/slide 150–250ms, subtle hover elevation, underline animations.
  No scroll-hijacking, no parallax, no WebGL, no typewriter effects, no custom
  cursor. Respect `prefers-reduced-motion`.

## Visual references (approved by Ivan)
- **`docs/style-reference.html`** — primary literal reference for the dark visual
  register. Use it before touching visual code.
- **`docs/07-visual-spec-reference.md`** — implementation contract and rationale.
- leerob.com, brianlovin.com and paulstamatiou.com remain background references for
  restraint, career presentation and long-form rhythm; do not copy them literally.
- Explicitly rejected: rauno.me and generic dark portfolio templates.

## What NOT to do (hard no's)
- No skill bars ("Node.js 95%")
- No wall of tech logos on first screen
- No matrix/terminal aesthetic, no green-on-black
- No "Download CV" as the primary hero CTA — the site sells first, CV confirms after
- No stock photography of generic "developers coding"
- No testimonials unless real ones are actually collected (see 01-content-facts.md)
