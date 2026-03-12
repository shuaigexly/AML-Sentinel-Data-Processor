'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { Locale } from '@/i18n/config';
import type { ProjectTag } from '@/lib/projects';

const TAG_COLORS: Record<string, string> = {
  riskAnalytics:      'bg-primary-500/10 text-primary-700 dark:text-primary-300',
  dataAnalytics:      'bg-primary-500/8 text-primary-600 dark:text-primary-400',
  visualization:      'bg-primary-400/10 text-primary-600 dark:text-primary-400',
  python:             'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  sql:                'bg-primary-400/8 text-primary-700 dark:text-primary-300',
  powerBi:            'bg-primary-500/8 text-primary-700 dark:text-primary-300',
  productOperations:  'bg-primary-400/10 text-primary-600 dark:text-primary-400',
  userGrowth:         'bg-primary-500/10 text-primary-700 dark:text-primary-300',
  abtesting:          'bg-primary-400/8 text-primary-600 dark:text-primary-400',
  automation:         'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  machineLearning:    'bg-primary-400/10 text-primary-700 dark:text-primary-300',
  aiAgent:            'bg-primary-500/8 text-primary-600 dark:text-primary-400',
  rag:                'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  llm:                'bg-primary-400/10 text-primary-700 dark:text-primary-300',
  workflow:           'bg-primary-500/8 text-primary-600 dark:text-primary-400',
};

interface ProjectCardProps {
  locale: Locale;
  slug: string;
  title: string;
  summary: string;
  tags: ProjectTag[];
  readTime: number;
  tagLabels: Record<string, string>;
  readTimeLabel: string;
  viewProjectLabel: string;
  hasDemo?: boolean;
  featured?: boolean;
}

export default function ProjectCard({
  locale,
  slug,
  title,
  summary,
  tags,
  readTime,
  tagLabels,
  readTimeLabel,
  viewProjectLabel,
  hasDemo,
  featured,
}: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(12px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <article
      ref={ref}
      className="card-shine bento-card group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-primary-500/20 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-500/30 dark:hover:shadow-primary-500/5"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.18s ease-out, box-shadow 0.3s ease' }}
    >
      {/* Top row: tags + badges */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600'}`}
            >
              {tagLabels[tag] || tag}
            </span>
          ))}
        </div>

        {/* Badge area (top-right) */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {hasDemo && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-300/60 bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:border-primary-700/40 dark:bg-primary-900/20 dark:text-primary-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
              </span>
              Live Demo
            </span>
          )}
          {featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-primary-300/60 bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:border-primary-700/40 dark:bg-primary-900/20 dark:text-primary-400">
              Featured
            </span>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-bold tracking-tight transition-colors group-hover:text-primary-500">
        {title}
      </h3>

      <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {summary}
      </p>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {readTime} {readTimeLabel}
        </span>
        <Link
          href={`/${locale}/projects/${slug}`}
          className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600"
        >
          {viewProjectLabel}
          <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
