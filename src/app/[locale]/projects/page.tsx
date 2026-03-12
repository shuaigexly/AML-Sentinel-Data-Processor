'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { isValidLocale, type Locale } from '@/i18n/config';
import { projects, getAllTags, type ProjectTag } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

type Messages = {
  projects: {
    title: string;
    filterLabel: string;
    allTag: string;
    readTime: string;
    viewProject: string;
    tags: Record<string, string>;
    items: Record<string, {
      title: string;
      slug: string;
      summary: string;
      readTime: number;
      tags: string[];
    }>;
  };
};

export default function ProjectsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [messages, setMessages] = useState<Messages | null>(null);
  const [selectedTag, setSelectedTag] = useState<ProjectTag | 'all'>('all');

  useEffect(() => {
    if (isValidLocale(locale)) {
      import(`@/i18n/messages/${locale}.json`).then((m) => setMessages(m.default));
    }
  }, [locale]);

  if (!messages || !isValidLocale(locale)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  const allTags = getAllTags();
  const filteredProjects = selectedTag === 'all'
    ? projects
    : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <div className="relative">
      {/* Hero area */}
      <div className="hero-glow relative overflow-hidden py-20 sm:py-28">
        <div className="dot-pattern absolute inset-0 opacity-40" />
        <div className="ambient-orb -right-40 -top-40 h-[400px] w-[400px] bg-primary-500/[0.03] animate-float" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
            <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
            {messages.projects.title}
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="gradient-text">{messages.projects.title}</span>
          </h1>

          {/* Filter Tags */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {messages.projects.filterLabel}
              </p>
              <span className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-bold text-primary-600 dark:text-primary-400">
                {selectedTag === 'all' ? projects.length : projects.filter((p) => p.tags.includes(selectedTag)).length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('all')}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedTag === 'all'
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                    : 'glass-card hover:-translate-y-0.5 hover:shadow-md'
                }`}
              >
                {messages.projects.allTag}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                      : 'glass-card hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  {messages.projects.tags[tag] || tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </div>

      {/* Projects Grid */}
      <div className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const projectKey = Object.keys(messages.projects.items).find(
                (key) => messages.projects.items[key].slug === project.slug
              );
              const projectMessages = projectKey ? messages.projects.items[projectKey] : null;

              if (!projectMessages) return null;

              return (
                <ProjectCard
                  key={project.slug}
                  locale={locale as Locale}
                  slug={project.slug}
                  title={projectMessages.title}
                  summary={projectMessages.summary}
                  tags={project.tags}
                  readTime={projectMessages.readTime}
                  tagLabels={messages.projects.tags}
                  readTimeLabel={messages.projects.readTime}
                  viewProjectLabel={messages.projects.viewProject}
                  hasDemo={project.hasDemo}
                  featured={project.featured}
                />
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <p className="py-16 text-center text-gray-400">
              No projects found for this filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
