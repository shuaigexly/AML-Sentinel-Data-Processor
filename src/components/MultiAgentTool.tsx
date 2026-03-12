'use client';

import { useState, useRef, useEffect } from 'react';

type AgentStatus = 'idle' | 'running' | 'done';

interface ToolCall {
  type: 'call' | 'response';
  text: string;
  delay: number;
}

interface AgentDef {
  id: string;
  nameZh: string;
  nameEn: string;
  roleZh: string;
  roleEn: string;
  accentColor: string;
  icon: string;
  toolCalls: ToolCall[];
  duration: number;
}

interface Topic {
  labelZh: string;
  labelEn: string;
  agents: AgentDef[];
  reportZh: string;
  reportEn: string;
  metricsZh: { label: string; value: string; color: string }[];
  metricsEn: { label: string; value: string; color: string }[];
}

const TOPICS: Topic[] = [
  {
    labelZh: '支付宝 Q3 合规风险',
    labelEn: 'Alipay Q3 Compliance Risk',
    metricsZh: [
      { label: '风险评分', value: '67/100', color: '#115e59' },
      { label: 'AML 标记', value: '3 项', color: '#134e4a' },
      { label: '大额交易', value: '1,204 笔', color: '#0d9488' },
      { label: '跨境规模', value: '¥28.7B', color: '#14b8a6' },
    ],
    metricsEn: [
      { label: 'Risk Score', value: '67/100', color: '#115e59' },
      { label: 'AML Flags', value: '3 items', color: '#134e4a' },
      { label: 'Large-Tx', value: '1,204', color: '#0d9488' },
      { label: 'X-Border', value: '¥28.7B', color: '#14b8a6' },
    ],
    agents: [
      {
        id: 'supervisor', nameZh: '监督 Agent', nameEn: 'Supervisor', icon: '◎',
        roleZh: '任务拆解 & 调度', roleEn: 'Orchestration', accentColor: '#0d9488',
        toolCalls: [
          { type: 'call', text: '> decompose_task({ topic: "Alipay Q3 compliance", subtasks: 3 })', delay: 300 },
          { type: 'response', text: '  OK:Dispatching → data_collect · risk_analysis · report_gen', delay: 900 },
        ],
        duration: 1400,
      },
      {
        id: 'data', nameZh: '数据 Agent', nameEn: 'Data Collector', icon: '⬇',
        roleZh: '监管公告抓取', roleEn: 'Filing scraping', accentColor: '#14b8a6',
        toolCalls: [
          { type: 'call', text: '> fetch_regulatory_filings({ issuer:"Alipay", q:"2024Q3", src:["PBOC","SAFE"] })', delay: 200 },
          { type: 'response', text: '  OK:14 filings  ·  PBOC×8  SAFE×6', delay: 1100 },
          { type: 'call', text: '> extract_metrics({ fields:["AML_flags","large_tx","cross_border_vol"] })', delay: 1400 },
          { type: 'response', text: '  OK:AML:3  large_tx:1204  x-border:¥28.7B', delay: 2200 },
        ],
        duration: 3000,
      },
      {
        id: 'analysis', nameZh: '分析 Agent', nameEn: 'Quant Analyst', icon: '◈',
        roleZh: '风险评分 & 趋势', roleEn: 'Scoring & trends', accentColor: '#0f766e',
        toolCalls: [
          { type: 'call', text: '> run_risk_model({ model:"composite_v3", aml:3, large_tx:1204 })', delay: 300 },
          { type: 'response', text: '  OK:score: 67/100  (MEDIUM-HIGH)', delay: 1200 },
          { type: 'call', text: '> detect_anomalies({ series:"cross_border_vol", window:"90d" })', delay: 1500 },
          { type: 'response', text: '  OK:Sep-24 spike +34% vs 90d MA  [ALERT]', delay: 2300 },
          { type: 'call', text: '> compare_peers({ peers:["WeChat Pay","UnionPay"], metric:"aml_rate" })', delay: 2600 },
          { type: 'response', text: '  OK:Alipay 0.24‰  peers avg 0.18‰  (+33%)', delay: 3400 },
        ],
        duration: 4000,
      },
      {
        id: 'report', nameZh: '报告 Agent', nameEn: 'Report Writer', icon: '',
        roleZh: '结构化输出', roleEn: 'Structured output', accentColor: '#115e59',
        toolCalls: [
          { type: 'call', text: '> synthesize({ score:67, anomalies:["x-border_spike"], peer_delta:"+33%" })', delay: 200 },
          { type: 'response', text: '  OK:5 risk items · 2 recommendations', delay: 900 },
          { type: 'call', text: '> generate_report({ format:"executive_brief", citations:true })', delay: 1200 },
          { type: 'response', text: '  OK:Report ready · 1,240 tokens · [PBOC-2024-08, SAFE-2024-11]', delay: 2100 },
        ],
        duration: 2500,
      },
    ],
    reportZh: `综合风险评分：67/100（中高风险）\n\n2024Q3 跨境支付量较 90 日均值激增 34%（9 月异常峰值），触发监管预警。大额交易 1,204 笔，AML 标记率 0.24‰，高于同业 33%。\n\n建议：溯源 9 月跨境业务，核查《跨境外汇支付业务管理办法》申报义务；将 AML 监控颗粒度提升至行业均值 0.18‰ 以下。`,
    reportEn: `Risk Score: 67/100 (Medium-High)\n\nCross-border volume surged 34% above 90d MA in Sep-2024. 1,204 large-tx events; AML rate 0.24‰ (+33% vs peers).\n\nRecommendations: Trace Sep cross-border flows for SAFE reporting obligations; improve AML granularity below peer avg 0.18‰.`,
  },
  {
    labelZh: 'FinTech 贷款风险',
    labelEn: 'FinTech Lending Risk',
    metricsZh: [
      { label: '模型 AUC', value: '0.847', color: '#0f766e' },
      { label: 'KS 统计量', value: '0.412', color: '#0d9488' },
      { label: 'NPL 率', value: '4.7%', color: '#134e4a' },
      { label: '样本量', value: '48,312', color: '#14b8a6' },
    ],
    metricsEn: [
      { label: 'Model AUC', value: '0.847', color: '#0f766e' },
      { label: 'KS Stat', value: '0.412', color: '#0d9488' },
      { label: 'NPL Rate', value: '4.7%', color: '#134e4a' },
      { label: 'Sample n', value: '48,312', color: '#14b8a6' },
    ],
    agents: [
      {
        id: 'supervisor', nameZh: '监督 Agent', nameEn: 'Supervisor', icon: '◎',
        roleZh: '任务拆解 & 调度', roleEn: 'Orchestration', accentColor: '#0d9488',
        toolCalls: [
          { type: 'call', text: '> decompose_task({ topic:"FinTech lending", subtasks:["data","credit_model","report"] })', delay: 300 },
          { type: 'response', text: '  OK:Sequential execution mode initialized.', delay: 800 },
        ],
        duration: 1200,
      },
      {
        id: 'data', nameZh: '数据 Agent', nameEn: 'Data Collector', icon: '⬇',
        roleZh: '借款人画像抓取', roleEn: 'Borrower data', accentColor: '#14b8a6',
        toolCalls: [
          { type: 'call', text: '> pull_profiles({ n:50000, fields:["income","dti","bureau_score"] })', delay: 200 },
          { type: 'response', text: '  OK:48,312 profiles loaded  missing:3.4%', delay: 1300 },
          { type: 'call', text: '> fetch_repayment_history({ lookback_days:180 })', delay: 1600 },
          { type: 'response', text: '  OK:Sequences ready  NPL: 4.7%', delay: 2400 },
        ],
        duration: 3000,
      },
      {
        id: 'analysis', nameZh: '分析 Agent', nameEn: 'Quant Analyst', icon: '◈',
        roleZh: '信用评分建模', roleEn: 'Credit scoring', accentColor: '#0f766e',
        toolCalls: [
          { type: 'call', text: '> train_model({ algo:"XGBoost", target:"default_90d" })', delay: 400 },
          { type: 'response', text: '  OK:AUC:0.847  KS:0.412', delay: 1600 },
          { type: 'call', text: '> segment_risk({ bins:[0.05,0.15,0.30] })', delay: 1900 },
          { type: 'response', text: '  OK:Low 42%  Med 35%  High 17%  VHigh 6%', delay: 2700 },
        ],
        duration: 3500,
      },
      {
        id: 'report', nameZh: '报告 Agent', nameEn: 'Report Writer', icon: '',
        roleZh: '风险报告输出', roleEn: 'Risk report', accentColor: '#115e59',
        toolCalls: [
          { type: 'call', text: '> generate_credit_report({ auc:0.847, npl:0.047, segments:4 })', delay: 300 },
          { type: 'response', text: '  OK:Credit report compiled · Policy updated.', delay: 1200 },
        ],
        duration: 2000,
      },
    ],
    reportZh: `信用风险评估\n\nXGBoost 模型 AUC=0.847，KS=0.412，优于行业基准。NPL（90天）4.7%。\n\n风险分布：低 42% · 中 35% · 高 17% · 极高 6%。建议对极高风险客群限额 ≤¥5,000 并触发人工复核。`,
    reportEn: `Credit Risk Assessment\n\nXGBoost AUC=0.847, KS=0.412 — outperforms benchmark. NPL 4.7%.\n\nRisk split: Low 42% · Med 35% · High 17% · VHigh 6%. Limit Very-High to ≤¥5,000 with manual review.`,
  },
  {
    labelZh: '跨境 AML 调查',
    labelEn: 'Cross-Border AML',
    metricsZh: [
      { label: 'ML 风险评分', value: '94/100', color: '#134e4a' },
      { label: '图谱节点', value: '8,342', color: '#0f766e' },
      { label: 'OFAC 匹配', value: '2 项', color: '#115e59' },
      { label: '可疑集群', value: '4 个', color: '#14b8a6' },
    ],
    metricsEn: [
      { label: 'ML Score', value: '94/100', color: '#134e4a' },
      { label: 'Graph Nodes', value: '8,342', color: '#0f766e' },
      { label: 'OFAC Hits', value: '2 items', color: '#115e59' },
      { label: 'Sus. Clusters', value: '4', color: '#14b8a6' },
    ],
    agents: [
      {
        id: 'supervisor', nameZh: '监督 Agent', nameEn: 'Supervisor', icon: '◎',
        roleZh: '高优先级调度', roleEn: 'Priority: HIGH', accentColor: '#0d9488',
        toolCalls: [
          { type: 'call', text: '> decompose_task({ topic:"AML", priority:"HIGH" })', delay: 200 },
          { type: 'response', text: '  OK:AML pipeline launched. Priority: HIGH.', delay: 700 },
        ],
        duration: 1100,
      },
      {
        id: 'data', nameZh: '数据 Agent', nameEn: 'Data Collector', icon: '⬇',
        roleZh: '交易图谱构建', roleEn: 'Tx graph build', accentColor: '#14b8a6',
        toolCalls: [
          { type: 'call', text: '> build_tx_graph({ window:"2024Q3", min_amt:50000, ccy:["USD","HKD","EUR"] })', delay: 300 },
          { type: 'response', text: '  OK:8,342 nodes · 21,067 edges · clusters:4', delay: 1400 },
          { type: 'call', text: '> screen_entities({ lists:["OFAC_SDN","UN","PBOC_BL"], threshold:0.85 })', delay: 1700 },
          { type: 'response', text: '  OK:2 OFAC matches (0.91, 0.88)  [FLAGGED]', delay: 2600 },
        ],
        duration: 3200,
      },
      {
        id: 'analysis', nameZh: '分析 Agent', nameEn: 'Quant Analyst', icon: '◈',
        roleZh: '分层模式检测', roleEn: 'Layering detect', accentColor: '#0f766e',
        toolCalls: [
          { type: 'call', text: '> detect_layering({ clusters:["C001"..."C004"], patterns:["structuring","fan_out","round_trip"] })', delay: 400 },
          { type: 'response', text: '  OK:C003: fan-out+round-trip  7 hops  [CONFIRMED]', delay: 1500 },
          { type: 'call', text: '> compute_ml_risk({ entity:"C003", model:"aml_graph_v2" })', delay: 1800 },
          { type: 'response', text: '  OK:score:94/100  CRITICAL → SAR filing recommended', delay: 2700 },
        ],
        duration: 3500,
      },
      {
        id: 'report', nameZh: '报告 Agent', nameEn: 'Report Writer', icon: '',
        roleZh: 'SAR 草稿生成', roleEn: 'SAR draft', accentColor: '#115e59',
        toolCalls: [
          { type: 'call', text: '> draft_sar({ entity:"C003", score:94, template:"PBOC_STR_v4" })', delay: 300 },
          { type: 'response', text: '  OK:SAR done · Deadline T+3 business days (PBOC)', delay: 1400 },
        ],
        duration: 2200,
      },
    ],
    reportZh: `AML 调查（机密）\n\nC003 确认为分层洗钱（fan-out + round-trip，7 跳），ML 评分 94/100（极高危）。2 项 OFAC SDN 匹配（0.91/0.88），已冻结账户。\n\n行动：T+3 工作日内向 PBOC 提交 STR；OFAC 匹配实体提请法律复核，考虑启动主动披露。`,
    reportEn: `AML Investigation (Confidential)\n\nC003 confirmed layering (fan-out+round-trip, 7 hops), ML score 94/100 (CRITICAL). 2 OFAC SDN matches (0.91/0.88), accounts frozen.\n\nAction: File STR to PBOC within T+3 days; escalate OFAC hits to Legal; consider voluntary disclosure.`,
  },
  {
    labelZh: '数字人民币策略',
    labelEn: 'e-CNY Strategy',
    metricsZh: [
      { label: '钱包数', value: '9.6 亿', color: '#0d9488' },
      { label: '年交易额', value: '¥7.3T', color: '#14b8a6' },
      { label: '当前采用率', value: '34%', color: '#115e59' },
      { label: '预测采用率', value: '52%', color: '#0f766e' },
    ],
    metricsEn: [
      { label: 'Wallets', value: '960M', color: '#0d9488' },
      { label: 'Tx Volume', value: '¥7.3T', color: '#14b8a6' },
      { label: 'Adoption', value: '34%', color: '#115e59' },
      { label: 'Forecast', value: '52%', color: '#0f766e' },
    ],
    agents: [
      {
        id: 'supervisor', nameZh: '监督 Agent', nameEn: 'Supervisor', icon: '◎',
        roleZh: '并行任务调度', roleEn: 'Parallel dispatch', accentColor: '#0d9488',
        toolCalls: [
          { type: 'call', text: '> decompose_task({ topic:"e-CNY adoption", subtasks:4, mode:"parallel" })', delay: 300 },
          { type: 'response', text: '  OK:4-stage pipeline · stages 1-3 parallelized', delay: 900 },
        ],
        duration: 1400,
      },
      {
        id: 'data', nameZh: '数据 Agent', nameEn: 'Data Collector', icon: '⬇',
        roleZh: '市场数据采集', roleEn: 'Market data', accentColor: '#14b8a6',
        toolCalls: [
          { type: 'call', text: '> fetch_ecny_stats({ src:"PBOC_2024", metrics:["wallets","tx_vol","cities"] })', delay: 200 },
          { type: 'response', text: '  OK:wallets:960M  vol:¥7.3T  cities:26', delay: 1200 },
          { type: 'call', text: '> pull_survey({ n:10000, segments:["18-25","26-40","41-60"] })', delay: 1500 },
          { type: 'response', text: '  OK:aware:78%  adopt:34%  pain:[complexity47%,privacy31%]', delay: 2500 },
        ],
        duration: 3200,
      },
      {
        id: 'analysis', nameZh: '分析 Agent', nameEn: 'Quant Analyst', icon: '◈',
        roleZh: '竞品分析 & 预测', roleEn: 'Forecast', accentColor: '#0f766e',
        toolCalls: [
          { type: 'call', text: '> map_competitors({ peers:["Alipay","WePay","UnionPay"], dims:["UX","merchant","incentives"] })', delay: 400 },
          { type: 'response', text: '  OK:UX gap:6.2 vs 8.7  merchant:41% vs 95%', delay: 1500 },
          { type: 'call', text: '> forecast_adoption({ model:"s_curve", levers:["UX","merchant","subsidy"] })', delay: 1800 },
          { type: 'response', text: '  OK:12m forecast: 52% (+18pp) with all levers', delay: 2800 },
        ],
        duration: 3800,
      },
      {
        id: 'report', nameZh: '报告 Agent', nameEn: 'Report Writer', icon: '',
        roleZh: '战略路线图', roleEn: 'Roadmap', accentColor: '#115e59',
        toolCalls: [
          { type: 'call', text: '> generate_strategy({ forecast:0.52, gaps:["UX","merchant"] })', delay: 200 },
          { type: 'response', text: '  OK:Q1 UX revamp → Q2 merchant push → Q3 subsidy', delay: 1200 },
        ],
        duration: 2000,
      },
    ],
    reportZh: `数字人民币推广策略\n\n960M 钱包，¥7.3T 年交易，26 城试点。认知度 78% 但采用率仅 34%。UX 评分 6.2 vs 支付宝 8.7，商户覆盖 41% vs 95%。\n\n三阶段路线：Q1 UX 重设计 → Q2 商户扩张 → Q3 定向补贴。预计采用率升至 52%（+18pp）。`,
    reportEn: `e-CNY Adoption Strategy\n\n960M wallets, ¥7.3T YTD, 26 pilot cities. Awareness 78%, adoption 34%. UX 6.2 vs Alipay 8.7; merchant coverage 41% vs 95%.\n\n3-phase roadmap: Q1 UX revamp → Q2 merchant expansion → Q3 targeted subsidies. Forecast: 52% adoption (+18pp).`,
  },
];

// ─── SVG Pipeline Diagram ──────────────────────────────────
function PipelineViz({
  agents,
  statuses,
  isZh,
  running,
  done,
}: {
  agents: AgentDef[];
  statuses: Record<string, AgentStatus>;
  isZh: boolean;
  running: boolean;
  done: boolean;
}) {
  const W = 540;
  const H = 130;
  const nodePositions = [80, 220, 360, 500];
  const cy = 55;
  const r = 26;

  const nodeLabels = isZh
    ? ['监督', '数据采集', '量化分析', '报告生成']
    : ['Supervisor', 'Data Collect', 'Quant Analyst', 'Report Gen'];

  return (
    <div className="overflow-x-auto">
      <style>{`
        @keyframes maDashFlow { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
        @keyframes maPulseRing { 0%,100%{opacity:0.3;r:38px} 50%{opacity:0.8;r:42px} }
        @keyframes maNodePulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes maDotTravel { 0%{offset-distance:0%} 100%{offset-distance:100%} }
      `}</style>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[440px]" style={{ height: H }}>
        {/* Background connectors */}
        {nodePositions.slice(0, -1).map((x, i) => {
          const x1 = x + r + 2;
          const x2 = nodePositions[i + 1] - r - 2;
          const upstream = statuses[agents[i].id] || 'idle';
          const downstream = statuses[agents[i + 1].id] || 'idle';
          const isLit = upstream === 'done' || (upstream === 'running');
          const isFlowing = upstream === 'done' && downstream === 'running';
          const isComplete = upstream === 'done' && downstream === 'done';

          return (
            <g key={i}>
              {/* Track */}
              <line x1={x1} y1={cy} x2={x2} y2={cy}
                stroke={isLit ? `${agents[i + 1].accentColor}30` : '#e5e7eb'}
                strokeWidth={3} strokeLinecap="round"
              />
              {/* Flowing dashes */}
              {(isFlowing || isComplete) && (
                <line x1={x1} y1={cy} x2={x2} y2={cy}
                  stroke={agents[i + 1].accentColor}
                  strokeWidth={3} strokeLinecap="round"
                  strokeDasharray="8 8"
                  style={{
                    animation: isFlowing ? 'maDashFlow 0.6s linear infinite' : 'none',
                    strokeDashoffset: isComplete ? 0 : undefined,
                    opacity: isComplete ? 0.7 : 1,
                  }}
                />
              )}
              {/* Arrow head */}
              <polygon
                points={`${x2 + 8},${cy} ${x2},${cy - 5} ${x2},${cy + 5}`}
                fill={isLit ? agents[i + 1].accentColor : '#d1d5db'}
                opacity={isLit ? 1 : 0.5}
              />
            </g>
          );
        })}

        {/* Agent nodes */}
        {nodePositions.map((cx, i) => {
          const status = statuses[agents[i].id] || 'idle';
          const isRunning = status === 'running';
          const isDone = status === 'done';
          const color = agents[i].accentColor;

          return (
            <g key={cx}>
              {/* Outer pulse ring */}
              {isRunning && (
                <circle cx={cx} cy={cy} r={r + 10}
                  fill="none" stroke={color} strokeWidth="2" opacity="0.35"
                  style={{ animation: 'maNodePulse 1.2s ease-in-out infinite' }}
                />
              )}
              {/* Circle fill */}
              <circle
                cx={cx} cy={cy} r={r}
                fill={isDone ? color : isRunning ? `${color}20` : '#f3f4f6'}
                stroke={isDone || isRunning ? color : '#e5e7eb'}
                strokeWidth={isRunning ? 2.5 : 1.5}
                style={{ transition: 'all 0.4s ease' }}
              />
              {/* Icon or checkmark */}
              <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize={isDone ? 15 : 14}
                fill={isDone ? 'white' : isRunning ? color : '#9ca3af'}
                style={{ transition: 'fill 0.3s ease' }}
              >
                {String(i + 1)}
              </text>

              {/* Step number badge */}
              <circle cx={cx + r - 6} cy={cy - r + 6} r={8}
                fill={isDone || isRunning ? color : '#e5e7eb'}
                style={{ transition: 'fill 0.3s ease' }}
              />
              <text x={cx + r - 6} y={cy - r + 6} textAnchor="middle" dominantBaseline="middle"
                fontSize={8} fontWeight="800" fill="white"
              >
                {i + 1}
              </text>

              {/* Label */}
              <text x={cx} y={cy + r + 14} textAnchor="middle" fontSize={9}
                fontWeight={isRunning || isDone ? 700 : 400}
                fill={isDone ? color : isRunning ? color : '#9ca3af'}
                style={{ transition: 'fill 0.3s ease' }}
              >
                {nodeLabels[i]}
              </text>
              {/* Running indicator */}
              {isRunning && (
                <text x={cx} y={cy + r + 26} textAnchor="middle" fontSize={8}
                  fill={color} opacity={0.8}
                  style={{ animation: 'maNodePulse 1s ease-in-out infinite' }}
                >
                  {isZh ? '运行中' : 'running'}
                </text>
              )}
              {isDone && (
                <text x={cx} y={cy + r + 26} textAnchor="middle" fontSize={8}
                  fill={color} opacity={0.7}
                >
                  {isZh ? '完成' : 'done'}
                </text>
              )}
            </g>
          );
        })}

        {/* Overall status label */}
        {(running || done) && (
          <text x={W / 2} y={H - 5} textAnchor="middle" fontSize={9}
            fill={done ? '#0f766e' : '#0d9488'}
            fontWeight="700"
          >
            {done
              ? (isZh ? '流水线完成' : 'Pipeline complete')
              : (isZh ? '流水线运行中…' : 'Pipeline running…')}
          </text>
        )}
      </svg>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function MultiAgentTool({ isZh = true }: { isZh?: boolean }) {
  const [topicIndex, setTopicIndex] = useState(0);
  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>({});
  const [agentLogs, setAgentLogs] = useState<Record<string, string[]>>({});
  const [expandedAgents, setExpandedAgents] = useState<Record<string, boolean>>({});
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);
  const topic = TOPICS[topicIndex];
  const totalDuration = topic.agents.reduce((s, a) => s + a.duration + 300, 0);

  const reset = () => {
    setAgentStatuses({});
    setAgentLogs({});
    setExpandedAgents({});
    setRunning(false);
    setDone(false);
    setElapsedMs(0);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTopicChange = (idx: number) => { reset(); setTopicIndex(idx); };

  const runPipeline = async () => {
    reset();
    setRunning(true);
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const ms = Date.now() - startRef.current;
      setElapsedMs(ms);
      setProgress(Math.min(99, (ms / totalDuration) * 100));
    }, 80);

    let cumDelay = 0;
    for (const agent of topic.agents) {
      const start = cumDelay;
      setTimeout(() => {
        setAgentStatuses((s) => ({ ...s, [agent.id]: 'running' }));
        setExpandedAgents((e) => ({ ...e, [agent.id]: true }));
      }, start);
      for (const tc of agent.toolCalls) {
        setTimeout(() => {
          setAgentLogs((l) => ({ ...l, [agent.id]: [...(l[agent.id] || []), tc.text] }));
        }, start + tc.delay);
      }
      setTimeout(() => {
        setAgentStatuses((s) => ({ ...s, [agent.id]: 'done' }));
      }, start + agent.duration);
      cumDelay += agent.duration + 300;
    }
    setTimeout(() => {
      setProgress(100);
      setRunning(false);
      setDone(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }, cumDelay + 200);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const doneCount = Object.values(agentStatuses).filter((s) => s === 'done').length;
  const totalToolCalls = topic.agents.reduce((s, a) => s + a.toolCalls.filter((t) => t.type === 'call').length, 0);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            <span className="relative flex h-1.5 w-1.5">
              {running && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
            </span>
            {isZh ? 'Multi-Agent · 流水线演示' : 'Multi-Agent · Pipeline Demo'}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isZh ? '金融研究多智能体系统' : 'Financial Research Multi-Agent System'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {isZh ? '4 层 Agent 协作（监督→数据→分析→报告），工具调用日志可视化。' : '4-layer agent pipeline with tool call logs and structured output.'}
          </p>
        </div>
        {/* Progress ring */}
        <div className="relative h-16 w-16 shrink-0">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-gray-800" />
            <circle cx="28" cy="28" r="22" fill="none" stroke="url(#pGrad)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.1s ease' }}
            />
            <defs>
              <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs font-black text-primary-600 dark:text-primary-400">
              {doneCount}<span className="text-gray-400 text-[10px]">/4</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Topic tabs ── */}
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((t, i) => (
          <button key={i} onClick={() => handleTopicChange(i)} disabled={running}
            className={`rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-all disabled:opacity-40 ${
              topicIndex === i
                ? 'border-primary-500 bg-primary-500 text-white shadow-md shadow-primary-500/20'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-400/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
            }`}
          >
            {isZh ? t.labelZh : t.labelEn}
          </button>
        ))}
      </div>

      {/* ── SVG Pipeline Visualization ── */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <PipelineViz agents={topic.agents} statuses={agentStatuses} isZh={isZh} running={running} done={done} />
      </div>

      {/* ── Metrics Grid (shown after done) ── */}
      {done && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(isZh ? topic.metricsZh : topic.metricsEn).map((m) => (
            <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-3.5 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
              <p className="text-xl font-black" style={{ color: m.color }}>{m.value}</p>
              <p className="mt-0.5 text-[11px] font-semibold text-gray-400">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Overall progress bar + controls ── */}
      <div className="space-y-3">
        {(running || done) && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>{isZh ? '整体进度' : 'Overall progress'}</span>
              <span className="font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div className="h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-500 to-primary-400 transition-all duration-100"
                style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <button onClick={done ? reset : runPipeline} disabled={running}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition-all hover:opacity-90 disabled:opacity-50"
          >
            {running ? (
              <><span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {isZh ? '流水线运行中…' : 'Running…'}</>
            ) : done ? (isZh ? '↺ 重置' : '↺ Reset') : (isZh ? '▶ 启动流水线' : '▶ Run Pipeline')}
          </button>
          {(running || done) && (
            <span className="font-mono text-xs text-gray-400">
              {(elapsedMs / 1000).toFixed(1)}s{done && (isZh ? ' · 完成' : ' · done')}
            </span>
          )}
        </div>
      </div>

      {/* ── Agent log cards ── */}
      {Object.keys(agentStatuses).length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            {isZh ? '工具调用日志' : 'Tool Call Logs'}
          </p>
          {topic.agents.map((agent) => {
            const status = agentStatuses[agent.id] || 'idle';
            const logs = agentLogs[agent.id] || [];
            const expanded = expandedAgents[agent.id] ?? false;
            if (logs.length === 0) return null;

            return (
              <div key={agent.id} className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setExpandedAgents((e) => ({ ...e, [agent.id]: !e[agent.id] }))}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: agent.accentColor, opacity: status === 'done' ? 1 : 0.5 }} />
                    <span className="text-xs font-semibold" style={{ color: agent.accentColor }}>
                      {isZh ? agent.nameZh : agent.nameEn}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {logs.filter(l => l.startsWith('>')).length} {isZh ? '次调用' : 'calls'}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">{expanded ? '▲' : '▼'}</span>
                </button>
                {expanded && (
                  <div className="bg-gray-950 p-3.5">
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary-500/60" />
                      <span className="h-2 w-2 rounded-full bg-primary-500/60" />
                      <span className="h-2 w-2 rounded-full bg-primary-500/60" />
                      <span className="ml-2 font-mono text-[10px] text-gray-600">
                        agent:{agent.id} · {isZh ? agent.roleZh : agent.roleEn}
                      </span>
                    </div>
                    <div className="space-y-0.5 font-mono text-[11px] leading-relaxed">
                      {logs.map((line, i) => (
                        <div key={i} className={line.startsWith('>') ? 'text-primary-300' : 'text-gray-500'}>
                          {line}
                        </div>
                      ))}
                      {status === 'running' && (
                        <div className="flex items-center gap-1">
                          <span className="text-primary-400">{'>'}</span>
                          <span className="inline-block h-3 w-1.5 animate-pulse bg-primary-400" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Final report ── */}
      {done && (
        <div className="relative overflow-hidden rounded-2xl border border-primary-200/50 bg-gradient-to-br from-primary-50/70 to-teal-50/30 p-5 dark:border-primary-900/30 dark:from-primary-900/15 dark:to-teal-900/8">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-primary-400/6" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/15">
                <svg className="h-4 w-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-primary-800 dark:text-primary-200">{isZh ? '最终报告' : 'Final Report'}</p>
                <p className="text-[11px] text-primary-600/60 dark:text-primary-400/50">
                  {isZh ? `4 Agent · ${totalToolCalls} 次工具调用 · ${(elapsedMs/1000).toFixed(1)}s` : `4 agents · ${totalToolCalls} tool calls · ${(elapsedMs/1000).toFixed(1)}s`}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {(isZh ? topic.reportZh : topic.reportEn).split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'font-bold text-gray-800 dark:text-gray-100' : ''}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
