'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n/config';

interface DashboardOverviewProps {
  locale: Locale;
  messages: {
    dashboard: {
      title: string;
    };
    nav: {
      projects: string;
      resume: string;
      research: string;
    };
  };
}

export default function DashboardOverview({ locale, messages }: DashboardOverviewProps) {
  const links = [
    {
      href: `/${locale}/projects`,
      label: messages.nav.projects,
      description: 'View project portfolio and interactive demos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
      ),
    },
    {
      href: `/${locale}/research`,
      label: messages.nav.research,
      description: 'Explore research & analysis work',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      href: `/${locale}/resume`,
      label: messages.nav.resume,
      description: 'View resume and qualifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
          >
            <div className="mb-4 text-gray-400 transition-colors group-hover:text-primary-500">
              {link.icon}
            </div>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              {link.label}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
