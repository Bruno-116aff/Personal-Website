# Design System

Status: approved direction, visual foundation implemented in SITE-020.

This document records stable visual decisions so later sessions do not re-derive
the design from screenshots or chat history.

## Brand register

Calm, technical, precise, reliable and senior. The site should feel closer to a
well-made SaaS/product site or engineering documentation than a developer portfolio
template.

Primary reference: leerob.com.
Secondary references: brianlovin.com for career presentation and
paulstamatiou.com for long-form rhythm.
Do not use rauno.me as a styling reference.

## Foundations

- Theme: light only. No theme switcher.
- Color: one restrained blue accent with neutral light surfaces and text.
- Typography: Inter or Geist Sans for headings/body.
- Monospace: JetBrains Mono or Geist Mono only for technologies, metrics, labels
  and code-like fragments.
- Logo: minimal IH monogram/wordmark.
- Layout: generous whitespace, readable measure, restrained borders and elevation.
- Motion: 150–250ms fades/slides, subtle hover elevation and underline motion.
- Accessibility: every color token must be checked against WCAG 2.2 AA; focus states
  must remain visible; reduced motion must remove non-essential transitions.

## Implemented foundation

The foundation uses CSS custom properties as the runtime source of truth and
exposes the same values through Tailwind utilities. The page remains explicitly
light-only.

Styling ownership: custom component CSS is the primary styling layer. Tailwind
remains a token-backed utility bridge for small layout and integration helpers;
shared visual decisions belong in the CSS token layer.

| Token group | Implemented values |
| --- | --- |
| Fonts | `Inter` for body/headings; `JetBrains Mono` for labels, metrics, technologies and code-like fragments |
| Surfaces | Page `#f8fafc`; surface `#ffffff`; muted surface `#f1f5f9` |
| Text | Ink `#172033`; muted `#475569`; subtle `#64748b` |
| Accent | Default `#1d4ed8`; strong `#1e40af`; soft `#dbeafe` |
| Border/focus | Border `#cbd5e1`; focus `#1d4ed8` with a 3px visible outline |
| Type scale | Body `1rem/1.6`; H1 `clamp(2.5rem, 7vw, 4rem)`; H2 `clamp(1.75rem, 4vw, 2.5rem)`; H3 `1.25rem` |
| Spacing | `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`, `6rem` |
| Layout | Container `72rem`; prose measure `42rem`; radii `0.375rem` and `0.75rem` |
| Motion | `200ms` transitions; reduced-motion media query removes non-essential motion |

The reusable primitives are `Tag`, `SectionIntro`, `Card`, `Button`, `Prose`
and `Metric` in `src/components/primitives.tsx`. Their classes consume the
foundation tokens rather than duplicating route-specific values.

Contrast review: `#172033` and `#475569` on the white/page surfaces meet the
4.5:1 normal-text target; `#1d4ed8` is reserved for interactive text and the
primary control surface, where it also meets the target with white text.

## Component vocabulary

The reusable UI vocabulary is:

- SiteHeader and SiteNav.
- SkipLink.
- SectionIntro.
- ImpactStrip and Metric.
- WorkCard / WorkGrid.
- CareerTimeline / CareerCard.
- ExpertiseGroups.
- CaseStudyLayout with Context, Problem, Constraints, Approach, Architecture,
  Technology, Result and Engineering Lessons.
- AboutPhoto.
- ContactPanel and ContactForm.
- SiteFooter.
- Prose, Tag and ExternalLink primitives.

Prefer composition and shared tokens over route-specific styling.

## Hard no's

No skill bars, first-screen logo wall, terminal/matrix aesthetic, green-on-black,
stock developer photography, parallax, WebGL, typewriter effects, custom cursor,
scroll hijacking, heavy animation libraries or decorative architecture diagrams.

## Review questions

- Does the first scroll communicate Senior Backend, Node/TypeScript, five years,
  Cyprus and measurable impact?
- Does visual hierarchy make content carry the weight?
- Does Case 4 remain last and visually quieter?
- Is every added visual element improving recruiter/CTO understanding?
