import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import WorkpapersAnalysis from './WorkpapersAnalysis';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface WorkpapersPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function WorkpapersPage({ params }: WorkpapersPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <WorkpapersAnalysis locale={locale} messages={messages} />;
}
