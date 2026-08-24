import type { CaseStudy, CaseStudyRoute } from '../content/case-studies';
import { caseStudyRoutes } from '../content/case-studies';
import { Card, Metric, SectionIntro, TechnologyList } from '../components/primitives';

type CaseStudyLayoutProps = {
  caseStudy: CaseStudy;
  previousCase?: CaseStudyRoute;
  nextCase?: CaseStudyRoute;
};

function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  const titleId = `${title.toLowerCase().replaceAll(' ', '-')}-heading`;

  return (
    <section className="case-study__section" aria-labelledby={titleId}>
      <SectionIntro eyebrow="Case study" title={title} titleId={titleId} />
      {children}
    </section>
  );
}

export default function CaseStudyLayout({
  caseStudy,
  previousCase,
  nextCase,
}: CaseStudyLayoutProps) {
  const caseIndex = caseStudyRoutes.findIndex(({ path }) => path === caseStudy.path);
  const isLastCase = caseIndex === caseStudyRoutes.length - 1;

  return (
    <article className={`case-study${isLastCase ? ' case-study--quiet' : ''}`}>
      <header className="case-study__hero">
        <p className="case-study__eyebrow">Case study</p>
        <h1>{caseStudy.title}</h1>
        <p className="case-study__summary">{caseStudy.summary}</p>
      </header>

      <CaseSection title="Context">
        <div className="case-study__prose">
          {caseStudy.context.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CaseSection>

      <CaseSection title="Problem">
        <div className="case-study__prose">
          {caseStudy.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CaseSection>

      <CaseSection title="Constraints">
        <p className="case-study__constraint">{caseStudy.constraints}</p>
      </CaseSection>

      <CaseSection title="Approach">
        <div className="case-study__prose">
          {caseStudy.approach.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CaseSection>

      <CaseSection title="Architecture">
        <ol className="case-study__architecture">
          {caseStudy.architecture.map((step) => (
            <li key={step.label}>
              <h3>{step.label}</h3>
              <span>{step.description}</span>
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection title="Technology">
        <TechnologyList items={caseStudy.technologies} label={`${caseStudy.title} technologies`} />
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

      {caseStudy.supportingImpact && (
        <CaseSection title="Supporting impact">
          <p className="case-study__constraint">{caseStudy.supportingImpact}</p>
        </CaseSection>
      )}

      <CaseSection title="Engineering Lessons">
        <ul className="case-study__lessons">
          {caseStudy.engineeringLessons.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </ul>
      </CaseSection>

      <nav className="case-study__navigation" aria-label="Case study navigation">
        <a className="case-study__back-link interactive-link" href="/#work">
          <span aria-hidden="true">←</span>
          Back to selected work
        </a>
        <ul className="case-study__pagination" aria-label="Adjacent case studies">
          {previousCase && (
            <li>
              <a className="case-study__pagination-link" href={previousCase.path}>
                <span className="case-study__pagination-label">Previous case</span>
                <span>{previousCase.title}</span>
              </a>
            </li>
          )}
          {nextCase && (
            <li>
              <a className="case-study__pagination-link" href={nextCase.path}>
                <span className="case-study__pagination-label">Next case</span>
                <span>{nextCase.title}</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </article>
  );
}
