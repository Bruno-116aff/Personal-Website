import { useEffect } from 'react';

import { getSiteRoute } from './routes';
import SiteShell from './components/SiteShell';
import { Button, Card, Metric, SectionIntro, Tag } from './components/primitives';
import {
  featuredWork,
  engineeringApproach,
  homeCapabilities,
  homeHero,
  homeMetrics,
} from './content/home';
import { aboutCopy, careerTimeline, expertiseGroups } from './content/career';
import { contactDetails } from './content/contact';
import ContactForm from './components/ContactForm';
import { caseStudyRoutes, getCaseStudy } from './content/case-studies';
import CaseStudyLayout from './layouts/CaseStudyLayout';
import CvLayout from './layouts/CvLayout';
import { trackAnalyticsEvent, trackAnalyticsEventOnce } from './lib/analytics';

type AppProps = {
  pathname?: string;
  githubUrl?: string;
};

export default function App({ pathname = '/', githubUrl }: AppProps) {
  const route = getSiteRoute(pathname);
  const caseStudy = getCaseStudy(route.path);
  const caseStudyIndex = caseStudyRoutes.findIndex((item) => item.path === route.path);

  useEffect(() => {
    if (caseStudy) {
      trackAnalyticsEventOnce(
        `case-study-open:${route.path}`,
        'case_study_open',
        { case_study: route.path },
      );
    }
  }, [caseStudy, route.path]);

  return (
    <SiteShell pathname={pathname}>
      {route.path === '/' ? <Homepage githubUrl={githubUrl} /> : route.path === '/cv' ? <CvLayout /> : caseStudy ? (
        <CaseStudyLayout
          caseStudy={caseStudy}
          previousCase={caseStudyRoutes[caseStudyIndex - 1]}
          nextCase={caseStudyRoutes[caseStudyIndex + 1]}
        />
      ) : route.kind === 'not-found' ? <NotFoundPage /> : <RouteIntro route={route} />}
    </SiteShell>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-page__visual" aria-hidden="true">
        <span className="not-found-page__signal">route.status / 404</span>
        <span className="not-found-page__number">404</span>
        <span className="not-found-page__marker">●</span>
      </div>
      <div className="not-found-page__content">
        <p className="not-found-page__eyebrow">Lost in the request</p>
        <h1 id="not-found-title">This page took a wrong turn.</h1>
        <p className="not-found-page__summary">
          The URL does not lead to a published page. Let&apos;s get you back to useful ground.
        </p>
        <nav className="not-found-page__navigation" aria-label="404 page navigation">
          <a className="button button--primary" href="/">Back to homepage <span aria-hidden="true">→</span></a>
          <a className="button button--secondary" href="/#work">Explore selected work</a>
          <a className="button button--secondary" href="/#contact">Start a conversation</a>
          <a className="button button--secondary" href="/cv">View CV <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </section>
  );
}

function RouteIntro({ route }: { route: ReturnType<typeof getSiteRoute> }) {
  return (
    <section className="page-intro" aria-labelledby="page-title">
      <h1 id="page-title">{route.heading}</h1>
      <p>{route.summary}</p>
    </section>
  );
}

function Homepage({ githubUrl }: { githubUrl?: string }) {
  const configuredGithubUrl = getConfiguredExternalUrl(githubUrl);

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="hero__eyebrow">{homeHero.eyebrow}</p>
          <h1 id="hero-title">{homeHero.title}</h1>
          <p className="hero__summary">{homeHero.summary}</p>
          <div className="hero__tags" aria-label="Role, location and working preferences">
            {homeHero.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <div className="hero__actions">
            <a className="button button--primary" href="#work">View selected work</a>
            <a className="button button--secondary" href="#contact">Start a conversation</a>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="impact-heading">
        <SectionIntro
          eyebrow="Selected signal"
          title="Measured in systems and outcomes."
          titleId="impact-heading"
          description="A few numbers that give the work its scale and context."
        />
        <div className="impact-strip">
          {homeMetrics.map((metric) => (
            <Card as="div" key={metric.label} className="impact-strip__item">
              <Metric {...metric} />
            </Card>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="what-i-do-heading">
        <SectionIntro
          eyebrow="What I do"
          title="Backend work with production context."
          titleId="what-i-do-heading"
          description="I work across the system boundary when the backend needs to connect product decisions with reliable operations."
        />
        <div className="capability-grid">
          {homeCapabilities.map((capability) => (
            <Card as="article" key={capability.title} className="capability-card">
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
              <div className="card-tags" aria-label={`${capability.title} technologies`}>
                {capability.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="work" className="home-section" aria-labelledby="work-heading">
        <SectionIntro
          eyebrow="Featured work"
          title="Systems built to remove friction."
          titleId="work-heading"
          description="Selected case studies, ordered from infrastructure reliability to the more specialized systems work."
        />
        <div className="work-grid">
          {featuredWork.map((work, index) => (
            <Card
              as="article"
              key={work.title}
              interactive={!work.quiet}
              className={`work-card${work.quiet ? ' work-card--quiet' : ''}`}
            >
              <div className="work-card__header">
                <p className="work-card__index">{String(index + 1).padStart(2, '0')}</p>
                <h3>{work.title}</h3>
              </div>
              <p className="work-card__summary">{work.summary}</p>
              <div className="card-tags" aria-label={`${work.title} technologies`}>
                {work.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <a className="interactive-link work-card__link" href={work.href}>
                {work.linkLabel}<span aria-hidden="true"> →</span>
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="career-heading">
        <SectionIntro
          eyebrow="Career story"
          title="A backend-first path, shaped by the work."
          titleId="career-heading"
          description="The role changed as the systems and responsibilities grew. The timeline stays explicit."
        />
        <ol className="career-timeline">
          {careerTimeline.map((entry) => (
            <li className="career-card" key={`${entry.period}-${entry.company}`}>
              <p className="career-card__period">{entry.period}</p>
              <div className="career-card__body">
                <p className="career-card__company">{entry.company}</p>
                <h3>{entry.role}</h3>
                <p>{entry.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section" aria-labelledby="approach-heading">
        <SectionIntro
          eyebrow="Engineering approach"
          title="Engineering Approach"
          titleId="approach-heading"
          description={engineeringApproach.description}
        />
        <div className="approach-grid">
          {engineeringApproach.points.map((point) => (
            <Card as="article" key={point.title} className="approach-card">
              <h3>{point.title}</h3>
              <p>{point.summary}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="expertise-heading">
        <SectionIntro
          eyebrow="Technical expertise"
          title="The backend is the identity. The rest is working range."
          titleId="expertise-heading"
          description="Grouped by the problems these tools help solve, without percentages or a logo wall."
        />
        <div className="expertise-grid">
          {expertiseGroups.map((group) => (
            <Card
              as="article"
              key={group.title}
              className={`expertise-card${group.supporting ? ' expertise-card--supporting' : ''}`}
            >
              <h3>{group.title}</h3>
              <div className="card-tags" aria-label={`${group.title} technologies`}>
                {group.items.map((item) => <Tag key={item}>{item}</Tag>)}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="home-section about-section" aria-labelledby="about-heading">
        <SectionIntro
          eyebrow="About"
          title="A practical engineer for systems that have to keep working."
          titleId="about-heading"
          description="A short context for the person behind the case studies."
        />
        <div className="about-layout">
          <div className="about-copy">
            {aboutCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <figure className="about-photo">
            <img
              className="about-photo__image"
              src="/images/about/ivan-hubko.jpg"
              alt="Ivan Hubko"
              width="3687"
              height="3687"
            />
            <figcaption>Ivan Hubko</figcaption>
          </figure>
        </div>
      </section>

      <section id="contact" className="home-anchor-targets" aria-labelledby="contact-heading">
        <div className="contact-section">
          <SectionIntro
            eyebrow="Contact"
            title="Have a backend problem worth solving?"
            titleId="contact-heading"
            description="Email is the fastest way to reach me. You can also use the form for a first introduction."
          />
          <div className="contact-layout">
            <div className="contact-details">
              <div className="contact-actions" aria-label="Contact links">
                <a
                  className="contact-link"
                  href={`mailto:${contactDetails.email}`}
                  onClick={() => trackAnalyticsEvent('email_click')}
                >
                  <span className="contact-link__label">Email</span>
                  <span className="contact-link__value">{contactDetails.email}</span>
                </a>
                <a
                  className="contact-link"
                  href={contactDetails.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAnalyticsEvent('linkedin_click')}
                >
                  <span className="contact-link__label">LinkedIn</span>
                  <span className="contact-link__value">Profile <span aria-hidden="true">↗</span></span>
                </a>
                <a
                  className="contact-link"
                  href={contactDetails.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAnalyticsEvent('telegram_click')}
                >
                  <span className="contact-link__label">Telegram</span>
                  <span className="contact-link__value">{contactDetails.telegramHandle} <span aria-hidden="true">↗</span></span>
                </a>
                {configuredGithubUrl ? (
                  <a
                    className="contact-link"
                    href={configuredGithubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackAnalyticsEvent('github_click')}
                  >
                    <span className="contact-link__label">GitHub</span>
                    <span className="contact-link__value">Profile <span aria-hidden="true">↗</span></span>
                  </a>
                ) : (
                  <Button
                    className="contact-link contact-link--disabled"
                    type="button"
                    variant="secondary"
                    disabled
                    aria-describedby="github-config-note"
                  >
                    <span className="contact-link__label">GitHub</span>
                    <span className="contact-link__value">Not configured</span>
                  </Button>
                )}
              </div>
              {!githubUrl && (
                <p id="github-config-note" className="contact-config-note">
                  GitHub will be enabled when the public profile URL is confirmed.
                </p>
              )}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function getConfiguredExternalUrl(value: string | undefined) {
  const configuredValue = value?.trim();
  if (!configuredValue) return undefined;

  try {
    const url = new URL(configuredValue);
    return url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}
