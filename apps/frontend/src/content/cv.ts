import { careerFacts, skillFacts } from './profile';

export type CvExperience = (typeof careerFacts)[number];

export type CvSkillGroup = {
  title: string;
  items: readonly string[];
  supporting?: boolean;
};

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
    title: 'Architecture & Async Processing',
    items: skillFacts.architecture,
  },
  {
    title: 'Data & Reliability',
    items: skillFacts.dataReliability,
  },
  {
    title: 'Integrations & Security',
    items: skillFacts.integrationsSecurity,
  },
  {
    title: 'Cloud & Delivery',
    items: skillFacts.cloudDelivery,
  },
  {
    title: 'Supporting Frontend',
    items: skillFacts.frontend,
    supporting: true,
  },
  {
    title: 'AI-assisted Engineering',
    items: skillFacts.aiAssisted,
    supporting: true,
  },
];

export const cvEducation = {
  institution: 'LPVFP',
  period: 'Sep 2016 – Jun 2019',
  qualification: 'Secondary Education, Mathematics',
} as const;
