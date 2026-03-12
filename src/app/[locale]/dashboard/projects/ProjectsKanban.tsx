'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { Locale } from '@/i18n/config';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  priority: string;
  startDate: string | null;
  endDate: string | null;
  owner: { id: string; name: string };
  _count: { workpapers: number; milestones: number; risks: number };
}

interface ProjectsKanbanProps {
  locale: Locale;
  messages: {
    dashboard: {
      projectsTitle: string;
      noProjects: string;
      planning: string;
      fieldwork: string;
      review: string;
      reporting: string;
      completed: string;
      workpapers: string;
      milestones: string;
      risks: string;
      priority: string;
      owner: string;
      dueDate: string;
    };
  };
}

const statusConfig: Record<string, { label: string; color: string }> = {
  planning: { label: 'Planning', color: 'bg-gray-500' },
  fieldwork: { label: 'Fieldwork', color: 'bg-primary-500' },
  review: { label: 'Review', color: 'bg-primary-500' },
  reporting: { label: 'Reporting', color: 'bg-primary-500' },
  completed: { label: 'Completed', color: 'bg-primary-500' },
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  high: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  critical: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
};

function ProjectCard({ project, locale, messages }: { project: Project; locale: Locale; messages: ProjectsKanbanProps['messages'] }) {
  return (
    <Link
      href={`/${locale}/projects/${project.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
        <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', priorityColors[project.priority])}>
          {project.priority}
        </span>
      </div>

      {project.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </p>
      )}

      <div className="mb-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          {project._count.workpapers}
        </span>
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
          </svg>
          {project._count.milestones}
        </span>
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          {project._count.risks}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">{project.owner.name}</span>
        {project.endDate && (
          <span className="text-gray-500 dark:text-gray-400">
            {new Date(project.endDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function ProjectsKanban({ locale, messages }: ProjectsKanbanProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects?limit=50');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  const statuses = ['planning', 'fieldwork', 'review', 'reporting', 'completed'];

  const projectsByStatus = statuses.reduce((acc, status) => {
    acc[status] = projects.filter((p) => p.status === status);
    return acc;
  }, {} as Record<string, Project[]>);

  if (projects.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-gray-500 dark:text-gray-400">{messages.dashboard.noProjects}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {messages.dashboard.projectsTitle}
      </h2>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <div key={status} className="min-w-[280px] flex-1">
            {/* Column Header */}
            <div className="mb-4 flex items-center gap-2">
              <div className={clsx('h-3 w-3 rounded-full', statusConfig[status].color)} />
              <h3 className="font-medium text-gray-900 dark:text-white">
                {messages.dashboard[status as keyof typeof messages.dashboard] || statusConfig[status].label}
              </h3>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {projectsByStatus[status].length}
              </span>
            </div>

            {/* Column Content */}
            <div className="space-y-3">
              {projectsByStatus[status].map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  locale={locale}
                  messages={messages}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
