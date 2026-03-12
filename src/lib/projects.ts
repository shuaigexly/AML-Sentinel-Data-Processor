export type ProjectTag =
  | 'dataAnalytics'
  | 'powerBi'
  | 'python'
  | 'sql'
  | 'productOperations'
  | 'userGrowth'
  | 'abtesting'
  | 'visualization'
  | 'automation'
  | 'machineLearning'
  | 'riskAnalytics'
  | 'aiAgent'
  | 'rag'
  | 'llm'
  | 'workflow';

export interface Project {
  slug: string;
  tags: ProjectTag[];
  featured: boolean;
  hasDemo: boolean;
}

export const projects: Project[] = [
  {
    slug: 'payment-risk-assistant',
    tags: ['riskAnalytics', 'dataAnalytics', 'visualization', 'python', 'sql'],
    featured: true,
    hasDemo: true,
  },
  {
    slug: 'user-growth-analytics',
    tags: ['productOperations', 'userGrowth', 'dataAnalytics', 'abtesting', 'visualization'],
    featured: true,
    hasDemo: true,
  },
  {
    slug: 'operations-analytics-dashboard',
    tags: ['powerBi', 'dataAnalytics', 'abtesting', 'visualization'],
    featured: false,
    hasDemo: true,
  },
  {
    slug: 'fintech-data-pipeline',
    tags: ['python', 'sql', 'dataAnalytics', 'automation', 'machineLearning'],
    featured: false,
    hasDemo: false,
  },
  {
    slug: 'university-dashboard',
    tags: ['dataAnalytics', 'powerBi', 'python', 'sql'],
    featured: false,
    hasDemo: false,
  },
  {
    slug: 'fintech-rag-assistant',
    tags: ['rag', 'llm', 'python', 'dataAnalytics', 'riskAnalytics'],
    featured: true,
    hasDemo: true,
  },
  {
    slug: 'multi-agent-research',
    tags: ['aiAgent', 'llm', 'python', 'dataAnalytics', 'machineLearning'],
    featured: true,
    hasDemo: true,
  },
  {
    slug: 'ai-workflow-automation',
    tags: ['workflow', 'aiAgent', 'automation', 'python'],
    featured: false,
    hasDemo: true,
  },
  {
    slug: 'ai-cowork-platform',
    tags: ['workflow', 'visualization', 'dataAnalytics', 'llm'],
    featured: false,
    hasDemo: true,
  },
  {
    slug: 'aml-sentinel',
    tags: ['riskAnalytics', 'aiAgent', 'rag', 'llm'],
    featured: true,
    hasDemo: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByTag(tag: ProjectTag): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllTags(): ProjectTag[] {
  return Array.from(new Set(projects.flatMap((p) => p.tags)));
}
