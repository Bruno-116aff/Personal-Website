import { careerFacts, skillFacts } from './profile';

export type CareerEntry = (typeof careerFacts)[number];

export type ExpertiseGroup = {
  title: string;
  items: readonly string[];
  supporting?: boolean;
};

const combineSkills = (...groups: readonly (readonly string[])[]) => groups.flat();

export const careerTimeline = careerFacts;

export const expertiseGroups: readonly ExpertiseGroup[] = [
  {
    title: 'Languages',
    items: skillFacts.languages,
  },
  {
    title: 'Backend & APIs',
    items: skillFacts.backend,
  },
  {
    title: 'Architecture & messaging',
    items: skillFacts.architecture,
  },
  {
    title: 'Data & reliability',
    items: skillFacts.dataReliability,
  },
  {
    title: 'Integrations & access',
    items: combineSkills(skillFacts.integrations, skillFacts.security),
  },
  {
    title: 'Cloud, delivery & security',
    items: skillFacts.cloudDelivery,
  },
  {
    title: 'Supporting breadth',
    items: skillFacts.frontend,
    supporting: true,
  },
  {
    title: 'AI-assisted working style',
    items: skillFacts.aiAssisted,
    supporting: true,
  },
];

export const aboutCopy = [
  'I am a Senior Backend Engineer & Tech Lead based in Limassol, Cyprus. I am open to remote, hybrid and relocation work.',
  'My path started in frontend development and moved toward backend systems, automation and production ownership. I still work across the boundary when a reliable backend needs to connect architecture decisions with the way a team operates.',
] as const;
