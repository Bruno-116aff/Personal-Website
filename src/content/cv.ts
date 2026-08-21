export type CvExperience = {
  period: string;
  company: string;
  role: string;
  summary: string;
};

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

export const cvExperience: readonly CvExperience[] = [
  {
    period: 'Sep 2021 – Feb 2022',
    company: 'Fiverr / Upwork',
    role: 'Frontend Web Developer, freelance',
    summary: 'First commercial experience building landing pages with JavaScript, HTML and CSS.',
  },
  {
    period: 'Mar 2022 – Mar 2023',
    company: 'Alpha Tech',
    role: 'Full Stack Developer, remote',
    summary: 'Frontend-heavy work with server-side, API and database responsibilities using PHP and JavaScript.',
  },
  {
    period: 'Mar 2023 – Sep 2023',
    company: 'PS Simple Traffic',
    role: 'Frontend Developer',
    summary: 'Built internal React and TypeScript applications while expanding into backend and infrastructure work as the team grew.',
  },
  {
    period: 'Oct 2023 – Dec 2024',
    company: 'PS Simple Traffic',
    role: 'Backend Developer / Team Lead',
    summary: 'Shifted primary focus to backend, led a frontend team of 3, co-built core platform architecture and took ownership of deployment and infrastructure.',
  },
  {
    period: '2025 – present',
    company: 'PS Simple Traffic',
    role: 'Tech Lead / Senior Backend Developer',
    summary: 'Owns backend technical direction and architecture decisions, supported team growth to a peak of 8 developers, and remains hands-on in code.',
  },
];

export const cvSkillGroups: readonly CvSkillGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'PHP'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'WebSocket', 'Webhooks', 'Background processing', 'Schedulers', 'Worker processes'],
  },
  {
    title: 'Architecture & async processing',
    items: ['System design', 'Modular monoliths', 'Microservices', 'Service-oriented architecture', 'Event-driven architecture', 'Controller-service-repository pattern', 'BullMQ', 'Redis queues', 'Kafka', 'RabbitMQ', 'Retries', 'Failure handling', 'Persisted processing state'],
  },
  {
    title: 'Data & reliability',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'Schema design', 'Transactions', 'Query optimization', 'Indexing', 'Caching', 'Structured logging', 'Monitoring', 'Health checks', 'Failure recovery', 'Production troubleshooting'],
  },
  {
    title: 'Integrations & security',
    items: ['Third-party APIs', 'Meta / Facebook Graph API', 'Cloudflare API', 'Payment and financial APIs', 'Telegram integrations', 'JWT', 'Access / refresh tokens', 'httpOnly cookies', 'Session management', 'RBAC', 'CORS', 'TLS / HTTPS', 'API validation'],
  },
  {
    title: 'Cloud & delivery',
    items: ['AWS', 'Google Cloud', 'Cloudflare', 'Docker', 'Docker Compose', 'Linux / Ubuntu', 'Nginx', 'Apache2', 'Traefik', 'PM2', 'Portainer', 'Reverse proxies', 'DNS', 'GitHub Actions', 'Automated deployment', 'Git'],
  },
  {
    title: 'Supporting breadth',
    items: ['React', 'Vite', 'MUI', 'HTML5 / CSS3', 'Cursor', 'Claude Code', 'OpenAI Codex'],
    supporting: true,
  },
];

export const cvEducation = {
  institution: 'LPVFP',
  period: 'Sep 2016 – Jun 2019',
  qualification: 'Secondary Education, Mathematics',
} as const;
