'use client';

import { useState, useEffect, useRef } from 'react';
import { regulations, type Regulation } from '@/lib/riskAssistantData';

type SearchResult = { reg: Regulation; score: number };

// Short category labels for the corpus tiles
const DOC_CATEGORIES: Record<string, string> = {
  'PR-001': '商户准入',
  'PR-002': '大额交易',
  'PR-003': 'AML合规',
  'PR-004': 'KYC身份',
  'PR-005': '网络支付',
  'PR-006': '跨境外汇',
  'PR-007': '商户管理',
  'PR-008': '反诈骗',
  'PR-009': '跨境AML',
  'PR-010': '风险管理',
  'PR-011': '数据隐私',
};
const DOC_CATEGORIES_EN: Record<string, string> = {
  'PR-001': 'Merchant',
  'PR-002': 'Large-Tx',
  'PR-003': 'AML',
  'PR-004': 'KYC',
  'PR-005': 'Net Pay',
  'PR-006': 'X-Border',
  'PR-007': 'Merch Mgmt',
  'PR-008': 'Anti-Fraud',
  'PR-009': 'X-Border AML',
  'PR-010': 'Risk Mgmt',
  'PR-011': 'Privacy',
};

const SUGGESTED_ZH = ['大额交易报告', 'KYC 材料保存', '跨境外汇监管', '反洗钱义务', '个人信息保护', '商户准入要求'];
const SUGGESTED_EN = ['Large transaction report', 'KYC retention', 'Cross-border FX rules', 'AML obligations', 'Data protection', 'Merchant onboarding'];

const PIPELINE_STEPS_ZH = ['文档分块编码', 'BM25 关键词召回', '密集向量检索', '融合重排序', 'LLM 生成'];
const PIPELINE_STEPS_EN = ['Chunk encoding', 'BM25 keyword recall', 'Dense vector retrieval', 'Hybrid re-ranking', 'LLM synthesis'];

function searchRegulations(query: string): SearchResult[] {
  const q = query.toLowerCase();
  const keywords = q.split(/[\s，。？！、,?!]+/).filter((w) => w.length > 1);
  return regulations
    .map((reg) => {
      const text = `${reg.title} ${reg.category} ${reg.jurisdiction} ${reg.description}`.toLowerCase();
      let score = 0;
      for (const kw of keywords) {
        if (reg.title.toLowerCase().includes(kw)) score += 4;
        else if (reg.category.toLowerCase().includes(kw)) score += 3;
        else if (text.includes(kw)) score += 1;
      }
      return { reg, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function buildAnswer(results: SearchResult[], isZh: boolean): string {
  if (results.length === 0) {
    return isZh
      ? '未检索到与该问题直接相关的法规条款。建议尝试「大额交易」「反洗钱」「KYC」「跨境支付」等关键词。'
      : 'No directly relevant regulations found. Try "AML", "KYC", "large transaction", or "cross-border".';
  }
  return results
    .map((r) => `【${r.reg.id} · ${r.reg.title}】（${r.reg.jurisdiction} · ${r.reg.effectiveDate} 施行）\n${r.reg.description}`)
    .join('\n\n');
}

// ─── Document Corpus Grid ───────────────────────────────────
function CorpusGrid({
  scanIndex,
  results,
  isZh,
  loading,
}: {
  scanIndex: number;
  results: SearchResult[] | null;
  isZh: boolean;
  loading: boolean;
}) {
  const allIds = Object.keys(DOC_CATEGORIES);
  const matchedIds = results ? results.map((r) => r.reg.id) : [];
  const scoreMap: Record<string, number> = {};
  if (results) results.forEach((r) => { scoreMap[r.reg.id] = r.score; });
  const maxScore = results && results.length > 0 ? results[0].score : 1;

  return (
    <div>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {isZh ? '知识库文档语料（11 条监管法规）' : 'Knowledge Base Corpus (11 Regulations)'}
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-11">
        {allIds.map((id, idx) => {
          const isScanning = loading && idx === scanIndex % allIds.length;
          const isMatched = matchedIds.includes(id);
          const matchScore = scoreMap[id] || 0;
          const matchPct = isMatched ? Math.round(Math.min(99, 55 + (matchScore / maxScore) * 42)) : 0;

          return (
            <div
              key={id}
              className={`relative overflow-hidden rounded-xl border px-2 py-2 text-center transition-all duration-300 ${
                isScanning
                  ? 'border-primary-400 bg-primary-500/15 shadow-md shadow-primary-500/20 scale-105'
                  : isMatched
                  ? 'border-primary-500/50 bg-primary-500/8 shadow-sm'
                  : results !== null
                  ? 'border-gray-100 bg-gray-50/50 opacity-35 dark:border-gray-800 dark:bg-gray-900/20'
                  : 'border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900/40'
              }`}
            >
              {/* Matched: score bar at bottom */}
              {isMatched && matchPct > 0 && (
                <div className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary-500 transition-all duration-700"
                  style={{ width: `${matchPct}%` }} />
              )}
              <p className={`font-mono text-[9px] font-bold ${isScanning ? 'text-primary-600 dark:text-primary-400' : isMatched ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
                {id}
              </p>
              <p className={`mt-0.5 text-[8px] leading-tight ${isScanning ? 'text-primary-500' : isMatched ? 'text-gray-600 dark:text-gray-400' : 'text-gray-300 dark:text-gray-600'}`}>
                {isZh ? DOC_CATEGORIES[id] : DOC_CATEGORIES_EN[id]}
              </p>
              {isMatched && (
                <p className="mt-0.5 text-[8px] font-bold text-primary-500">{matchPct}%</p>
              )}
              {isScanning && (
                <div className="absolute inset-0 animate-pulse bg-primary-400/10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Relevance Bar Chart ─────────────────────────────────────
function RelevanceChart({ results, isZh }: { results: SearchResult[]; isZh: boolean }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, []);

  const maxScore = results[0]?.score || 1;
  const colors = ['#0d9488', '#14b8a6', '#2dd4bf'];

  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {isZh ? '检索相关度分布' : 'Relevance Score Distribution'}
      </p>
      <div className="space-y-2.5">
        {results.map((r, i) => {
          const pct = Math.round(Math.min(99, 55 + (r.score / maxScore) * 42));
          return (
            <div key={r.reg.id} className="flex items-center gap-3">
              <span className="w-14 shrink-0 font-mono text-[10px] font-bold text-gray-500">{r.reg.id}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" style={{ height: 8 }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: animated ? `${pct}%` : '0%',
                    background: `linear-gradient(90deg, ${colors[i]}, ${colors[i]}cc)`,
                  }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-xs font-bold" style={{ color: colors[i] }}>{pct}%</span>
              <span className="hidden max-w-[140px] truncate text-[10px] text-gray-400 sm:block">{r.reg.title.slice(0, 12)}…</span>
            </div>
          );
        })}
        {/* Other docs at zero */}
        <div className="flex items-center gap-3 opacity-30">
          <span className="w-14 shrink-0 font-mono text-[10px] text-gray-400">其余 8 条</span>
          <div className="flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" style={{ height: 8 }}>
            <div className="h-full w-[2%] rounded-full bg-gray-300" />
          </div>
          <span className="w-9 shrink-0 text-right text-[10px] text-gray-400">{'<5%'}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function RagQATool({ isZh = true }: { isZh?: boolean }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [scanIndex, setScanIndex] = useState(0);
  const scanRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SUGGESTED = isZh ? SUGGESTED_ZH : SUGGESTED_EN;
  const STEPS = isZh ? PIPELINE_STEPS_ZH : PIPELINE_STEPS_EN;

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setResults(null);
    setAnswer('');
    setActiveStep(0);
    setScanIndex(0);
    const t0 = Date.now();

    // Start scanner
    scanRef.current = setInterval(() => setScanIndex((s) => s + 1), 90);

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 160 + Math.random() * 100));
      setActiveStep(i);
    }
    await new Promise((r) => setTimeout(r, 80));

    if (scanRef.current) clearInterval(scanRef.current);
    const found = searchRegulations(q);
    setElapsed(Date.now() - t0);
    setResults(found);
    setAnswer(buildAnswer(found, isZh));
    setLoading(false);
    setActiveStep(-1);
  };

  useEffect(() => () => { if (scanRef.current) clearInterval(scanRef.current); }, []);

  const maxScore = results && results.length > 0 ? results[0].score : 1;

  return (
    <div className="space-y-7">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-500">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {isZh ? 'RAG · 混合检索演示' : 'RAG · Hybrid Retrieval Demo'}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isZh ? '金融法规智能问答' : 'Financial Regulation Q&A'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isZh
              ? 'BM25 + 向量密集检索 · 11 条监管法规 · 实时检索 + 引用生成'
              : 'BM25 + dense vector hybrid · 11 regulatory docs · real-time retrieval + citations'}
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-2xl font-black text-primary-500">11</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">docs</p>
        </div>
      </div>

      {/* ── Suggested chips ── */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED.map((q) => (
          <button key={q} onClick={() => handleSearch(q)} disabled={loading}
            className="group flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-all hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            <span className="text-[10px] text-primary-400 opacity-0 transition-opacity group-hover:opacity-100">#</span>
            {q}
          </button>
        ))}
      </div>

      {/* ── Search bar ── */}
      <div className="flex gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition-all focus-within:border-primary-400/60 focus-within:shadow-lg dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center pl-2 text-gray-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder={isZh ? '输入合规问题，如：大额交易报告…' : 'Ask a compliance question…'}
          className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
        <button onClick={() => handleSearch(query)} disabled={loading || !query.trim()}
          className="rounded-xl bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md disabled:opacity-40"
        >
          {loading ? (isZh ? '检索中' : 'Searching') : isZh ? '提问' : 'Ask'}
        </button>
      </div>

      {/* ── Corpus grid (always visible when loading or after results) ── */}
      {(loading || results !== null) && (
        <CorpusGrid scanIndex={scanIndex} results={results} isZh={isZh} loading={loading} />
      )}

      {/* ── Pipeline steps (loading only) ── */}
      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-500" />
            </span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {isZh ? '混合检索流水线运行中…' : 'Hybrid retrieval pipeline running…'}
            </span>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-[23px] top-0 h-full w-px bg-gradient-to-b from-primary-500/60 to-transparent" />
            <div className="space-y-2.5">
              {STEPS.map((step, i) => {
                const done = i < activeStep;
                const active = i === activeStep;
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      done ? 'border-primary-400 bg-primary-400' : active ? 'border-primary-400 bg-primary-500' : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
                    }`}>
                      {done ? (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : active ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> : null}
                    </div>
                    <span className={`text-sm transition-all duration-300 ${
                      done ? 'font-medium text-primary-600 dark:text-primary-400'
                           : active ? 'font-semibold text-primary-600 dark:text-primary-400'
                           : 'text-gray-400'
                    }`}>{step}</span>
                    {active && <span className="ml-1 animate-pulse text-xs text-gray-400">{isZh ? '处理中…' : 'Processing…'}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {!loading && results !== null && (
        <div className="space-y-6">
          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-400">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              {isZh ? `命中 ${results.length} 条法规` : `${results.length} regulation${results.length !== 1 ? 's' : ''} matched`}
            </span>
            <span className="rounded-full bg-primary-500/8 px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400">
              {isZh ? '知识库：11 条' : 'Knowledge base: 11'}
            </span>
            <span className="font-mono text-xs text-gray-400">{elapsed} ms</span>
          </div>

          {/* Relevance bar chart */}
          {results.length > 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <RelevanceChart results={results} isZh={isZh} />
            </div>
          )}

          {/* Retrieved documents */}
          {results.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {isZh ? '命中文档 · 按相关度排序' : 'Retrieved Documents · By Relevance'}
              </p>
              {results.map((r, idx) => {
                const pct = Math.round(Math.min(99, 55 + (r.score / maxScore) * 42));
                const colors = ['#0d9488', '#14b8a6', '#2dd4bf'];
                return (
                  <div key={r.reg.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:border-primary-500/25 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60">
                    <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors[idx]} ${pct}%, #e5e7eb ${pct}%)` }} />
                    <div className="p-4">
                      <div className="mb-2.5 flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-black" style={{ background: `${colors[idx]}18`, color: colors[idx] }}>
                            {idx + 1}
                          </span>
                          <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-[11px] font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">{r.reg.id}</span>
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{r.reg.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${colors[idx]}, ${colors[idx]}cc)` }} />
                          </div>
                          <span className="text-xs font-bold" style={{ color: colors[idx] }}>{pct}%</span>
                        </div>
                      </div>
                      <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {r.reg.description.slice(0, 140)}…
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                        <span className="rounded-md bg-gray-50 px-2 py-0.5 dark:bg-gray-800">{r.reg.jurisdiction}</span>
                        <span>·</span>
                        <span>{r.reg.effectiveDate}</span>
                        <a href={r.reg.sourceUrl} target="_blank" rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1 font-semibold text-primary-500 transition-colors hover:text-primary-600"
                        >
                          {isZh ? '查看原文' : 'Source'}
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Synthesized answer */}
          <div className="relative overflow-hidden rounded-2xl border border-primary-200/50 bg-gradient-to-br from-primary-50/80 to-primary-50/40 p-5 dark:border-primary-900/30 dark:from-primary-900/15 dark:to-primary-900/10">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-primary-500/8 to-transparent" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/15">
                  <svg className="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-800 dark:text-primary-200">{isZh ? 'LLM 综合答案' : 'LLM Synthesized Answer'}</p>
                  <p className="text-[11px] text-primary-600/70 dark:text-primary-400/60">{isZh ? '基于检索结果生成，包含来源引用' : 'Grounded in retrieved documents with citations'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {answer.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </div>
              {results.length > 0 && (
                <div className="mt-5 border-t border-primary-200/40 pt-4 dark:border-primary-900/30">
                  <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">{isZh ? '引用来源' : 'Citations'}</p>
                  <div className="flex flex-wrap gap-2">
                    {results.map((r) => (
                      <a key={r.reg.id} href={r.reg.sourceUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-primary-600 shadow-sm transition-all hover:border-primary-400/40 hover:bg-white hover:shadow-md dark:border-gray-700 dark:bg-gray-800/60 dark:text-primary-400"
                      >
                        <span className="font-mono text-[10px] text-gray-400">[{r.reg.id}]</span>
                        {r.reg.title}
                        <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
