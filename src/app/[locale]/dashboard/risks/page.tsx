import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import RisksDashboard from './RisksDashboard';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface RisksPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function RisksPage({ params }: RisksPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return <RisksDashboard locale={locale} messages={messages} />;
}
