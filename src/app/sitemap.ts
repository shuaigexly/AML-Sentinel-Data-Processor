import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { projects } from '@/lib/projects';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://longyuxu.xyz';

const staticPages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/research', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/research/business-analysis', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/research/ml-churn-prediction', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/resume', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) => [
    ...staticPages.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);
}
