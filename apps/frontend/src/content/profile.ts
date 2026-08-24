export type CareerFact = {
  period: string;
  company: string;
  role: string;
  summary: string;
};

export const careerFacts: readonly CareerFact[] = [
  {
    period: '2021 — Feb 2022',
    company: 'Freelance',
    role: 'Frontend Web Developer',
    summary: 'Built websites and landing pages for clients using JavaScript, HTML and CSS.',
  },
  {
    period: 'Mar 2022 — Mar 2023',
    company: 'Alpha Tech',
    role: 'Full Stack Developer',
    summary:
      'Worked primarily on frontend development while also handling APIs, integrations, database queries and server-side functionality.',
  },
  {
    period: 'Mar 2023 — Sep 2023',
    company: 'PS Simple Traffic',
    role: 'Frontend Developer',
    summary:
      'Joined the product team building internal React and TypeScript applications and gradually expanded into backend, deployment and infrastructure work.',
  },
  {
    period: 'Oct 2023 — Dec 2024',
    company: 'PS Simple Traffic',
    role: 'Backend Developer / Team Lead',
    summary:
      'Shifted primary focus to backend engineering, helped establish the platform architecture, took ownership of deployment and infrastructure, and coordinated a frontend team of three developers.',
  },
  {
    period: '2025 — Present',
    company: 'PS Simple Traffic',
    role: 'Tech Lead / Senior Backend Engineer',
    summary:
      'Own backend technical direction and architecture decisions while remaining hands-on in development. Supported engineering team growth to a peak of eight developers.',
  },
];

export const skillFacts = {
  languages: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'PHP'],
  backend: [
    'Node.js',
    'TypeScript',
    'Express.js',
    'NestJS',
    'REST APIs',
    'WebSocket',
    'Webhooks',
    'Schedulers',
  ],
  architecture: [
    'System Design',
    'Modular Monoliths',
    'Microservices',
    'Event-Driven Architecture',
    'BullMQ',
    'Kafka',
    'RabbitMQ',
  ],
  dataReliability: [
    'MySQL',
    'PostgreSQL',
    'Redis',
    'SQL',
    'Transactions',
    'Caching',
    'Structured Logging',
    'Health Checks',
  ],
  cloudDelivery: [
    'AWS',
    'Google Cloud',
    'Docker',
    'Docker Compose',
    'Linux',
    'Traefik',
    'Nginx',
    'GitHub Actions',
    'CI/CD',
    'Cloudflare',
  ],
  integrationsSecurity: [
    'Third-Party APIs',
    'Cloudflare API',
    'Payment APIs',
    'Telegram Integrations',
    'JWT',
    'Sessions',
    'RBAC',
    'TLS',
  ],
  frontend: ['React', 'TypeScript', 'Vite', 'MUI', 'HTML', 'CSS'],
  aiAssisted: ['Cursor', 'Claude Code', 'OpenAI Codex'],
} as const;
