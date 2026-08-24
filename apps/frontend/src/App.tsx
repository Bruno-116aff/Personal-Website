import { useEffect } from 'react';

import { getSiteRoute } from './routes';
import SiteShell from './components/SiteShell';
import { Button, Card, Metric, SectionIntro, Tag, TechnologyList } from './components/primitives';
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
import { ElasticWaveField } from './components/ElasticWaveField';
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
      trackAnalyticsEventOnce(`case-study-open:${route.path}`, 'case_study_open', {
        case_study: route.path,
      });
    }
  }, [caseStudy, route.path]);

  return (
    <SiteShell pathname={pathname}>
      {route.path === '/' ? (
        <Homepage githubUrl={githubUrl} />
      ) : route.path === '/cv' ? (
        <CvLayout />
      ) : caseStudy ? (
        <CaseStudyLayout
          caseStudy={caseStudy}
          previousCase={caseStudyRoutes[caseStudyIndex - 1]}
          nextCase={caseStudyRoutes[caseStudyIndex + 1]}
        />
      ) : route.kind === 'not-found' ? (
        <NotFoundPage />
      ) : (
        <RouteIntro route={route} />
      )}
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
        <p className="not-found-page__eyebrow">Route not found</p>
        <h1 id="not-found-title">This page took a wrong turn.</h1>
        <p className="not-found-page__summary">
          The address does not match a published page. You can return home or continue with the
          selected work.
        </p>
        <nav className="not-found-page__navigation" aria-label="404 page navigation">
          <a className="button button--primary" href="/">
            Back to homepage <span aria-hidden="true">→</span>
          </a>
          <a className="button button--secondary" href="/#work">
            Explore selected work
          </a>
          <a className="button button--secondary" href="/#contact">
            Contact
          </a>
          <a className="button button--secondary" href="/cv">
            View CV <span aria-hidden="true">↗</span>
          </a>
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
  const configuredGithubUrl = getConfiguredExternalUrl(githubUrl) ?? contactDetails.githubUrl;

  return (
    <div className="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <ElasticWaveField />
        <div className="hero__layout">
          <div className="hero__content">
            <p className="hero__eyebrow">{homeHero.eyebrow}</p>
            <h1 id="hero-title">{homeHero.title}</h1>
            <p className="hero__summary">{homeHero.summary}</p>
            <div className="hero__tags" role="group" aria-label="Role, location and technologies">
              {homeHero.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">
                View selected work
              </a>
              <a className="button button--secondary" href="#contact">
                Start a conversation
              </a>
            </div>
          </div>
          <aside
            className="hero__story"
            aria-label="From manual friction to measurable backend outcomes"
          >
            <div className="hero__story-header">
              <span>Operating model</span>
              <span>backend / production</span>
            </div>
            <ol className="hero__story-flow">
              <li className="hero__story-step">
                <span className="hero__story-index" aria-hidden="true">
                  01
                </span>
                <strong>Manual friction</strong>
                <span>slow · fragile · repetitive</span>
              </li>
              <li className="hero__story-step">
                <span className="hero__story-index" aria-hidden="true">
                  02
                </span>
                <strong>System design</strong>
                <span>queues · workers · recovery</span>
              </li>
              <li className="hero__story-step hero__story-step--outcome">
                <span className="hero__story-index" aria-hidden="true">
                  03
                </span>
                <strong>Measured outcome</strong>
                <span>1–3h → ~15m</span>
              </li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="home-section" aria-labelledby="impact-heading">
        <SectionIntro eyebrow="Impact" title="Measured by what changed." titleId="impact-heading" />
        <div className="impact-strip">
          {homeMetrics.map((metric) => (
            <article key={metric.label} className="impact-strip__item" aria-label={metric.label}>
              <Metric {...metric} />
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="what-i-do-heading">
        <SectionIntro
          eyebrow="What I do"
          title="Backend engineering with production ownership."
          titleId="what-i-do-heading"
          description="I work across the parts of a backend system that determine whether it is useful, reliable and maintainable in production."
        />
        <div className="capability-grid">
          {homeCapabilities.map((capability) => (
            <Card as="article" key={capability.title} className="capability-card">
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
              <TechnologyList items={capability.tags} label={`${capability.title} technologies`} />
            </Card>
          ))}
        </div>
      </section>

      <section id="work" className="home-section" aria-labelledby="work-heading">
        <SectionIntro
          eyebrow="Selected work"
          title="Systems built to remove friction."
          titleId="work-heading"
          description="Four production systems that reduced manual work, improved operational control or made unreliable processes predictable."
        />
        <div className="work-grid">
          {featuredWork.map((work, index) => (
            <Card
              as="article"
              key={work.title}
              interactive
              className={`work-card${work.quiet ? ' work-card--quiet' : ''}${index === 0 ? ' work-card--featured' : ''}`}
            >
              <div className="work-card__header">
                <p className="work-card__index">{String(index + 1).padStart(2, '0')}</p>
                <h3>{work.title}</h3>
              </div>
              <p className="work-card__summary">{work.summary}</p>
              <p className="work-card__outcome">{work.outcome}</p>
              <TechnologyList items={work.tags} label={`${work.title} technologies`} />
              <a className="interactive-link work-card__link" href={work.href}>
                {work.linkLabel}
                <span aria-hidden="true"> →</span>
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="career-heading">
        <SectionIntro
          eyebrow="Career"
          title="From web development to backend ownership."
          titleId="career-heading"
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
          title="Build for the real production constraints."
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
          description="Backend is the primary discipline. Infrastructure, frontend and AI-assisted tooling support end-to-end ownership when the work requires them."
        />
        <div className="expertise-grid">
          {expertiseGroups.map((group) => (
            <Card
              as="article"
              key={group.title}
              className={`expertise-card${group.supporting ? ' expertise-card--supporting' : ''}`}
            >
              <h3>{group.title}</h3>
              <TechnologyList items={group.items} label={`${group.title} technologies`} />
              {group.description && <p>{group.description}</p>}
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="home-section about-section" aria-labelledby="about-heading">
        <SectionIntro
          eyebrow="About"
          title="Backend engineer focused on systems that have to work in production."
          titleId="about-heading"
        />
        <div className="about-layout">
          <div className="about-copy">
            {aboutCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="home-anchor-targets" aria-labelledby="contact-heading">
        <div className="contact-section">
          <SectionIntro
            eyebrow="Contact"
            title="Looking for a Senior Backend Engineer?"
            titleId="contact-heading"
            description={
              <>
                I am open to Senior Backend Engineer and hands-on Tech Lead opportunities in Cyprus,
                as well as remote or relocation opportunities.
                <br />
                If my background looks relevant to your team, send me a message.
              </>
            }
          />
          <div className="contact-layout">
            <div className="contact-details">
              <nav className="contact-actions" aria-label="Contact links">
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
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  onClick={() => trackAnalyticsEvent('linkedin_click')}
                >
                  <span className="contact-link__label">LinkedIn</span>
                  <span className="contact-link__value">
                    Profile <span aria-hidden="true">↗</span>
                  </span>
                </a>
                <a
                  className="contact-link"
                  href={contactDetails.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram profile (opens in a new tab)"
                  onClick={() => trackAnalyticsEvent('telegram_click')}
                >
                  <span className="contact-link__label">Telegram</span>
                  <span className="contact-link__value">
                    {contactDetails.telegramHandle} <span aria-hidden="true">↗</span>
                  </span>
                </a>
                {configuredGithubUrl ? (
                  <a
                    className="contact-link"
                    href={configuredGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    onClick={() => trackAnalyticsEvent('github_click')}
                  >
                    <span className="contact-link__label">GitHub</span>
                    <span className="contact-link__value">
                      Profile <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                ) : (
                  <Button
                    className="contact-link contact-link--disabled"
                    type="button"
                    variant="secondary"
                    disabled
                  >
                    <span className="contact-link__label">GitHub</span>
                    <span className="contact-link__value">Not configured</span>
                  </Button>
                )}
              </nav>
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
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}
