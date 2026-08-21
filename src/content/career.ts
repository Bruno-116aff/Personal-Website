export type CareerEntry = {
  period: string;
  company: string;
  role: string;
  summary: string;
};

export type ExpertiseGroup = {
  title: string;
  items: readonly string[];
  supporting?: boolean;
};

export const careerTimeline: readonly CareerEntry[] = [
  {
    period: 'Sep 2021 – Feb 2022',
    company: 'Fiverr / Upwork',
    role: 'Frontend Web Developer, freelance',
    summary: 'First commercial experience: landing pages, JavaScript, HTML and CSS.',
  },
  {
    period: 'Mar 2022 – Mar 2023',
    company: 'Alpha Tech',
    role: 'Full Stack Developer, remote',
    summary: 'Frontend-heavy product work with server-side, API and database responsibilities using PHP and JavaScript.',
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
    summary: 'Owns backend technical direction and architecture decisions, supports team growth and remains hands-on in code.',
  },
];

export const expertiseGroups: readonly ExpertiseGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'PHP'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'WebSocket', 'Webhooks', 'Background processing', 'Schedulers', 'Worker processes'],
  },
  {
    title: 'Architecture & messaging',
    items: ['System design', 'Modular monoliths', 'Microservices', 'Service-oriented architecture', 'Event-driven architecture', 'BullMQ', 'Redis queues', 'Kafka', 'RabbitMQ', 'Retries and failure handling'],
  },
  {
    title: 'Data & reliability',
    items: ['MySQL', 'PostgreSQL', 'Redis', 'Schema design', 'Transactions', 'Query optimization', 'Indexing', 'Caching', 'Monitoring', 'Health checks', 'Failure recovery'],
  },
  {
    title: 'Integrations & access',
    items: ['Third-party APIs', 'Meta / Facebook Graph API', 'Cloudflare API', 'Payment and financial APIs', 'Telegram integrations', 'JWT', 'Access / refresh tokens', 'httpOnly cookies', 'Session management', 'RBAC', 'CORS', 'API validation'],
  },
  {
    title: 'Cloud, delivery & security',
    items: ['AWS', 'Google Cloud', 'Cloudflare', 'Docker', 'Linux / Ubuntu', 'Nginx', 'Traefik', 'GitHub Actions', 'JWT', 'RBAC', 'TLS / HTTPS', 'API validation'],
  },
  {
    title: 'Supporting breadth',
    items: ['React', 'TypeScript', 'Vite', 'MUI', 'HTML5 / CSS3'],
    supporting: true,
  },
  {
    title: 'AI-assisted working style',
    items: ['Cursor', 'Claude Code', 'OpenAI Codex'],
    supporting: true,
  },
];

export const aboutCopy = [
  'I am a Senior Backend Engineer & Tech Lead based in Limassol, Cyprus. I am open to remote, hybrid and relocation work.',
  'My path started in frontend development and moved toward backend systems, automation and production ownership. I still work across the boundary when a reliable backend needs to connect architecture decisions with the way a team operates.',
] as const;
