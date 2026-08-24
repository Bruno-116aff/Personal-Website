import { careerFacts, skillFacts } from './profile';

export type CareerEntry = (typeof careerFacts)[number];

export type ExpertiseGroup = {
  title: string;
  items: readonly string[];
  description?: string;
  supporting?: boolean;
};

export const careerTimeline = careerFacts;

export const expertiseGroups: readonly ExpertiseGroup[] = [
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
    title: 'Cloud & Delivery',
    items: skillFacts.cloudDelivery,
  },
  {
    title: 'Integrations & Security',
    items: skillFacts.integrationsSecurity,
  },
  {
    title: 'Supporting Frontend',
    items: skillFacts.frontend,
    supporting: true,
  },
  {
    title: 'AI-assisted Engineering',
    items: skillFacts.aiAssisted,
    description:
      'Used as part of day-to-day engineering for research, implementation, debugging and review — not as a substitute for engineering decisions.',
    supporting: true,
  },
];

export const aboutCopy = [
  'I am a Senior Backend Engineer & Tech Lead based in Limassol, Cyprus.',
  'I started professionally in frontend development and gradually moved toward backend engineering as my responsibilities expanded into APIs, business logic, infrastructure, automation and architecture.',
  'The work I find most valuable is where software can replace repetitive manual processes, connect fragmented systems or make unreliable operations predictable.',
  'Today I work primarily with Node.js and TypeScript and combine hands-on backend engineering with technical ownership and team coordination.',
] as const;
