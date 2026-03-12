'use client';

import { useState, useRef, useEffect } from 'react';

interface ToolCallLog {
  call: string;
  response: string;
}

interface Insight {
  labelZh: string;
  labelEn: string;
  value: string;
  delta?: string;
  color: string;
  up?: boolean;
}

interface ChartBar {
  labelZh: string;
  labelEn: string;
  value: number;
  color: string;
}

interface Query {
  idZh: string;
  idEn: string;
  iconZh: string;
  iconEn: string;
  toolCallsZh: ToolCallLog[];
  toolCallsEn: ToolCallLog[];
  responseZh: string;
  responseEn: string;
  insightsZh: Insight[];
  insightsEn: Insight[];
  chartBars?: ChartBar[];
  chartTitleZh?: string;
  chartTitleEn?: string;
}

const QUERIES: Query[] = [
  {
    idZh: '分析 Q3 用户增长趋势',
    idEn: 'Analyze Q3 user growth trends',
    iconZh: '分析 Q3 用户增长趋势',
    iconEn: 'Analyze Q3 user growth trends',
    toolCallsZh: [
      { call: '> query_db({ table: "user_events", period: "2024Q3", agg: "DAU,WAU,MAU" })', response: '  OK:行数: 2.4M  DAU均值: 84,200  MAU: 1.12M' },
      { call: '> compute_growth({ metric: "MAU", baseline: "2024Q2", compare: "2024Q3" })', response: '  OK:MAU环比增长 +18.4%  DAU/MAU比率: 0.075 (+3.2pp)' },
    ],
    toolCallsEn: [
      { call: '> query_db({ table: "user_events", period: "2024Q3", agg: "DAU,WAU,MAU" })', response: '  OK:Rows: 2.4M  Avg DAU: 84,200  MAU: 1.12M' },
      { call: '> compute_growth({ metric: "MAU", baseline: "2024Q2", compare: "2024Q3" })', response: '  OK:MAU QoQ +18.4%  DAU/MAU ratio: 0.075 (+3.2pp)' },
    ],
    responseZh: '2024Q3 用户规模出现加速增长。月活跃用户（MAU）达到 112 万，环比 Q2 增长 18.4%，远高于 Q1-Q2 的 8.7% 均速。\n\n参与度指标同步提升：DAU/MAU 比率上升 3.2pp 至 7.5%，说明用户不仅数量增长，活跃度也在提升。建议重点分析 7-8 月拉动因素，是否与某次运营活动或渠道投放相关。',
    responseEn: 'Q3 2024 shows accelerating user growth. MAU reached 1.12M, +18.4% QoQ vs Q2, well above the Q1-Q2 average pace of 8.7%.\n\nEngagement metrics also improved: DAU/MAU ratio rose 3.2pp to 7.5%, indicating not just growth in users but higher activity. Recommend investigating the July-August acceleration — likely tied to a campaign or new channel activation.',
    insightsZh: [
      { labelZh: 'MAU Q3', labelEn: 'MAU Q3', value: '1.12M', delta: '+18.4%', color: '#0d9488', up: true },
      { labelZh: 'DAU 均值', labelEn: 'Avg DAU', value: '84,200', delta: '+22.1%', color: '#14b8a6', up: true },
      { labelZh: 'DAU/MAU', labelEn: 'DAU/MAU', value: '7.5%', delta: '+3.2pp', color: '#0f766e', up: true },
    ],
    insightsEn: [
      { labelZh: 'MAU Q3', labelEn: 'MAU Q3', value: '1.12M', delta: '+18.4%', color: '#0d9488', up: true },
      { labelZh: 'Avg DAU', labelEn: 'Avg DAU', value: '84,200', delta: '+22.1%', color: '#14b8a6', up: true },
      { labelZh: 'DAU/MAU', labelEn: 'DAU/MAU', value: '7.5%', delta: '+3.2pp', color: '#0f766e', up: true },
    ],
    chartBars: [
      { labelZh: 'Q1', labelEn: 'Q1', value: 68, color: '#99f6e4' },
      { labelZh: 'Q2', labelEn: 'Q2', value: 80, color: '#2dd4bf' },
      { labelZh: 'Q3', labelEn: 'Q3', value: 100, color: '#0d9488' },
    ],
    chartTitleZh: 'MAU 趋势（相对值）',
    chartTitleEn: 'MAU Trend (relative)',
  },
  {
    idZh: '转化漏斗深度分析',
    idEn: 'Conversion funnel deep-dive',
    iconZh: '转化漏斗深度分析',
    iconEn: 'Conversion funnel deep-dive',
    toolCallsZh: [
      { call: '> get_funnel({ steps: ["expose","click","register","activate","pay"], period: "2024Q3" })', response: '  OK:曝光:2.8M  点击:420K  注册:89K  激活:34K  付费:8.2K' },
      { call: '> compute_drop_rates({ funnel_data: [...] })', response: '  OK:最大流失: 激活→付费 75.9%  注册→激活 61.8%' },
    ],
    toolCallsEn: [
      { call: '> get_funnel({ steps: ["expose","click","register","activate","pay"], period: "2024Q3" })', response: '  OK:Expose:2.8M  Click:420K  Register:89K  Activate:34K  Pay:8.2K' },
      { call: '> compute_drop_rates({ funnel_data: [...] })', response: '  OK:Biggest drop: activate→pay 75.9%  register→activate 61.8%' },
    ],
    responseZh: '漏斗分析揭示两个关键流失节点：\n\n**注册→激活（-61.8%）**：大量用户注册后未完成激活，可能是激活引导步骤过长或价值主张不清晰。建议 A/B 测试简化激活流。\n\n**激活→付费（-75.9%）**：最大流失点。激活用户中仅 24.1% 最终付费。建议分析付费前最后一次操作路径，优化 paywall 前的钩子设计。\n\n整体端到端转化率 0.29%，具有较大提升空间。',
    responseEn: 'Funnel analysis reveals two critical drop-off points:\n\n**Register → Activate (-61.8%)**: Large drop after registration, likely due to complex onboarding or unclear value proposition. Recommend A/B testing a simplified activation flow.\n\n**Activate → Pay (-75.9%)**: Largest single drop. Only 24.1% of activated users convert to paid. Recommend analyzing the last action before paywall abandonment.\n\nOverall end-to-end conversion is 0.29%, with significant improvement potential.',
    insightsZh: [
      { labelZh: '端到端转化', labelEn: 'E2E Conv.', value: '0.29%', color: '#0d9488' },
      { labelZh: '注册→激活', labelEn: 'Reg→Act', value: '38.2%', delta: '流失 -61.8%', color: '#115e59', up: false },
      { labelZh: '激活→付费', labelEn: 'Act→Pay', value: '24.1%', delta: '流失 -75.9%', color: '#134e4a', up: false },
    ],
    insightsEn: [
      { labelZh: 'E2E Conv.', labelEn: 'E2E Conv.', value: '0.29%', color: '#0d9488' },
      { labelZh: 'Reg→Act', labelEn: 'Reg→Act', value: '38.2%', delta: 'Drop -61.8%', color: '#115e59', up: false },
      { labelZh: 'Act→Pay', labelEn: 'Act→Pay', value: '24.1%', delta: 'Drop -75.9%', color: '#134e4a', up: false },
    ],
    chartBars: [
      { labelZh: '曝光', labelEn: 'Expose', value: 100, color: '#ccfbf1' },
      { labelZh: '点击', labelEn: 'Click', value: 15, color: '#5eead4' },
      { labelZh: '注册', labelEn: 'Register', value: 3.2, color: '#2dd4bf' },
      { labelZh: '激活', labelEn: 'Activate', value: 1.2, color: '#0d9488' },
      { labelZh: '付费', labelEn: 'Pay', value: 0.29, color: '#115e59' },
    ],
    chartTitleZh: '转化漏斗（%，相对曝光）',
    chartTitleEn: 'Funnel (%, relative to expose)',
  },
  {
    idZh: '渠道 ROI 对比分析',
    idEn: 'Channel ROI comparison',
    iconZh: '渠道 ROI 对比分析',
    iconEn: 'Channel ROI comparison',
    toolCallsZh: [
      { call: '> get_channel_data({ channels: ["SEM","社交","品牌","内容","联盟"], metrics: ["cost","revenue","CAC","LTV"] })', response: '  OK:6 个渠道  总花费:¥2.4M  总营收归因:¥8.7M' },
      { call: '> compute_roi({ method: "blended", attribution: "last_touch" })', response: '  OK:混合ROI:262%  最高:内容营销 580%  最低:SEM 118%' },
    ],
    toolCallsEn: [
      { call: '> get_channel_data({ channels: ["SEM","Social","Brand","Content","Affiliate"], metrics: ["cost","revenue","CAC","LTV"] })', response: '  OK:6 channels  Total spend:¥2.4M  Attributed rev:¥8.7M' },
      { call: '> compute_roi({ method: "blended", attribution: "last_touch" })', response: '  OK:Blended ROI:262%  Best:Content 580%  Worst:SEM 118%' },
    ],
    responseZh: '渠道 ROI 分析显示明显的效率分层：\n\n**内容营销** ROI 最高达 580%（CAC ¥42，LTV ¥286），但规模有限，月新增用户仅 1,200。**联盟分销** ROI 340%，具备规模化空间。\n\n**SEM 的 ROI 仅 118%**，是主要预算消耗者（占总花费 38%），建议削减 SEM 预算 20%，向内容+联盟倾斜。预计 12 个月 ROI 可从 262% 提升至 340%+。',
    responseEn: 'Channel ROI analysis reveals clear efficiency tiers:\n\n**Content Marketing** tops at 580% ROI (CAC ¥42, LTV ¥286), but limited in scale (~1,200 new users/month). **Affiliate** at 340% ROI has strong scaling potential.\n\n**SEM ROI is only 118%**, yet consumes 38% of total budget. Recommend cutting SEM by 20% and reallocating to Content + Affiliate. Projected blended ROI uplift: 262% → 340%+ over 12 months.',
    insightsZh: [
      { labelZh: '混合 ROI', labelEn: 'Blended ROI', value: '262%', color: '#0d9488' },
      { labelZh: '最高渠道', labelEn: 'Best Channel', value: '内容 580%', color: '#0f766e', up: true },
      { labelZh: 'SEM ROI', labelEn: 'SEM ROI', value: '118%', delta: '预算过重', color: '#115e59', up: false },
    ],
    insightsEn: [
      { labelZh: 'Blended ROI', labelEn: 'Blended ROI', value: '262%', color: '#0d9488' },
      { labelZh: 'Best Channel', labelEn: 'Best Channel', value: 'Content 580%', color: '#0f766e', up: true },
      { labelZh: 'SEM ROI', labelEn: 'SEM ROI', value: '118%', delta: 'Overweight', color: '#115e59', up: false },
    ],
    chartBars: [
      { labelZh: '内容', labelEn: 'Content', value: 100, color: '#0d9488' },
      { labelZh: '联盟', labelEn: 'Affiliate', value: 59, color: '#14b8a6' },
      { labelZh: '品牌', labelEn: 'Brand', value: 52, color: '#2dd4bf' },
      { labelZh: '社交', labelEn: 'Social', value: 41, color: '#5eead4' },
      { labelZh: 'SEM', labelEn: 'SEM', value: 20, color: '#99f6e4' },
    ],
    chartTitleZh: '渠道 ROI 排名（相对值）',
    chartTitleEn: 'Channel ROI Ranking (relative)',
  },
  {
    idZh: '用户流失风险预测',
    idEn: 'Churn risk prediction',
    iconZh: '用户流失风险预测',
    iconEn: 'Churn risk prediction',
    toolCallsZh: [
      { call: '> run_churn_model({ model: "gradient_boost_v3", segment: "paid_users", lookahead: "30d" })', response: '  OK:AUC:0.841  高危用户:2,847 (14.3%)  中危:6,120 (30.7%)' },
      { call: '> explain_features({ top_n: 5 })', response: '  OK:主因: 登录频次↓(0.34)  功能使用↓(0.28)  客服工单(0.19)  付款失败(0.12)  会话时长↓(0.07)' },
    ],
    toolCallsEn: [
      { call: '> run_churn_model({ model: "gradient_boost_v3", segment: "paid_users", lookahead: "30d" })', response: '  OK:AUC:0.841  High-risk:2,847 (14.3%)  Mid-risk:6,120 (30.7%)' },
      { call: '> explain_features({ top_n: 5 })', response: '  OK:Top factors: login_freq↓(0.34)  feature_use↓(0.28)  support_ticket(0.19)  payment_fail(0.12)  session_dur↓(0.07)' },
    ],
    responseZh: '30 天流失预测模型（AUC=0.841）识别出 2,847 名高危付费用户（占付费用户 14.3%）。\n\n**主要流失信号**（按 SHAP 重要性）：登录频次下降 > 功能使用减少 > 提交客服工单 > 付款失败 > 会话时长缩短。\n\n**干预建议**：对高危用户在 7 天内推送个性化触达（邮件 + in-app），重点展示其未使用的高价值功能。历史数据显示该策略可将高危用户流失率从 42% 降至 28%。',
    responseEn: '30-day churn prediction model (AUC=0.841) identifies 2,847 high-risk paid users (14.3% of paid base).\n\n**Top churn signals** (by SHAP): login frequency drop > feature usage decline > support ticket submission > payment failure > session duration decline.\n\n**Intervention**: Send personalized outreach (email + in-app) to high-risk users within 7 days, highlighting unused high-value features. Historical data shows this reduces high-risk churn from 42% to 28%.',
    insightsZh: [
      { labelZh: '模型 AUC', labelEn: 'Model AUC', value: '0.841', color: '#0d9488' },
      { labelZh: '高危用户', labelEn: 'High-Risk', value: '2,847', delta: '14.3%', color: '#134e4a', up: false },
      { labelZh: '干预后流失', labelEn: 'Post-Intervention', value: '28%', delta: '-14pp', color: '#0f766e', up: true },
    ],
    insightsEn: [
      { labelZh: 'Model AUC', labelEn: 'Model AUC', value: '0.841', color: '#0d9488' },
      { labelZh: 'High-Risk', labelEn: 'High-Risk', value: '2,847', delta: '14.3%', color: '#134e4a', up: false },
      { labelZh: 'Post-Intervention', labelEn: 'Post-Intervention', value: '28%', delta: '-14pp', color: '#0f766e', up: true },
    ],
    chartBars: [
      { labelZh: '登录频次↓', labelEn: 'Login freq↓', value: 100, color: '#042f2e' },
      { labelZh: '功能使用↓', labelEn: 'Feature use↓', value: 82, color: '#134e4a' },
      { labelZh: '客服工单', labelEn: 'Support ticket', value: 56, color: '#115e59' },
      { labelZh: '付款失败', labelEn: 'Payment fail', value: 35, color: '#0f766e' },
      { labelZh: '会话时长↓', labelEn: 'Session dur↓', value: 21, color: '#0d9488' },
    ],
    chartTitleZh: '流失特征重要性（SHAP）',
    chartTitleEn: 'Churn Feature Importance (SHAP)',
  },
];

// ── Inline bar chart ─────────────────────────────────────────
function InlineBarChart({ bars, titleZh, titleEn, isZh }: { bars: ChartBar[]; titleZh: string; titleEn: string; isZh: boolean }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 100); return () => clearTimeout(t); }, []);
  const maxVal = Math.max(...bars.map((b) => b.value));

  return (
    <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {isZh ? titleZh : titleEn}
      </p>
      <div className="space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.labelZh} className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 text-[10px] text-gray-500 truncate">{isZh ? bar.labelZh : bar.labelEn}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" style={{ height: 10 }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: animated ? `${(bar.value / maxVal) * 100}%` : '0%', background: bar.color }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-[10px] font-bold" style={{ color: bar.color }}>
              {bar.value >= 10 ? Math.round(bar.value) : bar.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function AiCoworkTool({ isZh = true }: { isZh?: boolean }) {
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null);
  const [phase, setPhase] = useState<'idle' | 'thinking' | 'toolcalls' | 'streaming' | 'done'>('idle');
  const [toolCallIndex, setToolCallIndex] = useState(0);
  const [streamedText, setStreamedText] = useState('');
  const [showInsights, setShowInsights] = useState(false);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    setPhase('idle');
    setToolCallIndex(0);
    setStreamedText('');
    setShowInsights(false);
    if (streamRef.current) clearInterval(streamRef.current);
  };

  const runQuery = async (idx: number) => {
    reset();
    setSelectedQuery(idx);
    const q = QUERIES[idx];
    const toolCalls = isZh ? q.toolCallsZh : q.toolCallsEn;
    const fullText = isZh ? q.responseZh : q.responseEn;

    setPhase('thinking');
    await new Promise((r) => setTimeout(r, 900));

    setPhase('toolcalls');
    for (let i = 0; i < toolCalls.length; i++) {
      setToolCallIndex(i);
      await new Promise((r) => setTimeout(r, i === 0 ? 600 : 1000));
    }

    setPhase('streaming');
    let charIdx = 0;
    setStreamedText('');
    await new Promise((r) => setTimeout(r, 400));

    await new Promise<void>((resolve) => {
      streamRef.current = setInterval(() => {
        charIdx += 3;
        if (charIdx >= fullText.length) {
          setStreamedText(fullText);
          if (streamRef.current) clearInterval(streamRef.current);
          resolve();
        } else {
          setStreamedText(fullText.slice(0, charIdx));
        }
      }, 20);
    });

    setPhase('done');
    await new Promise((r) => setTimeout(r, 300));
    setShowInsights(true);
  };

  useEffect(() => () => { if (streamRef.current) clearInterval(streamRef.current); }, []);

  const q = selectedQuery !== null ? QUERIES[selectedQuery] : null;
  const insights = q ? (isZh ? q.insightsZh : q.insightsEn) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {isZh ? 'LLM Co-pilot · 协作分析演示' : 'LLM Co-pilot · Collaborative Analysis Demo'}
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {isZh ? 'AI 协作式数据分析平台' : 'AI Co-work Data Analysis Platform'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh
            ? '选择一个分析任务，LLM 副驾驶自动调用数据工具、流式生成洞察报告，并渲染内嵌可视化图表。'
            : 'Select an analysis task — the LLM co-pilot calls data tools, streams insights, and renders inline charts.'}
        </p>
      </div>

      {/* Query selector */}
      <div>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          {isZh ? '选择分析任务' : 'Select Analysis Task'}
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {QUERIES.map((q, i) => (
            <button key={i} onClick={() => runQuery(i)}
              disabled={phase !== 'idle' && phase !== 'done' && selectedQuery !== i}
              className={`rounded-xl border p-3.5 text-left transition-all disabled:opacity-40 ${
                selectedQuery === i
                  ? 'border-primary-500/40 bg-primary-500/6 shadow-sm'
                  : 'border-gray-100 bg-white hover:border-primary-400/30 hover:bg-primary-50/30 dark:border-gray-800 dark:bg-gray-900/40'
              }`}
            >
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {isZh ? q.idZh : q.idEn}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      {selectedQuery !== null && q && (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/80 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/40">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-primary-400/60" />
              <span className="h-3 w-3 rounded-full bg-primary-400/60" />
              <span className="h-3 w-3 rounded-full bg-primary-400/60" />
            </div>
            <p className="font-mono text-xs text-gray-500">{isZh ? 'AI 副驾驶 · 分析会话' : 'AI Co-pilot · Analysis Session'}</p>
            {phase !== 'idle' && phase !== 'done' && (
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                </span>
                <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                  {phase === 'thinking' ? (isZh ? '思考中…' : 'Thinking…')
                    : phase === 'toolcalls' ? (isZh ? '调用工具…' : 'Calling tools…')
                    : isZh ? '生成中…' : 'Streaming…'}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 space-y-4">
            {/* User message */}
            <div className="flex justify-end">
              <div className="max-w-xs rounded-2xl rounded-tr-sm bg-primary-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm">
                {isZh ? q.iconZh : q.iconEn}
              </div>
            </div>

            {/* Thinking */}
            {phase === 'thinking' && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/12">
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-gray-50 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-800/50">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Tool calls */}
            {(phase === 'toolcalls' || phase === 'streaming' || phase === 'done') && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/12">
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  {/* Tool call terminal */}
                  <div className="overflow-hidden rounded-xl bg-gray-950 p-3">
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary-500/60" />
                      <span className="h-2 w-2 rounded-full bg-primary-500/60" />
                      <span className="h-2 w-2 rounded-full bg-primary-500/60" />
                      <span className="ml-2 font-mono text-[10px] text-gray-600">data_tools</span>
                    </div>
                    <div className="space-y-2 font-mono text-[11px]">
                      {(isZh ? q.toolCallsZh : q.toolCallsEn).slice(0, phase === 'toolcalls' ? toolCallIndex + 1 : undefined).map((tc, i) => (
                        <div key={i}>
                          <div className="text-primary-300">{tc.call}</div>
                          {(phase !== 'toolcalls' || i < toolCallIndex) && (
                            <div className="text-gray-500">{tc.response}</div>
                          )}
                          {phase === 'toolcalls' && i === toolCallIndex && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <span className="inline-block h-2.5 w-1 animate-pulse bg-primary-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Streamed response */}
                  {(phase === 'streaming' || phase === 'done') && streamedText && (
                    <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-800/50">
                      <div className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {streamedText.split('\n\n').map((para, i) => (
                          <p key={i} className={para.startsWith('**') ? 'font-semibold text-gray-900 dark:text-gray-100' : ''}>
                            {para.replace(/\*\*/g, '')}
                          </p>
                        ))}
                        {phase === 'streaming' && (
                          <span className="inline-block h-4 w-0.5 animate-pulse bg-primary-500 align-middle" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Insights + chart (after done) */}
      {showInsights && q && (
        <div className="space-y-4">
          {/* Insight metric cards */}
          <div className="grid grid-cols-3 gap-3">
            {insights.map((ins) => (
              <div key={ins.labelEn} className="rounded-2xl border border-gray-100 bg-white p-3.5 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <p className="text-xl font-black" style={{ color: ins.color }}>{ins.value}</p>
                <p className="text-[10px] font-semibold text-gray-400">{isZh ? ins.labelZh : ins.labelEn}</p>
                {ins.delta && (
                  <p className="mt-0.5 text-[10px] font-bold" style={{ color: ins.color }}>
                    {ins.up ? '▲' : '▼'} {ins.delta}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Inline bar chart */}
          {q.chartBars && q.chartTitleZh && q.chartTitleEn && (
            <InlineBarChart bars={q.chartBars} titleZh={q.chartTitleZh} titleEn={q.chartTitleEn} isZh={isZh} />
          )}

          {/* Reset */}
          <div className="flex justify-end">
            <button onClick={() => { reset(); setSelectedQuery(null); }}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {isZh ? '新建会话' : 'New session'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
