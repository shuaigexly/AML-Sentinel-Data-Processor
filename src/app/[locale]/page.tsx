import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ScrollReveal';
import TiltCard from '@/components/TiltCard';
import CountUp from '@/components/CountUp';
import TypewriterRoles from '@/components/TypewriterRoles';
import SkillBarsSection from '@/components/SkillBarsSection';
import BackToTop from '@/components/BackToTop';
import TechMarquee from '@/components/TechMarquee';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  const featuredProjects = getFeaturedProjects();

  const stats = [
    { num: 3, suffix: '+', label: locale === 'zh' ? '段实习经历' : 'Internships' },
    { num: 2, suffix: '',  label: locale === 'zh' ? '所名校学位' : 'Degrees' },
    { num: 9, suffix: '',  label: locale === 'zh' ? '个项目展示' : 'Projects' },
    { num: 3, suffix: '',  label: locale === 'zh' ? '门语言' : 'Languages' },
  ];

  return (
    <div>
      {/* ==================== HERO ==================== */}
      <section className="aurora-hero hero-glow noise-overlay relative overflow-hidden py-28 sm:py-44">

        {/* Aurora blobs — vivid in dark mode */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-1/4 h-[650px] w-[650px] rounded-full bg-teal-600/[0.05] blur-[120px] animate-aurora dark:bg-teal-500/[0.14]" />
          <div className="absolute -right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-teal-700/[0.04] blur-[100px] animate-aurora-slow dark:bg-teal-600/[0.10]" />
        </div>

        {/* Dot grid backdrop */}
        <div className="dot-pattern absolute inset-0 opacity-50" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            {/* Status Badge */}
            <div className="animate-slide-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary-500/15 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-md dark:border-primary-500/25 dark:bg-white/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-400" />
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {messages.hero.nowBadge}
              </span>
            </div>

            <p className="animate-slide-up-delay-1 mb-4 text-lg font-medium text-gray-400">
              {messages.hero.greeting}
            </p>
            <h1 className="animate-slide-up-delay-1 mb-3 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="gradient-text">{messages.hero.name}</span>
            </h1>

            {/* Typewriter cycling roles */}
            <div className="animate-slide-up-delay-1 mb-7 flex items-center justify-center gap-3 text-xl text-gray-400 dark:text-gray-500 sm:text-2xl">
              <span className="h-px w-8 bg-gray-300 dark:bg-gray-700" />
              <TypewriterRoles isZh={locale === 'zh'} />
              <span className="h-px w-8 bg-gray-300 dark:bg-gray-700" />
            </div>

            <p className="animate-slide-up-delay-2 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
              {messages.hero.tagline}
            </p>

            <div className="animate-slide-up-delay-3 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/resume`}
                className="btn-glow group relative z-10 inline-flex items-center gap-2.5 rounded-2xl bg-primary-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/35"
              >
                {messages.hero.resumeBtn}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={`/${locale}/projects`}
                className="glass-card rounded-2xl px-8 py-4 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {messages.hero.projectsBtn}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="glass-card rounded-2xl px-8 py-4 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {messages.hero.contactBtn}
              </Link>
            </div>

            {/* Social icon links */}
            <div className="animate-slide-up-delay-3 mt-8 flex items-center justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/longyu-xu-550b68250/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500/30 hover:text-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-400"
              >
                <svg className="h-4.5 w-4.5 h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/shuaigexly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500/30 hover:text-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-400"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="mailto:longyu.xu@edhec.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500/30 hover:text-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-400"
              >
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
              <div className="mx-2 h-px w-6 bg-gray-300 dark:bg-gray-700" />
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">longyu.xu@edhec.com</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-600">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">Scroll</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== TECH MARQUEE ==================== */}
      <div className="border-y border-gray-100 dark:border-gray-800/60">
        <TechMarquee />
      </div>

      {/* ==================== ABOUT — BENTO GRID ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">01</span>
              <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                {messages.about.title}
              </div>
            </div>
          </ScrollReveal>

          {/* Bento grid: about text (2×2) + 4 stat cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

            {/* About text — large card, left half */}
            <ScrollReveal className="col-span-2 row-span-2" direction="left">
              <TiltCard intensity={4} className="h-full">
                <div className="gradient-border bento-card h-full rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900/60">
                  <p className="text-base leading-[1.9] text-gray-600 dark:text-gray-400">
                    {messages.about.content}
                  </p>
                  {/* Availability badge */}
                  <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-primary-500/25 bg-primary-500/[0.07] px-4 py-2 dark:border-primary-500/30 dark:bg-primary-500/[0.10]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-primary-400 opacity-60" />
                      <span className="relative h-2 w-2 rounded-full bg-primary-400" />
                    </span>
                    <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">
                      {locale === 'zh' ? '正在寻找机会' : 'Open to opportunities'}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* 4 Stat cards — right half, 2×2 */}
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={80 + i * 70}>
                <TiltCard intensity={14} className="h-full">
                  <div className="gradient-border bento-card flex h-full min-h-[130px] flex-col items-center justify-center rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-gray-900/60">
                    <div className="stat-number text-4xl font-extrabold">
                      <CountUp to={stat.num} suffix={stat.suffix} />
                    </div>
                    <div className="mt-2 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== WHAT I DO ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">02</span>
                <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                  <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                  {locale === 'zh' ? '专业方向' : 'What I Do'}
                  <span className="h-px w-10 bg-gradient-to-l from-primary-500 to-transparent" />
                </div>
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {locale === 'zh' ? '跨领域专业能力，驱动数据洞见与 AI 落地' : 'Cross-domain expertise driving data insights and AI delivery'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
                gradient: 'from-primary-500/10 to-primary-600/10',
                iconColor: 'text-primary-600 dark:text-primary-400',
                accent: 'bg-primary-500',
                accentText: 'text-primary-700 dark:text-primary-400',
                title: locale === 'zh' ? '金融风险分析' : 'Financial Risk Analytics',
                desc: locale === 'zh'
                  ? '将定量模型与监管框架结合，构建风险敞口监测、合规审查与报告自动化系统，服务银行与 FinTech 场景。'
                  : 'Bridging quantitative models with regulatory frameworks to build risk exposure monitoring, compliance review, and report automation for banking and FinTech.',
                pills: locale === 'zh' ? ['风险建模', '监管合规', 'VaR / CVaR', 'PBOC/SAFE'] : ['Risk Modeling', 'Regulatory Compliance', 'VaR / CVaR', 'PBOC/SAFE'],
              },
              {
                icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
                gradient: 'from-primary-600/10 to-primary-700/10',
                iconColor: 'text-primary-700 dark:text-primary-300',
                accent: 'bg-primary-600',
                accentText: 'text-primary-700 dark:text-primary-400',
                title: locale === 'zh' ? 'AI 工具应用' : 'AI Tools & Automation',
                desc: locale === 'zh'
                  ? '探索 RAG、LangChain、LangGraph 等工具在金融合规与审计自动化场景中的落地应用。'
                  : 'Exploring RAG, LangChain, and LangGraph tools applied to financial compliance, audit automation, and document analysis.',
                pills: locale === 'zh' ? ['RAG 检索增强', 'LangChain', '合规自动化', '文档分析'] : ['RAG Pipelines', 'LangChain', 'Compliance Automation', 'Doc Analysis'],
              },
              {
                icon: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z',
                gradient: 'from-gray-500/8 to-primary-500/8',
                iconColor: 'text-gray-500 dark:text-gray-400',
                accent: 'bg-gray-400',
                accentText: 'text-gray-600 dark:text-gray-400',
                title: locale === 'zh' ? '数据分析与可视化' : 'Data Analytics & Visualization',
                desc: locale === 'zh'
                  ? '使用 Python、SQL、Power BI 与 ECharts 构建端到端数据管道与交互仪表盘，将原始数据转化为可执行洞见。'
                  : 'End-to-end data pipelines and interactive dashboards using Python, SQL, Power BI, and ECharts, turning raw data into actionable insights.',
                pills: locale === 'zh' ? ['Python / SQL', 'Power BI', 'ECharts / D3', 'A/B 测试'] : ['Python / SQL', 'Power BI', 'ECharts / D3', 'A/B Testing'],
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 130}>
                <TiltCard intensity={8} className="h-full">
                  <div className="gradient-border bento-card group relative h-full overflow-hidden rounded-2xl bg-white p-7 shadow-sm dark:bg-gray-900/60">
                    {/* Top accent line */}
                    <div className={`absolute left-0 right-0 top-0 h-0.5 ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} ${item.iconColor}`}>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>

                    <h3 className="mb-3 text-base font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.pills.map((pill) => (
                        <span key={pill} className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.accentText} bg-gray-50 dark:bg-gray-800/60`}>
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== FEATURED PROJECTS ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-4">
                  <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">03</span>
                  <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                    <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                    {messages.featuredProjects.title}
                  </div>
                </div>
                <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
                  {locale === 'zh' ? '数据驱动的项目与分析工具' : 'Data-driven projects & analytics tools'}
                </p>
              </div>
              <Link
                href={`/${locale}/projects`}
                className="link-underline hidden items-center gap-1.5 text-sm font-semibold text-primary-500 transition-colors hover:text-primary-600 sm:inline-flex"
              >
                {messages.featuredProjects.viewAll}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const items = messages.projects.items;
              const projectKey = Object.keys(items).find((k) => items[k as keyof typeof items].slug === project.slug);
              const projectMessages = projectKey ? items[projectKey as keyof typeof items] : null;
              if (!projectMessages) return null;
              return (
                <ScrollReveal key={project.slug} delay={index * 120}>
                  <ProjectCard
                    locale={locale as Locale}
                    slug={project.slug}
                    title={projectMessages.title}
                    summary={projectMessages.summary}
                    tags={project.tags}
                    readTime={projectMessages.readTime}
                    tagLabels={messages.projects.tags}
                    readTimeLabel={messages.projects.readTime}
                    viewProjectLabel={messages.projects.viewProject}
                    hasDemo={project.hasDemo}
                    featured={project.featured}
                  />
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500"
            >
              {messages.featuredProjects.viewAll}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">04</span>
                <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                  <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                  {messages.experience.title}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative space-y-0">
            <div className="absolute left-[19px] top-3 hidden h-[calc(100%-24px)] w-px bg-gradient-to-b from-primary-500/30 via-primary-500/15 to-transparent sm:block" />

            {(['natixis', 'geVernova', 'allinpay', 'caizhen'] as const).map((key, index) => {
              const exp = messages.experience[key];
              return (
                <ScrollReveal key={key} delay={index * 150}>
                  <div className="group relative pb-10 last:pb-0 sm:pl-14">
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

      {/* ==================== EDUCATION ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">05</span>
                <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                  <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                  {messages.education.title}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {(['edhec', 'sjtu'] as const).map((key, index) => {
              const edu = messages.education[key];
              return (
                <ScrollReveal key={key} delay={index * 150}>
                  <TiltCard intensity={6} className="h-full">
                    <div className="gradient-border bento-card h-full rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900/60">
                      <div className="mb-5 flex items-start justify-between gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-500/5 text-primary-500">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                          </svg>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-primary-500/8 px-3 py-1.5 text-xs font-semibold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                          {edu.period}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{edu.school}</h3>
                      <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">{edu.degree}</p>
                      {edu.details && (
                        <p className="mt-3 text-sm font-semibold text-primary-500">{edu.details}</p>
                      )}
                      {('courses' in edu) && (edu as {courses?: string}).courses && (
                        <div className="mt-5 rounded-xl bg-gray-50/80 p-4 dark:bg-gray-800/40">
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            {locale === 'zh' ? '核心课程' : 'Core Courses'}
                          </p>
                          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                            {(edu as {courses?: string}).courses}
                          </p>
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== SKILLS ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">06</span>
                <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                  <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                  {messages.skills.title}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <SkillBarsSection isZh={locale === 'zh'} />
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </section>

      {/* ==================== LEADERSHIP ==================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-[11px] font-bold tabular-nums text-gray-300 dark:text-gray-700">07</span>
                <div className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-widest text-primary-500">
                  <span className="h-px w-10 bg-gradient-to-r from-primary-500 to-transparent" />
                  {messages.leadership.title}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <TiltCard intensity={4} className="w-full">
              <div className="gradient-border bento-card rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900/60">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-bold tracking-tight">{messages.leadership.role}</h3>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-primary-500/8 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                    {messages.leadership.period}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
                  {messages.leadership.description}
                </p>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CTA — LET'S CONNECT ==================== */}
      <section className="cta-glow relative overflow-hidden py-28 sm:py-36">
        {/* Background dots */}
        <div className="dot-pattern absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ScrollReveal>
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-primary-500/15 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary-500 shadow-sm backdrop-blur-sm dark:border-primary-500/25 dark:bg-white/[0.05]">
              {locale === 'zh' ? '开放合作' : 'Open to Collaborate'}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {locale === 'zh' ? (
                <>让我们<span className="gradient-text">一起创造</span></>
              ) : (
                <>Let&apos;s <span className="gradient-text">work together</span></>
              )}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              {locale === 'zh'
                ? '无论是 AI 工程项目、金融数据分析，还是开放性机会——期待与你交流。'
                : 'Whether it\'s an AI engineering project, financial analytics, or a new opportunity — I\'d love to hear from you.'}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:longyu.xu@edhec.com"
                className="btn-glow group inline-flex items-center gap-2.5 rounded-2xl bg-primary-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/35"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {locale === 'zh' ? '发邮件给我' : 'Send me an email'}
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/longyu-xu-550b68250/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <Link
                href={`/${locale}/contact`}
                className="glass-card inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {locale === 'zh' ? '联系页面' : 'Contact page'}
              </Link>
            </div>
          </ScrollReveal>

          {/* Email display */}
          <ScrollReveal delay={240}>
            <p className="mt-10 text-sm font-medium text-gray-400 dark:text-gray-600">
              longyu.xu@edhec.com
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
