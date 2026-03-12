import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale, isValidLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingSidebar from '@/components/FloatingSidebar';
import BackToTop from '@/components/BackToTop';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const messages = await getMessages(locale);

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.ogTitle,
      description: messages.meta.ogDescription,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      images: ['/og.svg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.ogTitle,
      description: messages.meta.ogDescription,
      images: ['/og.svg'],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        zh: '/zh',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        locale={locale}
        messages={{
          nav: messages.nav,
          theme: messages.theme,
          language: messages.language,
        }}
      />
      <FloatingSidebar />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} messages={messages.footer} navMessages={messages.nav} />
      <BackToTop />
    </div>
  );
}
