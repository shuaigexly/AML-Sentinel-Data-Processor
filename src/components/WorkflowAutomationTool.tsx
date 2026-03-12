'use client';

import { useState, useRef } from 'react';

type NodeStatus = 'idle' | 'running' | 'done' | 'waiting' | 'rejected' | 'skipped';

interface WorkflowNode {
  id: string;
  labelZh: string;
  labelEn: string;
  descZh: string;
  descEn: string;
  color: string;
  isHuman?: boolean;
  logLinesZh: string[];
  logLinesEn: string[];
  duration: number;
}

interface DocConfig {
  nameZh: string;
  nameEn: string;
  typeZh: string;
  typeEn: string;
  riskScore: number;
  riskLabelZh: string;
  riskLabelEn: string;
  riskColor: string;
}

const NODES: WorkflowNode[] = [
  {
    id: 'parse',
    labelZh: '文档解析', labelEn: 'Document Parsing',
    descZh: '提取文本、表格、附件元数据', descEn: 'Extract text, tables, attachment metadata',
    color: '#0d9488',
    logLinesZh: [
      '> parse_document({ format: "PDF", pages: 12 })',
      '  OK:文本提取完成  3,847 tokens',
      '  OK:表格检测: 4 张  附件: 2 个',
      '  OK:元数据解析完成',
    ],
    logLinesEn: [
      '> parse_document({ format: "PDF", pages: 12 })',
      '  OK:Text extracted  3,847 tokens',
      '  OK:Tables: 4  Attachments: 2',
      '  OK:Metadata parsed',
    ],
    duration: 1800,
  },
  {
    id: 'extract',
    labelZh: '风险抽取', labelEn: 'Risk Extraction',
    descZh: 'NER 识别关键风险项与实体', descEn: 'NER identifies risk items and entities',
    color: '#14b8a6',
    logLinesZh: [
      '> run_ner({ model: "fin_risk_ner_v2", doc_tokens: 3847 })',
      '  OK:实体识别: 法规引用 8 处  金额 12 处  日期 6 处',
      '> score_risk({ entities: 26, weighted: true })',
      '  OK:风险条目: 5 项  综合风险评分: 72/100',
    ],
    logLinesEn: [
      '> run_ner({ model: "fin_risk_ner_v2", doc_tokens: 3847 })',
      '  OK:Entities: reg_refs×8  amounts×12  dates×6',
      '> score_risk({ entities: 26, weighted: true })',
      '  OK:Risk items: 5  Composite score: 72/100',
    ],
    duration: 2200,
  },
  {
    id: 'match',
    labelZh: '政策匹配', labelEn: 'Policy Matching',
    descZh: '向量检索命中关联法规与控制点', descEn: 'Vector search against policy knowledge base',
    color: '#0f766e',
    logLinesZh: [
      '> vector_search({ query_embedding: [...], top_k: 5 })',
      '  OK:命中: PR-002（相似度 0.91）  PR-006（0.87）  PR-009（0.84）',
      '> check_thresholds({ risk_score: 72, threshold: 60 })',
      '  OK:风险分 72 > 阈值 60 → 触发人工审批节点',
    ],
    logLinesEn: [
      '> vector_search({ query_embedding: [...], top_k: 5 })',
      '  OK:Matched: PR-002(0.91)  PR-006(0.87)  PR-009(0.84)',
      '> check_thresholds({ risk_score: 72, threshold: 60 })',
      '  OK:Score 72 > threshold 60 → HUMAN_REVIEW triggered',
    ],
    duration: 1600,
  },
  {
    id: 'human',
    labelZh: '人工审批', labelEn: 'Human Review',
    descZh: '合规官确认高风险条款', descEn: 'Compliance officer reviews high-risk items',
    color: '#115e59',
    isHuman: true,
    logLinesZh: [
      '  [系统] 已暂停流水线，等待人工审批…',
      '  [系统] 高风险条款已推送至合规官工作台',
    ],
    logLinesEn: [
      '  [System] Pipeline paused — awaiting human review…',
      '  [System] High-risk items pushed to compliance officer',
    ],
    duration: 0,
  },
  {
    id: 'report',
    labelZh: '报告生成', labelEn: 'Report Generation',
    descZh: '输出结构化 JSON 合规报告', descEn: 'Output structured JSON compliance report',
    color: '#2dd4bf',
    logLinesZh: [
      '> generate_report({ format: "compliance_brief", lang: "zh-CN" })',
      '  OK:风险摘要: 5 项  建议: 3 条  引用法规: 3 部',
      '> export_json({ schema: "ComplianceReport_v2", include_citations: true })',
      '  OK:报告已生成  1,560 tokens  citations: [PR-002, PR-006, PR-009]',
    ],
    logLinesEn: [
      '> generate_report({ format: "compliance_brief", lang: "en-US" })',
      '  OK:Risk items: 5  Recommendations: 3  Cited regs: 3',
      '> export_json({ schema: "ComplianceReport_v2", include_citations: true })',
      '  OK:Report ready  1,560 tokens  [PR-002, PR-006, PR-009]',
    ],
    duration: 1800,
  },
];

const DOCS: DocConfig[] = [
  { nameZh: '跨境收单合作协议（草案）', nameEn: 'Cross-Border Acquiring Agreement (Draft)', typeZh: '合同文件', typeEn: 'Contract', riskScore: 72, riskLabelZh: '高风险', riskLabelEn: 'High Risk', riskColor: '#134e4a' },
  { nameZh: '新型商户准入申请表', nameEn: 'New Merchant Onboarding Form', typeZh: '申请表单', typeEn: 'Form', riskScore: 38, riskLabelZh: '低风险', riskLabelEn: 'Low Risk', riskColor: '#2dd4bf' },
  { nameZh: '备付金管理内部审查报告', nameEn: 'Reserve Fund Internal Audit Report', typeZh: '审计报告', typeEn: 'Audit', riskScore: 61, riskLabelZh: '中高风险', riskLabelEn: 'Medium-High', riskColor: '#0f766e' },
];

// ── SVG State Graph ────────────────────────────────────────
function StateGraph({
  statuses, isZh,
}: {
  statuses: Record<string, NodeStatus>;
  isZh: boolean;
}) {
  // Layout: horizontal for PARSE→EXTRACT→MATCH, then branch down to HUMAN, then REPORT
  // Simple linear for now with human node highlighted
  const nodeX = [55, 175, 295, 415, 535];
  const cy = 52;
  const r = 28;
  const labels = isZh
    ? ['文档\n解析', '风险\n抽取', '政策\n匹配', '人工\n审批', '报告\n生成']
    : ['Doc\nParse', 'Risk\nExtract', 'Policy\nMatch', 'Human\nReview', 'Report\nGen'];

  return (
    <div className="overflow-x-auto">
      <style>{`
        @keyframes wfDash { from{stroke-dashoffset:20} to{stroke-dashoffset:0} }
        @keyframes wfPulse { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
        @keyframes wfBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
      <svg viewBox="0 0 590 130" className="w-full min-w-[480px]" style={{ height: 130 }}>
        {/* Connectors */}
        {nodeX.slice(0, -1).map((x, i) => {
          const x1 = x + r + 2;
          const x2 = nodeX[i + 1] - r - 2;
          const upId = NODES[i].id;
          const downId = NODES[i + 1].id;
          const upStatus = statuses[upId] || 'idle';
          const downStatus = statuses[downId] || 'idle';
          const isLit = upStatus === 'done';
          const isFlowing = upStatus === 'done' && (downStatus === 'running' || downStatus === 'waiting');

          return (
            <g key={i}>
              <line x1={x1} y1={cy} x2={x2} y2={cy}
                stroke={isLit ? `${NODES[i + 1].color}40` : '#e5e7eb'}
                strokeWidth={3} strokeLinecap="round"
              />
              {isFlowing && (
                <line x1={x1} y1={cy} x2={x2} y2={cy}
                  stroke={NODES[i + 1].color} strokeWidth={3}
                  strokeDasharray="8 8" strokeLinecap="round"
                  style={{ animation: 'wfDash 0.5s linear infinite' }}
                />
              )}
              {isLit && !isFlowing && (
                <line x1={x1} y1={cy} x2={x2} y2={cy}
                  stroke={NODES[i + 1].color} strokeWidth={3}
                  strokeLinecap="round" opacity={0.7}
                />
              )}
              <polygon points={`${x2 + 7},${cy} ${x2},${cy - 5} ${x2},${cy + 5}`}
                fill={isLit ? NODES[i + 1].color : '#d1d5db'} opacity={isLit ? 1 : 0.5}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodeX.map((cx, i) => {
          const node = NODES[i];
          const status = statuses[node.id] || 'idle';
          const isRunning = status === 'running';
          const isDone = status === 'done';
          const isWaiting = status === 'waiting';
          const isRejected = status === 'rejected';
          const isHuman = node.isHuman;

          const fillColor = isDone ? node.color
            : isRejected ? '#134e4a'
            : isRunning || isWaiting ? `${node.color}22`
            : '#f3f4f6';
          const strokeColor = isDone || isRunning || isWaiting || isRejected ? node.color : '#e5e7eb';

          return (
            <g key={cx}>
              {/* Pulse ring */}
              {(isRunning || isWaiting) && (
                <circle cx={cx} cy={cy} r={r + 9} fill="none" stroke={node.color}
                  strokeWidth="2" opacity="0.35"
                  style={{ animation: isWaiting ? 'wfBlink 1s ease-in-out infinite' : 'wfPulse 1.2s ease-in-out infinite' }}
                />
              )}
              {/* Main circle — hexagon shape for human node */}
              {isHuman ? (
                <polygon
                  points={`${cx},${cy - r - 2} ${cx + r + 2},${cy - (r + 2) / 2} ${cx + r + 2},${cy + (r + 2) / 2} ${cx},${cy + r + 2} ${cx - r - 2},${cy + (r + 2) / 2} ${cx - r - 2},${cy - (r + 2) / 2}`}
                  fill={fillColor} stroke={strokeColor} strokeWidth={isWaiting ? 2.5 : 1.5}
                  style={{ transition: 'all 0.4s ease' }}
                />
              ) : (
                <circle cx={cx} cy={cy} r={r}
                  fill={fillColor} stroke={strokeColor}
                  strokeWidth={isRunning ? 2.5 : 1.5}
                  style={{ transition: 'all 0.4s ease' }}
                />
              )}

              {/* Icon */}
              <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize={isDone ? 14 : 13}
                fill={isDone ? 'white' : isRejected ? '#134e4a' : isRunning || isWaiting ? node.color : '#9ca3af'}
                style={{ transition: 'fill 0.3s' }}
              >
                {isRejected ? 'X' : isWaiting ? '?' : String(i + 1)}
              </text>

              {/* Step badge */}
              <circle cx={cx + r - 5} cy={cy - r + 5} r={7}
                fill={isDone || isRunning || isWaiting ? node.color : '#e5e7eb'}
                style={{ transition: 'fill 0.3s' }}
              />
              <text x={cx + r - 5} y={cy - r + 5} textAnchor="middle" dominantBaseline="middle"
                fontSize={7} fontWeight="800" fill="white"
              >{i + 1}</text>

              {/* Label (2 lines) */}
              {labels[i].split('\n').map((line, li) => (
                <text key={li} x={cx} y={cy + r + 13 + li * 10} textAnchor="middle" fontSize={8}
                  fontWeight={isDone || isRunning || isWaiting ? 700 : 400}
                  fill={isDone ? node.color : isRunning || isWaiting ? node.color : '#9ca3af'}
                  style={{ transition: 'fill 0.3s' }}
                >{line}</text>
              ))}
              {isWaiting && (
                <text x={cx} y={cy + r + 33} textAnchor="middle" fontSize={7}
                  fill={node.color} style={{ animation: 'wfBlink 1s ease-in-out infinite' }}
                >{isZh ? '等待审批…' : 'Awaiting…'}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function WorkflowAutomationTool({ isZh = true }: { isZh?: boolean }) {
  const [docIndex, setDocIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, NodeStatus>>({});
  const [logs, setLogs] = useState<Record<string, string[]>>({});
  const [running, setRunning] = useState(false);
  const [waitingHuman, setWaitingHuman] = useState(false);
  const [finished, setFinished] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const doc = DOCS[docIndex];
  const needsHuman = doc.riskScore >= 60;

  const reset = () => {
    setStatuses({});
    setLogs({});
    setRunning(false);
    setWaitingHuman(false);
    setFinished(false);
    setRejected(false);
    setElapsedMs(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const runNode = async (node: WorkflowNode, isZh: boolean) => {
    setStatuses((s) => ({ ...s, [node.id]: 'running' }));
    const lines = isZh ? node.logLinesZh : node.logLinesEn;
    for (let i = 0; i < lines.length; i++) {
      await new Promise((r) => setTimeout(r, 350 + i * 280));
      setLogs((l) => ({ ...l, [node.id]: [...(l[node.id] || []), lines[i]] }));
    }
    await new Promise((r) => setTimeout(r, node.duration));
    setStatuses((s) => ({ ...s, [node.id]: 'done' }));
  };

  const startWorkflow = async () => {
    reset();
    setRunning(true);
    startRef.current = Date.now();
    timerRef.current = setInterval(() => setElapsedMs(Date.now() - startRef.current), 100);

    // Run parse → extract → match
    for (const nodeId of ['parse', 'extract', 'match']) {
      const node = NODES.find((n) => n.id === nodeId)!;
      await runNode(node, isZh);
      await new Promise((r) => setTimeout(r, 300));
    }

    if (needsHuman) {
      // Pause for human review
      setStatuses((s) => ({ ...s, human: 'waiting' }));
      setLogs((l) => ({
        ...l,
        human: isZh ? NODES[3].logLinesZh : NODES[3].logLinesEn,
      }));
      setWaitingHuman(true);
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      // Skip human node, go to report
      setStatuses((s) => ({ ...s, human: 'skipped' }));
      await runReport();
    }
  };

  const runReport = async () => {
    const reportNode = NODES[4];
    await new Promise((r) => setTimeout(r, 400));
    setStatuses((s) => ({ ...s, report: 'running' }));
    const lines = isZh ? reportNode.logLinesZh : reportNode.logLinesEn;
    for (let i = 0; i < lines.length; i++) {
      await new Promise((r) => setTimeout(r, 400 + i * 300));
      setLogs((l) => ({ ...l, report: [...(l.report || []), lines[i]] }));
    }
    await new Promise((r) => setTimeout(r, reportNode.duration));
    setStatuses((s) => ({ ...s, report: 'done' }));
    if (timerRef.current) clearInterval(timerRef.current);
    setFinished(true);
    setRunning(false);
  };

  const handleApprove = async () => {
    setWaitingHuman(false);
    setStatuses((s) => ({ ...s, human: 'done' }));
    setRunning(true);
    startRef.current = Date.now() - elapsedMs;
    timerRef.current = setInterval(() => setElapsedMs(Date.now() - startRef.current), 100);
    await runReport();
  };

  const handleReject = () => {
    setWaitingHuman(false);
    setStatuses((s) => ({ ...s, human: 'rejected', report: 'skipped' }));
    setRejected(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const doneCount = Object.values(statuses).filter((s) => s === 'done').length;
  const progress = finished ? 100 : waitingHuman ? 70 : Math.min(95, (doneCount / NODES.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {isZh ? 'LangGraph · 状态机演示' : 'LangGraph · State Machine Demo'}
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {isZh ? '合规文档审查自动化工作流' : 'Compliance Document Review Workflow'}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {isZh
            ? '基于 LangGraph 状态机：文档解析 → 风险抽取 → 政策匹配 → 人工审批（Human-in-the-loop）→ 报告生成。'
            : 'LangGraph state machine: Doc Parsing → Risk Extraction → Policy Matching → Human-in-the-loop Review → Report Generation.'}
        </p>
      </div>

      {/* Document selector */}
      <div>
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          {isZh ? '选择待审查文档' : 'Select Document for Review'}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {DOCS.map((d, i) => (
            <button key={i} onClick={() => { reset(); setDocIndex(i); }}
              disabled={running || waitingHuman}
              className={`rounded-2xl border p-3.5 text-left transition-all disabled:opacity-40 ${
                docIndex === i
                  ? 'border-primary-500/40 bg-primary-500/6 shadow-sm'
                  : 'border-gray-100 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50'
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  {isZh ? d.typeZh : d.typeEn}
                </span>
                <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: d.riskColor + '18', color: d.riskColor }}>
                  {isZh ? d.riskLabelZh : d.riskLabelEn}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                {isZh ? d.nameZh : d.nameEn}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${d.riskScore}%`, background: d.riskColor }} />
                </div>
                <span className="text-[10px] font-bold" style={{ color: d.riskColor }}>{d.riskScore}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* State graph */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <StateGraph statuses={statuses} isZh={isZh} />
      </div>

      {/* Progress */}
      {(running || waitingHuman || finished || rejected) && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-gray-400">
            <span>{waitingHuman ? (isZh ? '⏸ 等待人工审批' : '⏸ Awaiting human review') : isZh ? '流水线进度' : 'Pipeline progress'}</span>
            <span className="font-mono">{elapsedMs > 0 ? `${(elapsedMs/1000).toFixed(1)}s` : ''}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: rejected ? '#134e4a' : 'linear-gradient(90deg, #0d9488, #2dd4bf)',
              }}
            />
          </div>
        </div>
      )}

      {/* Run button */}
      <div className="flex items-center gap-3">
        <button
          onClick={finished || rejected ? reset : startWorkflow}
          disabled={running || waitingHuman}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all hover:opacity-90 disabled:opacity-50"
        >
          {running ? (
            <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />{isZh ? '运行中…' : 'Running…'}</>
          ) : finished || rejected ? (isZh ? '重置' : 'Reset')
            : (isZh ? '启动工作流' : 'Run Workflow')}
        </button>
        {!waitingHuman && !finished && !rejected && doc.riskScore >= 60 && !running && Object.keys(statuses).length === 0 && (
          <span className="rounded-full border border-primary-300/50 bg-primary-50 px-3 py-1 text-[11px] font-semibold text-primary-800 dark:border-primary-800/30 dark:bg-primary-900/20 dark:text-primary-400">
            {isZh ? '风险分 ≥ 60，将触发人工审批节点' : 'Risk ≥ 60 — Human review will be triggered'}
          </span>
        )}
      </div>

      {/* Human-in-the-loop approval panel */}
      {waitingHuman && (
        <div className="rounded-2xl border-2 border-primary-400/50 bg-primary-50/70 p-5 dark:border-primary-700/30 dark:bg-primary-900/15">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15">
              <svg className="h-5 w-5 text-primary-700 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-primary-800 dark:text-primary-200">{isZh ? 'Human-in-the-loop · 等待人工审批' : 'Human-in-the-loop · Awaiting Review'}</p>
              <p className="text-xs text-primary-700/80 dark:text-primary-400/70">
                {isZh ? `文档风险评分 ${doc.riskScore}/100，超过阈值 60，需要合规官确认。` : `Document risk score ${doc.riskScore}/100 exceeds threshold 60 — requires compliance officer approval.`}
              </p>
            </div>
          </div>
          {/* Risk items */}
          <div className="mb-4 rounded-xl bg-white/70 p-3 dark:bg-gray-900/40">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{isZh ? '需确认风险条款' : 'Risk Items for Review'}</p>
            <div className="space-y-1.5">
              {(isZh ? [
                '跨境结算资金流向未明确披露收益所有人',
                '合同中缺少 SAFE《跨境外汇支付管理办法》合规声明',
                '备付金托管条款与 PBOC 最新规定存在差异',
              ] : [
                'Cross-border settlement: beneficial ownership not disclosed',
                'Missing SAFE Cross-Border FX compliance declaration',
                'Reserve fund custody clause deviates from latest PBOC rules',
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleApprove}
              className="flex-1 rounded-xl bg-primary-500 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
            >
              {isZh ? '审批通过，继续生成报告' : 'Approve — Generate Report'}
            </button>
            <button onClick={handleReject}
              className="flex-1 rounded-xl border-2 border-primary-300 bg-white py-2.5 text-sm font-bold text-primary-700 transition-all hover:bg-primary-50 dark:border-primary-800 dark:bg-transparent dark:text-primary-400"
            >
              {isZh ? '驳回，终止流程' : 'Reject — Terminate'}
            </button>
          </div>
        </div>
      )}

      {/* Rejection result */}
      {rejected && (
        <div className="rounded-2xl border border-primary-200/60 bg-primary-50/50 p-4 dark:border-primary-900/30 dark:bg-primary-900/10">
          <p className="font-semibold text-primary-800 dark:text-primary-400">
            {isZh ? '审批被驳回，工作流已终止。' : 'Review rejected — workflow terminated.'}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {isZh ? '合规官判定文档存在不可接受的风险，已记录驳回原因并通知申请方。' : 'Compliance officer determined unacceptable risk. Rejection logged and applicant notified.'}
          </p>
        </div>
      )}

      {/* Log panels */}
      {Object.keys(logs).length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">{isZh ? '节点执行日志' : 'Node Execution Logs'}</p>
          {NODES.filter((n) => logs[n.id]?.length > 0).map((node) => (
            <div key={node.id} className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5 border-b border-gray-100 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-900/40">
                <span className="h-2 w-2 rounded-full" style={{ background: node.color }} />
                <span className="text-xs font-semibold" style={{ color: node.color }}>{isZh ? node.labelZh : node.labelEn}</span>
                {statuses[node.id] === 'done' && <span className="ml-auto text-[10px] font-bold text-primary-500">{isZh ? '完成' : 'Done'}</span>}
                {statuses[node.id] === 'waiting' && <span className="ml-auto text-[10px] font-bold text-primary-500">{isZh ? '等待中' : 'Waiting'}</span>}
              </div>
              <div className="bg-gray-950 p-3 font-mono text-[11px] leading-relaxed">
                {logs[node.id].map((line, i) => (
                  <div key={i} className={line.startsWith('>') ? 'text-primary-300' : 'text-gray-500'}>{line}</div>
                ))}
                {statuses[node.id] === 'running' && (
                  <div className="flex items-center gap-1"><span className="text-primary-400">{'>'}</span><span className="inline-block h-3 w-1.5 animate-pulse bg-primary-400" /></div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Final report */}
      {finished && (
        <div className="relative overflow-hidden rounded-2xl border border-primary-200/50 bg-gradient-to-br from-primary-50/70 to-teal-50/30 p-5 dark:border-primary-900/30 dark:from-primary-900/15 dark:to-teal-900/8">
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary-400/6" />
          <div className="relative">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/15">
                <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="font-bold text-primary-800 dark:text-primary-200">{isZh ? '合规报告已生成' : 'Compliance Report Generated'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(isZh ? [
                { label: '风险条目', value: '5 项', color: '#134e4a' },
                { label: '建议措施', value: '3 条', color: '#115e59' },
                { label: '引用法规', value: '3 部', color: '#0d9488' },
                { label: '总用时', value: `${(elapsedMs/1000).toFixed(1)}s`, color: '#0f766e' },
              ] : [
                { label: 'Risk Items', value: '5', color: '#134e4a' },
                { label: 'Recommendations', value: '3', color: '#115e59' },
                { label: 'Cited Regs', value: '3', color: '#0d9488' },
                { label: 'Total Time', value: `${(elapsedMs/1000).toFixed(1)}s`, color: '#0f766e' },
              ]).map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/60 p-3 text-center dark:bg-gray-900/40">
                  <p className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[11px] font-semibold text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
