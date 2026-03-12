# AML Sentinel — Unified Implementation Specification

> Portfolio project for `longyuxu.xyz`
> Target role: Bank-oriented FinTech AI Product Intern (Shenzhen)
> Status: Unified spec — business + technical, ready for implementation

---

## 1. Project Positioning

### One-sentence definition

**AML Sentinel** is a bank-style anti-money laundering investigation workbench that turns regulatory requirements into an executable workflow covering alert intake, case review, regulation lookup, and suspicious transaction report drafting.

### Why this project exists

The target JD is not asking for a generic AI demo. It is asking for evidence that the candidate can:

1. understand bank AML and anti-fraud scenarios
2. translate compliance requirements into product functions
3. design a middle-office workflow and prototype quickly
4. use RAG and AI Agent only where they improve execution

This project is therefore designed as a **compliance operations platform prototype**, not as a standalone model showcase.

### Core design principle

The primary value is:

**regulatory requirement → risk signal → investigation workflow → report output**

RAG and Agent are supporting capabilities inside that chain, not the center of the story.

---

## 2. JD Alignment

| JD expectation | AML Sentinel coverage |
|---|---|
| Deep participation in bank AML / anti-fraud decision platform | Product is framed as a bank AML investigation workbench |
| Use RAG and Agent in financial risk/compliance scenarios | RAG supports regulation retrieval; Agent supports case drafting and report assembly |
| System prototype and process design | Includes alert lifecycle, analyst actions, review flow, and audit trail |
| Translate regulatory needs into product features | Threshold rules, investigation checklist, reporting timer, regulation citation |
| Work with compliance and operations style requirements | Explicit roles, handoff nodes, human review, non-auto-submission constraints |
| Low-code / rapid prototyping mindset | Configurable rules, playbooks, and report templates without requiring a database for demo phase |

This project is **not** positioned as:

- a pure LLM chat demo
- a generic graph visualization toy
- an autonomous compliance decision engine
- an end-to-end production banking system

---

## 3. Product Goals

### Target users

1. **Compliance Analyst** — reviews high-risk alerts, inspects evidence, checks regulations, drafts STRs
2. **Investigation Supervisor** — reviews analyst conclusions, decides escalation or closure
3. **Rule / Product Operator** — maintains threshold rules, typology mappings, report templates

### Core pain points addressed

1. alerts with weak explanations
2. fragmented evidence across transactions, accounts, and relationships
3. slow regulation lookup and policy interpretation
4. repetitive manual drafting of suspicious transaction reports
5. poor standardization across analysts

### Product objectives

1. explain why an alert is risky
2. help an analyst investigate the case in a structured flow
3. link findings to explicit regulatory basis
4. generate a reviewable draft report
5. keep a visible human-in-the-loop control point

---

## 4. End-to-End Workflow

### Primary workflow

1. **Alert Intake** — transaction or account flagged by threshold rules and precomputed risk scoring
2. **Risk Triage** — analyst sees trigger reasons, risk level, counterparties, unusual behavior indicators
3. **Relationship Investigation** — analyst inspects connected accounts and suspicious typologies (fan-out, fan-in, cycle, rapid movement)
4. **Regulation Lookup** — analyst asks a business question, receives cited answer from selected AML materials
5. **STR Drafting** — AI-assisted workflow assembles facts, typology signals, and regulation basis into a draft STR
6. **Human Review** — analyst or supervisor edits, validates, and decides final disposition; system never auto-files

### Case lifecycle states

```
new_alert → under_review → need_more_evidence → ready_for_supervisor_review
                                                  ↓
                          closed_false_positive ← → ready_for_reporting
```

---

## 5. Product Modules (5 Views)

### Module A: Alert Queue and Risk Triage

- Alert list with severity filters
- Explanation card showing triggered rules
- Transaction summary, account summary, behavior summary
- Visible distinction between rule-based signals and model-derived risk scores

### Module B: Case Overview

- Case detail panel with transaction facts, triggers, case status
- Account timeline and counterparty list
- Analyst notes area
- Case lifecycle status stepper

### Module C: Investigation Workspace

- Account relationship graph (ECharts force-directed)
- Transaction path inspection
- Typology highlighting (fan-out, fan-in, cycle)
- Investigation checklist

### Module D: Regulation Copilot

- Query box for regulation and policy questions
- Client-side BM25 retrieval of relevant legal chunks
- Cited answer generation via Anthropic API (streaming)
- Explicit "insufficient basis" response when evidence is not enough

### Module E: STR Draft Workspace

- Case fact extraction
- Typology classification support
- Regulatory basis retrieval
- Timeline and reporting urgency reminder
- Structured draft generation in bank-style form layout via 6-step Agent loop
- Mandatory visible disclaimer at all times

### Module F (stretch): Configuration Layer

- Editable threshold rule definitions (read-only in Phase 0)
- Typology mapping table
- Regulation-to-feature mapping table
- Report template configuration

---

## 6. Regulatory Requirement → Product Capability Mapping

| Regulatory / compliance need | Product capability |
|---|---|
| Large-value transaction monitoring | Threshold-based alerting cards and rule explanations |
| Suspicious pattern identification | Typology tags, network analysis, and pattern checklist |
| Timely STR reporting | Reporting timer, urgency indicator, and draft workflow |
| Evidence-based compliance review | Case workspace with linked facts and regulation references |
| Standardized handling process | Case lifecycle states and review handoff |
| Regulatory basis traceability | RAG answers with source citations and article references |
| Human accountability | Read-only AI draft output until analyst review and copy/export |

---

## 7. Tech Stack (verified from package.json)

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "echarts": "^5.5.0",
  "echarts-for-react": "^3.0.5",
  "@prisma/client": "^6.8.0",
  "zod": "^4.3.5",
  "clsx": "^2.1.0"
}
```

**Must be added**: `@anthropic-ai/sdk`

### Design Constraints (non-negotiable)

1. **No emojis** anywhere — use SVG icons or neutral Unicode symbols (`◎ ◈ ▶ ✓ →`)
2. **Teal monochrome only** — all colors from `primary-*` (teal #0d9488, shades 50–900) or neutral gray/white/black. Zero usage of: `blue-*`, `violet-*`, `indigo-*`, `purple-*`, `red-*`, `orange-*`, `amber-*`, `yellow-*`, `green-*`, `emerald-*`, `cyan-*`, `sky-*`
3. **`ANTHROPIC_API_KEY`** must only be accessed server-side — never exposed to client bundle
4. **TypeScript**: `ignoreBuildErrors: true` in `next.config.mjs`, but types should still be correct
5. **i18n**: all user-visible strings go through `src/i18n/messages/en.json` and `zh.json` — no hardcoded English/Chinese in TSX

### Tailwind Primary Color Scale

```
primary-50:  #f0fdfa
primary-100: #ccfbf1
primary-200: #99f6e4
primary-300: #5eead4
primary-400: #2dd4bf
primary-500: #0d9488  ← brand color
primary-600: #0f766e
primary-700: #115e59
primary-800: #134e4a
primary-900: #042f2e
```

---

## 8. Data Sources

### Transaction and Alert Data

**DGraph-Fin (Finvolution / 信也科技, NeurIPS 2022)**
- PyTorch Geometric: `torch_geometric.datasets.DGraphFin` (auto-download)
- Content: 3M real borrower nodes, 4M edges, ~1.3M labeled, ~1.3% fraud rate
- License: Non-commercial research/demo
- Usage: Sample 200 fraud + 300 normal nodes; extract features; compute risk scores offline

**IBM AML NeurIPS 2023 (HI-Small)**
- Kaggle: IBM Transactions for Anti-Money Laundering (AML)
- License: CDLA-Sharing-1.0
- Content: ~9,000 synthetic transactions with 12 labeled laundering typologies (fan-out, fan-in, cycle, scatter-gather)
- Usage: Network graph construction for Investigation Workspace

### Regulatory Documents (RAG knowledge base)

| Document | Format | Language | Usage |
|---|---|---|---|
| 反洗钱法 2024 (PBOC) | HTML → text | ZH | Core obligation rules |
| KPMG China New AML Law (2025) | PDF | EN | Analysis and interpretation |
| FATF China MER 2019 | PDF | EN | Risk typologies and gaps |
| CAMLMAC Stability Report 2023 | PDF | EN | Reporting procedures |

Chunking: clause-level boundaries, `chunk_size=512`, `overlap=64`, expected ~80 chunks total.

**Citation type per source** (governs system prompt behavior):
- `aml_law_2024`: cite by article number ("第三十一条") — statutory, article-level citable
- `kpmg_analysis`: cite by section/page ("KPMG 分析报告 Section 2") — advisory, section-level only
- `fatf_china_2019`: cite by Immediate Outcome ("FATF China MER 2019, IO5") — evaluative, outcome-level
- `camlmac_report`: cite by section heading — procedural guidance, no article numbering

---

## 9. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Offline Python preprocessing (one-time, local)              │
│  scripts/aml/                                                │
│  ├── preprocess_cases.py     → amlAlerts.ts + amlCases.ts   │
│  ├── build_network.py        → amlNetworkData.ts             │
│  └── chunk_regulations.py   → amlRegulations.ts             │
└───────────────────────┬─────────────────────────────────────┘
                        │ generates static TypeScript files
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Next.js 14 on Vercel                                        │
│                                                              │
│  src/lib/                                                    │
│  ├── amlAlerts.ts        alert queue data                    │
│  ├── amlCases.ts         case detail data + lifecycle        │
│  ├── amlNetworkData.ts   ECharts graph (50 nodes)            │
│  ├── amlRegulations.ts   ~80 regulatory chunks + BM25        │
│  └── amlConfig.ts        rules, checklists, templates        │
│                                                              │
│  src/app/api/aml/                                            │
│  ├── rag/route.ts        POST → Anthropic API (SSE)          │
│  └── str/route.ts        POST → Anthropic API (SSE)          │
│                                                              │
│  src/components/                                             │
│  └── AmlSentinelTool.tsx   5-view workbench component        │
└─────────────────────────────────────────────────────────────┘
```

### Human-in-the-loop rule

The system may: explain, summarize, retrieve, draft.
The system may **not**: auto-close cases, auto-submit reports, claim legal certainty without citation.

---

## 10. TypeScript Domain Model

### `src/lib/amlAlerts.ts`

```typescript
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type TransactionType = 'transfer' | 'cash' | 'remittance' | 'pos';
export type PartyType = 'individual' | 'corporate';

export type PbocRule =
  | 'PBOC_LARGE_CASH'       // single cash >= RMB 50,000
  | 'PBOC_LARGE_TRANSFER'   // single transfer >= RMB 2,000,000
  | 'HIGH_RISK_COUNTRY'
  | 'SMURFING'              // structuring below threshold
  | 'RAPID_MOVEMENT'        // funds in/out within 24h
  | 'FREQUENT_CASH';        // >5 cash transactions per day

export interface AmlAlert {
  id: string;                          // 'ALT-001' format
  caseId: string;                      // 'CASE-001'
  transactionId: string;               // 'TXN-001'
  date: string;                        // 'YYYY-MM-DD'
  amount: number;                      // RMB integer
  transactionType: TransactionType;
  senderAccountId: string;             // 'ACC-XXX'
  receiverAccountId: string;
  senderType: PartyType;
  receiverType: PartyType;
  isHighRiskCountry: boolean;
  historicalFrequency: number;         // transactions in past 30 days
  riskScore: number;                   // 0–100, precomputed
  severity: AlertSeverity;             // derived from riskScore
  triggeredRules: PbocRule[];
  fraudLabel: boolean;                 // DGraph-Fin ground truth
  typology?: string;                   // IBM AML label if applicable
  createdAt: string;                   // ISO timestamp
}

export const amlAlerts: AmlAlert[] = [ /* Phase 0: 10-15 handwritten rows */ ];
```

### `src/lib/amlCases.ts`

```typescript
export type CaseStatus =
  | 'new_alert'
  | 'under_review'
  | 'need_more_evidence'
  | 'ready_for_supervisor_review'
  | 'closed_false_positive'
  | 'ready_for_reporting';

export interface AmlCase {
  id: string;                          // 'CASE-001'
  alertIds: string[];                  // linked alerts
  status: CaseStatus;
  subjectAccountId: string;
  subjectType: 'individual' | 'corporate';
  summary: string;                     // one-line case summary
  keyFindings: string[];               // bullet-point findings
  suggestedTypologies: string[];       // e.g. ['smurfing', 'rapid_movement']
  reportingUrgency: 'normal' | 'priority' | 'immediate';
  reportingDeadline?: string;          // ISO date if urgency != normal
  analystNotes: string;
  lastUpdated: string;                 // ISO timestamp
}

export const amlCases: AmlCase[] = [ /* Phase 0: 5-8 handwritten cases */ ];
```

### `src/lib/amlNetworkData.ts`

```typescript
export interface NetworkNode {
  id: string;
  name: string;                        // anonymized, e.g. 'ACC-042'
  value: number;                       // total transaction volume (log-scaled for size)
  category: number;                    // 0=normal, 1=suspicious, 2=confirmed-fraud
  riskScore: number;                   // 0–100
  itemStyle: { color: string };        // primary-200 | primary-500 | primary-800
}

export interface NetworkEdge {
  source: string;
  target: string;
  value: number;                       // transaction amount
  lineStyle: {
    width: number;                     // 1–5, mapped from amount
    color: string;                     // primary-300 | primary-600
  };
}

export interface AmlNetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  categories: Array<{ name: string }>; // ['Normal', 'Suspicious', 'Confirmed Fraud']
}

export const amlNetworkData: AmlNetworkData = { nodes: [], edges: [], categories: [] };
```

### `src/lib/amlRegulations.ts`

```typescript
export type RegulationSource =
  | 'aml_law_2024'
  | 'kpmg_analysis'
  | 'fatf_china_2019'
  | 'camlmac_report';

export interface RegulationChunk {
  id: string;                  // 'REG-001'
  source: RegulationSource;
  sourceTitle: string;
  article: string;             // e.g. '第三十一条' or 'Article 31'
  text: string;                // chunk content <= 512 chars
  keywords: string[];
  lang: 'zh' | 'en';
}

export const amlRegulations: RegulationChunk[] = [ /* ~80 entries, Phase 0: 10 mock */ ];

export function searchRegulations(query: string, topK = 5): RegulationChunk[] {
  // CJK-aware tokenization: space-split for Latin, character n-grams for Chinese
  const isCjk = /[\u4e00-\u9fff]/.test(query);
  const queryTerms = isCjk
    ? Array.from({ length: query.length - 1 }, (_, i) => query.slice(i, i + 2)) // bigrams
        .concat(query.split(''))                                                   // unigrams fallback
    : query.toLowerCase().split(/\s+/);

  return amlRegulations
    .map(chunk => ({
      chunk,
      score: chunk.keywords.filter(k =>
        queryTerms.some(t => k.toLowerCase().includes(t.toLowerCase()))
      ).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ chunk }) => chunk);
}
```

### `src/lib/amlConfig.ts`

```typescript
export interface RuleConfig {
  id: PbocRule;
  name: string;                        // i18n key reference
  thresholdDescription: string;        // human-readable threshold
  rationale: string;                   // regulatory basis
  severity: AlertSeverity;
  pbocArticle: string;
}

export interface ChecklistItem {
  id: string;
  label: string;                       // i18n key reference
  required: boolean;
}

export interface ReportTemplateSection {
  id: string;
  title: string;                       // i18n key reference
  description: string;
  required: boolean;
}

export const ruleConfigs: RuleConfig[] = [ /* 6 PBOC rules */ ];
export const investigationChecklist: ChecklistItem[] = [ /* 8-10 items */ ];
export const strTemplateSections: ReportTemplateSection[] = [ /* 6 sections */ ];
```

---

## 11. API Route Specifications

### `POST /api/aml/rag`

**Request body**:
```typescript
{
  query: string;
  relevantChunks: RegulationChunk[];  // top-5 from client-side BM25
  locale: 'zh' | 'en';
}
```

**Response**: `text/event-stream` (Anthropic SSE format forwarded as-is)

**Implementation**:
```typescript
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import type { RegulationChunk } from '@/lib/amlRegulations';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { query, relevantChunks, locale } = await req.json();
  if (!Array.isArray(relevantChunks) || relevantChunks.length === 0) {
    return Response.json({ error: 'No relevant regulation chunks provided.' }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const contextText = relevantChunks
    .map((c: RegulationChunk) => `[${c.sourceTitle} ${c.article}]\n${c.text}`)
    .join('\n\n---\n\n');

  const systemPrompt = locale === 'zh'
    ? `你是中国反洗钱合规专家。仅根据以下提供的监管文件片段回答问题。
引用规则：
- 中国法律法规（反洗钱法、人民银行规章）：必须引用具体条文编号，如"反洗钱法第三十一条"。
- 第三方分析报告（KPMG、CAMLMAC）：引用文件名和章节/页码，如"KPMG 分析报告第2节"。
- FATF 评估报告：引用"FATF 中国互评估 2019，即时成果5"等格式。
如果提供的文件不足以回答问题，明确说明，不得推断。`
    : `You are a China AML compliance expert. Answer only based on the provided regulatory excerpts.
Citation rules:
- Chinese statutes (AML Law, PBOC rules): cite article number, e.g. "AML Law Article 31".
- Third-party analysis (KPMG, CAMLMAC reports): cite document name and section, e.g. "KPMG Analysis, Section 2".
- FATF documents: cite "FATF China MER 2019, Immediate Outcome 5" format.
If the provided excerpts are insufficient to answer, say so explicitly. Do not infer.`;

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `${query}\n\n---\nRelevant regulatory excerpts:\n\n${contextText}`,
      }],
    });

    return new Response(stream.toReadableStream(), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
```

---

### `POST /api/aml/str`

**Request body**:
```typescript
{
  caseId: string;
  caseAlerts: AmlAlert[];
  amlCase: AmlCase;
  locale: 'zh' | 'en';
}
```

**Response**: `text/event-stream`, custom JSON events:
```typescript
{ type: 'tool_start'; step: number; toolName: string; description: string }
{ type: 'tool_result'; step: number; result: string }
{ type: 'str_delta'; delta: string }
{ type: 'done' }
```

**Tool definitions** (5 tools for agent loop):
```typescript
const tools: Anthropic.Tool[] = [
  {
    name: 'get_case_details',
    description: 'Retrieve full details of the AML case and all linked alerts',
    input_schema: {
      type: 'object' as const,
      properties: { caseId: { type: 'string' } },
      required: ['caseId'],
    },
  },
  {
    name: 'analyze_account_history',
    description: 'Analyze recent transaction behavior for a given account, identify anomalies',
    input_schema: {
      type: 'object' as const,
      properties: {
        accountId: { type: 'string' },
        days: { type: 'number', description: 'Lookback period in days' },
      },
      required: ['accountId', 'days'],
    },
  },
  {
    name: 'search_aml_regulations',
    description: 'Search AML regulatory provisions relevant to given keywords',
    input_schema: {
      type: 'object' as const,
      properties: { query: { type: 'string' } },
      required: ['query'],
    },
  },
  {
    name: 'classify_laundering_typology',
    description: 'Classify the likely money laundering typology based on transaction patterns',
    input_schema: {
      type: 'object' as const,
      properties: {
        patterns: { type: 'array', items: { type: 'string' } },
      },
      required: ['patterns'],
    },
  },
  {
    name: 'assess_reporting_urgency',
    description: 'Determine if and when a suspicious transaction report must be filed',
    input_schema: {
      type: 'object' as const,
      properties: {
        riskScore: { type: 'number' },
        typologies: { type: 'array', items: { type: 'string' } },
      },
      required: ['riskScore', 'typologies'],
    },
  },
];
```

**Complete handler** (`src/app/api/aml/str/route.ts`):
```typescript
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { searchRegulations } from '@/lib/amlRegulations';
import type { AmlAlert } from '@/lib/amlAlerts';
import type { AmlCase } from '@/lib/amlCases';

export const dynamic = 'force-dynamic';

function resolveTool(
  toolName: string,
  input: Record<string, unknown>,
  primaryAlert: AmlAlert,
  caseAlerts: AmlAlert[],
  amlCase: AmlCase,
  locale: 'zh' | 'en',
): string {
  switch (toolName) {
    case 'get_case_details':
      return JSON.stringify({
        caseId: amlCase.id,
        status: amlCase.status,
        subject: amlCase.subjectAccountId,
        alertCount: caseAlerts.length,
        primaryAlertId: primaryAlert.id,
        severity: primaryAlert.severity,
        amount: primaryAlert.amount,
        type: primaryAlert.transactionType,
        triggeredRules: [...new Set(caseAlerts.flatMap(a => a.triggeredRules))],
        riskScore: primaryAlert.riskScore,
        findings: amlCase.keyFindings,
        linkedAlerts: caseAlerts.map(a => ({
          id: a.id,
          amount: a.amount,
          severity: a.severity,
          triggeredRules: a.triggeredRules,
        })),
      }, null, 2);

    case 'analyze_account_history':
      return primaryAlert.historicalFrequency > 10
        ? (locale === 'zh' ? `主预警账户在过去30天内有 ${primaryAlert.historicalFrequency} 笔交易，属于高频异常行为；案件共聚合 ${caseAlerts.length} 条关联预警。` : `Primary alert account had ${primaryAlert.historicalFrequency} transactions in 30 days — high-frequency anomaly; case aggregates ${caseAlerts.length} linked alerts.`)
        : (locale === 'zh' ? `主预警账户历史交易频率正常（${primaryAlert.historicalFrequency} 笔/30天），但案件仍包含 ${caseAlerts.length} 条关联预警需综合判断。` : `Primary alert account shows normal frequency (${primaryAlert.historicalFrequency} txns/30d), but the case still contains ${caseAlerts.length} linked alerts for combined review.`);

    case 'search_aml_regulations': {
      const chunks = searchRegulations(String(input.query ?? ''), 3);
      return chunks.map(c => `[${c.sourceTitle} ${c.article}] ${c.text}`).join('\n\n') || 'No matching regulations found.';
    }

    case 'classify_laundering_typology': {
      const map: Record<string, string> = {
        PBOC_LARGE_CASH: locale === 'zh' ? '大额现金交易（可能化整为零）' : 'Large cash / potential structuring',
        PBOC_LARGE_TRANSFER: locale === 'zh' ? '大额转账（可能分层）' : 'Large transfer / potential layering',
        HIGH_RISK_COUNTRY: locale === 'zh' ? '高风险司法管辖区转账（可能离岸洗钱）' : 'High-risk jurisdiction transfer / possible offshore layering',
        SMURFING: locale === 'zh' ? '化整为零结构化交易' : 'Structuring / smurfing',
        RAPID_MOVEMENT: locale === 'zh' ? '资金快速流转（可能过渡账户）' : 'Rapid fund movement / possible pass-through account',
        FREQUENT_CASH: locale === 'zh' ? '高频现金交易' : 'High-frequency cash activity',
      };
      const combinedRules = [...new Set(caseAlerts.flatMap(a => a.triggeredRules))];
      return combinedRules.map(r => map[r] ?? r).join('; ') || (locale === 'zh' ? '未能识别明确洗钱类型' : 'No clear typology identified');
    }

    case 'assess_reporting_urgency':
      if (primaryAlert.riskScore >= 80) {
        return locale === 'zh'
          ? `极高风险（主预警评分 ${primaryAlert.riskScore}）。须立即向 CAMLMAC 报告，或最迟于发现后5个工作日内提交可疑交易报告（反洗钱法第三十三条）。`
          : `Critical risk (primary alert score ${primaryAlert.riskScore}). Immediate or within 5 business days to CAMLMAC per AML Law Article 33.`;
      }
      if (primaryAlert.riskScore >= 60) {
        return locale === 'zh'
          ? `高风险（主预警评分 ${primaryAlert.riskScore}）。须在5个工作日内向 CAMLMAC 报告可疑交易（反洗钱法第三十三条）。`
          : `High risk (primary alert score ${primaryAlert.riskScore}). File STR within 5 business days per AML Law Article 33.`;
      }
      return locale === 'zh'
        ? `中低风险（主预警评分 ${primaryAlert.riskScore}）。建议持续监控，暂无强制上报要求。`
        : `Medium-low risk (primary alert score ${primaryAlert.riskScore}). Continue monitoring; no mandatory filing triggered.`;

    default:
      return 'Tool not recognized.';
  }
}

export async function POST(req: NextRequest) {
  const { caseId, caseAlerts, amlCase, locale } = await req.json() as {
    caseId: string;
    caseAlerts: AmlAlert[];
    amlCase: AmlCase;
    locale: 'zh' | 'en';
  };

  if (!Array.isArray(caseAlerts) || caseAlerts.length === 0) {
    return Response.json({ error: 'No alerts provided for case.' }, { status: 400 });
  }

  const primaryAlert = [...caseAlerts].sort((a, b) => b.riskScore - a.riskScore)[0];

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

      try {
        const messages: Anthropic.MessageParam[] = [{
          role: 'user',
          content: locale === 'zh'
            ? `请对以下 AML 案件进行调查，并起草一份 CAMLMAC 格式的可疑交易报告（STR）。\n\n案件编号：${caseId}\n案件摘要：${amlCase.summary}\n关联预警数：${caseAlerts.length}\n主预警：${primaryAlert.id}（评分 ${primaryAlert.riskScore}）`
            : `Investigate the following AML case and draft a CAMLMAC-format Suspicious Transaction Report (STR).\n\nCase ID: ${caseId}\nSummary: ${amlCase.summary}\nLinked alerts: ${caseAlerts.length}\nPrimary alert: ${primaryAlert.id} (score ${primaryAlert.riskScore})`,
        }];

        let step = 0;
        const MAX_ITERATIONS = 5;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
          const response = await client.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 2048,
            tools,
            messages,
          });

          if (response.stop_reason === 'end_turn') {
            // Stream final text output
            for (const block of response.content) {
              if (block.type === 'text') {
                for (const char of block.text) {
                  send({ type: 'str_delta', delta: char });
                }
              }
            }
            break;
          }

          if (response.stop_reason === 'tool_use') {
            const assistantContent: Anthropic.ContentBlock[] = response.content;
            messages.push({ role: 'assistant', content: assistantContent });

            const toolResults: Anthropic.ToolResultBlockParam[] = [];

            for (const block of assistantContent) {
              if (block.type !== 'tool_use') continue;
              step++;
              send({ type: 'tool_start', step, toolName: block.name, description: block.name.replace(/_/g, ' ') });

              const result = resolveTool(block.name, block.input as Record<string, unknown>, primaryAlert, caseAlerts, amlCase, locale);
              send({ type: 'tool_result', step, result: result.slice(0, 200) });

              toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: result });
            }

            messages.push({ role: 'user', content: toolResults });
          }
        }

        send({ type: 'done' });
      } catch (err) {
        send({ type: 'str_delta', delta: `\n[Error: ${String(err)}]` });
        send({ type: 'done' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

---

## 12. Frontend Component: `AmlSentinelTool.tsx`

### Props

```typescript
interface AmlSentinelToolProps {
  isZh: boolean;
  messages: AmlSentinelMessages;  // from i18n
}
```

### State

```typescript
// Navigation
activeView: 'alerts' | 'case' | 'network' | 'rag' | 'str'
selectedAlertId: string | null
selectedCaseId: string | null

// View: Alert Queue
severityFilter: 'all' | 'critical' | 'high' | 'medium' | 'low'

// View: Investigation Workspace
selectedNode: NetworkNode | null
typologyFilter: 'all' | 'fanOut' | 'fanIn' | 'cycle'

// View: Regulation Copilot
ragQuery: string
ragChunks: RegulationChunk[]
ragAnswer: string
ragLoading: boolean
ragStep: 'idle' | 'retrieving' | 'generating' | 'done'

// View: STR Workspace
strSteps: StrStep[]
strReport: string
strLoading: boolean

// Config View (stretch)
editingRuleId: string | null
```

### View: Alert Queue

- Summary row: Total, Critical, High, PBOC Filings triggered
- Severity filter chips
- Alert table: ID, Date, Amount, Type, Severity badge, Rules triggered
- Row click → sets `selectedAlertId` and opens Case view

### View: Case Overview

- Case status stepper (6 lifecycle states)
- Transaction facts card
- Key findings bullet list
- Reporting urgency badge with deadline countdown
- Analyst notes textarea (UI-only, no persistence)
- Navigation buttons to Investigation Workspace and STR Workspace

### View: Investigation Workspace

- ECharts `force` layout graph, 500px height, full width
- Legend: 3 categories with primary color dots
- Typology filter chips above graph
- Node click → side panel with account details + typology
- Checklist below graph

### View: Regulation Copilot

- 6 suggested question chips
- Textarea + Submit button
- Pipeline status bar: Retrieving → Ranking → Generating
- Retrieved chunks: 3 cards with source, article, excerpt
- Streaming answer with blinking cursor
- Sources footer

### View: STR Draft Workspace

- Case summary header
- 6-step agent execution timeline (idle circle / spinner / checkmark)
- STR draft output (streaming, `readOnly` textarea or `<pre>`)
- Copy button
- Disclaimer bar — always visible, not dismissible

### Streaming implementation (RAG view)

```typescript
const handleRagQuery = useCallback(async (query: string) => {
  setRagLoading(true);
  setRagAnswer('');
  setRagStep('retrieving');

  const chunks = searchRegulations(query, 5);
  setRagChunks(chunks);

  if (chunks.length === 0) {
    setRagAnswer(messages.rag.noResults);
    setRagStep('idle');
    setRagLoading(false);
    return;
  }

  setRagStep('generating');

  try {
    const response = await fetch('/api/aml/rag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, relevantChunks: chunks, locale: isZh ? 'zh' : 'en' }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';  // keep incomplete line for next iteration

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          const event = JSON.parse(jsonStr);
          if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
            setRagAnswer(prev => prev + event.delta.text);
          }
        } catch { /* skip malformed */ }
      }
    }
    setRagStep('done');
  } catch (err) {
    setRagAnswer(messages.rag.error);
    setRagStep('idle');
  } finally {
    setRagLoading(false);
  }
}, [messages.rag.error, messages.rag.noResults]);
```

### Streaming implementation (STR view)

```typescript
interface StrStep {
  label: string;
  status: 'idle' | 'running' | 'done';
  detail: string;
}

const handleGenerateStr = useCallback(async () => {
  if (!selectedCaseId) return;
  const amlCase = amlCases.find(c => c.id === selectedCaseId)!;
  const caseAlerts = amlAlerts.filter(a => amlCase.alertIds.includes(a.id));
  if (caseAlerts.length === 0) return;

  setStrLoading(true);
  setStrReport('');
  setStrSteps(prev => prev.map(s => ({ ...s, status: 'idle' as const, detail: '' })));

  try {
    const response = await fetch('/api/aml/str', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseId: selectedCaseId, caseAlerts, amlCase, locale: isZh ? 'zh' : 'en' }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;
        try {
          const event = JSON.parse(jsonStr);
          switch (event.type) {
            case 'tool_start':
              setStrSteps(prev => prev.map((s, i) =>
                i === event.step - 1 ? { ...s, status: 'running', detail: event.description } : s));
              break;
            case 'tool_result':
              setStrSteps(prev => prev.map((s, i) =>
                i === event.step - 1 ? { ...s, status: 'done', detail: event.result } : s));
              break;
            case 'str_delta':
              setStrReport(prev => prev + event.delta);
              break;
            case 'done':
              setStrSteps(prev => prev.map((s, i) =>
                i === 5 ? { ...s, status: 'done' } : s));
              break;
          }
        } catch { /* skip */ }
      }
    }
  } catch (err) {
    console.error('STR error:', err);
  } finally {
    setStrLoading(false);
  }
}, [selectedCaseId, isZh]);
```

---

## 13. ECharts Network Graph Option

```typescript
const networkOption = useMemo(() => ({
  backgroundColor: 'transparent',
  legend: {
    data: amlNetworkData.categories.map(c => c.name),
    textStyle: { color: '#6b7280' },
    top: 10,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      if (params.dataType === 'node') {
        const node = params.data as NetworkNode;
        return `
          <div style="font-size:12px;line-height:1.8">
            <b>${node.name}</b><br/>
            ${isZh ? '风险评分' : 'Risk Score'}: <b>${node.riskScore}</b><br/>
            ${isZh ? '交易量' : 'Volume'}: ¥${node.value.toLocaleString()}
          </div>
        `;
      }
      return '';
    },
  },
  series: [{
    type: 'graph',
    layout: 'force',
    animation: true,
    roam: true,
    label: { show: true, position: 'right', fontSize: 11, color: '#374151' },
    lineStyle: { opacity: 0.7, curveness: 0.2 },
    edgeSymbol: ['none', 'arrow'],
    edgeSymbolSize: [0, 8],
    force: { repulsion: 200, edgeLength: [80, 150], gravity: 0.1 },
    categories: amlNetworkData.categories,
    data: amlNetworkData.nodes,
    links: amlNetworkData.edges,
    emphasis: { focus: 'adjacency', lineStyle: { width: 4 } },
  }],
}), [isZh, typologyFilter]);
```

Use `EChartsWrapper` from `src/components/charts/EChartsWrapper.tsx`, not raw `echarts-for-react`.

---

## 14. Phase 0 Mock Data Examples

### `amlAlerts.ts` (first 5 entries)

```typescript
export const amlAlerts: AmlAlert[] = [
  {
    id: 'ALT-0001',
    caseId: 'CASE-001',
    transactionId: 'TXN-0001',
    date: '2024-11-03',
    amount: 68000,
    transactionType: 'cash',
    senderAccountId: 'ACC-021',
    receiverAccountId: 'ACC-009',
    senderType: 'individual',
    receiverType: 'individual',
    isHighRiskCountry: false,
    historicalFrequency: 18,
    riskScore: 82,
    severity: 'critical',
    triggeredRules: ['PBOC_LARGE_CASH', 'FREQUENT_CASH'],
    fraudLabel: true,
    typology: 'fan-out',
    createdAt: '2024-11-03T09:23:00Z',
  },
  {
    id: 'ALT-0002',
    caseId: 'CASE-002',
    transactionId: 'TXN-0002',
    date: '2024-11-05',
    amount: 3200000,
    transactionType: 'transfer',
    senderAccountId: 'ACC-007',
    receiverAccountId: 'ACC-034',
    senderType: 'corporate',
    receiverType: 'individual',
    isHighRiskCountry: true,
    historicalFrequency: 4,
    riskScore: 74,
    severity: 'high',
    triggeredRules: ['PBOC_LARGE_TRANSFER', 'HIGH_RISK_COUNTRY'],
    fraudLabel: true,
    createdAt: '2024-11-05T14:01:00Z',
  },
  {
    id: 'ALT-0003',
    caseId: 'CASE-003',
    transactionId: 'TXN-0003',
    date: '2024-11-07',
    amount: 49500,
    transactionType: 'cash',
    senderAccountId: 'ACC-015',
    receiverAccountId: 'ACC-021',
    senderType: 'individual',
    receiverType: 'individual',
    isHighRiskCountry: false,
    historicalFrequency: 9,
    riskScore: 61,
    severity: 'high',
    triggeredRules: ['SMURFING'],
    fraudLabel: true,
    typology: 'smurfing',
    createdAt: '2024-11-07T11:45:00Z',
  },
  {
    id: 'ALT-0004',
    caseId: 'CASE-004',
    transactionId: 'TXN-0004',
    date: '2024-11-08',
    amount: 12000,
    transactionType: 'pos',
    senderAccountId: 'ACC-042',
    receiverAccountId: 'ACC-055',
    senderType: 'individual',
    receiverType: 'corporate',
    isHighRiskCountry: false,
    historicalFrequency: 2,
    riskScore: 12,
    severity: 'low',
    triggeredRules: [],
    fraudLabel: false,
    createdAt: '2024-11-08T16:30:00Z',
  },
  {
    id: 'ALT-0005',
    caseId: 'CASE-005',
    transactionId: 'TXN-0005',
    date: '2024-11-09',
    amount: 850000,
    transactionType: 'remittance',
    senderAccountId: 'ACC-003',
    receiverAccountId: 'ACC-071',
    senderType: 'individual',
    receiverType: 'individual',
    isHighRiskCountry: true,
    historicalFrequency: 7,
    riskScore: 68,
    severity: 'high',
    triggeredRules: ['HIGH_RISK_COUNTRY', 'RAPID_MOVEMENT'],
    fraudLabel: false,
    createdAt: '2024-11-09T08:55:00Z',
  },
];
```

### `amlCases.ts` (first 3 entries)

```typescript
export const amlCases: AmlCase[] = [
  {
    id: 'CASE-001',
    alertIds: ['ALT-0001'],
    status: 'ready_for_supervisor_review',
    subjectAccountId: 'ACC-021',
    subjectType: 'individual',
    summary: 'High-frequency cash deposits exceeding PBOC reporting threshold, potential fan-out structuring pattern',
    keyFindings: [
      'Single cash transaction of ¥68,000 exceeds PBOC ¥50,000 reporting threshold',
      '18 transactions in past 30 days indicates high-frequency cash activity',
      'Funds distributed to 3 counterparties within 48 hours (fan-out pattern)',
      'DGraph-Fin model assigns 82/100 fraud score based on behavioral features',
    ],
    suggestedTypologies: ['smurfing', 'fan_out'],
    reportingUrgency: 'priority',
    reportingDeadline: '2024-11-08',
    analystNotes: '',
    lastUpdated: '2024-11-04T10:00:00Z',
  },
  {
    id: 'CASE-002',
    alertIds: ['ALT-0002'],
    status: 'under_review',
    subjectAccountId: 'ACC-007',
    subjectType: 'corporate',
    summary: 'Large corporate transfer to individual in high-risk jurisdiction',
    keyFindings: [
      'Transfer of ¥3,200,000 to individual account exceeds PBOC ¥2M threshold',
      'Receiving jurisdiction is FATF-listed high-risk country',
      'Corporate-to-individual pattern atypical for stated business purpose',
    ],
    suggestedTypologies: ['layering', 'high_risk_jurisdiction'],
    reportingUrgency: 'priority',
    reportingDeadline: '2024-11-10',
    analystNotes: '',
    lastUpdated: '2024-11-06T09:00:00Z',
  },
  {
    id: 'CASE-003',
    alertIds: ['ALT-0003'],
    status: 'need_more_evidence',
    subjectAccountId: 'ACC-015',
    subjectType: 'individual',
    summary: 'Potential structuring — repeated cash transactions just below ¥50,000 threshold',
    keyFindings: [
      'Multiple cash transactions between ¥40,000 and ¥49,999',
      'Pattern consistent with deliberate threshold avoidance (smurfing)',
      'Counterparty ACC-021 already under active investigation (CASE-001)',
    ],
    suggestedTypologies: ['smurfing'],
    reportingUrgency: 'normal',
    analystNotes: '',
    lastUpdated: '2024-11-07T15:00:00Z',
  },
];
```

### `amlRegulations.ts` (first 3 mock chunks)

```typescript
export const amlRegulations: RegulationChunk[] = [
  {
    id: 'REG-001',
    source: 'aml_law_2024',
    sourceTitle: '反洗钱法（2024修订）',
    article: '第三十一条',
    text: '义务机构应当按照规定向中国人民银行或者其分支机构报告大额交易和可疑交易。单笔或者当日累计现金收付金额超过人民币五万元或者外币等值一万美元的，应当报告大额现金交易。',
    keywords: ['大额', '现金', '五万元', '报告', '义务机构', '可疑交易'],
    lang: 'zh',
  },
  {
    id: 'REG-002',
    source: 'aml_law_2024',
    sourceTitle: '反洗钱法（2024修订）',
    article: '第三十三条',
    text: '义务机构发现可疑交易，应当在五个工作日内向中国反洗钱监测分析中心报告。情况紧急的，应当立即报告。',
    keywords: ['可疑交易', '五个工作日', '报告', 'CAMLMAC', '中国反洗钱监测分析中心'],
    lang: 'zh',
  },
  {
    id: 'REG-003',
    source: 'fatf_china_2019',
    sourceTitle: 'FATF China Mutual Evaluation Report 2019',
    article: 'Immediate Outcome 5',
    text: 'China has a generally sound legal framework for AML/CFT. However, effectiveness gaps exist in beneficial ownership transparency, with nominee shareholders widely used to obscure ultimate ownership of legal persons and arrangements.',
    keywords: ['beneficial ownership', 'nominee shareholders', 'transparency', 'legal persons', 'effectiveness'],
    lang: 'en',
  },
];
```

---

## 15. i18n Key Schema

### New keys in `en.json`

```json
{
  "projects": {
    "items": {
      "amlSentinel": {
        "slug": "aml-sentinel",
        "title": "AML Sentinel: China AML Investigation Workbench",
        "summary": "A bank-style AML compliance workbench combining real Chinese financial fraud data (DGraph-Fin by Finvolution), PBOC regulatory RAG, and an AI Agent that auto-drafts Suspicious Transaction Reports — designed around the full analyst investigation workflow.",
        "overview": "AML Sentinel is a portfolio-grade prototype of a bank AML investigation and reporting platform. It models the full compliance workflow: alert triage, case investigation, regulation lookup, and STR drafting — each step grounded in China's regulatory framework. Transaction data is preprocessed from DGraph-Fin (Finvolution, NeurIPS 2022) and IBM AML (NeurIPS 2023). The regulatory knowledge base covers the revised 反洗钱法 2024, FATF China 2019 Mutual Evaluation, and KPMG's compliance analysis. The STR generator deploys a 6-step Anthropic claude-sonnet-4-6 Agent that autonomously investigates a flagged case and produces a draft Suspicious Transaction Report in CAMLMAC format.",
        "features": {
          "alerts": "Alert Queue — PBOC threshold rules applied to transaction data; severity triage with rule explanations and risk score breakdowns",
          "cases": "Case Overview — Structured case lifecycle (6 states), key findings, reporting urgency timer, analyst notes",
          "network": "Investigation Workspace — ECharts force-directed graph with fan-out, fan-in, and cycle pattern highlighting; investigation checklist",
          "rag": "Regulation Copilot — Hybrid BM25 + Anthropic API Q&A over 反洗钱法 2024, FATF China MER 2019, and KPMG AML analysis; every answer cites specific article numbers",
          "str": "STR Auto-Draft — 6-step AI Agent using claude-sonnet-4-6 tool_use: case extraction → account analysis → regulation retrieval → typology classification → urgency assessment → CAMLMAC-format report generation"
        },
        "methodology": "Data layer: DGraph-Fin node features are mapped to alert risk signals; IBM AML HI-Small provides labeled laundering typology patterns for the network graph. Regulatory RAG uses client-side BM25 keyword overlap to retrieve top-5 chunks from ~80 pre-chunked regulatory excerpts, then passes them to Anthropic claude-sonnet-4-6 via streaming API for grounded answer generation. STR generation uses an agentic tool_use loop: Claude iteratively calls 5 deterministic tools, then produces a structured STR draft in CAMLMAC format. The system always maintains human-in-the-loop: AI output is advisory, never auto-submitted."
      }
    }
  },
  "amlSentinel": {
    "views": {
      "alerts": "Alert Queue",
      "case": "Case Overview",
      "network": "Investigation",
      "rag": "Regulation Q&A",
      "str": "STR Draft"
    },
    "summary": {
      "total": "Total Alerts",
      "critical": "Critical",
      "highRisk": "High Risk",
      "pbocFilings": "PBOC Filings"
    },
    "alerts": {
      "title": "Alert Queue",
      "subtitle": "PBOC Threshold Rules + DGraph-Fin Precomputed Risk Scores",
      "filterAll": "All",
      "filterCritical": "Critical",
      "filterHigh": "High",
      "filterMedium": "Medium",
      "filterLow": "Low",
      "columns": {
        "id": "Alert ID",
        "date": "Date",
        "amount": "Amount",
        "type": "Type",
        "severity": "Severity",
        "rules": "Triggered Rules"
      },
      "rules": {
        "PBOC_LARGE_CASH": "PBOC Large Cash (>=¥50,000)",
        "PBOC_LARGE_TRANSFER": "PBOC Large Transfer (>=¥2,000,000)",
        "HIGH_RISK_COUNTRY": "High-Risk Jurisdiction",
        "SMURFING": "Potential Smurfing",
        "RAPID_MOVEMENT": "Rapid Fund Movement (<24h)",
        "FREQUENT_CASH": "High-Frequency Cash (>5/day)"
      }
    },
    "case": {
      "title": "Case Overview",
      "status": {
        "new_alert": "New Alert",
        "under_review": "Under Review",
        "need_more_evidence": "Need More Evidence",
        "ready_for_supervisor_review": "Pending Supervisor Review",
        "closed_false_positive": "Closed — False Positive",
        "ready_for_reporting": "Ready for Reporting"
      },
      "urgency": {
        "normal": "Normal",
        "priority": "Priority",
        "immediate": "Immediate"
      },
      "keyFindings": "Key Findings",
      "suggestedTypologies": "Suggested Typologies",
      "reportingDeadline": "Reporting Deadline",
      "analystNotes": "Analyst Notes",
      "toInvestigation": "Open Investigation Workspace",
      "toStr": "Draft STR"
    },
    "network": {
      "title": "Transaction Network",
      "subtitle": "IBM AML HI-Small Typology Labels — Click nodes to explore",
      "categories": {
        "normal": "Normal",
        "suspicious": "Suspicious",
        "fraud": "Confirmed Fraud"
      },
      "typologies": {
        "all": "All",
        "fanOut": "Fan-Out (Smurfing)",
        "fanIn": "Fan-In (Layering)",
        "cycle": "Cycle (Round-Trip)"
      },
      "checklist": "Investigation Checklist"
    },
    "rag": {
      "title": "Regulatory Knowledge Base",
      "subtitle": "反洗钱法 2024 · FATF China 2019 · KPMG AML Analysis · CAMLMAC Report",
      "placeholder": "Ask about China AML regulations...",
      "submit": "Search",
      "suggestedQueries": [
        "What is the cash reporting threshold under PBOC rules?",
        "What are the STR filing deadlines?",
        "Which institutions are covered by the 2024 AML Law?",
        "What typologies did FATF identify in China's MER 2019?",
        "What is the penalty for failing to file a suspicious transaction report?",
        "How is beneficial ownership defined under the 2024 amendments?"
      ],
      "pipeline": {
        "retrieving": "Retrieving relevant regulations",
        "ranking": "Ranking by relevance",
        "generating": "Generating answer"
      },
      "sources": "Sources",
      "error": "Error retrieving answer. Please try again.",
      "noResults": "No relevant regulations found. Try different keywords."
    },
    "str": {
      "title": "Suspicious Transaction Report Generator",
      "subtitle": "6-step AI Agent · CAMLMAC Format · claude-sonnet-4-6",
      "selectPrompt": "Open a case from the Alert Queue to generate an STR",
      "generate": "Generate STR Draft",
      "agentSteps": {
        "step1": "Extracting case details",
        "step2": "Analyzing account transaction history",
        "step3": "Retrieving applicable regulatory provisions",
        "step4": "Classifying money laundering typology",
        "step5": "Assessing reporting urgency and deadline",
        "step6": "Drafting STR in CAMLMAC format"
      },
      "report": "Generated Report",
      "copy": "Copy",
      "copied": "Copied",
      "disclaimer": "This output is generated for demonstration purposes only and does not constitute an actual regulatory filing. Do not submit to CAMLMAC."
    }
  }
}
```

### New keys in `zh.json` (parallel)

```json
{
  "projects": {
    "items": {
      "amlSentinel": {
        "slug": "aml-sentinel",
        "title": "AML Sentinel：中国场景反洗钱合规调查工作台",
        "summary": "银行级 AML 合规调查工作台原型，结合信也科技 DGraph-Fin 真实欺诈数据、PBOC 监管 RAG 与 AI Agent 自动起草可疑交易报告，完整模拟合规分析师调查工作流。"
      }
    }
  },
  "amlSentinel": {
    "views": {
      "alerts": "预警队列",
      "case": "案件概览",
      "network": "关系调查",
      "rag": "监管知识库",
      "str": "STR 报告"
    },
    "summary": {
      "total": "预警总数",
      "critical": "极高风险",
      "highRisk": "高风险",
      "pbocFilings": "PBOC 申报触发"
    },
    "alerts": {
      "title": "预警队列",
      "subtitle": "PBOC 阈值规则 + DGraph-Fin 预计算风险评分",
      "filterAll": "全部",
      "filterCritical": "极高风险",
      "filterHigh": "高风险",
      "filterMedium": "中风险",
      "filterLow": "低风险",
      "columns": {
        "id": "预警编号",
        "date": "日期",
        "amount": "金额",
        "type": "类型",
        "severity": "风险等级",
        "rules": "触发规则"
      },
      "rules": {
        "PBOC_LARGE_CASH": "PBOC 大额现金（≥5万元）",
        "PBOC_LARGE_TRANSFER": "PBOC 大额转账（≥200万元）",
        "HIGH_RISK_COUNTRY": "高风险司法管辖区",
        "SMURFING": "疑似化整为零",
        "RAPID_MOVEMENT": "资金快速流转（24小时内）",
        "FREQUENT_CASH": "高频现金交易（>5次/日）"
      }
    },
    "case": {
      "title": "案件概览",
      "status": {
        "new_alert": "新预警",
        "under_review": "调查中",
        "need_more_evidence": "需补充证据",
        "ready_for_supervisor_review": "待主管审核",
        "closed_false_positive": "已关闭（误报）",
        "ready_for_reporting": "待上报"
      },
      "urgency": {
        "normal": "普通",
        "priority": "优先",
        "immediate": "立即"
      },
      "keyFindings": "关键发现",
      "suggestedTypologies": "建议洗钱类型",
      "reportingDeadline": "上报截止日期",
      "analystNotes": "分析师备注",
      "toInvestigation": "打开关系调查",
      "toStr": "起草 STR"
    },
    "network": {
      "title": "资金关联网络图",
      "subtitle": "IBM AML HI-Small 洗钱类型标注 — 点击节点探索",
      "categories": {
        "normal": "正常账户",
        "suspicious": "可疑账户",
        "fraud": "确认欺诈"
      },
      "typologies": {
        "all": "全部",
        "fanOut": "扇形分散（化整为零）",
        "fanIn": "资金归集（化零为整）",
        "cycle": "循环对倒"
      },
      "checklist": "调查检查清单"
    },
    "rag": {
      "title": "监管知识库问答",
      "subtitle": "反洗钱法 2024 · FATF 中国报告 2019 · KPMG 合规分析 · CAMLMAC 报告",
      "placeholder": "输入中国反洗钱合规问题...",
      "submit": "检索",
      "suggestedQueries": [
        "单笔现金交易超过多少需要大额申报？",
        "可疑交易报告的法定上报时限是多少？",
        "反洗钱法 2024 将哪些机构纳入义务范围？",
        "FATF 2019 年评估中指出中国的主要风险点是什么？",
        "未按规定上报可疑交易的法律处罚是什么？",
        "化整为零交易的认定标准是什么？"
      ],
      "pipeline": {
        "retrieving": "正在检索相关法规",
        "ranking": "相关度排序",
        "generating": "正在生成答案"
      },
      "sources": "来源",
      "error": "检索出错，请重试。",
      "noResults": "未找到相关法规，请尝试其他关键词。"
    },
    "str": {
      "title": "可疑交易报告自动起草",
      "subtitle": "6 步 AI Agent · CAMLMAC 格式 · claude-sonnet-4-6",
      "selectPrompt": "请从预警队列中打开一个案件，然后在此生成 STR",
      "generate": "生成 STR 草稿",
      "agentSteps": {
        "step1": "提取案件基本信息",
        "step2": "分析账户历史交易行为",
        "step3": "检索适用监管条文",
        "step4": "识别洗钱类型",
        "step5": "评估上报紧迫性与时限",
        "step6": "起草 CAMLMAC 格式 STR"
      },
      "report": "生成报告",
      "copy": "复制",
      "copied": "已复制",
      "disclaimer": "本输出仅供演示，不构成实际监管申报文件，请勿向 CAMLMAC 提交。"
    }
  }
}
```

---

## 16. Project Registration

### `src/lib/projects.ts` — add entry

```typescript
{ slug: 'aml-sentinel', tags: ['riskAnalytics', 'aiAgent', 'rag', 'llm'], featured: true, hasDemo: true }
```

### `src/app/[locale]/projects/[slug]/page.tsx` — add case

```tsx
{project.hasDemo && slug === 'aml-sentinel' && (
  <div className="mt-16">
    <DemoSectionHeader title={messages.projects.items.amlSentinel.title} />
    <AmlSentinelTool isZh={locale === 'zh'} messages={messages.amlSentinel} />
  </div>
)}
```

---

## 17. Python Script Specifications

### `scripts/aml/preprocess_cases.py`

```
Input:  DGraph-Fin (torch_geometric.datasets.DGraphFin)
Output: src/lib/amlAlerts.ts + src/lib/amlCases.ts

Steps:
1. Load dataset: DGraphFin(root='./data/dgraphfin')
2. Filter: labeled nodes only (data.y != 2)
3. Stratified sample: 200 fraud (y=1) + 300 normal (y=0) = 500 total
4. Feature extraction from data.x (20-dim feature vector):
   - x[0] → historicalFrequency (rescale to 0–50 int)
   - x[1] → amount (rescale to 10,000–5,000,000 RMB)
   - x[2] → isHighRiskCountry (threshold 0.5)
   - assign transactionType probabilistically by amount range
5. PBOC rule assignment:
   - amount >= 50000 AND type='cash'       → PBOC_LARGE_CASH
   - amount >= 2000000 AND type='transfer' → PBOC_LARGE_TRANSFER
   - isHighRiskCountry=True               → HIGH_RISK_COUNTRY
   - amount in [40000, 49999] repeatedly  → SMURFING
   - historicalFrequency > 15             → FREQUENT_CASH
6. Risk score formula:
   baseScore = fraudLabel * 50
   ruleScore = len(triggeredRules) * 12
   freqScore = min(historicalFrequency / 50 * 20, 20)
   riskScore = min(baseScore + ruleScore + freqScore, 100)
7. severity: 0–30=low, 31–59=medium, 60–79=high, 80+=critical
8. Cluster high-risk alerts into cases: group by connected accounts
9. Assign CaseStatus based on riskScore and fraudLabel
10. Write amlAlerts.ts + amlCases.ts
```

### `scripts/aml/build_network.py`

```
Input:  IBM AML HI-Small CSV
Output: src/lib/amlNetworkData.ts

Steps:
1. Load HI-Small_Trans.csv
2. Filter to labeled laundering transactions (Is Laundering = 1)
3. Build directed graph (networkx.DiGraph)
4. Extract subgraphs: fan-out (outdegree>3), fan-in (indegree>3), cycle (len 3–5)
5. Merge subgraphs + 20 normal nodes → total ~50 nodes
6. Assign colors:
   - fraud nodes → primary-800 (#134e4a)
   - suspicious nodes → primary-500 (#0d9488)
   - normal nodes → primary-200 (#99f6e4)
7. Edge width = log10(amount) mapped to 1–5
8. Write amlNetworkData.ts
```

### `scripts/aml/chunk_regulations.py`

```
Input:  4 local regulatory files (downloaded separately)
Output: src/lib/amlRegulations.ts

Documents:
  aml_law_2024.txt      Chinese, scraped from PBOC HTML
  kpmg_china_aml.pdf    English
  fatf_china_2019.pdf   English (chapters 1, 3, 4)
  camlmac_report_2023.pdf  English (executive summary)

Chunking:
  Chinese: split at '第.+条' regex (article boundaries)
  English: split at 'Recommendation \d+|Article \d+|Section \d+' boundaries
  chunk_size max: 512 chars; overlap: 64 chars
  Keywords: jieba for ZH; NLTK stopword removal for EN; top 8 terms

Output: ~80 RegulationChunk objects
```

---

## 18. File Manifest

### New files (11)

```
src/components/AmlSentinelTool.tsx
src/lib/amlAlerts.ts
src/lib/amlCases.ts
src/lib/amlNetworkData.ts
src/lib/amlRegulations.ts
src/lib/amlConfig.ts
src/app/api/aml/rag/route.ts
src/app/api/aml/str/route.ts
scripts/aml/preprocess_cases.py
scripts/aml/build_network.py
scripts/aml/chunk_regulations.py
```

### Modified files (5)

```
src/lib/projects.ts
src/i18n/messages/en.json
src/i18n/messages/zh.json
src/app/[locale]/projects/[slug]/page.tsx
.env.example                              (add ANTHROPIC_API_KEY=)
```

### New dependency (1)

```bash
npm install @anthropic-ai/sdk
```

### Reference files (read-only)

```
src/components/RagQATool.tsx            Tab 3 UI reference
src/components/MultiAgentTool.tsx       Tab 4 UI reference
src/components/charts/EChartsWrapper.tsx
tailwind.config.ts
package.json
```

---

## 19. Implementation Phases

| Phase | Description | Deliverable | Success Criterion |
|---|---|---|---|
| **Phase 0** | Workbench skeleton + mock data | `AmlSentinelTool.tsx` renders 5 views with 10-15 handwritten alert/case rows; registered in portfolio; `npm run build` passes | User can follow one case from alert to STR draft UI |
| **Phase 1** | Rich structured mock data | Replace 10-row mock with 50 alerts + 15 cases + full config; all views render plausible analyst reasoning | UI supports realistic case investigation flow |
| **Phase 2** | Python data + real regulations | Run 3 Python scripts; replace mock with 500-row `amlAlerts.ts`, graph from IBM AML, ~80 `amlRegulations.ts` | Data sourced from real datasets; regulations chunked and searchable |
| **Phase 3** | Anthropic API integration | `/api/aml/rag` and `/api/aml/str` routes live; streaming works end-to-end in Vercel preview | Regulation Q&A returns cited answers; STR Agent loop streams 6 steps |
| **Phase 4** | Deploy + polish | `ANTHROPIC_API_KEY` in Vercel dashboard; `vercel --prod`; smoke test; i18n polish | Interviewer can use the full workflow in under 2 minutes |

---

## 20. Non-Functional Invariants (Codex-audited)

The following must hold true in all generated code:

1. `ANTHROPIC_API_KEY` appears **only** in `src/app/api/aml/*/route.ts` — never in component files or `src/lib/*`
2. All Tailwind color classes match `/primary-\d+|gray-\d+|white|black/` — zero other color families
3. No emoji characters in any `.tsx`, `.ts`, `.json` file
4. `AmlSentinelTool.tsx` has `'use client'` as its first non-comment line
5. API routes do **not** import from `src/components/*`
6. The `disclaimer` i18n key (`amlSentinel.str.disclaimer`) is rendered visibly in the STR view at all times (not hidden, not conditional)
7. All user-visible strings in `AmlSentinelTool.tsx` are sourced from `messages` prop — no hardcoded English/Chinese
8. `src/lib/amlRegulations.ts` exports a `searchRegulations(query, topK)` function used by the RAG view client-side before calling the API
9. STR output area is `readOnly` — never a form input the user can edit directly
10. ECharts component uses `EChartsWrapper` from `src/components/charts/EChartsWrapper.tsx`, not raw `echarts-for-react`
11. API routes are marked `export const dynamic = 'force-dynamic'` to prevent static pre-rendering
12. Case lifecycle state transitions in the UI always require a human action — never triggered automatically by AI output

---

## 21. UX Principles

1. **Explain before you visualize** — every chart paired with a plain-language finding
2. **Workflow over feature gallery** — user progresses through a case, not unrelated demos
3. **AI reduces effort, not responsibility** — generated output is reviewable, editable, clearly advisory
4. **Compliance trust requires traceability** — every claim connects to a rule, signal, or cited regulatory source

---

## 22. Success Criteria for Interview Use

The project succeeds if an interviewer can immediately see:

1. the candidate understands AML workflow, not just AI tooling
2. the candidate can translate regulation and process into product structure
3. the candidate places RAG and Agent inside a business workflow appropriately
4. the candidate can prototype a bank-style middle-office tool with realistic constraints

**Target interviewer takeaway**: "This person understands how an AML analyst works, where AI is useful, and where human review must stay in control."
