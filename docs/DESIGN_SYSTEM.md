# Design System

Status: approved direction, implementation pending.

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

Exact color values, font loading strategy and spacing scale are implementation
decisions for the design-foundation task. Do not invent values in content tasks.

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
- AboutPhotoSlot.
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
