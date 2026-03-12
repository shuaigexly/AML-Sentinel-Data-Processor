import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import ScrollReveal from '@/components/ScrollReveal';

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  return (
    <div>
      {/* ==================== HERO HEADER ==================== */}
      <section className="hero-glow noise-overlay relative overflow-hidden py-24 sm:py-32">
        {/* Ambient gradient orbs */}
        <div className="ambient-orb -left-40 -top-40 h-[500px] w-[500px] bg-primary-500/[0.04] animate-float" />
        <div className="ambient-orb -right-32 top-20 h-[400px] w-[400px] bg-primary-500/[0.03] animate-float" style={{ animationDelay: '2s' }} />
        <div className="ambient-orb bottom-0 left-1/3 h-[300px] w-[300px] bg-primary-500/[0.03] animate-float" style={{ animationDelay: '4s' }} />

        {/* Dot grid backdrop */}
        <div className="dot-pattern absolute inset-0 opacity-60" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <ScrollReveal direction="none">
              <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="gradient-text">{messages.resume.title}</span>
              </h1>
              <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
                {locale === 'zh'
                  ? '金融风险分析 / 支付风控 / 数据驱动合规'
                  : 'Risk Analytics / Fintech / Data-Driven Finance'}
              </p>
              <Link
                href={locale === 'zh' ? '/Longyu_Xu_Resume_ZH.pdf' : '/Longyu_Xu_Resume.pdf'}
                target="_blank"
                download
                className="btn-glow group relative z-10 inline-flex items-center gap-2.5 rounded-2xl bg-primary-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                {messages.resume.downloadBtn}
              </Link>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== CONTACT INFO ==================== */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-6 shadow-sm sm:p-8">
              <h2 className="mb-2 text-2xl font-bold tracking-tight">Longyu Xu</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {/* Email badge */}
                <span className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-300">
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  longyu.xu@edhec.com
                </span>
                {/* Phone badge */}
                <span className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-300">
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +86 188 2127 1689
                </span>
                {/* Location badge */}
                <span className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-300">
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {locale === 'zh' ? '上海 / 巴黎' : 'Shanghai / Paris'}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== OBJECTIVE ==================== */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
              <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
              {locale === 'zh' ? '求职意向' : 'Objective'}
            </div>
            <div className="gradient-border rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 p-6 sm:p-8">
              <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                {locale === 'zh'
                  ? '寻求2026年全职 / 实习机会 — 金融风险分析、支付风控、金融科技、量化金融方向（上海 / 巴黎 / 远程）'
                  : 'Seeking full-time / intern roles from 03/2026 — Risk Analytics, Fintech, Payment Risk, Quantitative Finance (Shanghai / Paris / Remote)'}
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== EDUCATION ==================== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-10 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
              <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
              {messages.education.title}
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {(['sjtu', 'edhec'] as const).map((key, index) => {
              const edu = messages.education[key];
              return (
                <ScrollReveal key={key} delay={index * 150}>
                  <div className="gradient-border group h-full rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                        </svg>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-primary-500/8 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                        {edu.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{edu.school}</h3>
                    <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">{edu.degree}</p>
                    {edu.details && (
                      <p className="mt-3 text-sm font-semibold text-primary-500">{edu.details}</p>
                    )}
                    {edu.courses && (
                      <div className="mt-5 rounded-xl bg-gray-50/80 p-4 dark:bg-gray-800/40">
                        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          {locale === 'zh' ? '核心课程' : 'Core Courses'}
                        </p>
                        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                          {edu.courses}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-10 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
              <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
              {messages.experience.title}
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative space-y-0">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-3 hidden h-[calc(100%-24px)] w-px bg-gradient-to-b from-primary-500/30 via-primary-500/15 to-transparent sm:block" />

            {(['natixis', 'geVernova', 'allinpay', 'caizhen'] as const).map((key, index) => {
              const exp = messages.experience[key];
              return (
                <ScrollReveal key={key} delay={index * 150}>
                  <div className="group relative pb-10 last:pb-0 sm:pl-14">
                    {/* Timeline dot with glow */}
                    <div className="timeline-dot absolute left-[12px] top-2 hidden h-[15px] w-[15px] rounded-full border-[2.5px] border-primary-500 bg-background-light transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500 dark:bg-background-dark sm:block" />

                    <div className="card-shine gradient-border rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60 sm:p-8">
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight">{exp.company}</h3>
                          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">{exp.role}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center rounded-full bg-primary-500/8 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500/50" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== SKILLS ==================== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-10 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
              <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
              {messages.skills.title}
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {(['productOperations', 'dataTools', 'languages'] as const).map((key, index) => {
              const category = messages.skills.categories[key];
              const iconPaths = [
                'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
                'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
                'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802',
              ];
              return (
                <ScrollReveal key={key} delay={index * 120}>
                  <div className="gradient-border group h-full rounded-2xl bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500 transition-transform duration-300 group-hover:scale-110">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPaths[index]} />
                      </svg>
                    </div>
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-primary-500/20 hover:bg-primary-500/5 hover:text-primary-600 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-primary-500/30 dark:hover:text-primary-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== LEADERSHIP ==================== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-10 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
              <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
              {messages.leadership.title}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="gradient-border rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900/60">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/10 text-primary-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">{messages.leadership.role}</h3>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-primary-500/8 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                  {messages.leadership.period}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                {messages.leadership.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
