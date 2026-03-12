import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import DashboardOverview from './DashboardOverview';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <DashboardOverview locale={locale} messages={messages} />;
}
