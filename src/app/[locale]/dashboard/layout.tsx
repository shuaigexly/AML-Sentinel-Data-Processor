import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import { DashboardLayout } from '@/components/dashboard';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface DashboardRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function DashboardRootLayout({ children, params }: DashboardRootLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <DashboardLayout locale={locale} messages={messages}>
      {children}
    </DashboardLayout>
  );
}
