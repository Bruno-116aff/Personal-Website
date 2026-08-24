# Design System

Status: approved dark v3 redesign; implementation is scheduled in Batches 6–9.

`docs/style-reference.html` is the literal reference for visual tokens, spacing and
shared component patterns. `docs/07-visual-spec-reference.md` explains its intent.
The HTML wins when they differ, except for the WCAG AA refinements recorded below.

## Brand register

Calm, technical, precise, reliable and senior. The site must read as a premium
product/engineering surface, not a terminal, cyberpunk or generic dark portfolio.
Use the reference's connected systems treatment, generous negative space, thin
borders and light-to-medium type weights. No theme switcher or light alternative.

## Foundations

| Token group | Approved values |
| --- | --- |
| Page/surfaces | `#0A0B0F`, `#14161C`, `#191B22` |
| Borders | `rgba(255,255,255,0.08)` default; `rgba(255,255,255,0.16)` interactive |
| Text | `#EDEEF1` primary; `#8B92A3` secondary; `#788191` tertiary |
| Accent | `#5B78F6` brand; `#8AA0FF` links; `rgba(91,120,246,0.12)` soft surface |
| Primary control | `#4A67E5`, hover `#405FD5`, white text |
| Metric | `#34D399`, impact values only |
| Fonts | Inter Tight display; Inter body; JetBrains Mono labels/data; self-hosted WOFF2 only |
| Type | H1 `56/600/-0.02em`; H2 `34/600/-0.015em`; H3 `21/600`; body `17/400` |
| Layout | `1180px` container; `12px` radius; 96px section rhythm on desktop |
| Motion | 150ms calm color/background shifts; one-time 220ms progressive reveal; no transform lift; reduced motion removes non-essential motion |

Accessibility is not optional: normal public text and button text must meet WCAG
2.2 AA. The primary-control and tertiary-text values above are intentional minimal
refinements to the initial reference values.

## Shared vocabulary

- Shell: skip link, header/nav, IH mark, footer and visible focus treatment.
- Primitives: Button, Card, Metric, SectionIntro, prose and semantic technology list.
- Homepage: hero motif, hairline-divided impact strip and connected work grid.
- Content routes: long-form CaseStudyLayout, CV timeline and branded 404.
- Tags: no bordered-pill walls. Use flat mono tags only for sparse hero metadata;
  render dense technologies as semantic, middle-dot-separated text.

## Non-negotiable rules

- The nodes/connections motif is static, low-opacity and hero-only.
- Cards have no drop shadows or hover transforms; depth comes from surfaces.
- Case 4 remains fourth and visually quieter without reducing readability.
- About remains text-only until a user-supplied photo enables a separate duotone task.
- No terminal/matrix treatment, green-on-black decoration, skill bars, logo walls,
  parallax, WebGL, custom cursor, scroll hijacking or heavy animation library.
- Reveal motion is progressive enhancement: primary HTML remains visible without
  JavaScript, reveal targets animate once on viewport entry, and the thin scroll
  progress indicator appears only on long Case Study and CV routes. The hero
  node motif remains static.
- Visual changes never alter public copy, IA, routes, metadata claims or Case 4 rules.

## Visual review contract

Every redesign batch captures the reference and live pages at 1440px, 768px and
390px widths. A batch cannot close with clipping, horizontal overflow, insufficient
contrast, missing focus indication, remote font requests or observable drift from
the approved reference patterns.
