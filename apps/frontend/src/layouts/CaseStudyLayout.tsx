import type { CaseStudy, CaseStudyRoute } from '../content/case-studies';
import { Card, Metric, SectionIntro, Tag } from '../components/primitives';

type CaseStudyLayoutProps = {
  caseStudy: CaseStudy;
  previousCase?: CaseStudyRoute;
  nextCase?: CaseStudyRoute;
};

function CaseSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const titleId = `${title.toLowerCase().replaceAll(' ', '-')}-heading`;

  return (
    <section className="case-study__section" aria-labelledby={titleId}>
      <SectionIntro title={title} titleId={titleId} />
      {children}
    </section>
  );
}

export default function CaseStudyLayout({
  caseStudy,
  previousCase,
  nextCase,
}: CaseStudyLayoutProps) {
  return (
    <article className="case-study">
      <header className="case-study__hero">
        <p className="case-study__eyebrow">Case study</p>
        <h1>{caseStudy.title}</h1>
        <p className="case-study__summary">{caseStudy.summary}</p>
      </header>

      <CaseSection title="Context">
        <div className="case-study__prose">
          {caseStudy.context.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseSection>

      <CaseSection title="Problem">
        <div className="case-study__prose">
          {caseStudy.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseSection>

      <CaseSection title="Constraints">
        <p className="case-study__constraint">{caseStudy.constraints}</p>
      </CaseSection>

      <CaseSection title="Approach">
        <div className="case-study__prose">
          {caseStudy.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </CaseSection>

      <CaseSection title="Architecture">
        <ol className="case-study__architecture">
          {caseStudy.architecture.map((step) => (
            <li key={step.label}>
              <strong>{step.label}</strong>
              <span>{step.description}</span>
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection title="Technology">
        <div className="card-tags" aria-label={`${caseStudy.title} technologies`}>
          {caseStudy.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}
        </div>
      </CaseSection>

      <CaseSection title="Result">
        <div className="case-study__results">
          {caseStudy.results.map((result) => (
            <Card as="div" key={`${result.value}-${result.label}`} className="case-study__result">
              <Metric {...result} />
            </Card>
          ))}
        </div>
      </CaseSection>

      <CaseSection title="Engineering Lessons">
        <ul className="case-study__lessons">
          {caseStudy.engineeringLessons.map((lesson) => <li key={lesson}>{lesson}</li>)}
        </ul>
      </CaseSection>

      <nav className="case-study__navigation" aria-label="Case study navigation">
        <a className="interactive-link" href="/#work">Back to selected work</a>
        <div>
          {previousCase && (
            <a className="interactive-link" href={previousCase.path}>
              Previous: {previousCase.title}
            </a>
          )}
          {nextCase && (
            <a className="interactive-link" href={nextCase.path}>
              Next: {nextCase.title}
            </a>
          )}
        </div>
      </nav>
    </article>
  );
}
