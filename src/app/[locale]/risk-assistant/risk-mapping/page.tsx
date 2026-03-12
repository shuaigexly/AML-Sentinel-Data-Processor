'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  regulations, riskCategories, controls, monitoringMetrics,
  SEVERITY_COLORS,
} from '@/lib/riskAssistantData';

const BUSINESS_AREAS = ['all', 'merchant', 'transaction', 'compliance', 'operations'];

export default function RiskMappingPage() {
  const { locale } = useParams() as { locale: string };
  const isZh = locale === 'zh';
  const [filterArea, setFilterArea] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const AREA_LABEL: Record<string, string> = {
    all: isZh ? '全部' : 'All',
    merchant: isZh ? '商户' : 'Merchant',
    transaction: isZh ? '交易' : 'Transaction',
    compliance: isZh ? '合规' : 'Compliance',
    operations: isZh ? '运营' : 'Operations',
  };

  const SEV_LABEL = ['', 'L1', 'L2', 'L3', 'L4', 'L5'];
  const TYPE_BADGE: Record<string, string> = {
    preventive: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    detective: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    corrective: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  };

  const filteredRisks = filterArea === 'all'
    ? riskCategories
    : riskCategories.filter((r) => r.businessArea === filterArea);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-500">
          <span className="h-px w-6 bg-primary-500" />
          {isZh ? '风险管控映射' : 'Risk-Control Mapping'}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {isZh ? '法规 → 风险 → 管控 → 监控指标' : 'Regulation → Risk → Control → Metric'}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh ? '完整合规映射链路，帮助识别覆盖缺口。' : 'Full compliance mapping chain to identify coverage gaps and control effectiveness.'}
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {BUSINESS_AREAS.map((area) => (
          <button
            key={area}
            onClick={() => setFilterArea(area)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterArea === area
                ? 'bg-primary-500 text-white shadow-sm'
                : 'border border-gray-200 text-gray-500 hover:border-primary-500/50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400'
            }`}
          >
            {AREA_LABEL[area]}
          </button>
        ))}
      </div>

      {/* Mapping Cards */}
      <div className="space-y-3">
        {filteredRisks.map((rc) => {
          const isOpen = expanded === rc.id;
          const linkedControls = controls.filter((c) => c.riskCategoryIds.includes(rc.id));
          const linkedRegs = regulations.filter((r) => r.riskCategoryIds.includes(rc.id));
          const linkedMetrics = monitoringMetrics.filter((m) =>
            linkedControls.some((c) => m.controlIds.includes(c.id))
          );

          return (
            <div key={rc.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              <button
                onClick={() => setExpanded(isOpen ? null : rc.id)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-xs font-bold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                  {rc.id.replace('RC-', '')}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{rc.name}</span>
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${SEVERITY_COLORS[rc.severityWeight >= 4 ? 'high' : rc.severityWeight >= 3 ? 'medium' : 'low']}`}>
                      {SEV_LABEL[rc.severityWeight]} Weight {rc.severityWeight}/5
                    </span>
                  </div>
                  <div className="mt-1 flex gap-3 text-xs text-gray-400">
                    <span className="capitalize">{rc.businessArea}</span>
                    <span>·</span>
                    <span>{linkedRegs.length} {isZh ? '条法规' : 'regs'}</span>
                    <span>·</span>
                    <span>{linkedControls.length} {isZh ? '项管控' : 'controls'}</span>
                    <span>·</span>
                    <span>{linkedMetrics.length} {isZh ? '个指标' : 'metrics'}</span>
                  </div>
                </div>
                <svg className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 dark:border-gray-800">
                  <p className="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{rc.description}</p>

                  {/* Mapping chain */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* Regulations */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-500">
                        {isZh ? '对应法规' : 'Regulations'}
                      </p>
                      {linkedRegs.length > 0 ? linkedRegs.map((r) => (
                        <div key={r.id} className="mb-1.5 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2 dark:border-primary-900/30 dark:bg-primary-900/10">
                          <p className="text-xs font-bold text-primary-600">{r.id}</p>
                          <p className="text-xs text-primary-700 dark:text-primary-300 opacity-80">{r.title}</p>
                        </div>
                      )) : <p className="text-xs text-gray-400">{isZh ? '无直接法规' : 'No direct regulation'}</p>}
                    </div>

                    {/* Controls */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-500">
                        {isZh ? '管控措施' : 'Controls'}
                      </p>
                      {linkedControls.map((ct) => (
                        <div key={ct.id} className="mb-1.5 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2 dark:border-primary-900/30 dark:bg-primary-900/10">
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-primary-600">{ct.id}</p>
                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${TYPE_BADGE[ct.type]}`}>{ct.type}</span>
                          </div>
                          <p className="text-xs text-primary-700 dark:text-primary-300 opacity-80">{ct.name}</p>
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-500">
                        {isZh ? '监控指标' : 'Monitoring Metrics'}
                      </p>
                      {linkedMetrics.length > 0 ? linkedMetrics.map((m) => (
                        <div key={m.id} className="mb-1.5 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2 dark:border-primary-900/30 dark:bg-primary-900/10">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-primary-600">{m.id}</p>
                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${SEVERITY_COLORS[m.status as keyof typeof SEVERITY_COLORS] || ''}`}>{m.status}</span>
                          </div>
                          <p className="text-xs text-primary-700 dark:text-primary-300 opacity-80">{m.name}</p>
                          <p className="mt-0.5 text-[10px] text-gray-400">{m.currentValue} <span className="opacity-60">/ {m.threshold}</span></p>
                        </div>
                      )) : <p className="text-xs text-gray-400">{isZh ? '暂无监控指标' : 'No metrics linked'}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
