import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import { getProjectBySlug, projects } from '@/lib/projects';
import UserGrowthAnalyticsTool from '@/components/UserGrowthAnalyticsTool';
import RagQATool from '@/components/RagQATool';
import MultiAgentTool from '@/components/MultiAgentTool';
import WorkflowAutomationTool from '@/components/WorkflowAutomationTool';
import AiCoworkTool from '@/components/AiCoworkTool';
import OpsAnalyticsTool from '@/components/OpsAnalyticsTool';
import AmlSentinelTool from '@/components/AmlSentinelTool';

export async function generateStaticParams() {
  return ['en', 'zh'].flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

const TAG_COLORS: Record<string, string> = {
  riskAnalytics: 'bg-primary-500/10 text-primary-700 dark:text-primary-400',
  dataAnalytics: 'bg-primary-500/8 text-primary-600 dark:text-primary-400',
  visualization: 'bg-primary-400/10 text-primary-700 dark:text-primary-300',
  python: 'bg-primary-500/10 text-primary-700 dark:text-primary-400',
  sql: 'bg-primary-400/8 text-primary-600 dark:text-primary-300',
  powerBi: 'bg-primary-500/8 text-primary-700 dark:text-primary-400',
  productOperations: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  userGrowth: 'bg-primary-400/10 text-primary-700 dark:text-primary-300',
  abtesting: 'bg-primary-500/8 text-primary-600 dark:text-primary-400',
  automation: 'bg-primary-500/10 text-primary-700 dark:text-primary-400',
  machineLearning: 'bg-primary-400/8 text-primary-700 dark:text-primary-300',
  aiAgent: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  rag: 'bg-primary-500/10 text-primary-700 dark:text-primary-400',
  llm: 'bg-primary-400/10 text-primary-600 dark:text-primary-300',
  workflow: 'bg-primary-500/8 text-primary-700 dark:text-primary-400',
};

// Map each tag to a short abbreviation for the sidebar stack display
const TAG_ABBR: Record<string, string> = {
  python: 'PY', sql: 'SQL', powerBi: 'PBI', dataAnalytics: 'DA',
  visualization: 'VIZ', riskAnalytics: 'RISK', abtesting: 'A/B',
  automation: 'AUTO', machineLearning: 'ML', aiAgent: 'AGENT',
  rag: 'RAG', llm: 'LLM', workflow: 'FLOW', productOperations: 'OPS',
  userGrowth: 'GROW',
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) notFound();

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const messages = await getMessages(locale);

  const projectKey = Object.keys(messages.projects.items).find(
    (key) => messages.projects.items[key as keyof typeof messages.projects.items].slug === slug
  ) as keyof typeof messages.projects.items | undefined;

  if (!projectKey) notFound();

  const projectMessages = messages.projects.items[projectKey];
  const isZh = locale === 'zh';

  // Prev / next project navigation
  const projectIdx = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIdx > 0 ? projects[projectIdx - 1] : null;
  const nextProject = projectIdx < projects.length - 1 ? projects[projectIdx + 1] : null;

  const getProjTitle = (s: string) => {
    const key = Object.keys(messages.projects.items).find(
      (k) => messages.projects.items[k as keyof typeof messages.projects.items].slug === s
    ) as keyof typeof messages.projects.items | undefined;
    return key ? messages.projects.items[key].title : s;
  };

  return (
    <div>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 pb-14 pt-16 dark:border-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-500/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-primary-500/4 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href={`/${locale}/projects`}
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {messages.projects.backToProjects}
          </Link>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600'}`}
              >
                {messages.projects.tags[tag] || tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {projectMessages.title}
          </h1>

          {/* Summary */}
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {projectMessages.summary}
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {projectMessages.readTime} {messages.projects.readTime}
            </div>
            {project.hasDemo && (
              <div className="flex items-center gap-1.5 rounded-full border border-primary-300/60 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700 shadow-sm dark:border-primary-700/40 dark:bg-primary-900/20 dark:text-primary-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
                </span>
                {isZh ? '含交互演示' : 'Interactive Demo'}
              </div>
            )}
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {project.tags.length} {isZh ? '个技术标签' : 'tech tags'}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-10">

            {/* Overview */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-0.5 rounded-full bg-primary-500" />
                <h2 className="text-lg font-bold">{isZh ? '项目概述' : 'Overview'}</h2>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
                {projectMessages.content.overview}
              </div>
            </section>

            {/* Features */}
            <section>
              <div className="mb-5 flex items-center gap-2">
                <div className="h-5 w-0.5 rounded-full bg-primary-500" />
                <h2 className="text-lg font-bold">{isZh ? '核心功能' : 'Key Features'}</h2>
              </div>
              <div className="space-y-3">
                {projectMessages.content.features.map((feature, index) => {
                  const [title, ...rest] = feature.split('—');
                  const body = rest.join('—').trim();
                  return (
                    <div
                      key={index}
                      className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-primary-500/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                    >
                      {/* Number badge */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-500/8 text-xs font-black text-primary-600 dark:text-primary-400">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        {body ? (
                          <>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title.trim()}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{body}</p>
                          </>
                        ) : (
                          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{feature}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Methodology */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-5 w-0.5 rounded-full bg-primary-500" />
                <h2 className="text-lg font-bold">{isZh ? '技术方法' : 'Methodology'}</h2>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-primary-200/50 bg-gradient-to-br from-primary-50/40 to-primary-50/10 p-5 dark:border-primary-900/30 dark:from-primary-900/10 dark:to-primary-950/5">
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary-400/6" />
                <p className="relative text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {projectMessages.content.methodology}
                </p>
              </div>
            </section>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="space-y-6">

            {/* Tech stack card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {isZh ? '技术栈' : 'Tech Stack'}
              </p>
              <div className="space-y-2">
                {project.tags.map((tag) => (
                  <div key={tag} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {messages.projects.tags[tag] || tag}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-500'}`}>
                      {TAG_ABBR[tag] || tag.slice(0, 4).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project stats card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {isZh ? '项目信息' : 'Project Info'}
              </p>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{isZh ? '阅读时长' : 'Read time'}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{projectMessages.readTime} {isZh ? '分钟' : 'min'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{isZh ? '交互演示' : 'Live demo'}</span>
                  <span className={`font-semibold ${project.hasDemo ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
                    {project.hasDemo ? (isZh ? '可体验' : 'Available') : (isZh ? '文档型' : 'Doc only')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{isZh ? '重点项目' : 'Featured'}</span>
                  <span className={`font-semibold ${project.featured ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
                    {project.featured ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">{isZh ? '技术标签' : 'Tags'}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{project.tags.length}</span>
                </div>
              </div>
            </div>

            {/* Back CTA */}
            <Link
              href={`/${locale}/projects`}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:border-primary-500/30 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-primary-900/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {messages.projects.backToProjects}
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════
            DEMO SECTIONS (full-width below)
        ══════════════════════════════════════ */}

        {/* User Growth Analytics */}
        {project.hasDemo && slug === 'user-growth-analytics' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="交互式增长分析工具"
              labelEn="Interactive Growth Analytics Tool"
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <UserGrowthAnalyticsTool messages={messages.userGrowthTool} />
            </div>
          </div>
        )}

        {/* RAG Assistant */}
        {project.hasDemo && slug === 'fintech-rag-assistant' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="RAG 智能问答演示"
              labelEn="RAG Q&A Live Demo"
              descZh="在此体验完整的混合检索流水线，实时检索 11 条监管法规并生成带引用的答案。"
              descEn="Experience the full hybrid retrieval pipeline live — searching 11 real regulatory documents and generating cited answers."
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <RagQATool isZh={isZh} />
            </div>
          </div>
        )}

        {/* Multi-Agent Research */}
        {project.hasDemo && slug === 'multi-agent-research' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="多智能体流水线演示"
              labelEn="Multi-Agent Pipeline Demo"
              descZh="选择研究课题，启动 4 层 Agent 流水线，实时观察工具调用日志与最终报告生成。"
              descEn="Select a research topic, launch the 4-layer agent pipeline, and watch tool call logs and final report generation in real time."
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <MultiAgentTool isZh={isZh} />
            </div>
          </div>
        )}

        {/* AI Workflow Automation */}
        {project.hasDemo && slug === 'ai-workflow-automation' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="LangGraph 合规审查工作流演示"
              labelEn="LangGraph Compliance Workflow Demo"
              descZh="选择合规文档，启动状态机流水线，体验 Human-in-the-loop 审批节点与条件路由。"
              descEn="Select a compliance document, run the state machine pipeline, and interact with the Human-in-the-loop approval node and conditional routing."
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <WorkflowAutomationTool isZh={isZh} />
            </div>
          </div>
        )}

        {/* AI Cowork Platform */}
        {project.hasDemo && slug === 'ai-cowork-platform' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="AI 协作数据分析演示"
              labelEn="AI Cowork Analytics Demo"
              descZh="选择分析问题，体验 LLM 副驾驶如何通过工具调用与流式输出协助完成数据洞察。"
              descEn="Pick an analysis query and watch the LLM copilot drive data insights through tool calls and streaming output."
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <AiCoworkTool isZh={isZh} />
            </div>
          </div>
        )}

        {/* Operations Analytics Dashboard */}
        {project.hasDemo && slug === 'operations-analytics-dashboard' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="A/B 实验统计显著性分析"
              labelEn="A/B Test Significance Analyzer"
              descZh="选择实验方案，查看置信度仪表盘、指标对比与统计显著性判断。"
              descEn="Select an experiment to view confidence gauges, metric comparisons, and statistical significance results."
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <OpsAnalyticsTool isZh={isZh} />
            </div>
          </div>
        )}

        {/* AML Sentinel */}
        {project.hasDemo && slug === 'aml-sentinel' && (
          <div className="mt-16">
            <DemoSectionHeader
              labelZh="AML 合规调查工作台"
              labelEn="AML Investigation Workbench"
              descZh="从预警分级到 STR 起草的完整银行 AML 调查工作流演示。"
              descEn="Full bank AML investigation workflow from alert triage to STR drafting."
              isZh={isZh}
            />
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
              <AmlSentinelTool isZh={isZh} messages={(messages as any).amlSentinel} />
            </div>
          </div>
        )}

        {/* Payment Risk Assistant — link to full tool */}
        {slug === 'payment-risk-assistant' && (
          <div className="mt-16">
            <div className="relative overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-50/80 to-primary-50/20 p-8 text-center dark:border-primary-500/15 dark:from-primary-950/40 dark:to-primary-950/10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-500/8 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-primary-400/6 blur-2xl" />
              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
                  </span>
                  {isZh ? '完整交互工具' : 'Full Interactive Tool'}
                </div>
                <h3 className="mb-3 text-xl font-extrabold">
                  {isZh ? '启动支付风险监控助手' : 'Launch Payment Risk Assistant'}
                </h3>
                <p className="mx-auto mb-6 max-w-md text-sm text-gray-500 dark:text-gray-400">
                  {isZh
                    ? '体验完整的仪表板、法规库（11 条）、风险映射、场景评分与警报管理。'
                    : 'Explore the full dashboard, regulation library (11 docs), risk mapping, scenario scoring and alert management.'}
                </p>
                <Link
                  href={`/${locale}/risk-assistant`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl"
                >
                  {isZh ? '打开完整工具' : 'Open Full Tool'}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* ══════════════════════════════════════
            PREV / NEXT PROJECT NAV
        ══════════════════════════════════════ */}
        <div className="mt-20 border-t border-gray-100 pt-10 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-4">
            {/* Prev */}
            <div>
              {prevProject ? (
                <Link
                  href={`/${locale}/projects/${prevProject.slug}`}
                  className="group flex flex-col gap-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-primary-500/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                >
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors group-hover:text-primary-500">
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {isZh ? '上一个项目' : 'Previous'}
                  </span>
                  <span className="text-sm font-bold text-gray-700 line-clamp-1 group-hover:text-primary-600 dark:text-gray-200 dark:group-hover:text-primary-400">
                    {getProjTitle(prevProject.slug)}
                  </span>
                </Link>
              ) : <div />}
            </div>

            {/* Next */}
            <div>
              {nextProject ? (
                <Link
                  href={`/${locale}/projects/${nextProject.slug}`}
                  className="group flex flex-col items-end gap-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-primary-500/20 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
                >
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors group-hover:text-primary-500">
                    {isZh ? '下一个项目' : 'Next'}
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="text-sm font-bold text-gray-700 line-clamp-1 group-hover:text-primary-600 dark:text-gray-200 dark:group-hover:text-primary-400">
                    {getProjTitle(nextProject.slug)}
                  </span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoSectionHeader({
  labelZh, labelEn, descZh, descEn, isZh,
}: {
  labelZh: string;
  labelEn: string;
  descZh?: string;
  descEn?: string;
  isZh: boolean;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-primary-500" />
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-primary-500">
            {isZh ? '交互演示' : 'Interactive Demo'}
          </div>
          <h2 className="text-xl font-extrabold">{isZh ? labelZh : labelEn}</h2>
        </div>
      </div>
      {(descZh || descEn) && (
        <p className="ml-7 text-sm text-gray-500 dark:text-gray-400">
          {isZh ? descZh : descEn}
        </p>
      )}
    </div>
  );
}
