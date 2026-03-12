'use client';

import type { Locale } from '@/i18n/config';

interface DashboardLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  messages: {
    dashboard: {
      title: string;
    };
  };
}

export default function DashboardLayout({ children, messages }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {messages.dashboard.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
