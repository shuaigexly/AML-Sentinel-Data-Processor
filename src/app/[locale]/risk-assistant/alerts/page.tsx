'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { alerts, scenarios, riskCategories, SEVERITY_COLORS, STATUS_COLORS } from '@/lib/riskAssistantData';

type Severity = 'all' | 'critical' | 'high' | 'medium' | 'low';
type Status   = 'all' | 'open' | 'investigating' | 'escalated' | 'resolved';

export default function AlertsPage() {
  const { locale } = useParams() as { locale: string };
  const isZh = locale === 'zh';
  const [filterSev, setFilterSev] = useState<Severity>('all');
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const SEV_OPTIONS: Severity[] = ['all', 'critical', 'high', 'medium', 'low'];
  const STATUS_OPTIONS: Status[] = ['all', 'open', 'investigating', 'escalated', 'resolved'];

  const SEV_DOT: Record<string, string> = {
    low: 'bg-primary-400', medium: 'bg-primary-400', high: 'bg-primary-400', critical: 'bg-primary-500',
  };

  const filtered = alerts.filter((a) => {
    const matchSev = filterSev === 'all' || a.severity === filterSev;
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    return matchSev && matchStatus && matchSearch;
  }).sort((a, b) => {
    const sevOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return (sevOrder[a.severity] - sevOrder[b.severity]) || b.date.localeCompare(a.date);
  });

  const openCount = alerts.filter((a) => a.status !== 'resolved').length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const resolvedCount = alerts.filter((a) => a.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-500">
          <span className="h-px w-6 bg-primary-500" />
          {isZh ? '警报与监控' : 'Alerts & Monitoring'}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {isZh ? '风险事件与预警管理' : 'Risk Incidents & Alert Management'}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh ? `${alerts.length} 条记录 · ${openCount} 条待处理 · ${criticalCount} 条严重` : `${alerts.length} total · ${openCount} open · ${criticalCount} critical`}
        </p>
      </div>

      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: isZh ? '待处理' : 'Open', count: openCount, color: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' },
          { label: isZh ? '严重' : 'Critical', count: criticalCount, color: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400' },
          { label: isZh ? '已解决' : 'Resolved', count: resolvedCount, color: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' },
        ].map((chip) => (
          <span key={chip.label} className={`rounded-full px-3 py-1 text-xs font-semibold ${chip.color}`}>
            {chip.label}: {chip.count}
          </span>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder={isZh ? '搜索警报...' : 'Search alerts...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 min-w-[180px] rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <select
          value={filterSev}
          onChange={(e) => setFilterSev(e.target.value as Severity)}
          className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          {SEV_OPTIONS.map((s) => <option key={s} value={s}>{isZh ? (s === 'all' ? '全部等级' : s === 'critical' ? '严重' : s === 'high' ? '高' : s === 'medium' ? '中' : '低') : (s === 'all' ? 'All Severity' : s.charAt(0).toUpperCase() + s.slice(1))}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as Status)}
          className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{isZh ? (s === 'all' ? '全部状态' : s === 'open' ? '待处理' : s === 'investigating' ? '调查中' : s === 'escalated' ? '已上报' : '已解决') : (s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1))}</option>)}
        </select>
        <span className="flex h-9 items-center text-xs text-gray-400">{filtered.length} {isZh ? '条' : 'results'}</span>
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        {filtered.map((alert) => {
          const isOpen = expanded === alert.id;
          const scenario = scenarios.find((s) => s.id === alert.scenarioId);
          const riskCat = riskCategories.find((r) => r.id === alert.riskCategoryId);

          return (
            <div key={alert.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60">
              <button
                onClick={() => setExpanded(isOpen ? null : alert.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${SEV_DOT[alert.severity]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">{alert.id}</span>
                    <span className="truncate text-sm font-medium">{alert.title}</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap gap-2 text-xs text-gray-400">
                    <span>{alert.date}</span>
                    {alert.merchant && <><span>·</span><span>{alert.merchant}</span></>}
                    <span>·</span>
                    <span>{scenario?.name || alert.scenarioId}</span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${SEVERITY_COLORS[alert.severity as keyof typeof SEVERITY_COLORS]}`}>
                    {alert.severity}
                  </span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[alert.status as keyof typeof STATUS_COLORS]}`}>
                    {alert.status}
                  </span>
                </div>
                <svg className={`ml-1 h-4 w-4 shrink-0 text-gray-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 dark:border-gray-800">
                  <div className="mb-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '事件描述' : 'Description'}</p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{alert.description}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '风险类别' : 'Risk Category'}</p>
                      <div className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                        <p className="text-xs font-bold text-gray-500">{riskCat?.id}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{riskCat?.name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '关联场景' : 'Linked Scenario'}</p>
                      <div className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                        <p className="text-xs font-bold text-gray-500">{scenario?.id}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{scenario?.name}</p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '建议操作' : 'Suggested Action'}</p>
                      <div className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 dark:border-primary-800/30 dark:bg-primary-900/10">
                        <p className="text-xs leading-relaxed text-primary-800 dark:text-primary-400">{alert.suggestedAction}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-gray-400">
          <p className="text-sm">{isZh ? '未找到匹配警报。' : 'No alerts match your filters.'}</p>
        </div>
      )}
    </div>
  );
}
