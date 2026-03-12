'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import EChartsWrapper from '@/components/charts/EChartsWrapper';
import type { EChartsOption } from 'echarts';

interface MetricData {
  date: string;
  daily_transactions: number;
  transaction_volume: number;
  active_merchants: number;
  user_retention: number;
  avg_transaction_value: number;
  revenue: number;
}

interface MetricsResponse {
  metadata: {
    platform: string;
    startDate: string;
    endDate: string;
    dataSource: string;
  };
  daily: MetricData[];
}

interface DashboardMessages {
  title: string;
  subtitle: string;
  kpiCards: string;
  trends: string;
  insightGenerator: string;
  insightPlaceholder: string;
  generateInsight: string;
  metrics: {
    dailyTransactions: string;
    transactionVolume: string;
    activeMerchants: string;
    userRetention: string;
    avgTransactionValue: string;
    revenue: string;
  };
}

interface ResearchDashboardProps {
  messages: DashboardMessages;
}

export default function ResearchDashboard({ messages }: ResearchDashboardProps) {
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [observation, setObservation] = useState('');
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    fetch('/research/sample_metrics.json')
      .then((res) => res.json())
      .then((json: MetricsResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const generateInsight = () => {
    if (!observation.trim()) return;

    const patterns = [
      {
        keywords: ['increase', 'increased', 'growth', 'grew', 'up', 'higher', 'more'],
        responses: [
          'Potential driver: Seasonal promotional campaigns or merchant onboarding push',
          'Consider: Cross-reference with marketing spend and channel performance data',
          'Action: Segment growth by merchant category to identify top-performing verticals',
          'Validation: Confirm trend persists for 7+ days and correlate with GMV per merchant',
        ],
      },
      {
        keywords: ['decrease', 'decreased', 'drop', 'dropped', 'down', 'lower', 'less', 'decline'],
        responses: [
          'Investigate: Check for system downtime, settlement delays, or compliance issues',
          'Compare: Benchmark against industry average and seasonal patterns',
          'Segment: Break down by merchant size (SMB vs Enterprise) and payment method',
          'Alert: If >15% drop in daily TPV, escalate to operations team for root cause analysis',
        ],
      },
      {
        keywords: ['retention', 'churn', 'return', 'loyal'],
        responses: [
          'Benchmark: Compare merchant retention against fintech industry standard (75-85%)',
          'Experiment: Test loyalty programs, tiered pricing, or dedicated account management',
          'Cohort: Track retention by merchant acquisition channel and onboarding month',
          'Engagement: Correlate retention with transaction frequency and support ticket volume',
        ],
      },
      {
        keywords: ['revenue', 'cost', 'margin', 'profit', 'fee'],
        responses: [
          'Unit economics: Calculate revenue per active merchant and blended take rate',
          'Segmentation: Identify high-value merchant categories driving 80% of revenue',
          'Pricing: Evaluate take rate elasticity across different transaction size bands',
          'Sustainability: Model revenue growth against merchant acquisition cost payback',
        ],
      },
      {
        keywords: ['transaction', 'volume', 'payment', 'merchant'],
        responses: [
          'Quality: Distinguish high-frequency merchants vs occasional users',
          'Acquisition: Track merchant onboarding funnel (lead to KYC to activation to first tx)',
          'Cross-sell: Analyze multi-product adoption (POS, online, QR code, recurring billing)',
          'Risk: Monitor chargeback rate and fraud detection accuracy by merchant segment',
        ],
      },
    ];

    const observationLower = observation.toLowerCase();
    let matchedResponses: string[] = [];

    for (const pattern of patterns) {
      if (pattern.keywords.some((k) => observationLower.includes(k))) {
        matchedResponses = [...matchedResponses, ...pattern.responses];
        break;
      }
    }

    if (matchedResponses.length === 0) {
      matchedResponses = [
        'Quantify: Attach specific numbers, date ranges, and merchant segments to the observation',
        'Compare: Benchmark against historical averages, industry standards, or competitor data',
        'Segment: Break down the metric by merchant category, region, or payment method',
        'Hypothesis: Form a testable hypothesis and design an A/B test or cohort analysis',
      ];
    }

    setInsights(matchedResponses);
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center text-gray-500">Failed to load metrics data.</div>
        </div>
      </section>
    );
  }

  const latest = data.daily[data.daily.length - 1];
  const previous = data.daily[data.daily.length - 2];

  const calcTrend = (current: number, prev: number) => ({
    value: Math.round(((current - prev) / prev) * 100),
    isPositive: current >= prev,
  });

  const last30Days = data.daily.slice(-30);
  const dates = last30Days.map((d) => d.date.slice(5));

  const transactionChartOption: EChartsOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: dates },
    yAxis: { type: 'value' },
    series: [
      {
        name: messages.metrics.dailyTransactions,
        type: 'line',
        data: last30Days.map((d) => d.daily_transactions),
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(13,148,136,0.3)' },
              { offset: 1, color: 'rgba(13,148,136,0.02)' },
            ],
          },
        },
        itemStyle: { color: '#0d9488' },
      },
    ],
  };

  const volumeRevenueChartOption: EChartsOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: [messages.metrics.transactionVolume, messages.metrics.revenue] },
    xAxis: { type: 'category', data: dates },
    yAxis: [
      {
        type: 'value',
        name: messages.metrics.transactionVolume,
        position: 'left',
        axisLabel: { formatter: (v: number) => `${(v / 1000000).toFixed(0)}M` },
      },
      {
        type: 'value',
        name: messages.metrics.revenue,
        position: 'right',
        axisLabel: { formatter: (v: number) => `${(v / 1000).toFixed(0)}K` },
      },
    ],
    series: [
      {
        name: messages.metrics.transactionVolume,
        type: 'bar',
        data: last30Days.map((d) => d.transaction_volume),
        yAxisIndex: 0,
        itemStyle: { color: '#0d9488', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: messages.metrics.revenue,
        type: 'line',
        data: last30Days.map((d) => d.revenue),
        yAxisIndex: 1,
        smooth: true,
        itemStyle: { color: '#14b8a6' },
      },
    ],
  };

  const retentionMerchantChartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: unknown) => {
        const p = params as Array<{ name: string; seriesName: string; value: number }>;
        return `${p[0].name}<br/>${p.map((item) =>
          item.seriesName.includes('Retention') || item.seriesName.includes('留存')
            ? `${item.seriesName}: ${(item.value * 100).toFixed(1)}%`
            : `${item.seriesName}: ${item.value.toLocaleString()}`
        ).join('<br/>')}`;
      },
    },
    legend: { data: [messages.metrics.userRetention, messages.metrics.activeMerchants] },
    xAxis: { type: 'category', data: dates },
    yAxis: [
      {
        type: 'value',
        name: messages.metrics.userRetention,
        max: 1,
        axisLabel: { formatter: (v: number) => `${(v * 100).toFixed(0)}%` },
      },
      {
        type: 'value',
        name: messages.metrics.activeMerchants,
        position: 'right',
      },
    ],
    series: [
      {
        name: messages.metrics.userRetention,
        type: 'line',
        data: last30Days.map((d) => d.user_retention),
        smooth: true,
        yAxisIndex: 0,
        itemStyle: { color: '#0f766e' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(13,148,136,0.2)' },
              { offset: 1, color: 'rgba(13,148,136,0.02)' },
            ],
          },
        },
      },
      {
        name: messages.metrics.activeMerchants,
        type: 'line',
        data: last30Days.map((d) => d.active_merchants),
        smooth: true,
        yAxisIndex: 1,
        itemStyle: { color: '#2dd4bf' },
      },
    ],
  };

  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* KPI Cards */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{messages.kpiCards}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              title={messages.metrics.dailyTransactions}
              value={latest.daily_transactions.toLocaleString()}
              trend={calcTrend(latest.daily_transactions, previous.daily_transactions)}
              variant="primary"
            />
            <StatsCard
              title={messages.metrics.transactionVolume}
              value={`¥${(latest.transaction_volume / 1000000).toFixed(1)}M`}
              trend={calcTrend(latest.transaction_volume, previous.transaction_volume)}
              variant="success"
            />
            <StatsCard
              title={messages.metrics.activeMerchants}
              value={latest.active_merchants.toLocaleString()}
              trend={calcTrend(latest.active_merchants, previous.active_merchants)}
              variant="default"
            />
            <StatsCard
              title={messages.metrics.userRetention}
              value={`${(latest.user_retention * 100).toFixed(1)}%`}
              trend={calcTrend(latest.user_retention, previous.user_retention)}
              variant="success"
            />
            <StatsCard
              title={messages.metrics.avgTransactionValue}
              value={`¥${latest.avg_transaction_value.toFixed(0)}`}
              trend={calcTrend(latest.avg_transaction_value, previous.avg_transaction_value)}
              variant="warning"
            />
            <StatsCard
              title={messages.metrics.revenue}
              value={`¥${(latest.revenue / 1000).toFixed(0)}K`}
              trend={calcTrend(latest.revenue, previous.revenue)}
              variant="danger"
            />
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{messages.trends}</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <h3 className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {messages.metrics.dailyTransactions} (Last 30 Days)
              </h3>
              <EChartsWrapper option={transactionChartOption} style={{ height: '280px' }} />
            </div>
            <div className="rounded-xl border border-border-light p-4 dark:border-border-dark">
              <h3 className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {messages.metrics.userRetention} &amp; {messages.metrics.activeMerchants}
              </h3>
              <EChartsWrapper option={retentionMerchantChartOption} style={{ height: '280px' }} />
            </div>
            <div className="rounded-xl border border-border-light p-4 lg:col-span-2 dark:border-border-dark">
              <h3 className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {messages.metrics.transactionVolume} &amp; {messages.metrics.revenue} (Last 30 Days)
              </h3>
              <EChartsWrapper option={volumeRevenueChartOption} style={{ height: '280px' }} />
            </div>
          </div>
        </div>

        {/* Insight Generator */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{messages.insightGenerator}</h2>
          <div className="rounded-xl border border-border-light p-6 dark:border-border-dark">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && generateInsight()}
                placeholder={messages.insightPlaceholder}
                className="flex-1 rounded-lg border border-border-light bg-background-light px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-border-dark dark:bg-background-dark"
              />
              <button
                onClick={generateInsight}
                className="rounded-lg bg-primary-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
              >
                {messages.generateInsight}
              </button>
            </div>

            {insights.length > 0 && (
              <div className="mt-6 rounded-lg bg-primary-500/5 p-4">
                <h4 className="mb-3 text-sm font-semibold text-primary-500">Structured Insights:</h4>
                <ul className="space-y-2">
                  {insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-xs font-medium text-primary-500">
                        {idx + 1}
                      </span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Data Source Note */}
        <div className="rounded-lg bg-primary-500/10 p-4 text-sm text-primary-800 dark:text-primary-300">
          <strong>Note:</strong> This dashboard uses simulated data for demonstration purposes. In production,
          data would be sourced from the payment platform&apos;s data warehouse via automated ETL pipelines.
          <br />
          <span className="text-xs">
            Data range: {data.metadata.startDate} to {data.metadata.endDate} | Platform: {data.metadata.platform}
          </span>
        </div>
      </div>
    </section>
  );
}
