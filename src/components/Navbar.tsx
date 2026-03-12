'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  locale: Locale;
  messages: {
    nav: {
      home: string;
      projects: string;
      research: string;
      resume: string;
      contact: string;
      riskTool: string;
    };
    theme: {
      light: string;
      dark: string;
    };
    language: {
      en: string;
      zh: string;
    };
  };
}

export default function Navbar({ locale, messages }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: messages.nav.home },
    { href: `/${locale}/projects`, label: messages.nav.projects },
    { href: `/${locale}/research`, label: messages.nav.research },
    { href: `/${locale}/risk-assistant`, label: messages.nav.riskTool },
    { href: `/${locale}/resume`, label: messages.nav.resume },
    { href: `/${locale}/contact`, label: messages.nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href || pathname === `${href}/` : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/70 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white shadow-sm shadow-primary-500/25">
              L
            </span>
            <span className="transition-colors group-hover:text-primary-500">
              Longyu Xu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary-500" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageToggle currentLocale={locale} labels={messages.language} />
            <ThemeToggle lightLabel={messages.theme.light} darkLabel={messages.theme.dark} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm md:hidden dark:border-gray-700 dark:bg-gray-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden dark:border-gray-800">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-3 px-4">
                <LanguageToggle currentLocale={locale} labels={messages.language} />
                <ThemeToggle lightLabel={messages.theme.light} darkLabel={messages.theme.dark} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
