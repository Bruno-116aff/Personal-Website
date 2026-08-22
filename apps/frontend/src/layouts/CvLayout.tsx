import { Tag } from '../components/primitives';
import { cvEducation, cvExperience, cvProfile, cvSkillGroups } from '../content/cv';

export default function CvLayout() {
  return (
    <article className="cv-page">
      <header className="cv-page__hero">
        <p className="cv-page__eyebrow">Curriculum Vitae</p>
        <h1>Ivan Hubko</h1>
        <p className="cv-page__title">{cvProfile.title}</p>
        <div className="cv-page__meta" aria-label="Location and availability">
          <Tag>{cvProfile.location}</Tag>
          <Tag>{cvProfile.availability}</Tag>
        </div>
        <div className="cv-page__summary">
          {cvProfile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <nav className="cv-page__nav" aria-label="CV navigation">
          <a className="button button--primary" href="/#work">View selected work</a>
          <a className="button button--secondary" href="/#contact">Contact Ivan</a>
        </nav>
      </header>

      <section className="cv-page__section" aria-labelledby="cv-experience-heading">
        <header className="cv-page__section-header">
          <p>Experience</p>
          <h2 id="cv-experience-heading">Career history</h2>
        </header>
        <ol className="cv-experience">
          {cvExperience.map((entry) => (
            <li key={`${entry.period}-${entry.company}`} className="cv-experience__entry">
              <p className="cv-experience__period">{entry.period}</p>
              <div className="cv-experience__body">
                <p className="cv-experience__company">{entry.company}</p>
                <h3>{entry.role}</h3>
                <p>{entry.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cv-page__section" aria-labelledby="cv-skills-heading">
        <header className="cv-page__section-header">
          <p>Technical expertise</p>
          <h2 id="cv-skills-heading">Tools and system concerns</h2>
        </header>
        <div className="cv-skills">
          {cvSkillGroups.map((group) => (
            <section key={group.title} className={`cv-skills__group${group.supporting ? ' cv-skills__group--supporting' : ''}`}>
              <h3>{group.title}</h3>
              <div className="card-tags" aria-label={`${group.title} skills`}>
                {group.items.map((item) => <Tag key={item}>{item}</Tag>)}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="cv-page__section cv-page__section--education" aria-labelledby="cv-education-heading">
        <header className="cv-page__section-header">
          <p>Education</p>
          <h2 id="cv-education-heading">{cvEducation.institution}</h2>
        </header>
        <p className="cv-education__period">{cvEducation.period}</p>
        <p className="cv-education__qualification">{cvEducation.qualification}</p>
      </section>
    </article>
  );
}
