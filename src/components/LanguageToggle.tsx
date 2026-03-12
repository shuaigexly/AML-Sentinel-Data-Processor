'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';

interface LanguageToggleProps {
  currentLocale: Locale;
  labels: Record<Locale, string>;
}

export default function LanguageToggle({ currentLocale, labels }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center rounded-lg border border-border-light bg-surface-light dark:border-border-dark dark:bg-surface-dark">
      {locales.map((locale, i) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-3 py-1.5 text-sm transition-colors ${i === 0 ? 'rounded-l-lg' : 'rounded-r-lg'} ${
            currentLocale === locale
              ? 'bg-primary-500 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-label={`Switch to ${locale === 'en' ? 'English' : 'Chinese'}`}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  );
}
