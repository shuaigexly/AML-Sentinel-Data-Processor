'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  scenarios, riskCategories, controls, monitoringMetrics, alerts,
  calculateRiskScore, generateSummaryMemo, SEVERITY_COLORS, STATUS_COLORS,
} from '@/lib/riskAssistantData';

export default function ScenariosPage() {
  const { locale } = useParams() as { locale: string };
  const isZh = locale === 'zh';
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const CATEGORY_BADGE: Record<string, string> = {
    onboarding:  'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    transaction: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    behavior:    'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    reporting:   'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300',
  };
  const CATEGORY_LABEL: Record<string, string> = {
    onboarding: isZh ? '商户准入' : 'Onboarding',
    transaction: isZh ? '交易监控' : 'Transaction',
    behavior: isZh ? '行为分析' : 'Behavior',
    reporting: isZh ? '合规报告' : 'Reporting',
  };

  function handleGenerate(scenarioId: string) {
    const s = scenarios.find((sc) => sc.id === scenarioId);
    if (s) {
      setMemo(generateSummaryMemo(s));
      setActiveScenario(scenarioId);
    }
  }

  function handleCopy() {
    if (memo) {
      navigator.clipboard.writeText(memo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-500">
          <span className="h-px w-6 bg-primary-500" />
          {isZh ? '场景评估' : 'Scenario Review'}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {isZh ? '典型风险场景分析' : 'Risk Scenario Assessment'}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh ? '点击"生成评估报告"可输出完整风险评估备忘录。' : 'Click "Generate Assessment" to produce a full risk memo for any scenario.'}
        </p>
      </div>

      <div className="space-y-6">
        {scenarios.map((scenario) => {
          const score = calculateRiskScore(scenario);
          const linkedRisks = scenario.riskCategoryIds.map((id) => riskCategories.find((r) => r.id === id)).filter(Boolean);
          const linkedControls = scenario.controlIds.map((id) => controls.find((c) => c.id === id)).filter(Boolean);
          const linkedMetrics = scenario.metricIds.map((id) => monitoringMetrics.find((m) => m.id === id)).filter(Boolean);
          const scenarioAlerts = alerts.filter((a) => a.scenarioId === scenario.id);
          const openAlerts = scenarioAlerts.filter((a) => a.status !== 'resolved');

          const barColor = score.classification === 'critical' ? 'bg-primary-500' : score.classification === 'high' ? 'bg-primary-400' : score.classification === 'medium' ? 'bg-primary-400' : 'bg-primary-400';

          return (
            <div key={scenario.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              {/* Scenario Header */}
              <div className="border-b border-gray-100 p-6 dark:border-gray-800">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-primary-500/10 px-2 py-0.5 text-xs font-bold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">{scenario.id}</span>
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${CATEGORY_BADGE[scenario.category]}`}>
                        {CATEGORY_LABEL[scenario.category]}
                      </span>
                      <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${SEVERITY_COLORS[scenario.escalationLevel]}`}>
                        {isZh ? '上报等级' : 'Escalation'}: {scenario.escalationLevel.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold">{scenario.name}</h2>
                  </div>
                  {/* Risk Score Gauge */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold tabular-nums">{score.score}</span>
                      <span className="text-sm text-gray-400">/100</span>
                    </div>
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${SEVERITY_COLORS[score.classification]}`}>
                      {score.classification.toUpperCase()}
                    </span>
                    <div className="mt-2 w-24">
                      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${Math.min(score.score, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{scenario.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Risk Categories */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '识别风险' : 'Identified Risks'}</p>
                  <div className="space-y-1.5">
                    {linkedRisks.map((rc) => rc && (
                      <div key={rc.id} className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                        <p className="text-xs font-bold text-gray-500">{rc.id}</p>
                        <p className="text-xs leading-snug text-gray-600 dark:text-gray-300">{rc.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '管控措施' : 'Controls'}</p>
                  <div className="space-y-1.5">
                    {linkedControls.map((ct) => ct && (
                      <div key={ct.id} className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                        <p className="text-xs font-bold text-gray-500">{ct.id}</p>
                        <p className="text-xs leading-snug text-gray-600 dark:text-gray-300">{ct.name}</p>
                        <p className="mt-0.5 text-[10px] capitalize text-gray-400">{ct.type} · {ct.frequency}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '监控指标' : 'Metrics'}</p>
                  <div className="space-y-1.5">
                    {linkedMetrics.map((m) => m && (
                      <div key={m.id} className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-gray-500">{m.id}</p>
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${SEVERITY_COLORS[m.status as keyof typeof SEVERITY_COLORS] || ''}`}>{m.status}</span>
                        </div>
                        <p className="text-xs leading-snug text-gray-600 dark:text-gray-300">{m.name}</p>
                        <p className="mt-0.5 text-[10px] text-gray-400">{m.currentValue} / {m.threshold}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {isZh ? '活跃警报' : 'Active Alerts'} <span className="text-gray-300">({openAlerts.length})</span>
                  </p>
                  <div className="space-y-1.5">
                    {openAlerts.length === 0 && (
                      <p className="text-xs text-gray-400">{isZh ? '无活跃警报' : 'No active alerts'}</p>
                    )}
                    {openAlerts.slice(0, 3).map((a) => (
                      <div key={a.id} className="rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-gray-500">{a.id}</p>
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${SEVERITY_COLORS[a.severity as keyof typeof SEVERITY_COLORS] || ''}`}>{a.severity}</span>
                        </div>
                        <p className="text-xs leading-snug text-gray-600 dark:text-gray-300 line-clamp-2">{a.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score Breakdown + Generate Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>{isZh ? '基础分' : 'Base'}: <strong className="text-gray-600 dark:text-gray-300">{score.breakdown.baseScore}</strong></span>
                  <span>{isZh ? '警报加分' : 'Alert penalty'}: <strong className="text-primary-500">+{score.breakdown.alertPenalty}</strong></span>
                  <span>{isZh ? '管控扣分' : 'Control reduction'}: <strong className="text-primary-500">−{score.breakdown.controlCoverage}</strong></span>
                </div>
                <button
                  onClick={() => handleGenerate(scenario.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-600"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {isZh ? '生成评估报告' : 'Generate Assessment'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Memo Output */}
      {memo && (
        <div className="rounded-2xl border border-primary-500/20 bg-gray-50 dark:bg-gray-900/80">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <p className="text-sm font-semibold">
              {isZh ? '风险评估备忘录' : 'Risk Assessment Memo'} — {scenarios.find((s) => s.id === activeScenario)?.name}
            </p>
            <button
              onClick={handleCopy}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-white dark:border-gray-700 dark:text-gray-300"
            >
              {copied ? (isZh ? '已复制！' : 'Copied!') : (isZh ? '复制' : 'Copy')}
            </button>
          </div>
          <pre className="overflow-x-auto px-6 py-4 font-mono text-xs leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {memo}
          </pre>
        </div>
      )}
    </div>
  );
}
