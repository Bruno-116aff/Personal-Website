# Copywriting Guidelines

Language: **English only** for the whole site (site is aimed at international
recruiters/CTOs). No Russian version for launch.

## Voice
Problem → decision → result. Short sentences. No throat-clearing. No adjective
stacking. Every claim should be something Ivan could defend verbally in an
interview without hesitation — if a sentence would make him pause and think
"how do I justify this," cut it or soften it before it ships.

## Standard case study template
Use this structure for all 4 case studies (see 01-content-facts.md for material):

1. **Context** — what existed before, one paragraph.
2. **Problem** — what was slow/unreliable/manual, concrete.
3. **Constraints** — one line, e.g. "Internal business system. Some
   implementation details and identifiers have been generalized due to
   confidentiality obligations." Use this exact confidentiality phrase
   consistently across all 4 cases (not just Case 4) so it doesn't read as a
   flag specific to the sensitive one.
4. **Approach** — the reasoning, not just the tech list. Bad: "used Redis
   because Redis is fast." Good: "the workflow needed independent task
   execution with retries and recoverability after failure, so an asynchronous
   processing model was the natural fit."
5. **Architecture** — plain-language description of the pipeline. Simple text
   flow (Input → Validation → Queue → Workers → External Services → DB/Monitoring)
   is enough; no diagram is required (Ivan's call — text description only for
   launch).
6. **Technology** — only tools actually relevant to that case, as a short tag list.
7. **Result** — before/after, using only the vetted numbers in 01-content-facts.md.
8. **Engineering lessons** — 2-3 reflective sentences: what was hard, what would
   be designed differently today. See "Engineering lessons drafts" below —
   Ivan asked Claude to draft these since he was learning most of this on the
   job for the first time; keep them honest and specific, not generic
   "I learned the importance of communication" filler.

## Engineering lessons — drafts to use/adapt per case
(Ivan's own note: "everything was hard, I was learning most of this for the
first time — take it from here." These are grounded in what a first-time senior
IC building production systems from scratch actually runs into. Adjust wording
per case, don't reuse verbatim across all four.)

- **Infrastructure Reliability:** Most of the difficulty wasn't the software —
  it was accepting that physical hardware (modems, antennas, SIM routing) fails
  in ways no cloud abstraction prepares you for, and designing failover for that
  meant treating every component as something that *will* go down rather than
  something that might. Today: would introduce structured health-check
  telemetry from day one instead of adding it after the first unexplained outage.
- **Operations Automation:** The hard part was less the orchestration itself and
  more learning to decompose one manual checklist into independently retryable
  steps — early versions treated the whole provisioning flow as one unit, so a
  single failed sub-task meant redoing everything. Today: would design idempotent,
  independently-resumable steps from the start rather than arriving at that
  after a few painful reruns.
- **Unified Platform:** The genuine lesson here is architectural humility — the
  original monolith was the right call when scope was small, and the hard part
  wasn't the NestJS/microservices rewrite itself, it was recognizing *when*
  the monolith stopped being the right call rather than defaulting to
  microservices from day one. Today: would introduce clearer service boundaries
  earlier, before the monolith's internal coupling made the eventual split more
  expensive than it needed to be.
- **Large-Scale Account Automation:** The hardest constraint was resource
  scarcity — a fixed number of concurrent execution slots had to serve a much
  larger pool reliably, which meant the scheduling algorithm, not the automation
  itself, ended up being the real engineering problem. Today: would model the
  scheduling constraint mathematically before writing any automation code,
  rather than discovering the ceiling empirically.

## NDA / generalization phrasing patterns (use consistently)
- Never name internal system names, internal tracking/attribution tooling, or
  specific proprietary business logic.
- When a detail must be omitted, don't leave a suspicious gap — bridge it with
  the standard line: "Some implementation details and identifiers have been
  generalized due to confidentiality obligations."
- Prefer engineering nouns over business nouns: "operational accounts" not
  "social media accounts used for X"; "a controlled process" not naming what the
  process does; "external service" not naming the platform when it's not
  essential to the story.
- Never disclose company revenue, profit, or headcount cost structure. Company
  name (PS Simple Traffic) and general domain (AdTech/marketing automation) are
  fine to state openly.

## SEO copy rules
- Every page needs a unique `<title>` and meta description — see 03 for the
  page list. Follow the pattern `[Page Topic] — Ivan Hubko` for case studies,
  `Ivan Hubko — Senior Backend Engineer & Tech Lead` for homepage.
- No keyword stuffing. Write for the human reader first.
- Internal links use descriptive anchor text ("Read the infrastructure
  reliability case study"), never bare "Read more."
