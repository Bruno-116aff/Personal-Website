# Decisions

Short, durable decisions only. Detailed requirements stay in docs/00–05.

| ID | Decision | Reason |
| --- | --- | --- |
| D-001 | React + Vite + TypeScript + Tailwind | Explicitly required by the technical specification and familiar stack. |
| D-002 | Build-time prerender six known routes | SEO and fast initial HTML are launch requirements; the site has no dynamic page content. |
| D-003 | English-only public site | The target audience is international recruiters and CTOs. |
| D-004 | Content lives outside layout components | Copy and NDA review must not require UI rewrites. |
| D-005 | Case 4 is last and filtered to engineering framing | It carries confidentiality and interpretation risk. |
| D-006 | Small tasks may accumulate as IMPLEMENTED_PENDING_GATE | This keeps implementation fast while preserving evidence for one batch gate. |
| D-007 | Full checks run only at explicit batch finalization | Visual, production and cross-cutting gates are expensive and should not slow every small task. |
| D-008 | Missing user-owned values stay configurable | Guessing URLs, IDs, credentials or source material would create factual or security defects. |
| D-009 | No commit is implied by implementation | Commits require an explicit user request and use the dedicated commit skill. |
| D-010 | Unknown primary-host paths use a branded static 404 fallback | Helpful recovery navigation must coexist with real HTTP 404 semantics and `noindex, follow`; the fallback is not a public sitemap route. |
