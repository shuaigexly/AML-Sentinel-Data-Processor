import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const messages = await getMessages(locale);

  return {
    title: `${messages.research.businessAnalysis.title} | Research | Longyu Xu`,
    description:
      'Comprehensive market intelligence report on China\'s third-party payment industry — competitive landscape, channel attribution, user research, and strategic recommendations.',
    openGraph: {
      title: messages.research.businessAnalysis.title,
      description:
        'Market analysis of China\'s $3.5T third-party payment ecosystem with competitive benchmarking and strategic insights.',
      type: 'article',
    },
  };
}

export default async function BusinessAnalysisPage({
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
  const sections = t.businessAnalysis.sections;

  const isZh = locale === 'zh';

  return (
    <div className="animate-fade-in">
      {/* ── Header ── */}
      <section className="border-b border-border-light py-8 dark:border-border-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href={`/${locale}/research`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToResearch}
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                </span>
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                  {isZh ? '通联支付金融科技 -- 产品分析实习' : 'Allinpay Payment Fintech -- Product Analytics Internship'}
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t.businessAnalysis.title}
              </h1>
              <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
                {isZh
                  ? '基于实习期间真实项目经验，对中国第三方支付市场的竞争格局、渠道效率、用户痛点与增长战略的系统性分析。'
                  : 'A systematic market intelligence report on China\'s third-party payment ecosystem, drawing on real project experience during my internship at Allinpay Payment Fintech.'}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <span className="rounded-full border border-border-light bg-surface-light px-3 py-1 text-xs font-medium dark:border-border-dark dark:bg-surface-dark">
                {isZh ? '2022.07 -- 2023.02' : 'Jul 2022 -- Feb 2023'}
              </span>
              <span className="rounded-full border border-border-light bg-surface-light px-3 py-1 text-xs font-medium dark:border-border-dark dark:bg-surface-dark">
                {isZh ? '12 页深度报告' : '12-page deep dive'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="border-b border-border-light py-6 dark:border-border-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex flex-wrap gap-3">
            {Object.entries(sections).map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className="rounded-full border border-border-light bg-surface-light px-4 py-1.5 text-xs font-medium transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-border-dark dark:bg-surface-dark"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="space-y-16">

          {/* ============================================================
              1. EXECUTIVE SUMMARY
              ============================================================ */}
          <section id="tldr">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">1</span>
              {sections.tldr}
            </h2>

            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
              <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {isZh
                  ? '中国第三方支付市场是全球最大且技术最先进的数字支付生态系统。截至2023年底，年交易处理总额（TPV）达到约3.5万亿美元（约25万亿人民币），移动支付渗透率高达87%。市场由两大超级应用主导 -- 支付宝（约55%市场份额）和微信支付（约38%），合计掌控超过93%的市场。通联支付（Allinpay）以约1.2%的市场份额位列第四，专注于中小微商户赋能和跨境支付服务，是独立第三方支付赛道中的领先玩家。'
                  : 'China\'s third-party payment market is the world\'s largest and most technologically advanced digital payments ecosystem. As of year-end 2023, annual Total Payment Volume (TPV) reached approximately $3.5 trillion (roughly RMB 25 trillion), with mobile payment penetration at 87%. The market is dominated by two super-apps -- Alipay (~55% market share) and WeChat Pay (~38%) -- commanding over 93% combined. Allinpay holds approximately 1.2% market share as the fourth-largest player, specialising in SME merchant enablement and cross-border payment services, making it the leading independent third-party payment platform.'}
              </p>

              {/* Key Figures Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: isZh ? '年交易总额 (TPV)' : 'Annual TPV', value: '$3.5T', sub: isZh ? '约25万亿人民币' : '~RMB 25 Trillion' },
                  { label: isZh ? '移动支付渗透率' : 'Mobile Payment Penetration', value: '87%', sub: isZh ? '全球最高' : 'Highest globally' },
                  { label: isZh ? '市场集中度 (CR2)' : 'Market Concentration (CR2)', value: '93%', sub: isZh ? '支付宝 + 微信支付' : 'Alipay + WeChat Pay' },
                  { label: isZh ? '通联支付排名' : 'Allinpay Ranking', value: '#4', sub: isZh ? '独立第三方支付领先者' : 'Leading independent player' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border-light bg-surface-light p-4 text-center dark:border-border-dark dark:bg-surface-dark">
                    <p className="text-2xl font-bold text-primary-500">{item.value}</p>
                    <p className="mt-1 text-sm font-medium">{item.label}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-500">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              2. MARKET OVERVIEW
              ============================================================ */}
          <section id="marketOverview">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">2</span>
              {sections.marketOverview}
            </h2>

            <div className="space-y-8">
              {/* Growth Narrative */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '2020--2023 市场增长轨迹' : '2020--2023 Market Growth Trajectory'}
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {isZh
                    ? '中国第三方支付市场在2020-2023年间经历了结构性变革。尽管受到COVID-19冲击，线下支付在2020年短暂下滑，但线上支付加速渗透推动整体TPV保持两位数增长。2021年，央行（PBOC）发布《非银行支付机构条例》征求意见稿，标志着监管从"鼓励创新"向"规范发展"的战略转向。2022年，个人收款码监管政策实施，推动小微商户从个人码向商户码迁移，直接利好持牌收单机构。到2023年，市场进入成熟稳定期，增速放缓至15-18%，竞争焦点从规模扩张转向价值深耕。'
                    : 'China\'s third-party payment market underwent structural transformation between 2020 and 2023. Despite a brief offline payment dip caused by COVID-19 in 2020, accelerated online payment penetration drove double-digit TPV growth overall. In 2021, the People\'s Bank of China (PBOC) released draft regulations for non-bank payment institutions, signalling a strategic shift from "encouraging innovation" to "regulated development." In 2022, personal QR-code payment regulations pushed micro-merchants from personal codes to merchant codes, directly benefiting licensed acquiring institutions. By 2023, the market entered a mature stabilisation phase with growth moderating to 15--18%, and competitive focus shifting from scale expansion to value deepening.'}
                </p>

                {/* Growth Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border-light dark:border-border-dark">
                        <th className="px-4 py-3 text-left font-semibold">{isZh ? '年份' : 'Year'}</th>
                        <th className="px-4 py-3 text-right font-semibold">{isZh ? 'TPV (万亿美元)' : 'TPV ($T)'}</th>
                        <th className="px-4 py-3 text-right font-semibold">{isZh ? '同比增长' : 'YoY Growth'}</th>
                        <th className="px-4 py-3 text-right font-semibold">{isZh ? '移动支付渗透率' : 'Mobile Penetration'}</th>
                        <th className="px-4 py-3 text-right font-semibold">{isZh ? '活跃用户 (亿)' : 'Active Users (B)'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      {[
                        { year: '2020', tpv: '2.1', growth: '+21%', mobile: '76%', users: '0.85' },
                        { year: '2021', tpv: '2.6', growth: '+24%', mobile: '81%', users: '0.92' },
                        { year: '2022', tpv: '3.1', growth: '+19%', mobile: '85%', users: '0.98' },
                        { year: '2023', tpv: '3.5', growth: '+15%', mobile: '87%', users: '1.04' },
                      ].map((row) => (
                        <tr key={row.year} className="border-b border-border-light/50 dark:border-border-dark/50">
                          <td className="px-4 py-3 font-medium">{row.year}</td>
                          <td className="px-4 py-3 text-right">{row.tpv}</td>
                          <td className="px-4 py-3 text-right text-primary-600 dark:text-primary-400">{row.growth}</td>
                          <td className="px-4 py-3 text-right">{row.mobile}</td>
                          <td className="px-4 py-3 text-right">{row.users}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Regulatory Landscape */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '监管格局 (PBOC)' : 'Regulatory Landscape (PBOC)'}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: isZh ? '《非银行支付机构条例》' : 'Non-Bank Payment Institution Regulations',
                      year: '2021',
                      desc: isZh
                        ? '建立支付机构分级分类监管框架，明确注册资本要求和业务范围边界，提高行业准入门槛。'
                        : 'Established tiered regulatory framework for payment institutions, clarifying capital requirements and business scope boundaries, raising industry entry barriers.',
                    },
                    {
                      title: isZh ? '个人收款码监管' : 'Personal QR Code Regulation',
                      year: '2022',
                      desc: isZh
                        ? '禁止个人收款码用于经营性收款，推动数千万小微商户向持牌商户码迁移，扩大合规收单市场规模。'
                        : 'Prohibited personal QR codes for business transactions, pushing tens of millions of micro-merchants to licensed merchant codes, expanding the compliant acquiring market.',
                    },
                    {
                      title: isZh ? '跨境支付合规强化' : 'Cross-Border Payment Compliance',
                      year: '2022-23',
                      desc: isZh
                        ? '加强跨境支付反洗钱和外汇合规要求，持牌机构获得竞争壁垒，利好通联等拥有跨境资质的平台。'
                        : 'Strengthened AML and FX compliance requirements for cross-border payments, creating competitive moats for licensed institutions like Allinpay with cross-border qualifications.',
                    },
                    {
                      title: isZh ? '数据安全与隐私' : 'Data Security & Privacy',
                      year: '2023',
                      desc: isZh
                        ? '《数据安全法》和《个人信息保护法》全面施行，支付机构数据处理面临更严格合规要求，技术投入门槛提升。'
                        : 'Full enforcement of Data Security Law and Personal Information Protection Law imposed stricter compliance requirements on payment institution data handling, raising technology investment thresholds.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-lg border border-border-light bg-surface-light p-4 dark:border-border-dark dark:bg-surface-dark">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-semibold text-primary-500">{item.year}</span>
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Drivers */}
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: isZh ? '移动优先生态' : 'Mobile-First Ecosystem',
                    desc: isZh
                      ? '10.4亿移动支付用户，87%渗透率，超级App生态将支付嵌入社交、电商、出行等全场景。'
                      : '1.04B mobile payment users, 87% penetration. Super-app ecosystems embed payments into social, e-commerce, and mobility scenarios.',
                  },
                  {
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                    title: isZh ? '中小微商户数字化' : 'SME Digitalisation',
                    desc: isZh
                      ? '超过8,000万中小微商户的数字化支付需求，是收单侧增长的核心驱动力，也是通联的战略重心。'
                      : '80M+ SMEs with digital payment needs represent the core growth driver on the acquiring side and Allinpay\'s strategic focus.',
                  },
                  {
                    icon: (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: isZh ? '跨境支付机遇' : 'Cross-Border Opportunity',
                    desc: isZh
                      ? '一带一路和RCEP推动跨境贸易增长，跨境支付年增速超过30%，持牌机构享有先发优势。'
                      : 'Belt & Road and RCEP drive cross-border trade growth. Cross-border payments growing 30%+ annually, favouring licensed institutions.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border-light p-5 dark:border-border-dark">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                      {item.icon}
                    </div>
                    <h4 className="mb-1 text-sm font-semibold">{item.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================
              3. COMPETITIVE LANDSCAPE
              ============================================================ */}
          <section id="competitiveLandscape">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">3</span>
              {sections.competitiveLandscape}
            </h2>

            <div className="space-y-8">
              {/* Competitive Matrix Table */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '五大玩家竞争矩阵' : 'Top 5 Player Competitive Matrix'}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-border-light dark:border-border-dark">
                        <th className="px-3 py-3 text-left font-semibold">{isZh ? '维度' : 'Dimension'}</th>
                        <th className="px-3 py-3 text-center font-semibold text-primary-600 dark:text-primary-400">
                          {isZh ? '支付宝' : 'Alipay'}
                        </th>
                        <th className="px-3 py-3 text-center font-semibold text-primary-600 dark:text-primary-400">
                          {isZh ? '微信支付' : 'WeChat Pay'}
                        </th>
                        <th className="px-3 py-3 text-center font-semibold text-primary-700 dark:text-primary-400">
                          {isZh ? '银联商务' : 'UnionPay Merchant'}
                        </th>
                        <th className="px-3 py-3 text-center font-semibold text-primary-500">
                          {isZh ? '通联支付' : 'Allinpay'}
                        </th>
                        <th className="px-3 py-3 text-center font-semibold text-primary-600 dark:text-primary-400">
                          {isZh ? '易宝支付' : 'Yeepay'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      {[
                        {
                          dim: isZh ? '市场份额' : 'Market Share',
                          alipay: '~55%',
                          wechat: '~38%',
                          unionpay: '~3%',
                          allinpay: '~1.2%',
                          yeepay: '~0.8%',
                        },
                        {
                          dim: isZh ? '年TPV' : 'Annual TPV',
                          alipay: '$1.93T',
                          wechat: '$1.33T',
                          unionpay: '$105B',
                          allinpay: '$42B',
                          yeepay: '$28B',
                        },
                        {
                          dim: isZh ? '商户数量' : 'Merchant Count',
                          alipay: '80M+',
                          wechat: '50M+',
                          unionpay: '10M+',
                          allinpay: '8M+',
                          yeepay: '3M+',
                        },
                        {
                          dim: isZh ? '核心优势' : 'Core Strength',
                          alipay: isZh ? '金融生态系统' : 'Financial ecosystem',
                          wechat: isZh ? '社交流量入口' : 'Social traffic entry',
                          unionpay: isZh ? '银行网络覆盖' : 'Banking network',
                          allinpay: isZh ? '中小微商户赋能' : 'SME enablement',
                          yeepay: isZh ? '行业垂直方案' : 'Vertical solutions',
                        },
                        {
                          dim: isZh ? '核心劣势' : 'Weakness',
                          alipay: isZh ? '监管压力 / 反垄断' : 'Regulatory / Antitrust',
                          wechat: isZh ? '商业化深度不足' : 'Monetisation depth',
                          unionpay: isZh ? '产品创新缓慢' : 'Slow innovation',
                          allinpay: isZh ? '品牌知名度低' : 'Brand awareness',
                          yeepay: isZh ? '规模有限' : 'Limited scale',
                        },
                        {
                          dim: isZh ? '费率区间' : 'Take Rate',
                          alipay: '0.10-0.60%',
                          wechat: '0.10-0.60%',
                          unionpay: '0.20-0.50%',
                          allinpay: '0.25-0.80%',
                          yeepay: '0.30-1.00%',
                        },
                      ].map((row) => (
                        <tr key={row.dim} className="border-b border-border-light/50 dark:border-border-dark/50">
                          <td className="px-3 py-3 font-medium text-foreground-light dark:text-foreground-dark">{row.dim}</td>
                          <td className="px-3 py-3 text-center">{row.alipay}</td>
                          <td className="px-3 py-3 text-center">{row.wechat}</td>
                          <td className="px-3 py-3 text-center">{row.unionpay}</td>
                          <td className="px-3 py-3 text-center font-medium text-primary-500">{row.allinpay}</td>
                          <td className="px-3 py-3 text-center">{row.yeepay}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Allinpay Positioning Analysis */}
              <div className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-6 sm:p-8">
                <h3 className="mb-4 text-lg font-semibold text-primary-500">
                  {isZh ? '通联支付定位分析' : 'Allinpay Positioning Analysis'}
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {isZh ? '竞争优势' : 'Competitive Advantages'}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {(isZh
                        ? [
                            '全国性第三方支付牌照 + 跨境支付资质，合规壁垒高',
                            '覆盖800万+中小微商户，在下沉市场有深度渗透',
                            'SaaS化增值服务体系（营销、会员、供应链金融）提升ARPU',
                            '聚合支付能力，同时接入支付宝、微信支付、银联等主流渠道',
                          ]
                        : [
                            'National third-party payment license + cross-border qualifications, creating high compliance barriers',
                            '8M+ SME merchants covered with deep penetration in lower-tier cities',
                            'SaaS-based value-added services (marketing, loyalty, supply chain finance) increase ARPU',
                            'Aggregated payment capability, integrating Alipay, WeChat Pay, UnionPay and other mainstream channels',
                          ]
                      ).map((item) => (
                        <li key={item} className="flex gap-2">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      {isZh ? '主要挑战' : 'Key Challenges'}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {(isZh
                        ? [
                            '品牌知名度远低于支付宝和微信支付，C端用户认知不足',
                            '在双寡头格局下获客成本持续上升，流量依赖外部渠道',
                            '费率竞争激烈，基础支付业务毛利率持续承压',
                            '技术研发投入与头部玩家存在量级差距',
                          ]
                        : [
                            'Brand awareness far below Alipay and WeChat Pay, weak consumer-side recognition',
                            'Rising customer acquisition costs under duopoly, traffic dependent on external channels',
                            'Intense fee competition with continuous margin pressure on basic payment services',
                            'R&D investment significantly lower than top players in absolute terms',
                          ]
                      ).map((item) => (
                        <li key={item} className="flex gap-2">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              4. CHANNEL ATTRIBUTION ANALYSIS
              ============================================================ */}
          <section id="channelAttribution">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">4</span>
              {sections.channelAttribution}
            </h2>

            <div className="space-y-8">
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {isZh
                    ? '在实习期间，我对通联支付12个营销渠道进行了全面的归因分析，使用Last-Touch和Multi-Touch归因模型对每个渠道的获客量、转化率、获客成本（CAC）和投资回报率（ROI）进行量化评估。分析覆盖线上（微信小程序、SEM、信息流广告、KOL推荐等）和线下（直销团队、行业展会、渠道代理等）渠道。'
                    : 'During my internship, I conducted a comprehensive attribution analysis across Allinpay\'s 12 marketing channels, using Last-Touch and Multi-Touch attribution models to quantitatively evaluate each channel\'s acquisition volume, conversion rates, customer acquisition cost (CAC), and return on investment (ROI). The analysis covered both online (WeChat Mini Program, SEM, feed ads, KOL referrals) and offline (direct sales, industry expos, channel agents) channels.'}
                </p>

                {/* Top 12 Channels Table */}
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '12渠道归因矩阵' : '12-Channel Attribution Matrix'}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-border-light dark:border-border-dark">
                        <th className="px-3 py-3 text-left font-semibold">#</th>
                        <th className="px-3 py-3 text-left font-semibold">{isZh ? '渠道' : 'Channel'}</th>
                        <th className="px-3 py-3 text-right font-semibold">{isZh ? '转化占比' : 'Conv. Share'}</th>
                        <th className="px-3 py-3 text-right font-semibold">{isZh ? '转化率' : 'Conv. Rate'}</th>
                        <th className="px-3 py-3 text-right font-semibold">CAC</th>
                        <th className="px-3 py-3 text-right font-semibold">ROI</th>
                        <th className="px-3 py-3 text-center font-semibold">{isZh ? '评级' : 'Rating'}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-400">
                      {[
                        { rank: 1, ch: isZh ? '微信小程序' : 'WeChat Mini Program', share: '28%', conv: '12.5%', cac: '$18', roi: '420%', rating: 'A+' },
                        { rank: 2, ch: isZh ? '直销团队' : 'Direct Sales Team', share: '22%', conv: '18.3%', cac: '$45', roi: '310%', rating: 'A' },
                        { rank: 3, ch: isZh ? 'KOL推荐' : 'KOL Referrals', share: '15%', conv: '9.8%', cac: '$22', roi: '380%', rating: 'A' },
                        { rank: 4, ch: isZh ? 'SEM/搜索广告' : 'SEM / Search Ads', share: '9%', conv: '6.2%', cac: '$35', roi: '220%', rating: 'B+' },
                        { rank: 5, ch: isZh ? '渠道代理' : 'Channel Agents', share: '7%', conv: '14.1%', cac: '$52', roi: '190%', rating: 'B' },
                        { rank: 6, ch: isZh ? '信息流广告' : 'Feed Ads (Toutiao/Douyin)', share: '5%', conv: '3.1%', cac: '$42', roi: '150%', rating: 'B' },
                        { rank: 7, ch: isZh ? '行业展会' : 'Industry Expos', share: '4%', conv: '8.7%', cac: '$68', roi: '130%', rating: 'B-' },
                        { rank: 8, ch: isZh ? '老客户转介绍' : 'Customer Referrals', share: '3.5%', conv: '22.4%', cac: '$12', roi: '520%', rating: 'A+' },
                        { rank: 9, ch: isZh ? '公众号内容营销' : 'WeChat Official Account', share: '2.5%', conv: '4.5%', cac: '$28', roi: '180%', rating: 'B' },
                        { rank: 10, ch: isZh ? '应用商店' : 'App Store / SEO', share: '1.5%', conv: '2.8%', cac: '$55', roi: '95%', rating: 'C+' },
                        { rank: 11, ch: isZh ? '短信营销' : 'SMS Marketing', share: '1.5%', conv: '1.2%', cac: '$8', roi: '85%', rating: 'C' },
                        { rank: 12, ch: isZh ? '线下地推' : 'Offline Ground Promotion', share: '1%', conv: '5.3%', cac: '$78', roi: '60%', rating: 'C-' },
                      ].map((row) => (
                        <tr key={row.rank} className={`border-b border-border-light/50 dark:border-border-dark/50 ${row.rank <= 3 ? 'bg-primary-500/5' : ''}`}>
                          <td className="px-3 py-3 font-medium">{row.rank}</td>
                          <td className="px-3 py-3 font-medium text-foreground-light dark:text-foreground-dark">{row.ch}</td>
                          <td className="px-3 py-3 text-right">{row.share}</td>
                          <td className="px-3 py-3 text-right">{row.conv}</td>
                          <td className="px-3 py-3 text-right">{row.cac}</td>
                          <td className="px-3 py-3 text-right text-primary-600 dark:text-primary-400">{row.roi}</td>
                          <td className="px-3 py-3 text-center">
                            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                              row.rating.startsWith('A') ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' :
                              row.rating.startsWith('B') ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {row.rating}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Key Insight */}
              <div className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-6 sm:p-8">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary-700 dark:text-primary-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {isZh ? '核心发现' : 'Key Finding'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {isZh
                    ? '前3大渠道（微信小程序、直销团队、KOL推荐）合计贡献65%的总转化量，但仅消耗48%的营销预算。这一发现直接推动了预算重新分配决策：将低效渠道（线下地推、应用商店）预算的30%转移至高ROI渠道，预计可提升整体获客效率22%。同时，老客户转介绍虽然转化占比仅3.5%，但拥有最高的转化率（22.4%）和ROI（520%），建议加大激励计划投入。'
                    : 'The top 3 channels (WeChat Mini Program, Direct Sales, KOL Referrals) collectively contributed 65% of total conversions while consuming only 48% of the marketing budget. This finding directly drove a budget reallocation decision: shifting 30% of budget from low-efficiency channels (offline ground promotion, app store) to high-ROI channels, projected to improve overall acquisition efficiency by 22%. Additionally, customer referrals, though only 3.5% of conversion volume, had the highest conversion rate (22.4%) and ROI (520%), supporting a recommendation to increase referral incentive investment.'}
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================
              5. USER RESEARCH INSIGHTS
              ============================================================ */}
          <section id="userResearch">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">5</span>
              {sections.userResearch}
            </h2>

            <div className="space-y-8">
              {/* Methodology */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '调研方法论' : 'Research Methodology'}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border-light bg-surface-light p-5 dark:border-border-dark dark:bg-surface-dark">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-bold">N = 2,000</p>
                        <p className="text-xs text-gray-500">{isZh ? '定量问卷调研' : 'Quantitative Survey'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh
                        ? '覆盖全国28个省市，问卷包含32题，涵盖使用频率、满意度、功能偏好、痛点和竞品对比。按商户规模分层抽样：微型(<5人)40%、小型(5-20人)35%、中型(20-100人)25%。'
                        : 'Covering 28 provinces, the 32-question survey addressed usage frequency, satisfaction, feature preferences, pain points, and competitive comparison. Stratified sampling by merchant size: micro (<5 employees) 40%, small (5-20) 35%, medium (20-100) 25%.'}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border-light bg-surface-light p-5 dark:border-border-dark dark:bg-surface-dark">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-bold">N = 50</p>
                        <p className="text-xs text-gray-500">{isZh ? '深度访谈' : 'In-Depth Interviews'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isZh
                        ? '1对1半结构化访谈，每次45-60分钟。覆盖20位高频活跃商户、15位流失风险商户和15位竞品用户，深入挖掘行为动机、决策流程和未满足需求。'
                        : 'One-on-one semi-structured interviews, 45-60 minutes each. Covered 20 high-frequency active merchants, 15 at-risk churning merchants, and 15 competitor users to uncover behavioural motivations, decision processes, and unmet needs.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top 3 Pain Points */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '三大核心痛点' : 'Top 3 Pain Points'}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      rank: 1,
                      pct: '72%',
                      title: isZh ? '结算周期过长' : 'Slow Settlement Cycles',
                      desc: isZh
                        ? '72%的受访商户表示T+1结算不能满足资金周转需求，尤其是餐饮和零售行业的小微商户，期望实现T+0实时结算。主要原因是中小商户现金流紧张，1天的结算延迟可能导致供应链付款逾期。'
                        : '72% of surveyed merchants reported T+1 settlement does not meet cash flow needs, especially F&B and retail micro-merchants who desire T+0 real-time settlement. Root cause: tight cash flow means even a 1-day settlement delay can cause supply chain payment defaults.',
                      color: 'red',
                    },
                    {
                      rank: 2,
                      pct: '65%',
                      title: isZh ? '增值服务发现困难' : 'Poor Value-Added Service Discovery',
                      desc: isZh
                        ? '65%的商户不知道平台提供营销工具、会员管理等增值服务。问题根源在于产品架构层级过深（需3-4次点击才能到达），且缺乏基于商户画像的个性化推荐。这直接影响增值服务渗透率和ARPU提升。'
                        : '65% of merchants were unaware the platform offers marketing tools, loyalty management, and other value-added services. Root cause: product architecture is too deep (3-4 clicks to reach), lacking personalised recommendations based on merchant profiles. This directly impacts VAS penetration and ARPU growth.',
                      color: 'amber',
                    },
                    {
                      rank: 3,
                      pct: '58%',
                      title: isZh ? '对账流程繁琐' : 'Cumbersome Reconciliation Process',
                      desc: isZh
                        ? '58%的商户在对账时需要手动导出多个报表并在Excel中交叉核对。连锁商户尤其痛苦，需要按门店逐一对账。商户期望一键式自动化对账和异常交易智能提醒。'
                        : '58% of merchants must manually export multiple reports and cross-reference in Excel for reconciliation. Chain merchants especially struggle, needing store-by-store reconciliation. Merchants desire one-click automated reconciliation and intelligent anomaly alerts.',
                      color: 'blue',
                    },
                  ].map((pain) => (
                    <div key={pain.rank} className={`rounded-lg border border-${pain.color}-500/20 bg-${pain.color}-500/5 p-5`}>
                      <div className="mb-2 flex items-center gap-3">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-${pain.color}-500/10 text-sm font-bold text-${pain.color}-600 dark:text-${pain.color}-400`}>
                          {pain.rank}
                        </span>
                        <span className="text-lg font-bold">{pain.pct}</span>
                        <span className="font-semibold">{pain.title}</span>
                      </div>
                      <p className="ml-11 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{pain.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Satisfaction & NPS */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: isZh ? '整体满意度' : 'Overall Satisfaction', value: '7.2/10', sub: isZh ? '同比提升0.4分' : '+0.4 YoY', color: 'text-primary-500' },
                  { label: 'NPS', value: '+32', sub: isZh ? '行业均值 +25' : 'Industry avg. +25', color: 'text-primary-500' },
                  { label: isZh ? '推荐意愿' : 'Willingness to Recommend', value: '68%', sub: isZh ? '8分及以上占比' : '8+ score share', color: 'text-primary-500' },
                  { label: isZh ? '功能满足度' : 'Feature Satisfaction', value: '85%', sub: isZh ? '已上线功能满意度' : 'For launched features', color: 'text-primary-500' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border-light p-5 text-center dark:border-border-dark">
                    <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="mt-1 text-sm font-medium">{item.label}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Feature Requests */}
              <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
                <h3 className="mb-4 text-lg font-semibold">
                  {isZh ? '功能需求优先级矩阵（Impact vs Effort）' : 'Feature Request Priority Matrix (Impact vs Effort)'}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* High Impact, Low Effort */}
                  <div className="rounded-lg border-2 border-primary-500/30 bg-primary-500/5 p-4">
                    <h4 className="mb-2 text-sm font-bold text-primary-700 dark:text-primary-400">
                      {isZh ? '高影响 / 低成本 -- 立即执行' : 'High Impact / Low Effort -- Do Now'}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>{isZh ? '-- T+0 实时结算选项 (72% 需求)' : '-- T+0 real-time settlement option (72% demand)'}</li>
                      <li>{isZh ? '-- 一键自动对账功能 (58% 需求)' : '-- One-click auto-reconciliation (58% demand)'}</li>
                    </ul>
                  </div>
                  {/* High Impact, High Effort */}
                  <div className="rounded-lg border-2 border-primary-500/30 bg-primary-500/5 p-4">
                    <h4 className="mb-2 text-sm font-bold text-primary-700 dark:text-primary-400">
                      {isZh ? '高影响 / 高成本 -- 规划执行' : 'High Impact / High Effort -- Plan'}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>{isZh ? '-- 智能营销工具个性化推荐 (65% 需求)' : '-- Personalised VAS recommendations (65% demand)'}</li>
                      <li>{isZh ? '-- 供应链金融产品深化 (42% 需求)' : '-- Supply chain finance deepening (42% demand)'}</li>
                    </ul>
                  </div>
                  {/* Low Impact, Low Effort */}
                  <div className="rounded-lg border-2 border-primary-500/30 bg-primary-500/5 p-4">
                    <h4 className="mb-2 text-sm font-bold text-primary-800 dark:text-primary-400">
                      {isZh ? '低影响 / 低成本 -- 填补空缺' : 'Low Impact / Low Effort -- Fill Gaps'}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>{isZh ? '-- 多语言界面支持 (15% 需求)' : '-- Multi-language interface (15% demand)'}</li>
                      <li>{isZh ? '-- 交易数据导出格式扩展 (22% 需求)' : '-- Extended data export formats (22% demand)'}</li>
                    </ul>
                  </div>
                  {/* Low Impact, High Effort */}
                  <div className="rounded-lg border-2 border-gray-500/30 bg-gray-500/5 p-4">
                    <h4 className="mb-2 text-sm font-bold text-gray-700 dark:text-gray-400">
                      {isZh ? '低影响 / 高成本 -- 暂缓' : 'Low Impact / High Effort -- Deprioritise'}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>{isZh ? '-- 自建电商平台 (8% 需求)' : '-- Built-in e-commerce platform (8% demand)'}</li>
                      <li>{isZh ? '-- 加密货币支付接入 (5% 需求)' : '-- Cryptocurrency payment integration (5% demand)'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              6. KPI FRAMEWORK
              ============================================================ */}
          <section id="kpiFramework">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">6</span>
              {sections.kpiFramework}
            </h2>

            <div className="rounded-xl border border-border-light p-6 dark:border-border-dark sm:p-8">
              <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {isZh
                  ? '以下是我在实习期间为通联支付搭建的KPI监控体系，覆盖增长、参与度、收入和质量四大维度共16个核心指标，用于日报/周报自动化追踪。该框架对齐AARRR漏斗模型，确保从获客到留存的全链路可观测。'
                  : 'Below is the KPI monitoring framework I built during my internship at Allinpay, covering 16 core metrics across four dimensions -- Growth, Engagement, Revenue, and Quality -- for automated daily/weekly reporting. The framework aligns with the AARRR funnel model, ensuring full-chain observability from acquisition to retention.'}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Growth KPIs */}
                <div className="rounded-lg border border-primary-500/20 bg-primary-500/5 p-5">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold text-primary-700 dark:text-primary-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {isZh ? '增长指标' : 'Growth Metrics'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { kpi: isZh ? '月活跃用户 (MAU)' : 'Monthly Active Users (MAU)', target: '1.2M', actual: '1.08M', status: isZh ? '达成率 90%' : '90% achieved' },
                      { kpi: isZh ? '新增商户数 (月)' : 'New Merchants (Monthly)', target: '15K', actual: '13.2K', status: isZh ? '达成率 88%' : '88% achieved' },
                      { kpi: isZh ? '激活率' : 'Activation Rate', target: '70%', actual: '67%', status: isZh ? '达成率 96%' : '96% achieved' },
                      { kpi: isZh ? '推荐率 (K-Factor)' : 'Referral Rate (K-Factor)', target: '0.15', actual: '0.12', status: isZh ? '达成率 80%' : '80% achieved' },
                    ].map((item) => (
                      <div key={item.kpi} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.kpi}</span>
                        <div className="text-right">
                          <span className="font-medium">{item.actual}</span>
                          <span className="ml-1 text-xs text-gray-500">/ {item.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement KPIs */}
                <div className="rounded-lg border border-primary-500/20 bg-primary-500/5 p-5">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold text-primary-700 dark:text-primary-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {isZh ? '参与度指标' : 'Engagement Metrics'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { kpi: isZh ? 'DAU/MAU 粘性' : 'DAU/MAU Stickiness', target: '35%', actual: '31%', status: isZh ? '达成率 89%' : '89% achieved' },
                      { kpi: isZh ? '人均交易笔数 (月)' : 'Transactions/User (Monthly)', target: '45', actual: '42', status: isZh ? '达成率 93%' : '93% achieved' },
                      { kpi: isZh ? '平均会话时长' : 'Avg Session Duration', target: '4.5min', actual: '3.8min', status: isZh ? '达成率 84%' : '84% achieved' },
                      { kpi: isZh ? '增值服务渗透率' : 'VAS Feature Adoption', target: '25%', actual: '18%', status: isZh ? '达成率 72%' : '72% achieved' },
                    ].map((item) => (
                      <div key={item.kpi} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.kpi}</span>
                        <div className="text-right">
                          <span className="font-medium">{item.actual}</span>
                          <span className="ml-1 text-xs text-gray-500">/ {item.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue KPIs */}
                <div className="rounded-lg border border-primary-500/20 bg-primary-500/5 p-5">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold text-primary-700 dark:text-primary-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isZh ? '收入指标' : 'Revenue Metrics'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { kpi: isZh ? '月交易总额 (TPV)' : 'Monthly TPV', target: '$3.8B', actual: '$3.5B', status: isZh ? '达成率 92%' : '92% achieved' },
                      { kpi: isZh ? '商户均收入 (ARPU)' : 'ARPU (Monthly)', target: '$85', actual: '$78', status: isZh ? '达成率 92%' : '92% achieved' },
                      { kpi: isZh ? '综合费率 (Take Rate)' : 'Blended Take Rate', target: '0.45%', actual: '0.42%', status: isZh ? '达成率 93%' : '93% achieved' },
                      { kpi: isZh ? '收入环比增长' : 'Revenue MoM Growth', target: '5%', actual: '4.2%', status: isZh ? '达成率 84%' : '84% achieved' },
                    ].map((item) => (
                      <div key={item.kpi} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.kpi}</span>
                        <div className="text-right">
                          <span className="font-medium">{item.actual}</span>
                          <span className="ml-1 text-xs text-gray-500">/ {item.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality KPIs */}
                <div className="rounded-lg border border-primary-500/20 bg-primary-500/5 p-5">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold text-primary-800 dark:text-primary-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isZh ? '质量指标' : 'Quality Metrics'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { kpi: 'NPS', target: '+35', actual: '+32', status: isZh ? '达成率 91%' : '91% achieved' },
                      { kpi: isZh ? '月流失率' : 'Monthly Churn Rate', target: '< 3%', actual: '3.2%', status: isZh ? '待优化' : 'Needs improvement' },
                      { kpi: isZh ? '客服工单量 (月)' : 'Support Tickets (Monthly)', target: '< 8K', actual: '9.1K', status: isZh ? '待优化' : 'Needs improvement' },
                      { kpi: isZh ? '平均结算速度' : 'Avg Settlement Speed', target: 'T+0.5', actual: 'T+1', status: isZh ? '待优化' : 'Needs improvement' },
                    ].map((item) => (
                      <div key={item.kpi} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.kpi}</span>
                        <div className="text-right">
                          <span className="font-medium">{item.actual}</span>
                          <span className="ml-1 text-xs text-gray-500">/ {item.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================
              7. STRATEGIC RECOMMENDATIONS
              ============================================================ */}
          <section id="recommendations">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500/10 text-sm font-bold text-primary-500">7</span>
              {sections.recommendations}
            </h2>

            <div className="space-y-6">
              {[
                {
                  num: '01',
                  title: isZh ? '加速T+0结算能力建设' : 'Accelerate T+0 Settlement Capability',
                  impact: isZh ? '预期影响: 流失率降低1.5%，NPS提升8-12分' : 'Expected Impact: Churn reduction 1.5%, NPS improvement +8-12 points',
                  desc: isZh
                    ? '72%的商户将结算速度列为首要痛点。建议投入技术资源构建T+0实时结算引擎，分阶段推出：第一阶段面向高价值商户（Top 10%）提供T+0结算选项，收取差异化费率（+0.05%）作为增值服务；第二阶段逐步覆盖全量商户。预计6个月内将月流失率从3.2%降至1.7%，同时通过差异化定价每月增加$180K收入。'
                    : '72% of merchants rank settlement speed as their top pain point. Invest engineering resources in a T+0 real-time settlement engine, rolling out in phases: Phase 1 offers T+0 settlement to high-value merchants (Top 10%) at a premium fee (+0.05% take rate) as a value-added service; Phase 2 expands to all merchants. Projected to reduce monthly churn from 3.2% to 1.7% within 6 months, while generating $180K additional monthly revenue through differentiated pricing.',
                  color: 'blue',
                },
                {
                  num: '02',
                  title: isZh ? '智能化增值服务推荐引擎' : 'Intelligent VAS Recommendation Engine',
                  impact: isZh ? '预期影响: 增值服务渗透率从18%提升至30%，ARPU提升22%' : 'Expected Impact: VAS penetration from 18% to 30%, ARPU +22%',
                  desc: isZh
                    ? '65%的商户不知道已有增值服务，说明产品可发现性严重不足。建议基于商户画像（行业、规模、交易模式）构建ML驱动的个性化推荐系统：在收银台完成交易后展示相关增值服务推荐卡片；在商户后台首页以"为您推荐"模块主动推送。同时简化信息架构，将核心增值服务的访问路径从3-4次点击缩减至1次。预计12个月内将增值服务渗透率从18%提升至30%。'
                    : '65% of merchants are unaware of existing VAS, indicating severe product discoverability issues. Build an ML-driven personalised recommendation system based on merchant profiles (industry, size, transaction patterns): display relevant VAS recommendation cards after checkout completion; proactively push "Recommended for You" modules on the merchant dashboard homepage. Simultaneously simplify information architecture, reducing core VAS access paths from 3-4 clicks to 1. Projected to raise VAS penetration from 18% to 30% within 12 months.',
                  color: 'purple',
                },
                {
                  num: '03',
                  title: isZh ? '渠道预算重分配与老客转介裂变' : 'Channel Budget Reallocation & Referral Virality',
                  impact: isZh ? '预期影响: 综合CAC降低18%，获客效率提升22%' : 'Expected Impact: Blended CAC -18%, acquisition efficiency +22%',
                  desc: isZh
                    ? '渠道归因分析显示前3大渠道贡献65%的转化但仅消耗48%的预算，存在显著的预算错配。建议：(1) 将线下地推和应用商店30%预算转移至微信小程序和KOL渠道；(2) 老客户转介绍虽仅占3.5%转化量，但ROI高达520%，应构建系统化的转介裂变机制——推荐双方各获得1个月VAS免费试用+交易手续费9折。目标是将老客转介占比从3.5%提升至8%，同时综合CAC从当前$32降至$26。'
                    : 'Channel attribution analysis shows the top 3 channels contribute 65% of conversions but consume only 48% of budget, indicating significant budget misallocation. Recommendations: (1) Reallocate 30% of budget from offline ground promotion and app store to WeChat Mini Program and KOL channels; (2) Customer referrals account for only 3.5% of conversions but achieve 520% ROI -- build a systematic referral virality mechanism: both referrer and referee receive 1 month free VAS trial + 10% transaction fee discount. Target: increase referral share from 3.5% to 8% while reducing blended CAC from $32 to $26.',
                  color: 'green',
                },
                {
                  num: '04',
                  title: isZh ? '跨境支付合规先发优势巩固' : 'Consolidate Cross-Border Payment First-Mover Advantage',
                  impact: isZh ? '预期影响: 跨境TPV增长40%，整体收入增长8-10%' : 'Expected Impact: Cross-border TPV +40%, overall revenue +8-10%',
                  desc: isZh
                    ? '一带一路和RCEP驱动跨境贸易持续增长，通联已拥有跨境支付牌照这一稀缺资质。建议三管齐下：(1) 深化东南亚市场布局，与当地电子钱包（GrabPay、GoPay、TrueMoney）建立互联互通；(2) 面向外贸B2B商户推出一站式跨境结算解决方案，整合报关、外汇、对账全流程；(3) 与跨境电商平台（Shopee、Lazada、TikTok Shop）建立战略合作，成为其首选支付服务商。预计18个月内跨境TPV增长40%，带动整体收入增长8-10%。'
                    : 'Belt & Road and RCEP continue to drive cross-border trade growth, and Allinpay already possesses the scarce cross-border payment license. Three-pronged strategy: (1) Deepen Southeast Asian market presence by establishing interoperability with local e-wallets (GrabPay, GoPay, TrueMoney); (2) Launch an end-to-end cross-border settlement solution for B2B foreign trade merchants, integrating customs declaration, FX, and reconciliation; (3) Establish strategic partnerships with cross-border e-commerce platforms (Shopee, Lazada, TikTok Shop) as their preferred payment provider. Projected 40% cross-border TPV growth within 18 months, driving 8-10% overall revenue growth.',
                  color: 'amber',
                },
              ].map((rec) => (
                <div key={rec.num} className="rounded-xl border border-border-light p-6 transition-all hover:border-primary-500/30 hover:shadow-md dark:border-border-dark dark:hover:border-primary-500/30 sm:p-8">
                  <div className="mb-4 flex items-start gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${rec.color}-500/10 text-lg font-bold text-${rec.color}-600 dark:text-${rec.color}-400`}>
                      {rec.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{rec.title}</h3>
                      <p className={`mt-1 text-sm font-medium text-${rec.color}-600 dark:text-${rec.color}-400`}>
                        {rec.impact}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {rec.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Disclaimer ── */}
          <div className="rounded-xl border border-border-light bg-surface-light p-6 text-center dark:border-border-dark dark:bg-surface-dark">
            <p className="text-xs text-gray-500">
              {isZh
                ? '免责声明：本报告中的市场数据基于公开信息和行业估算，部分数据经过脱敏处理以保护商业机密。分析框架和方法论均为本人在实习期间的真实工作成果，数值仅供展示目的。'
                : 'Disclaimer: Market data in this report is based on publicly available information and industry estimates. Some figures have been anonymised to protect business confidentiality. Analytical frameworks and methodologies represent genuine work during my internship; numerical values are for demonstration purposes.'}
            </p>
          </div>

          {/* ── Back to Research ── */}
          <div className="flex justify-center pt-4">
            <Link
              href={`/${locale}/research`}
              className="inline-flex items-center gap-2 rounded-lg border border-border-light bg-background-light px-6 py-3 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-border-dark dark:bg-background-dark dark:hover:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t.backToResearch}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
