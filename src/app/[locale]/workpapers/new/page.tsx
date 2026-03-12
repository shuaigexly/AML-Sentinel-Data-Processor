import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import NewWorkpaperForm from './NewWorkpaperForm';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface NewWorkpaperPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function NewWorkpaperPage({ params }: NewWorkpaperPageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <NewWorkpaperForm locale={locale} messages={messages} />
    </div>
  );
}
