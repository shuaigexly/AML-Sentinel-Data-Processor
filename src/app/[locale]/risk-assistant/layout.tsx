import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import RiskAssistantNav from '@/components/RiskAssistantNav';

export default async function RiskAssistantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex gap-8">
          <RiskAssistantNav locale={locale} />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
