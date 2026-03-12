import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import WorkpaperDetail from './WorkpaperDetail';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface WorkpaperDetailPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

export default async function WorkpaperDetailPage({ params }: WorkpaperDetailPageProps) {
  const { locale, id } = await params;
  const messages = await getMessages(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <WorkpaperDetail locale={locale} workpaperId={id} messages={messages} />
    </div>
  );
}
