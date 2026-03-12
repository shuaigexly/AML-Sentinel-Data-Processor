import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import WorkpapersList from './WorkpapersList';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface WorkpapersPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function WorkpapersPage({ params }: WorkpapersPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <WorkpapersList locale={locale} messages={messages} />
    </div>
  );
}
