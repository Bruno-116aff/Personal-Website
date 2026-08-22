import { careerFacts, skillFacts } from './profile';

export type CvExperience = (typeof careerFacts)[number];

export type CvSkillGroup = {
  title: string;
  items: readonly string[];
  supporting?: boolean;
};

const combineSkills = (...groups: readonly (readonly string[])[]) => groups.flat();

export const cvProfile = {
  title: 'Senior Backend Engineer & Tech Lead',
  location: 'Limassol, Cyprus',
  availability: 'Open to remote, hybrid and relocation',
  summary: [
    'Senior Backend Engineer & Tech Lead focused on Node.js, TypeScript, automation and production ownership.',
    '5 years of commercial experience, including 3+ years focused on backend systems.',
  ],
} as const;

export const cvExperience = careerFacts;

export const cvSkillGroups: readonly CvSkillGroup[] = [
  {
    title: 'Languages',
    items: skillFacts.languages,
  },
  {
    title: 'Backend & APIs',
    items: skillFacts.backend,
  },
  {
    title: 'Architecture & async processing',
    items: skillFacts.architecture,
  },
  {
    title: 'Data & reliability',
    items: skillFacts.dataReliability,
  },
  {
    title: 'Integrations & security',
    items: combineSkills(skillFacts.integrations, skillFacts.security),
  },
  {
    title: 'Cloud & delivery',
    items: skillFacts.cloudDelivery,
  },
  {
    title: 'Supporting breadth',
    items: combineSkills(skillFacts.frontend, skillFacts.aiAssisted),
    supporting: true,
  },
];

export const cvEducation = {
  institution: 'LPVFP',
  period: 'Sep 2016 – Jun 2019',
  qualification: 'Secondary Education, Mathematics',
} as const;
