import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import ResearchDashboard from './ResearchDashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const messages = await getMessages(locale);

  return {
    title: `${messages.research.dashboard.title} | Research | Longyu Xu`,
    description: 'Interactive KPI dashboard for payment fintech platform operations with transaction volume, merchant growth, and revenue tracking.',
    openGraph: {
      title: messages.research.dashboard.title,
      description: messages.research.dashboard.subtitle,
      type: 'website',
    },
  };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const t = messages.research;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="border-b border-border-light py-8 dark:border-border-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href={`/${locale}/research`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToResearch}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.dashboard.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t.dashboard.subtitle}
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <ResearchDashboard messages={t.dashboard} />
    </div>
  );
}
