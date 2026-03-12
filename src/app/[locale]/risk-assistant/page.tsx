'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  regulations, riskCategories, controls, monitoringMetrics, scenarios, alerts,
  calculateRiskScore, SEVERITY_COLORS, STATUS_COLORS,
} from '@/lib/riskAssistantData';

const SEVERITY_DOT: Record<string, string> = {
  low: 'bg-primary-400', medium: 'bg-primary-400', high: 'bg-primary-400', critical: 'bg-primary-500',
};

export default function RiskAssistantDashboard() {
  const { locale } = useParams() as { locale: string };
  const isZh = locale === 'zh';

  const openAlerts = alerts.filter((a) => a.status !== 'resolved');
  const criticalAlerts = alerts.filter((a) => a.severity === 'critical').length;
  const highAlerts = alerts.filter((a) => a.severity === 'high').length;
  const mediumAlerts = alerts.filter((a) => a.severity === 'medium').length;
  const lowAlerts = alerts.filter((a) => a.severity === 'low').length;
  const recentAlerts = [...alerts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const breachedMetrics = monitoringMetrics.filter((m) => m.status !== 'normal');

  const statCards = [
    { label: isZh ? '法规要求' : 'Regulations', value: regulations.length, sub: isZh ? '已生效政策' : 'Active policies', color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { label: isZh ? '风险类别' : 'Risk Categories', value: riskCategories.length, sub: isZh ? '已识别风险' : 'Identified risks', color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { label: isZh ? '管控措施' : 'Controls', value: controls.length, sub: isZh ? '已设计控制' : 'Designed controls', color: 'text-primary-500', bg: 'bg-primary-500/10' },
    { label: isZh ? '活跃警报' : 'Active Alerts', value: openAlerts.length, sub: isZh ? '待处理事项' : 'Pending action', color: 'text-primary-500', bg: 'bg-primary-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-500">
          <span className="h-px w-6 bg-primary-500" />
          {isZh ? '风险管理工具' : 'Risk Management Tool'}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {isZh ? '支付风险政策与监控助手' : 'Payment Risk Policy & Monitoring Assistant'}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {isZh
            ? '整合法规要求、风险映射、管控措施与实时预警的内部合规工作流原型。'
            : 'An internal compliance workflow prototype integrating regulatory requirements, risk mapping, controls, and real-time monitoring.'}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
              <span className={`text-lg font-extrabold ${card.color}`}>{card.value}</span>
            </div>
            <p className="text-sm font-semibold">{card.label}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Alert Severity + KPI Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alert Severity Distribution */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
          <h2 className="mb-4 text-sm font-semibold">{isZh ? '警报等级分布' : 'Alerts by Severity'}</h2>
          {[
            { label: 'Critical', count: criticalAlerts, color: 'bg-primary-500', total: alerts.length },
            { label: 'High', count: highAlerts, color: 'bg-primary-400', total: alerts.length },
            { label: 'Medium', count: mediumAlerts, color: 'bg-primary-400', total: alerts.length },
            { label: 'Low', count: lowAlerts, color: 'bg-primary-400', total: alerts.length },
          ].map((row) => (
            <div key={row.label} className="mb-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-medium text-gray-600 dark:text-gray-300">{row.label}</span>
                <span className="tabular-nums text-gray-400">{row.count}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`h-2 rounded-full ${row.color}`}
                  style={{ width: `${(row.count / row.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* KPI Monitoring Status */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
          <h2 className="mb-4 text-sm font-semibold">{isZh ? '关键指标状态' : 'KPI Monitoring Status'}</h2>
          <div className="space-y-2">
            {monitoringMetrics.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <span className={`h-2 w-2 shrink-0 rounded-full ${SEVERITY_DOT[m.status] || 'bg-primary-400'}`} />
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-gray-700 dark:text-gray-300">{m.name}</span>
                <span className="shrink-0 text-xs tabular-nums text-gray-400">{m.currentValue}</span>
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${SEVERITY_COLORS[m.status as keyof typeof SEVERITY_COLORS] || ''}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario Risk Scores */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
        <h2 className="mb-4 text-sm font-semibold">{isZh ? '场景风险评估' : 'Scenario Risk Assessment'}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {scenarios.map((s) => {
            const score = calculateRiskScore(s);
            const pct = score.score;
            const barColor = score.classification === 'critical' ? 'bg-primary-500' : score.classification === 'high' ? 'bg-primary-400' : score.classification === 'medium' ? 'bg-primary-400' : 'bg-primary-400';
            return (
              <Link key={s.id} href={`/${locale}/risk-assistant/scenarios`}
                className="group rounded-xl border border-gray-100 p-4 transition-all hover:border-primary-500/30 hover:shadow-md dark:border-gray-800">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{s.id}</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${SEVERITY_COLORS[score.classification]}`}>
                    {score.classification.toUpperCase()}
                  </span>
                </div>
                <p className="mb-3 text-sm font-medium leading-snug group-hover:text-primary-500">{s.name}</p>
                <div className="mb-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
                <p className="text-right text-xs tabular-nums text-gray-400">{score.score}/100</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
          <h2 className="text-sm font-semibold">{isZh ? '最近警报' : 'Recent Alerts'}</h2>
          <Link href={`/${locale}/risk-assistant/alerts`} className="text-xs font-semibold text-primary-500 hover:text-primary-600">
            {isZh ? '查看全部 →' : 'View All →'}
          </Link>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {recentAlerts.map((a) => (
            <div key={a.id} className="flex items-start gap-4 px-6 py-4">
              <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${SEVERITY_DOT[a.severity]}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">{a.date} · {a.merchant || a.riskCategoryId}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${SEVERITY_COLORS[a.severity as keyof typeof SEVERITY_COLORS]}`}>
                  {a.severity}
                </span>
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[a.status as keyof typeof STATUS_COLORS]}`}>
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breached KPIs callout */}
      {breachedMetrics.length > 0 && (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5 dark:border-primary-800/40 dark:bg-primary-900/10">
          <p className="mb-2 text-sm font-semibold text-primary-800 dark:text-primary-400">
            {breachedMetrics.length} {isZh ? '项指标需要关注' : 'KPIs require attention'}
          </p>
          <ul className="space-y-1">
            {breachedMetrics.map((m) => (
              <li key={m.id} className="text-xs text-primary-700 dark:text-primary-400/80">
                · [{m.id}] {m.name}: {m.currentValue} <span className="opacity-60">(threshold: {m.threshold})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
