'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { regulations, riskCategories, controls, STATUS_COLORS } from '@/lib/riskAssistantData';

const CATEGORIES = Array.from(new Set(regulations.map((r) => r.category)));

export default function RegulationsPage() {
  const { locale } = useParams() as { locale: string };
  const isZh = locale === 'zh';
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = regulations.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || r.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-500">
          <span className="h-px w-6 bg-primary-500" />
          {isZh ? '法规库' : 'Regulation Library'}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {isZh ? '内部政策与监管要求' : 'Internal Policies & Regulatory Requirements'}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh ? `共 ${regulations.length} 条法规要求，覆盖商户风险、AML合规、数据安全等领域。` : `${regulations.length} policy requirements covering merchant risk, AML compliance, data security, and more.`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder={isZh ? '搜索法规...' : 'Search regulations...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 min-w-[200px] rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          <option value="all">{isZh ? '全部分类' : 'All Categories'}</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="flex h-9 items-center text-xs text-gray-400">{filtered.length} {isZh ? '条' : 'results'}</span>
      </div>

      {/* Regulation List */}
      <div className="space-y-3">
        {filtered.map((reg) => {
          const isOpen = expanded === reg.id;
          const linkedRisks = reg.riskCategoryIds.map((id) => riskCategories.find((r) => r.id === id)).filter(Boolean);
          const linkedControls = reg.controlIds.map((id) => controls.find((c) => c.id === id)).filter(Boolean);

          return (
            <div key={reg.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
              <button
                onClick={() => setExpanded(isOpen ? null : reg.id)}
                className="flex w-full items-start gap-4 p-5 text-left"
              >
                <span className="mt-0.5 shrink-0 rounded-lg bg-primary-500/10 px-2 py-1 text-xs font-bold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                  {reg.id}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{reg.title}</span>
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[reg.status as keyof typeof STATUS_COLORS]}`}>
                      {reg.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-400">
                    <span>{reg.jurisdiction}</span>
                    <span>·</span>
                    <span>{reg.category}</span>
                    <span>·</span>
                    <span>{isZh ? '生效' : 'Effective'}: {reg.effectiveDate}</span>
                  </div>
                </div>
                <svg className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 dark:border-gray-800">
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{reg.description}</p>

                  {/* 来源引用 */}
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-primary-100 bg-primary-50 px-3 py-2 dark:border-primary-900/30 dark:bg-primary-900/10">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-primary-700 dark:text-primary-400">{isZh ? '法规文号：' : 'Source Ref: '}</span>
                      <span className="text-xs text-primary-700 dark:text-primary-400">{reg.sourceRef}</span>
                      <span className="mx-2 text-primary-300">·</span>
                      <a
                        href={reg.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-primary-600 underline underline-offset-2 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        {isZh ? '查看原文 →' : 'View Source →'}
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '关联风险类别' : 'Linked Risk Categories'}</p>
                      <div className="space-y-1.5">
                        {linkedRisks.map((rc) => rc && (
                          <div key={rc.id} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                            <span className="text-xs font-bold text-gray-500">{rc.id}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-300">{rc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{isZh ? '对应管控措施' : 'Applicable Controls'}</p>
                      <div className="space-y-1.5">
                        {linkedControls.map((ct) => ct && (
                          <div key={ct.id} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
                            <span className="text-xs font-bold text-gray-500">{ct.id}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-300">{ct.name}</span>
                          </div>
                        ))}
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
          <p className="text-sm">{isZh ? '未找到匹配的法规。' : 'No regulations match your search.'}</p>
        </div>
      )}
    </div>
  );
}
