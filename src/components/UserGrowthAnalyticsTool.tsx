'use client';

import { useState, useEffect, useCallback } from 'react';
import EChartsWrapper from './charts/EChartsWrapper';
import type { EChartsOption } from 'echarts';
import {
  calculateAARRR,
  calculateCohortRetention,
  analyzeChannels,
  calculateABTest,
  generateMarkdownReport,
  exampleAARRRData,
  exampleCohortData,
  exampleChannelData,
  exampleABTestInput,
  exampleCompetitors,
  type AARRRInput,
  type AARRRResult,
  type CohortRow,
  type CohortResult,
  type ChannelRow,
  type ChannelResult,
  type ABTestInput,
  type ABTestResult,
  type CompetitorRow,
} from '@/lib/userGrowthAnalytics';

// ─── Messages Interface ─────────────────────────────────

interface Messages {
  title: string;
  subtitle: string;
  exampleBtn: string;
  clearBtn: string;
  exportBtn: string;
  copyBtn: string;
  copied: string;
  tabs: Record<string, string>;
  overview: Record<string, string>;
  aarrr: Record<string, string>;
  cohort: Record<string, string>;
  channel: Record<string, string>;
  abtest: {
    title: string;
    control: string;
    variant: string;
    visitors: string;
    conversions: string;
    confidenceLevel: string;
    calculateBtn: string;
    sampleSizeHelper: string;
    result: Record<string, string>;
    [key: string]: unknown;
  };
  competitive: {
    title: string;
    product: string;
    addProduct: string;
    removeProduct: string;
    dimensions: Record<string, string>;
    scoreHelp: string;
    avgScore: string;
    strengths: string;
    weaknesses: string;
    gapAnalysis: string;
    [key: string]: unknown;
  };
}

type TabKey = 'overview' | 'aarrr' | 'cohort' | 'channel' | 'abtest' | 'competitive';

// ─── Metric Card Component ──────────────────────────────

function MetricCard({ label, value, sub, color = 'text-primary-500', large = false }: {
  label: string; value: string; sub?: string; color?: string; large?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-light bg-background-light p-4 transition-all hover:shadow-md dark:border-border-dark dark:bg-background-dark">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`mt-1 font-bold ${color} ${large ? 'text-3xl' : 'text-2xl'}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

// ─── Progress Bar Component ─────────────────────────────

function ProgressBar({ value, max, color = 'bg-primary-500' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── Component ──────────────────────────────────────────

export default function UserGrowthAnalyticsTool({ messages }: { messages: Messages }) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [copied, setCopied] = useState(false);

  // AARRR state
  const [aarrrInput, setAarrrInput] = useState<AARRRInput>(exampleAARRRData);
  const [aarrrResult, setAarrrResult] = useState<AARRRResult | null>(null);

  // Cohort state
  const [cohortData, setCohortData] = useState<CohortRow[]>([]);
  const [cohortResult, setCohortResult] = useState<CohortResult | null>(null);

  // Channel state
  const [channelData, setChannelData] = useState<ChannelRow[]>([]);
  const [channelResult, setChannelResult] = useState<ChannelResult | null>(null);

  // AB Test state
  const [abInput, setAbInput] = useState<ABTestInput>(exampleABTestInput);
  const [abResult, setAbResult] = useState<ABTestResult | null>(null);

  // Competitive state
  const [competitors, setCompetitors] = useState<CompetitorRow[]>([]);

  // ─── Load All Example Data ──────────────────────────────

  const handleLoadExample = useCallback(() => {
    setAarrrInput(exampleAARRRData);
    setAarrrResult(calculateAARRR(exampleAARRRData));
    setCohortData(exampleCohortData);
    setCohortResult(calculateCohortRetention(exampleCohortData));
    setChannelData(exampleChannelData);
    setChannelResult(analyzeChannels(exampleChannelData));
    setAbInput(exampleABTestInput);
    setAbResult(calculateABTest(exampleABTestInput));
    setCompetitors(exampleCompetitors);
  }, []);

  // Auto-load example data on mount
  useEffect(() => {
    handleLoadExample();
  }, [handleLoadExample]);

  const handleClear = () => {
    setAarrrInput({ totalVisitors: 0, signups: 0, activatedUsers: 0, retainedD7Users: 0, payingUsers: 0, referrals: 0, adSpend: 0 });
    setAarrrResult(null);
    setCohortData([]);
    setCohortResult(null);
    setChannelData([]);
    setChannelResult(null);
    setAbInput({ controlVisitors: 0, controlConversions: 0, variantVisitors: 0, variantConversions: 0, confidenceLevel: 95 });
    setAbResult(null);
    setCompetitors([]);
  };

  const handleExport = () => {
    const md = generateMarkdownReport(aarrrResult, cohortResult, channelResult, abResult, competitors);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: 'growth-analytics-report.md' }).click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const md = generateMarkdownReport(aarrrResult, cohortResult, channelResult, abResult, competitors);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Input Helper ───────────────────────────────────────

  const numInput = (label: string, value: number, onChange: (v: number) => void) => (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">{label}</label>
      <input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-lg border border-border-light bg-background-light px-3 py-2 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-background-dark"
      />
    </div>
  );

  // ─── Overview Tab ───────────────────────────────────────

  const renderOverview = () => {
    const m = messages.overview;
    if (!aarrrResult) {
      return (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/10">
              <svg className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <p className="text-gray-500">{m.noData}</p>
          </div>
        </div>
      );
    }

    const signupRate = aarrrInput.totalVisitors > 0 ? (aarrrInput.signups / aarrrInput.totalVisitors * 100) : 0;
    const activationRate = aarrrInput.signups > 0 ? (aarrrInput.activatedUsers / aarrrInput.signups * 100) : 0;
    const overallConv = aarrrInput.totalVisitors > 0 ? (aarrrInput.payingUsers / aarrrInput.totalVisitors * 100) : 0;

    // Mini funnel chart
    const funnelOption: EChartsOption = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '0%', right: '0%', top: '8%', bottom: '20%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Visitors', ...aarrrResult.stages.map((s) => s.name)],
        axisLabel: { fontSize: 10 },
      },
      yAxis: { type: 'value', show: false },
      series: [{
        type: 'bar',
        data: [
          { value: aarrrInput.totalVisitors, itemStyle: { color: '#042f2e' } },
          { value: aarrrResult.stages[0].value, itemStyle: { color: '#134e4a' } },
          { value: aarrrResult.stages[1].value, itemStyle: { color: '#0f766e' } },
          { value: aarrrResult.stages[2].value, itemStyle: { color: '#0d9488' } },
          { value: aarrrResult.stages[3].value, itemStyle: { color: '#14b8a6' } },
          { value: aarrrResult.stages[4].value, itemStyle: { color: '#2dd4bf' } },
        ],
        label: { show: true, position: 'top', fontSize: 10, formatter: '{c}' },
        itemStyle: { borderRadius: [6, 6, 0, 0] },
        barWidth: '60%',
      }],
    };

    // Retention curve
    const retentionOption: EChartsOption = cohortResult ? {
      tooltip: { trigger: 'axis' },
      grid: { left: '0%', right: '0%', top: '8%', bottom: '12%', containLabel: true },
      xAxis: { type: 'category', data: ['D0', 'D1', 'D3', 'D7', 'D14', 'D30'], axisLabel: { fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { formatter: '{value}%', fontSize: 10 }, max: 100 },
      series: [{
        type: 'line',
        data: cohortResult.averageRetention,
        smooth: true,
        areaStyle: { opacity: 0.15 },
        lineStyle: { width: 3 },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#0d9488' },
      }],
    } : {};

    // Channel mini bar
    const channelOption: EChartsOption = channelResult ? {
      tooltip: { trigger: 'axis' },
      grid: { left: '0%', right: '0%', top: '8%', bottom: '20%', containLabel: true },
      xAxis: {
        type: 'category',
        data: channelResult.channels.map((c) => c.name),
        axisLabel: { rotate: 45, fontSize: 9 },
      },
      yAxis: { type: 'value', show: false },
      series: [{
        type: 'bar',
        data: channelResult.channels.map((c) => ({
          value: Math.round(c.roi * 10) / 10,
          itemStyle: { color: c.roi >= 0 ? '#0d9488' : '#134e4a', borderRadius: [4, 4, 0, 0] },
        })),
        label: { show: true, position: 'top', fontSize: 9, formatter: '{c}%' },
      }],
    } : {};

    return (
      <div className="space-y-6">
        {/* KPI Cards - Top Row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <MetricCard label={m.totalUsers} value={aarrrInput.signups.toLocaleString()} sub={`${signupRate.toFixed(1)}% ${m.signupRate}`} />
          <MetricCard label={m.activationRate} value={`${activationRate.toFixed(1)}%`} color={activationRate > 60 ? 'text-primary-500' : 'text-primary-500'} />
          <MetricCard label={m.d7Retention} value={`${aarrrResult.stickiness.toFixed(1)}%`} color={aarrrResult.stickiness > 25 ? 'text-primary-500' : 'text-primary-500'} />
          <MetricCard label={m.cac} value={`$${aarrrResult.cac.toFixed(2)}`} />
          <MetricCard label={m.ltvCac} value={aarrrResult.ltvCacRatio.toFixed(2)} color={aarrrResult.ltvCacRatio > 3 ? 'text-primary-500' : aarrrResult.ltvCacRatio > 1 ? 'text-primary-500' : 'text-primary-500'} />
          <MetricCard label={m.payingConversion} value={`${overallConv.toFixed(2)}%`} />
          {channelResult && <MetricCard label={m.topChannel} value={channelResult.topChannel} color="text-primary-500" />}
          {channelResult && <MetricCard label={m.blendedROI} value={`${channelResult.blendedROI.toFixed(1)}%`} color={channelResult.blendedROI > 0 ? 'text-primary-500' : 'text-primary-500'} />}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
            <h4 className="mb-2 text-sm font-semibold">{m.funnelOverview}</h4>
            <EChartsWrapper option={funnelOption} style={{ height: '220px' }} />
          </div>
          <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
            <h4 className="mb-2 text-sm font-semibold">{m.retentionTrend}</h4>
            {cohortResult ? (
              <EChartsWrapper option={retentionOption} style={{ height: '220px' }} />
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">No data</div>
            )}
          </div>
          <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
            <h4 className="mb-2 text-sm font-semibold">{m.channelPerformance}</h4>
            {channelResult ? (
              <EChartsWrapper option={channelOption} style={{ height: '220px' }} />
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-gray-400">No data</div>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-5">
          <h4 className="mb-3 text-sm font-semibold text-primary-500">{m.keyInsights}</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {[m.insight1, m.insight2, m.insight3, m.insight4].map((insight, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-xs font-bold text-primary-500">{i + 1}</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── AARRR Tab ────────────────────────────────────────

  const renderAARRR = () => {
    const m = messages.aarrr;

    const funnelOption: EChartsOption = aarrrResult
      ? {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: unknown) => {
              const p = params as Array<{ name: string; value: number }>;
              if (!p?.[0]) return '';
              return `<strong>${p[0].name}</strong><br/>Users: ${p[0].value.toLocaleString()}`;
            },
          },
          grid: { left: '3%', right: '4%', top: '10%', bottom: '8%', containLabel: true },
          xAxis: {
            type: 'category',
            data: ['Visitors', ...aarrrResult.stages.map((s) => s.name)],
          },
          yAxis: { type: 'value' },
          series: [{
            type: 'bar',
            data: [
              { value: aarrrInput.totalVisitors, itemStyle: { color: '#042f2e' } },
              { value: aarrrResult.stages[0].value, itemStyle: { color: '#134e4a' } },
              { value: aarrrResult.stages[1].value, itemStyle: { color: '#0f766e' } },
              { value: aarrrResult.stages[2].value, itemStyle: { color: '#0d9488' } },
              { value: aarrrResult.stages[3].value, itemStyle: { color: '#14b8a6' } },
              { value: aarrrResult.stages[4].value, itemStyle: { color: '#2dd4bf' } },
            ],
            label: {
              show: true,
              position: 'top',
              formatter: (p: unknown) => {
                const params = p as { value: number };
                return params.value.toLocaleString();
              },
            },
            itemStyle: { borderRadius: [6, 6, 0, 0] },
            barWidth: '55%',
          }],
        }
      : {};

    const kFactor = aarrrInput.payingUsers > 0 ? aarrrInput.referrals / aarrrInput.payingUsers : 0;
    const overallConv = aarrrInput.totalVisitors > 0 ? (aarrrInput.payingUsers / aarrrInput.totalVisitors * 100) : 0;

    return (
      <div className="space-y-6">
        {/* Input Grid */}
        <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
          <h3 className="mb-4 text-lg font-semibold">{m.title}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {numInput(m.totalVisitors, aarrrInput.totalVisitors, (v) => setAarrrInput((p) => ({ ...p, totalVisitors: v })))}
            {numInput(m.signups, aarrrInput.signups, (v) => setAarrrInput((p) => ({ ...p, signups: v })))}
            {numInput(m.activated, aarrrInput.activatedUsers, (v) => setAarrrInput((p) => ({ ...p, activatedUsers: v })))}
            {numInput(m.retained, aarrrInput.retainedD7Users, (v) => setAarrrInput((p) => ({ ...p, retainedD7Users: v })))}
            {numInput(m.paying, aarrrInput.payingUsers, (v) => setAarrrInput((p) => ({ ...p, payingUsers: v })))}
            {numInput(m.referrals, aarrrInput.referrals, (v) => setAarrrInput((p) => ({ ...p, referrals: v })))}
            {numInput(m.adSpend, aarrrInput.adSpend, (v) => setAarrrInput((p) => ({ ...p, adSpend: v })))}
          </div>
          <button
            onClick={() => setAarrrResult(calculateAARRR(aarrrInput))}
            className="mt-4 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            {m.analyzeBtn}
          </button>
        </div>

        {aarrrResult && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label={m.cac} value={`$${aarrrResult.cac.toFixed(2)}`} />
              <MetricCard label={m.ltvCac} value={aarrrResult.ltvCacRatio.toFixed(2)} color={aarrrResult.ltvCacRatio > 3 ? 'text-primary-500' : 'text-primary-500'} />
              <MetricCard label={m.kFactor} value={kFactor.toFixed(2)} color={kFactor > 1 ? 'text-primary-500' : 'text-primary-500'} />
              <MetricCard label={m.overallConversion} value={`${overallConv.toFixed(2)}%`} />
            </div>

            {/* Funnel Chart */}
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <EChartsWrapper option={funnelOption} style={{ height: '380px' }} />
            </div>

            {/* Stage Detail Table */}
            <div className="rounded-xl border border-border-light dark:border-border-dark">
              <div className="border-b border-border-light px-5 py-3 dark:border-border-dark">
                <h4 className="text-sm font-semibold">{m.stageDetail}</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light bg-gray-50/50 dark:border-border-dark dark:bg-gray-800/50">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Stage</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Users</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.conversionRate}</th>
                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.dropoff}</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Funnel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aarrrResult.stages.map((s) => (
                      <tr key={s.name} className="border-b border-border-light/50 transition-colors hover:bg-gray-50/50 dark:border-border-dark/50 dark:hover:bg-gray-800/30">
                        <td className="px-5 py-3 font-medium">{s.name}</td>
                        <td className="px-5 py-3 text-right font-mono">{s.value.toLocaleString()}</td>
                        <td className="px-5 py-3 text-right">
                          <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-semibold text-primary-500">
                            {s.rate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-semibold text-primary-500">
                            -{s.dropoff.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <ProgressBar value={s.value} max={aarrrInput.totalVisitors} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ─── Cohort Tab ───────────────────────────────────────

  const renderCohort = () => {
    const m = messages.cohort;
    const periods = ['D0', 'D1', 'D3', 'D7', 'D14', 'D30'];

    const heatmapOption: EChartsOption = cohortResult
      ? {
          tooltip: {
            position: 'top',
            formatter: (p: unknown) => {
              const params = p as { value: number[] };
              return `${cohortResult.cohorts[params.value[1]]?.cohortDate}: ${periods[params.value[0]]} = ${params.value[2]}%`;
            },
          },
          grid: { left: '15%', right: '10%', top: '5%', bottom: '18%' },
          xAxis: { type: 'category', data: periods, splitArea: { show: true } },
          yAxis: {
            type: 'category',
            data: cohortResult.cohorts.map((c) => c.cohortDate),
            splitArea: { show: true },
          },
          visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            inRange: { color: ['#f0fdfa', '#ccfbf1', '#5eead4', '#0d9488', '#042f2e'] },
          },
          series: [{
            type: 'heatmap',
            data: cohortResult.cohorts.flatMap((c, yi) =>
              c.retention.map((r, xi) => [xi, yi, r]),
            ),
            label: { show: true, fontSize: 11, formatter: (p: unknown) => `${(p as { value: number[] }).value[2]}%` },
          }],
        }
      : {};

    // Retention curve line chart
    const curveOption: EChartsOption = cohortResult
      ? {
          tooltip: { trigger: 'axis' },
          legend: { data: cohortResult.cohorts.map((c) => c.cohortDate), bottom: 0, textStyle: { fontSize: 10 } },
          grid: { left: '3%', right: '4%', top: '8%', bottom: '18%', containLabel: true },
          xAxis: { type: 'category', data: periods },
          yAxis: { type: 'value', axisLabel: { formatter: '{value}%' }, max: 100 },
          series: [
            ...cohortResult.cohorts.map((c) => ({
              name: c.cohortDate,
              type: 'line' as const,
              data: c.retention,
              smooth: true,
              symbol: 'circle' as const,
              symbolSize: 6,
              lineStyle: { width: 2 },
            })),
            {
              name: m.avgRetention,
              type: 'line' as const,
              data: cohortResult.averageRetention,
              smooth: true,
              lineStyle: { width: 4, type: 'dashed' as const },
              symbol: 'diamond' as const,
              symbolSize: 10,
              itemStyle: { color: '#134e4a' },
            },
          ],
        }
      : {};

    // Find best/worst cohort by D30
    const bestCohort = cohortResult?.cohorts.reduce((best, c) => (c.retention[5] > (best?.retention[5] || 0) ? c : best), cohortResult.cohorts[0]);
    const worstCohort = cohortResult?.cohorts.reduce((worst, c) => (c.retention[5] < (worst?.retention[5] || 999) ? c : worst), cohortResult.cohorts[0]);

    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
          <h3 className="text-lg font-semibold">{m.title}</h3>
        </div>

        {cohortResult ? (
          <>
            {/* Cohort KPIs */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label={m.avgRetention + ' (D1)'} value={`${cohortResult.averageRetention[1]}%`} />
              <MetricCard label={m.avgRetention + ' (D7)'} value={`${cohortResult.averageRetention[3]}%`} />
              <MetricCard label={m.bestCohort} value={bestCohort?.cohortDate || '-'} sub={`D30: ${bestCohort?.retention[5]}%`} color="text-primary-500" />
              <MetricCard label={m.worstCohort} value={worstCohort?.cohortDate || '-'} sub={`D30: ${worstCohort?.retention[5]}%`} color="text-primary-500" />
            </div>

            {/* Heatmap */}
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <EChartsWrapper option={heatmapOption} style={{ height: '350px' }} />
            </div>

            {/* Retention Curve */}
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <h4 className="mb-2 text-sm font-semibold">{m.retentionCurve}</h4>
              <EChartsWrapper option={curveOption} style={{ height: '300px' }} />
            </div>

            {/* Data Table */}
            <div className="rounded-xl border border-border-light dark:border-border-dark">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light bg-gray-50/50 dark:border-border-dark dark:bg-gray-800/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{m.cohortDate}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.cohortSize}</th>
                      {periods.map((p) => (
                        <th key={p} className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cohortResult.cohorts.map((c) => (
                      <tr key={c.cohortDate} className="border-b border-border-light/50 dark:border-border-dark/50">
                        <td className="px-4 py-2.5 font-medium">{c.cohortDate}</td>
                        <td className="px-4 py-2.5 text-right font-mono">{c.cohortSize}</td>
                        {c.retention.map((r, i) => {
                          const intensity = r / 100;
                          return (
                            <td
                              key={i}
                              className="px-4 py-2.5 text-right font-mono text-xs"
                              style={{ backgroundColor: `rgba(13, 148, 136, ${intensity * 0.35})` }}
                            >
                              {r}%
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr className="border-t-2 border-primary-500 font-bold">
                      <td className="px-4 py-2.5">{m.avgRetention}</td>
                      <td className="px-4 py-2.5"></td>
                      {cohortResult.averageRetention.map((r, i) => (
                        <td key={i} className="px-4 py-2.5 text-right font-mono text-primary-500">{r}%</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-sm text-gray-500">
            {messages.overview.noData}
          </div>
        )}
      </div>
    );
  };

  // ─── Channel Tab ──────────────────────────────────────

  const renderChannel = () => {
    const m = messages.channel;

    // ROI bar chart
    const roiOption: EChartsOption = channelResult
      ? {
          tooltip: { trigger: 'axis' },
          legend: { data: ['ROI (%)', 'CAC ($)'] },
          grid: { left: '3%', right: '8%', bottom: '18%', containLabel: true },
          xAxis: {
            type: 'category',
            data: channelResult.channels.map((c) => c.name),
            axisLabel: { rotate: 30, fontSize: 10 },
          },
          yAxis: [
            { type: 'value', name: 'ROI (%)' },
            { type: 'value', name: 'CAC ($)' },
          ],
          series: [
            {
              name: 'ROI (%)',
              type: 'bar',
              data: channelResult.channels.map((c) => ({
                value: Math.round(c.roi * 10) / 10,
                itemStyle: { color: c.roi >= 100 ? '#0d9488' : c.roi >= 0 ? '#14b8a6' : '#134e4a', borderRadius: [4, 4, 0, 0] },
              })),
            },
            {
              name: 'CAC ($)',
              type: 'line',
              yAxisIndex: 1,
              data: channelResult.channels.map((c) => Math.round(c.cac * 100) / 100),
              symbol: 'circle',
              symbolSize: 8,
              lineStyle: { width: 3 },
              itemStyle: { color: '#0f766e' },
            },
          ],
        }
      : {};

    // Spend distribution pie
    const spendPieOption: EChartsOption = channelResult
      ? {
          tooltip: { trigger: 'item', formatter: '{b}: ${c} ({d}%)' },
          series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: { borderRadius: 6, borderColor: 'transparent', borderWidth: 2 },
            label: { show: true, fontSize: 10, formatter: '{b}\n{d}%' },
            data: channelResult.channels.map((c) => ({ value: c.spend, name: c.name })),
          }],
        }
      : {};

    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
          <h3 className="text-lg font-semibold">{m.title}</h3>
        </div>

        {channelResult ? (
          <>
            {/* Summary KPIs */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard label={m.blendedCAC} value={`$${channelResult.blendedCAC.toFixed(2)}`} />
              <MetricCard label={m.blendedROI} value={`${channelResult.blendedROI.toFixed(1)}%`} color={channelResult.blendedROI > 0 ? 'text-primary-500' : 'text-primary-500'} />
              <MetricCard label={m.topChannel} value={channelResult.topChannel} color="text-primary-500" />
              <MetricCard label={m.totalSpend} value={`$${channelResult.channels.reduce((s, c) => s + c.spend, 0).toLocaleString()}`} />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 lg:grid-cols-5">
              <div className="rounded-xl border border-border-light p-4 dark:border-border-dark lg:col-span-3">
                <h4 className="mb-2 text-sm font-semibold">{m.roiComparison}</h4>
                <EChartsWrapper option={roiOption} style={{ height: '350px' }} />
              </div>
              <div className="rounded-xl border border-border-light p-4 dark:border-border-dark lg:col-span-2">
                <h4 className="mb-2 text-sm font-semibold">{m.spendDistribution}</h4>
                <EChartsWrapper option={spendPieOption} style={{ height: '350px' }} />
              </div>
            </div>

            {/* Channel Table */}
            <div className="rounded-xl border border-border-light dark:border-border-dark">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light bg-gray-50/50 dark:border-border-dark dark:bg-gray-800/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{m.channelName}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.users}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.spend}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.cac}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.ltv}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.roi}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">{m.convRate}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...channelResult.channels].sort((a, b) => b.roi - a.roi).map((c, i) => (
                      <tr key={c.name} className="border-b border-border-light/50 transition-colors hover:bg-gray-50/50 dark:border-border-dark/50 dark:hover:bg-gray-800/30">
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? 'bg-primary-500/20 text-primary-700' : i === 1 ? 'bg-gray-300/30 text-gray-500' : i === 2 ? 'bg-primary-800/20 text-primary-800' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'}`}>
                              {i + 1}
                            </span>
                            <span className="font-medium">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono">{c.users.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right font-mono">${c.spend.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right font-mono">${c.cac.toFixed(2)}</td>
                        <td className="px-4 py-2.5 text-right font-mono">${c.ltv.toFixed(2)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${c.roi >= 100 ? 'bg-primary-500/10 text-primary-600' : c.roi >= 0 ? 'bg-primary-500/10 text-primary-600' : 'bg-primary-500/10 text-primary-700'}`}>
                            {c.roi.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono">{c.convRate.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center text-sm text-gray-500">
            {messages.overview.noData}
          </div>
        )}
      </div>
    );
  };

  // ─── A/B Test Tab ─────────────────────────────────────

  const renderABTest = () => {
    const m = messages.abtest;

    // Comparison bar chart
    const comparisonOption: EChartsOption = abResult
      ? {
          tooltip: { trigger: 'axis' },
          grid: { left: '3%', right: '4%', top: '10%', bottom: '8%', containLabel: true },
          xAxis: { type: 'category', data: [m.control, m.variant] },
          yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
          series: [{
            type: 'bar',
            data: [
              { value: Math.round(abResult.controlRate * 100) / 100, itemStyle: { color: '#0d9488', borderRadius: [6, 6, 0, 0] } },
              { value: Math.round(abResult.variantRate * 100) / 100, itemStyle: { color: '#2dd4bf', borderRadius: [6, 6, 0, 0] } },
            ],
            label: { show: true, position: 'top', formatter: '{c}%', fontWeight: 'bold' },
            barWidth: '40%',
          }],
        }
      : {};

    return (
      <div className="space-y-6">
        {/* Input Section */}
        <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
          <h3 className="mb-4 text-lg font-semibold">{m.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-2 border-primary-500/30 bg-primary-500/5 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-primary-500">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs text-white">A</span>
                {m.control}
              </h4>
              <div className="space-y-3">
                {numInput(m.visitors, abInput.controlVisitors, (v) => setAbInput((p) => ({ ...p, controlVisitors: v })))}
                {numInput(m.conversions, abInput.controlConversions, (v) => setAbInput((p) => ({ ...p, controlConversions: v })))}
              </div>
            </div>
            <div className="rounded-lg border-2 border-primary-500/30 bg-primary-500/5 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-primary-500">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs text-white">B</span>
                {m.variant}
              </h4>
              <div className="space-y-3">
                {numInput(m.visitors, abInput.variantVisitors, (v) => setAbInput((p) => ({ ...p, variantVisitors: v })))}
                {numInput(m.conversions, abInput.variantConversions, (v) => setAbInput((p) => ({ ...p, variantConversions: v })))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">{m.confidenceLevel}</label>
              <select
                value={abInput.confidenceLevel}
                onChange={(e) => setAbInput((p) => ({ ...p, confidenceLevel: Number(e.target.value) as 90 | 95 | 99 }))}
                className="rounded-lg border border-border-light bg-background-light px-3 py-2 text-sm dark:border-border-dark dark:bg-background-dark"
              >
                <option value={90}>90%</option>
                <option value={95}>95%</option>
                <option value={99}>99%</option>
              </select>
            </div>
            <button
              onClick={() => setAbResult(calculateABTest(abInput))}
              className="rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              {m.calculateBtn}
            </button>
          </div>
        </div>

        {abResult && (
          <>
            {/* Result Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricCard
                label={`${m.control} ${m.result.conversionRate}`}
                value={`${abResult.controlRate.toFixed(2)}%`}
                color="text-primary-500"
              />
              <MetricCard
                label={`${m.variant} ${m.result.conversionRate}`}
                value={`${abResult.variantRate.toFixed(2)}%`}
                color="text-primary-500"
              />
              <MetricCard
                label={m.result.improvement}
                value={`${abResult.relativeImprovement >= 0 ? '+' : ''}${abResult.relativeImprovement.toFixed(2)}%`}
                color={abResult.relativeImprovement >= 0 ? 'text-primary-500' : 'text-primary-500'}
              />
              <MetricCard
                label={m.result.pValue}
                value={abResult.pValue.toFixed(4)}
                sub={`Z: ${abResult.zScore.toFixed(3)}`}
                color={abResult.isSignificant ? 'text-primary-500' : 'text-primary-500'}
              />
            </div>

            {/* Comparison Chart */}
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <EChartsWrapper option={comparisonOption} style={{ height: '280px' }} />
            </div>

            {/* Verdict */}
            <div className={`rounded-xl border-2 p-5 ${
              abResult.recommendation === 'deploy'
                ? 'border-primary-500/40 bg-primary-500/5'
                : abResult.recommendation === 'keep'
                ? 'border-primary-500/40 bg-primary-500/5'
                : 'border-primary-500/40 bg-primary-500/5'
            }`}>
              <div className="flex items-start gap-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg ${
                  abResult.recommendation === 'deploy' ? 'bg-primary-500/20' :
                  abResult.recommendation === 'keep' ? 'bg-primary-500/20' : 'bg-primary-500/20'
                }`}>
                  {abResult.recommendation === 'deploy' ? 'Y' : abResult.recommendation === 'keep' ? 'N' : '?'}
                </span>
                <div>
                  <p className="font-bold text-lg">
                    {abResult.isSignificant ? m.result.significant : m.result.notSignificant}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {abResult.recommendation === 'deploy' ? m.result.deployVariant :
                     abResult.recommendation === 'keep' ? m.result.keepControl :
                     m.result.needMoreData}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    {m.result.confidenceInterval}: [{abResult.confidenceInterval[0].toFixed(3)}%, {abResult.confidenceInterval[1].toFixed(3)}%]
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // ─── Competitive Tab ──────────────────────────────────

  const renderCompetitive = () => {
    const m = messages.competitive;
    const dimensions = Object.keys(m.dimensions);

    const radarOption: EChartsOption = competitors.length > 0
      ? {
          tooltip: {},
          legend: { data: competitors.map((c) => c.name), bottom: 0 },
          radar: {
            indicator: dimensions.map((d) => ({
              name: m.dimensions[d],
              max: 10,
            })),
            shape: 'polygon',
            splitNumber: 5,
          },
          series: [{
            type: 'radar',
            data: competitors.map((c, i) => ({
              name: c.name,
              value: dimensions.map((d) => c.scores[d] || 0),
              areaStyle: { opacity: 0.15 },
              lineStyle: { width: 2 },
              symbol: 'circle',
              symbolSize: 6,
              itemStyle: {
                color: ['#0d9488', '#134e4a', '#0f766e', '#14b8a6', '#115e59'][i % 5],
              },
            })),
          }],
        }
      : {};

    const updateScore = (compIdx: number, dim: string, value: number) => {
      setCompetitors((prev) =>
        prev.map((c, i) =>
          i === compIdx ? { ...c, scores: { ...c.scores, [dim]: Math.min(10, Math.max(1, value)) } } : c,
        ),
      );
    };

    const addProduct = () => {
      const defaultScores: Record<string, number> = {};
      dimensions.forEach((d) => (defaultScores[d] = 5));
      setCompetitors((prev) => [...prev, { name: `Product ${prev.length + 1}`, scores: defaultScores }]);
    };

    const removeProduct = (idx: number) => {
      setCompetitors((prev) => prev.filter((_, i) => i !== idx));
    };

    // Calculate avg scores and gap analysis
    const avgScores = competitors.map((c) => {
      const vals = dimensions.map((d) => c.scores[d] || 0);
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    });
    const ourProduct = competitors[0];
    const gaps = ourProduct ? dimensions.map((d) => {
      const ourScore = ourProduct.scores[d] || 0;
      const maxOther = Math.max(...competitors.slice(1).map((c) => c.scores[d] || 0), 0);
      return { dim: d, label: m.dimensions[d], ourScore, maxOther, gap: ourScore - maxOther };
    }) : [];

    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
          <h3 className="mb-1 text-lg font-semibold">{m.title}</h3>
          <p className="text-xs text-gray-500">{m.scoreHelp}</p>
        </div>

        {competitors.length > 0 && (
          <>
            {/* Radar Chart */}
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <EChartsWrapper option={radarOption} style={{ height: '420px' }} />
            </div>

            {/* Score Table */}
            <div className="rounded-xl border border-border-light dark:border-border-dark">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-light bg-gray-50/50 dark:border-border-dark dark:bg-gray-800/50">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">{m.product}</th>
                      {dimensions.map((d) => (
                        <th key={d} className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">{m.dimensions[d]}</th>
                      ))}
                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">{m.avgScore}</th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((comp, ci) => (
                      <tr key={ci} className="border-b border-border-light/50 dark:border-border-dark/50">
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={comp.name}
                            onChange={(e) =>
                              setCompetitors((prev) =>
                                prev.map((c, i) => (i === ci ? { ...c, name: e.target.value } : c)),
                              )
                            }
                            className="w-28 rounded border border-border-light bg-transparent px-2 py-1 text-sm font-medium dark:border-border-dark"
                          />
                        </td>
                        {dimensions.map((d) => (
                          <td key={d} className="px-3 py-2 text-center">
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={comp.scores[d] || 5}
                              onChange={(e) => updateScore(ci, d, Number(e.target.value))}
                              className="w-14 rounded border border-border-light bg-transparent px-1 py-1 text-center text-sm dark:border-border-dark"
                            />
                          </td>
                        ))}
                        <td className="px-4 py-2 text-center">
                          <span className="rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-bold text-primary-500">
                            {avgScores[ci]?.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeProduct(ci)}
                            className="text-xs text-primary-500 hover:underline"
                          >
                            {m.removeProduct}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gap Analysis */}
            {gaps.length > 0 && competitors.length > 1 && (
              <div className="rounded-xl border border-border-light p-5 dark:border-border-dark">
                <h4 className="mb-4 text-sm font-semibold">{m.gapAnalysis}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Strengths */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">{m.strengths}</p>
                    {gaps.filter((g) => g.gap > 0).sort((a, b) => b.gap - a.gap).map((g) => (
                      <div key={g.dim} className="mb-2 flex items-center justify-between rounded-lg bg-primary-500/5 px-3 py-2 text-sm">
                        <span>{g.label}</span>
                        <span className="font-mono font-bold text-primary-500">+{g.gap}</span>
                      </div>
                    ))}
                    {gaps.filter((g) => g.gap > 0).length === 0 && (
                      <p className="text-xs text-gray-400">-</p>
                    )}
                  </div>
                  {/* Weaknesses */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-500">{m.weaknesses}</p>
                    {gaps.filter((g) => g.gap < 0).sort((a, b) => a.gap - b.gap).map((g) => (
                      <div key={g.dim} className="mb-2 flex items-center justify-between rounded-lg bg-primary-500/5 px-3 py-2 text-sm">
                        <span>{g.label}</span>
                        <span className="font-mono font-bold text-primary-500">{g.gap}</span>
                      </div>
                    ))}
                    {gaps.filter((g) => g.gap < 0).length === 0 && (
                      <p className="text-xs text-gray-400">-</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <button
          onClick={addProduct}
          className="w-full rounded-xl border-2 border-dashed border-border-light py-3 text-sm font-medium transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-border-dark"
        >
          + {m.addProduct}
        </button>
      </div>
    );
  };

  // ─── Main Render ──────────────────────────────────────

  const tabKeys: TabKey[] = ['overview', 'aarrr', 'cohort', 'channel', 'abtest', 'competitive'];
  const tabIcons: Record<TabKey, string> = {
    overview: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    aarrr: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z',
    cohort: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5',
    channel: 'M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
    abtest: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
    competitive: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{messages.title}</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{messages.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleLoadExample}
            className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            {messages.exampleBtn}
          </button>
          <button
            onClick={handleClear}
            className="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-border-dark dark:hover:bg-gray-800"
          >
            {messages.clearBtn}
          </button>
          <button
            onClick={handleExport}
            className="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-border-dark dark:hover:bg-gray-800"
          >
            {messages.exportBtn}
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-border-dark dark:hover:bg-gray-800"
          >
            {copied ? messages.copied : messages.copyBtn}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-border-light bg-gray-50/50 p-1 dark:border-border-dark dark:bg-gray-800/50">
        {tabKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              activeTab === key
                ? 'bg-background-light text-primary-500 shadow-sm dark:bg-background-dark'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={tabIcons[key]} />
            </svg>
            <span className="hidden sm:inline">{messages.tabs[key]}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'aarrr' && renderAARRR()}
        {activeTab === 'cohort' && renderCohort()}
        {activeTab === 'channel' && renderChannel()}
        {activeTab === 'abtest' && renderABTest()}
        {activeTab === 'competitive' && renderCompetitive()}
      </div>
    </div>
  );
}
