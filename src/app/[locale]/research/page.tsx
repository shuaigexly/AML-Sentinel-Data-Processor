import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import ScrollReveal from '@/components/ScrollReveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const messages = await getMessages(locale);

  return {
    title: `${messages.research.title} | Longyu Xu`,
    description: messages.research.description,
    openGraph: {
      title: messages.research.subtitle,
      description: messages.research.description,
      type: 'website',
    },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const t = messages.research;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-glow noise-overlay relative overflow-hidden py-24 sm:py-36">
        <div className="dot-pattern absolute inset-0 opacity-40" />
        <div className="ambient-orb -left-40 -top-20 h-[400px] w-[400px] bg-primary-500/[0.04] animate-float" />
        <div className="ambient-orb -right-32 bottom-0 h-[350px] w-[350px] bg-primary-500/[0.03] animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <div className="animate-slide-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary-500/15 bg-white/60 px-5 py-2.5 shadow-sm backdrop-blur-md dark:border-primary-500/20 dark:bg-white/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400"></span>
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Fintech · Risk Analytics · Data Science
              </span>
            </div>

            <h1 className="animate-slide-up-delay-1 mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              <span className="gradient-text">{t.subtitle}</span>
            </h1>
            <p className="animate-slide-up-delay-2 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              {t.description}
            </p>

            <div className="animate-slide-up-delay-3 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/resume`}
                className="btn-glow group relative z-10 inline-flex items-center gap-2.5 rounded-2xl bg-primary-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600 hover:shadow-xl"
              >
                {t.downloadPdf}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="glass-card rounded-2xl px-8 py-4 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* Featured Work */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                {t.featuredWork}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: `/${locale}/research/business-analysis`,
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                colorFrom: 'from-primary-500/10',
                colorTo: 'to-primary-500/5',
                textColor: 'text-primary-500',
                title: t.cards.businessAnalysis.title,
                description: t.cards.businessAnalysis.description,
              },
              {
                href: `/${locale}/research/ml-churn-prediction`,
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                colorFrom: 'from-primary-500/8',
                colorTo: 'to-primary-500/4',
                textColor: 'text-primary-600',
                title: t.cards.mlProject.title,
                description: t.cards.mlProject.description,
              },
              {
                href: `/${locale}/research/dashboard`,
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                ),
                colorFrom: 'from-primary-400/10',
                colorTo: 'to-primary-500/5',
                textColor: 'text-primary-500',
                title: t.cards.dashboard.title,
                description: t.cards.dashboard.description,
              },
            ].map((card, index) => (
              <ScrollReveal key={card.href} delay={index * 120}>
                <Link
                  href={card.href}
                  className="gradient-border group flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/60"
                >
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.colorFrom} ${card.colorTo} ${card.textColor}`}>
                    {card.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold tracking-tight transition-colors group-hover:text-primary-500">
                    {card.title}
                  </h3>
                  <p className="flex-grow text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {card.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary-500">
                    {locale === 'zh' ? '查看详情' : 'View details'}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* Methods & Tooling */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-16 md:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="mb-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                {t.methods}
              </div>
              <div className="space-y-3">
                {Object.entries(t.methodsList).map(([key, value]) => (
                  <div
                    key={key}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-900/60"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-transform duration-300 group-hover:scale-110">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="mb-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                {t.tooling}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {Object.entries(t.toolingList).map(([key, value]) => (
                  <span
                    key={key}
                    className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-primary-500/20 hover:bg-primary-500/5 hover:text-primary-600 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-primary-500/30 dark:hover:text-primary-400"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="gradient-border relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/5 via-transparent to-primary-500/5 p-10 text-center sm:p-14">
              <div className="ambient-orb left-0 top-0 h-[200px] w-[200px] bg-primary-500/[0.04]" />
              <div className="ambient-orb bottom-0 right-0 h-[200px] w-[200px] bg-primary-500/[0.04]" />

              <div className="relative z-10">
                <h2 className="mb-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {t.contact}
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-gray-500 dark:text-gray-400">
                  {locale === 'zh'
                    ? '对风险分析、金融科技或数据科学合作感兴趣？欢迎联系我！'
                    : 'Interested in discussing risk analytics, fintech, or data science opportunities?'}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://github.com/shuaigexly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <Link
                    href={`/${locale}/contact`}
                    className="btn-glow relative z-10 inline-flex items-center gap-2.5 rounded-2xl bg-primary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
