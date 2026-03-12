'use client';

import { useCallback, useMemo, useState } from 'react';
import EChartsWrapper from '@/components/charts/EChartsWrapper';
import { amlAlerts, type AlertSeverity, type AmlAlert, type TransactionType } from '@/lib/amlAlerts';
import { amlCases, type AmlCase } from '@/lib/amlCases';
import { investigationChecklist } from '@/lib/amlConfig';
import { amlNetworkData, type NetworkNode } from '@/lib/amlNetworkData';
import { searchRegulations, type RegulationChunk } from '@/lib/amlRegulations';

type ActiveView = 'alerts' | 'case' | 'network' | 'rag' | 'str';
type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';
type TypologyFilter = 'all' | 'fanOut' | 'fanIn' | 'cycle';
type RagStep = 'idle' | 'retrieving' | 'ranking' | 'generating' | 'done';

interface StrStep {
  label: string;
  status: 'idle' | 'running' | 'done';
  detail: string;
}

interface AmlMessages {
  views: Record<string, string>;
  summary: Record<string, string>;
  alerts: Record<string, any>;
  case: Record<string, any>;
  network: Record<string, any>;
  rag: Record<string, any>;
  str: Record<string, any>;
}

interface RagStreamEvent {
  type: 'status' | 'answer_delta' | 'done' | 'error';
  status?: RagStep;
  delta?: string;
  message?: string;
}

interface StrStreamEvent {
  type: 'step' | 'report_delta' | 'done' | 'error';
  stepIndex?: number;
  status?: StrStep['status'];
  detail?: string;
  delta?: string;
  message?: string;
}

const SEVERITY_COLORS: Record<AlertSeverity, string> = {
  critical: 'bg-primary-800 text-white',
  high: 'bg-primary-600 text-white',
  medium: 'bg-primary-400 text-white',
  low: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

const URGENCY_COLORS: Record<string, string> = {
  normal: 'text-gray-500',
  priority: 'text-primary-600 dark:text-primary-400',
  immediate: 'text-primary-800 dark:text-primary-300 font-bold',
};

const LIFECYCLE = [
  'new_alert',
  'under_review',
  'need_more_evidence',
  'ready_for_supervisor_review',
  'closed_false_positive',
  'ready_for_reporting',
] as const;

const NODE_DEGREES = amlNetworkData.edges.reduce<Record<string, { incoming: number; outgoing: number }>>(
  (accumulator, edge) => {
    accumulator[edge.source] = accumulator[edge.source] ?? { incoming: 0, outgoing: 0 };
    accumulator[edge.target] = accumulator[edge.target] ?? { incoming: 0, outgoing: 0 };
    accumulator[edge.source].outgoing += 1;
    accumulator[edge.target].incoming += 1;
    return accumulator;
  },
  {}
);

function formatAmount(amount: number, isZh: boolean): string {
  return `CNY ${amount.toLocaleString(isZh ? 'zh-CN' : 'en-US')}`;
}

function getTransactionTypeLabel(transactionType: TransactionType, messages: AmlMessages): string {
  return messages.alerts.transactionTypes?.[transactionType] ?? transactionType;
}

function getSeverityLabel(severity: AlertSeverity, messages: AmlMessages): string {
  switch (severity) {
    case 'critical':
      return messages.alerts.filterCritical;
    case 'high':
      return messages.alerts.filterHigh;
    case 'medium':
      return messages.alerts.filterMedium;
    default:
      return messages.alerts.filterLow;
  }
}

function matchesTypology(node: NetworkNode, filter: TypologyFilter): boolean {
  if (filter === 'all') {
    return true;
  }

  const description = node.typology?.toLowerCase() ?? '';
  const degrees = NODE_DEGREES[node.id] ?? { incoming: 0, outgoing: 0 };

  if (filter === 'fanOut') {
    return description.includes('fan-out') || description.includes('fan out') || degrees.outgoing > 1;
  }

  if (filter === 'fanIn') {
    return description.includes('fan-in') || description.includes('fan in') || degrees.incoming > 1;
  }

  return description.includes('cycle');
}

function renderTemplate(template: string, replacements: Record<string, string>): string {
  return Object.entries(replacements).reduce(
    (output, [key, value]) => output.replaceAll(`{${key}}`, value),
    template
  );
}

async function consumeSseStream<T>(
  response: Response,
  onEvent: (event: T) => void
): Promise<void> {
  if (!response.body) {
    throw new Error('Missing response body.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) {
        continue;
      }
      onEvent(JSON.parse(trimmed.slice(5).trim()) as T);
    }
  }

  buffer += decoder.decode();
  for (const line of buffer.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) {
      continue;
    }
    onEvent(JSON.parse(trimmed.slice(5).trim()) as T);
  }
}

function getMockStrDraft(
  amlCase: AmlCase,
  primaryAlert: AmlAlert,
  messages: AmlMessages,
  isZh: boolean
): string {
  const template = messages.str.template;
  const accountType =
    amlCase.subjectType === 'individual' ? template.individual : template.corporate;
  const typologies =
    amlCase.suggestedTypologies.length > 0
      ? amlCase.suggestedTypologies.join(', ')
      : template.none;
  const rules =
    primaryAlert.triggeredRules.length > 0
      ? primaryAlert.triggeredRules.map((rule) => messages.alerts.rules[rule] ?? rule).join(', ')
      : template.none;
  const findings = amlCase.keyFindings.map((finding, index) => `${index + 1}. ${finding}`).join('\n');
  const recommendation = renderTemplate(template.recommendationText, {
    urgency: messages.case.urgency[amlCase.reportingUrgency],
    deadline: amlCase.reportingDeadline ?? template.notAvailable,
  });

  return [
    template.title,
    template.demoOnly,
    '',
    `${template.institution}: ${template.institutionValue}`,
    `${template.reportDate}: ${new Date().toLocaleDateString(isZh ? 'zh-CN' : 'en-US')}`,
    `${template.caseId}: ${amlCase.id}`,
    '',
    `1. ${template.subjectSection}`,
    `${template.account}: ${amlCase.subjectAccountId}`,
    `${template.accountType}: ${accountType}`,
    `${template.riskLevel}: ${primaryAlert.severity.toUpperCase()} (${primaryAlert.riskScore}/100)`,
    '',
    `2. ${template.transactionSection}`,
    `${template.transactionId}: ${primaryAlert.transactionId}`,
    `${template.transactionDate}: ${primaryAlert.date}`,
    `${template.amount}: ${formatAmount(primaryAlert.amount, isZh)}`,
    `${template.transactionType}: ${getTransactionTypeLabel(primaryAlert.transactionType, messages)}`,
    `${template.triggeredRules}: ${rules}`,
    '',
    `3. ${template.activitySection}`,
    findings,
    `${template.suggestedTypologies}: ${typologies}`,
    '',
    `4. ${template.regulatorySection}`,
    template.article31,
    template.article33,
    '',
    `5. ${template.urgencySection}`,
    `${template.urgency}: ${messages.case.urgency[amlCase.reportingUrgency]}`,
    `${template.deadline}: ${amlCase.reportingDeadline ?? template.notAvailable}`,
    '',
    `6. ${template.recommendationSection}`,
    recommendation,
    '',
    template.footer,
  ].join('\n');
}

function SeverityBadge({
  severity,
  label,
}: {
  severity: AlertSeverity;
  label: string;
}) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${SEVERITY_COLORS[severity]}`}>
      {label}
    </span>
  );
}

function ViewTab({
  id,
  label,
  active,
  onClick,
}: {
  id: ActiveView;
  label: string;
  active: boolean;
  onClick: (view: ActiveView) => void;
}) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'bg-primary-500 text-white shadow-sm'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

export default function AmlSentinelTool({
  isZh,
  messages,
}: {
  isZh: boolean;
  messages: AmlMessages;
}) {
  const [activeView, setActiveView] = useState<ActiveView>('alerts');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [typologyFilter, setTypologyFilter] = useState<TypologyFilter>('all');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [ragQuery, setRagQuery] = useState('');
  const [ragChunks, setRagChunks] = useState<RegulationChunk[]>([]);
  const [ragAnswer, setRagAnswer] = useState('');
  const [ragLoading, setRagLoading] = useState(false);
  const [ragStep, setRagStep] = useState<RagStep>('idle');
  const [strReport, setStrReport] = useState('');
  const [strLoading, setStrLoading] = useState(false);
  const [strCopied, setStrCopied] = useState(false);

  const stepLabels = useMemo(
    () => [
      messages.str.agentSteps.step1,
      messages.str.agentSteps.step2,
      messages.str.agentSteps.step3,
      messages.str.agentSteps.step4,
      messages.str.agentSteps.step5,
      messages.str.agentSteps.step6,
    ],
    [messages.str.agentSteps]
  );

  const [strSteps, setStrSteps] = useState<StrStep[]>(
    stepLabels.map((label) => ({ label, status: 'idle', detail: '' }))
  );

  const selectedCase = useMemo(
    () => (selectedCaseId ? amlCases.find((amlCase) => amlCase.id === selectedCaseId) ?? null : null),
    [selectedCaseId]
  );
  const selectedCaseAlerts = useMemo(
    () => (selectedCase ? amlAlerts.filter((alert) => selectedCase.alertIds.includes(alert.id)) : []),
    [selectedCase]
  );
  const primaryCaseAlert = useMemo(
    () =>
      selectedCaseAlerts.length > 0
        ? [...selectedCaseAlerts].sort((left, right) => right.riskScore - left.riskScore)[0]
        : null,
    [selectedCaseAlerts]
  );
  const filteredAlerts = useMemo(() => {
    if (severityFilter === 'all') {
      return amlAlerts;
    }
    return amlAlerts.filter((alert) => alert.severity === severityFilter);
  }, [severityFilter]);

  const summaryStats = useMemo(
    () => ({
      total: amlAlerts.length,
      critical: amlAlerts.filter((alert) => alert.severity === 'critical').length,
      highRisk: amlAlerts.filter((alert) => alert.severity === 'high').length,
      pbocFilings: amlAlerts.filter(
        (alert) =>
          alert.triggeredRules.includes('PBOC_LARGE_CASH') ||
          alert.triggeredRules.includes('PBOC_LARGE_TRANSFER')
      ).length,
    }),
    []
  );

  const networkOption = useMemo(() => {
    const caseAccountIds = new Set<string>();
    for (const alert of selectedCaseAlerts) {
      caseAccountIds.add(alert.senderAccountId);
      caseAccountIds.add(alert.receiverAccountId);
    }

    const typologyMatchIds = new Set<string>();
    for (const node of amlNetworkData.nodes) {
      if (matchesTypology(node, typologyFilter)) {
        typologyMatchIds.add(node.id);
      }
    }

    let focusIds = new Set<string>();
    if (selectedCase && typologyFilter !== 'all') {
      for (const id of caseAccountIds) {
        if (typologyMatchIds.has(id)) {
          focusIds.add(id);
        }
      }
      if (focusIds.size === 0) {
        focusIds = typologyMatchIds;
      }
    } else if (selectedCase) {
      focusIds = caseAccountIds;
    } else if (typologyFilter !== 'all') {
      focusIds = typologyMatchIds;
    }

    const hasFocus = focusIds.size > 0;
    const categoryLabels = [
      messages.network.categories.normal,
      messages.network.categories.suspicious,
      messages.network.categories.fraud,
    ];

    const nodes = amlNetworkData.nodes.map((node) => {
      const active = !hasFocus || focusIds.has(node.id);
      return {
        ...node,
        symbolSize: Math.max(16, Math.min(40, Math.log10(node.value + 1) * 10)),
        itemStyle: {
          ...node.itemStyle,
          opacity: active ? 1 : 0.18,
        },
        label: {
          show: active,
          position: 'right',
          fontSize: 10,
          color: '#374151',
        },
      };
    });

    const links = amlNetworkData.edges.map((edge) => {
      const active = !hasFocus || (focusIds.has(edge.source) && focusIds.has(edge.target));
      return {
        ...edge,
        lineStyle: {
          ...edge.lineStyle,
          opacity: active ? 0.8 : 0.08,
        },
      };
    });

    return {
      backgroundColor: 'transparent',
      legend: {
        data: categoryLabels,
        top: 8,
        left: 'center',
        textStyle: { color: '#6b7280', fontSize: 11 },
      },
      tooltip: {
        trigger: 'item' as const,
        formatter: (params: { dataType: string; data: NetworkNode }) => {
          if (params.dataType !== 'node') {
            return '';
          }
          const node = params.data;
          return [
            '<div style="font-size:12px;line-height:1.8">',
            `<b>${node.name}</b>`,
            `<br/>${messages.network.riskScore}: <b>${node.riskScore}</b>`,
            `<br/>${messages.network.volume}: ${formatAmount(node.value, isZh)}`,
            node.typology ? `<br/><i>${node.typology}</i>` : '',
            '</div>',
          ].join('');
        },
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          roam: true,
          animation: true,
          label: { show: true, position: 'right', fontSize: 10, color: '#374151' },
          lineStyle: { opacity: 0.7, curveness: 0.15 },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [0, 8],
          force: { repulsion: 180, edgeLength: [60, 140], gravity: 0.1 },
          categories: categoryLabels.map((name) => ({ name })),
          data: nodes,
          links,
          emphasis: { focus: 'adjacency', lineStyle: { width: 4 } },
        },
      ],
    };
  }, [isZh, messages.network, selectedCase, selectedCaseAlerts, typologyFilter]);

  const handleSelectAlert = useCallback((alert: AmlAlert) => {
    setSelectedAlertId(alert.id);
    setSelectedCaseId(alert.caseId);
    setSelectedNode(null);
    setTypologyFilter('all');
    setActiveView('case');
  }, []);

  const handleRagQuery = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) {
        return;
      }

      setRagLoading(true);
      setRagAnswer('');
      setRagChunks([]);
      setRagStep('retrieving');

      await new Promise((resolve) => setTimeout(resolve, 250));

      const chunks = searchRegulations(trimmed, 5);
      setRagChunks(chunks);
      setRagStep('ranking');

      if (chunks.length === 0) {
        setRagAnswer(messages.rag.noResults);
        setRagStep('done');
        setRagLoading(false);
        return;
      }

      try {
        setRagStep('generating');

        const response = await fetch('/api/aml/rag', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: trimmed,
            relevantChunks: chunks,
            locale: isZh ? 'zh' : 'en',
          }),
        });

        if (!response.ok) {
          throw new Error(`RAG route failed with status ${response.status}.`);
        }

        await consumeSseStream<RagStreamEvent>(response, (event) => {
          if (event.type === 'status' && event.status) {
            setRagStep(event.status);
            return;
          }

          if (event.type === 'answer_delta' && event.delta) {
            setRagAnswer((previous) => previous + event.delta);
            return;
          }

          if (event.type === 'error') {
            throw new Error(event.message || messages.rag.error);
          }
        });
      } catch {
        const topChunk = chunks[0];
        setRagAnswer(
          renderTemplate(messages.rag.demoAnswerTemplate, {
            demoNote: messages.rag.demoNote,
            sourceTitle: topChunk.sourceTitle,
            article: topChunk.article,
            text: topChunk.text,
          })
        );
      } finally {
        setRagStep('done');
        setRagLoading(false);
      }
    },
    [isZh, messages.rag]
  );

  const handleGenerateStr = useCallback(async () => {
    if (!selectedCase || !primaryCaseAlert) {
      return;
    }

    setStrLoading(true);
    setStrReport('');
    setStrCopied(false);
    setStrSteps(stepLabels.map((label) => ({ label, status: 'idle', detail: '' })));

    try {
      const response = await fetch('/api/aml/str', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseId: selectedCase.id,
          amlCase: selectedCase,
          caseAlerts: selectedCaseAlerts,
          locale: isZh ? 'zh' : 'en',
        }),
      });

      if (!response.ok) {
        throw new Error(`STR route failed with status ${response.status}.`);
      }

      await consumeSseStream<StrStreamEvent>(response, (event) => {
        if (event.type === 'step' && typeof event.stepIndex === 'number' && event.status) {
          setStrSteps((previous) =>
            previous.map((step, stepIndex) =>
              stepIndex === event.stepIndex
                ? {
                    ...step,
                    status: event.status as StrStep['status'],
                    detail:
                      event.status === 'done'
                        ? event.detail ?? step.detail
                        : step.detail,
                  }
                : step
            )
          );
          return;
        }

        if (event.type === 'report_delta' && event.delta) {
          setStrReport((previous) => previous + event.delta);
          return;
        }

        if (event.type === 'error') {
          throw new Error(event.message || 'STR streaming failed.');
        }
      });
    } catch {
      setStrSteps(
        stepLabels.map((label) => ({
          label,
          status: 'done',
          detail: label,
        }))
      );
      setStrReport(getMockStrDraft(selectedCase, primaryCaseAlert, messages, isZh));
    } finally {
      setStrLoading(false);
    }
  }, [isZh, messages, primaryCaseAlert, selectedCase, selectedCaseAlerts, stepLabels]);

  const handleCopyStr = useCallback(() => {
    if (!strReport) {
      return;
    }
    navigator.clipboard.writeText(strReport).then(() => {
      setStrCopied(true);
      setTimeout(() => setStrCopied(false), 2000);
    });
  }, [strReport]);

  const AlertQueueView = (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['all', 'critical', 'high', 'medium', 'low'] as SeverityFilter[]).map((filterValue) => (
          <button
            key={filterValue}
            onClick={() => setSeverityFilter(filterValue)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              severityFilter === filterValue
                ? 'bg-primary-500 text-white'
                : 'border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-400'
            }`}
          >
            {filterValue === 'all'
              ? messages.alerts.filterAll
              : getSeverityLabel(filterValue, messages)}
            {filterValue !== 'all' && (
              <span className="ml-1 opacity-70">
                ({amlAlerts.filter((alert) => alert.severity === filterValue).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/60">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">{messages.alerts.columns.id}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">{messages.alerts.columns.date}</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500">{messages.alerts.columns.amount}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">{messages.alerts.columns.type}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">{messages.alerts.columns.severity}</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">{messages.alerts.columns.rules}</th>
              <th className="px-4 py-2.5 text-right text-xs font-semibold text-gray-500">{messages.alerts.columns.score}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert) => (
              <tr
                key={alert.id}
                onClick={() => handleSelectAlert(alert)}
                className={`cursor-pointer border-b border-gray-50 transition-colors last:border-0 hover:bg-primary-50/50 dark:border-gray-800/50 dark:hover:bg-primary-900/10 ${
                  selectedAlertId === alert.id ? 'bg-primary-50/80 dark:bg-primary-900/20' : ''
                }`}
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{alert.id}</td>
                <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{alert.date}</td>
                <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {formatAmount(alert.amount, isZh)}
                </td>
                <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                  {getTransactionTypeLabel(alert.transactionType, messages)}
                </td>
                <td className="px-4 py-3">
                  <SeverityBadge severity={alert.severity} label={getSeverityLabel(alert.severity, messages)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {alert.triggeredRules.length > 0 ? (
                      alert.triggeredRules.map((rule) => (
                        <span
                          key={rule}
                          className="rounded bg-primary-50 px-1.5 py-0.5 text-[10px] font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        >
                          {messages.alerts.rules[rule] ?? rule}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">{messages.alerts.noRules}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`h-full rounded-full ${
                          alert.riskScore >= 80
                            ? 'bg-primary-800'
                            : alert.riskScore >= 60
                            ? 'bg-primary-600'
                            : alert.riskScore >= 30
                            ? 'bg-primary-400'
                            : 'bg-primary-200'
                        }`}
                        style={{ width: `${alert.riskScore}%` }}
                      />
                    </div>
                    <span className="w-6 text-xs font-semibold text-gray-700 dark:text-gray-300">{alert.riskScore}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAlerts.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-400">{messages.alerts.selectToView}</div>
        )}
      </div>
      <p className="text-xs text-gray-400">{messages.alerts.selectToView}</p>
    </div>
  );
  const CaseView = selectedCase ? (
    <div className="space-y-5">
      <button
        onClick={() => setActiveView('alerts')}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-primary-500"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {messages.case.backToAlerts}
      </button>

      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="flex items-start gap-1 overflow-x-auto pb-1">
          {LIFECYCLE.map((status, index) => {
            const currentIndex = LIFECYCLE.indexOf(selectedCase.status);
            const isActive = status === selectedCase.status;
            const isPast = index < currentIndex;

            return (
              <div key={status} className="flex min-w-0 flex-1 items-start">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : isPast
                        ? 'bg-primary-200 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                        : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
                    }`}
                  >
                    {isPast ? (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-center text-[9px] font-medium leading-tight ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : isPast ? 'text-gray-500' : 'text-gray-400'
                    }`}
                  >
                    {messages.case.status[status] ?? status}
                  </span>
                </div>
                {index < LIFECYCLE.length - 1 && (
                  <div
                    className={`mt-3 h-px flex-1 ${
                      isPast ? 'bg-primary-300 dark:bg-primary-700' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{messages.case.linkedAlerts}</h3>
          <div className="space-y-2">
            {selectedCaseAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-900/40">
                <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{alert.id}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {formatAmount(alert.amount, isZh)}
                  </span>
                  <SeverityBadge severity={alert.severity} label={getSeverityLabel(alert.severity, messages)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {messages.case.reportingUrgency}
            </div>
            <div className={`text-sm font-bold ${URGENCY_COLORS[selectedCase.reportingUrgency]}`}>
              {messages.case.urgency[selectedCase.reportingUrgency]}
            </div>
            {selectedCase.reportingDeadline && (
              <div className="mt-1 text-xs text-gray-500">
                {messages.case.reportingDeadline}:{' '}
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  {selectedCase.reportingDeadline}
                </span>
              </div>
            )}
          </div>

          {selectedCase.suggestedTypologies.length > 0 && (
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {messages.case.suggestedTypologies}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCase.suggestedTypologies.map((typology) => (
                  <span
                    key={typology}
                    className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                  >
                    {typology}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{messages.case.keyFindings}</h3>
        <ul className="space-y-2">
          {selectedCase.keyFindings.map((finding, index) => (
            <li key={finding} className="flex gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-100 text-[10px] font-bold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                {index + 1}
              </span>
              {finding}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setActiveView('network')}
          className="inline-flex items-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100 dark:border-primary-700 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/40"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {messages.case.toInvestigation}
        </button>
        <button
          onClick={() => setActiveView('str')}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-primary-500/20 transition-colors hover:bg-primary-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {messages.case.toStr}
        </button>
      </div>
    </div>
  ) : (
    <div className="py-16 text-center text-sm text-gray-400">{messages.case.noCase}</div>
  );

  const NetworkView = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {(['all', 'fanOut', 'fanIn', 'cycle'] as TypologyFilter[]).map((filterValue) => (
            <button
              key={filterValue}
              onClick={() => setTypologyFilter(filterValue)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                typologyFilter === filterValue
                  ? 'bg-primary-500 text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-400'
              }`}
            >
              {messages.network.typologies[filterValue]}
            </button>
          ))}
        </div>
        {selectedCase && (
          <span className="text-xs text-primary-600 dark:text-primary-400">
            {renderTemplate(messages.network.highlighting, { caseId: selectedCase.id })}
          </span>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EChartsWrapper
            option={networkOption}
            style={{ height: '460px', width: '100%' }}
            onChartReady={(chart) => {
              chart.off('click');
              chart.on('click', (params: { dataType: string; data: NetworkNode }) => {
                if (params.dataType !== 'node') {
                  return;
                }
                const node = amlNetworkData.nodes.find((candidate) => candidate.id === params.data.id);
                if (node) {
                  setSelectedNode(node);
                }
              });
            }}
          />
        </div>

        <div className="space-y-3">
          {selectedNode ? (
            <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-4 dark:border-primary-800 dark:bg-primary-900/10">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                {messages.network.nodeDetail}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{messages.network.account}</span>
                  <span className="font-mono font-semibold">{selectedNode.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{messages.network.riskScore}</span>
                  <span className="font-bold text-primary-700 dark:text-primary-400">{selectedNode.riskScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{messages.network.volume}</span>
                  <span className="font-semibold">{formatAmount(selectedNode.value, isZh)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{messages.network.category}</span>
                  <span className="font-semibold">
                    {selectedNode.category === 2
                      ? messages.network.categories.fraud
                      : selectedNode.category === 1
                      ? messages.network.categories.suspicious
                      : messages.network.categories.normal}
                  </span>
                </div>
                {selectedNode.typology && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">{messages.network.typology}</span>
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[11px] font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                      {selectedNode.typology}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-xs text-gray-400 dark:border-gray-700">
              {messages.network.emptyState}
            </div>
          )}

          <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
            <div className="space-y-1.5">
              {[
                { color: '#134e4a', label: messages.network.categories.fraud },
                { color: '#0d9488', label: messages.network.categories.suspicious },
                { color: '#99f6e4', label: messages.network.categories.normal },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{messages.network.checklist}</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {investigationChecklist.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-start gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={checkedItems.has(item.id)}
                onChange={() => {
                  const next = new Set(checkedItems);
                  if (next.has(item.id)) {
                    next.delete(item.id);
                  } else {
                    next.add(item.id);
                  }
                  setCheckedItems(next);
                }}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary-500"
              />
              <span className={`leading-snug ${checkedItems.has(item.id) ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                {isZh ? item.labelZh : item.labelEn}
                {item.required && <span className="ml-1 text-primary-500">*</span>}
              </span>
            </label>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <span className="text-primary-500">*</span>
          <span>{messages.network.requiredItems}</span>
          <span className="ml-auto font-semibold text-primary-600">
            {checkedItems.size}/{investigationChecklist.length}
          </span>
        </div>
      </div>
    </div>
  );

  const RagView = (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(messages.rag.suggestedQueries as string[]).slice(0, 4).map((query) => (
          <button
            key={query}
            onClick={() => {
              setRagQuery(query);
              void handleRagQuery(query);
            }}
            disabled={ragLoading}
            className="rounded-full border border-primary-200 bg-primary-50/50 px-3 py-1 text-xs text-primary-700 transition-colors hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-300 disabled:opacity-40"
          >
            {query}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <textarea
          value={ragQuery}
          onChange={(event) => setRagQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void handleRagQuery(ragQuery);
            }
          }}
          placeholder={messages.rag.placeholder}
          rows={2}
          disabled={ragLoading}
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        />
        <button
          onClick={() => void handleRagQuery(ragQuery)}
          disabled={ragLoading || !ragQuery.trim()}
          className="shrink-0 rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600 disabled:opacity-40"
        >
          {ragLoading ? '...' : messages.rag.submit}
        </button>
      </div>

      {ragStep !== 'idle' && (
        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-2.5 dark:bg-gray-900/40">
          {(['retrieving', 'ranking', 'generating'] as const).map((step) => {
            const stepOrder = { retrieving: 0, ranking: 1, generating: 2 };
            const currentOrder = { idle: -1, retrieving: 0, ranking: 1, generating: 2, done: 3 }[ragStep];
            const done = currentOrder > stepOrder[step];
            const active = currentOrder === stepOrder[step];

            return (
              <div key={step} className="flex items-center gap-1.5 text-xs">
                {done ? (
                  <svg className="h-3.5 w-3.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : active ? (
                  <span className="h-3 w-3 animate-spin rounded-full border border-primary-300 border-t-primary-600" />
                ) : (
                  <span className="h-3 w-3 rounded-full border border-gray-300" />
                )}
                <span className={active ? 'text-primary-600 dark:text-primary-400' : done ? 'text-gray-500' : 'text-gray-400'}>
                  {messages.rag.pipeline[step]}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {ragChunks.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">{messages.rag.retrieved}</h4>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ragChunks.slice(0, 3).map((chunk) => (
              <div key={chunk.id} className="rounded-xl border border-primary-100 bg-primary-50/30 p-3 dark:border-primary-900/40 dark:bg-primary-900/10">
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                  {chunk.sourceTitle}
                </div>
                <div className="mb-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">{chunk.article}</div>
                <p className="line-clamp-3 text-[11px] leading-relaxed text-gray-600 dark:text-gray-400">{chunk.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {ragAnswer && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">{messages.rag.answer}</h4>
          <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-300">
            <pre className="whitespace-pre-wrap font-sans">{ragAnswer}</pre>
          </div>
        </div>
      )}
    </div>
  );

  const StrView = (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary-200/60 bg-primary-50/40 px-4 py-2.5 text-xs text-primary-700 dark:border-primary-800/40 dark:bg-primary-900/10 dark:text-primary-300">
        {messages.str.disclaimer}
      </div>

      {!selectedCase ? (
        <div className="py-16 text-center text-sm text-gray-400">{messages.str.noCase}</div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {messages.str.currentCase}
              </div>
              <div className="font-mono text-sm font-bold text-primary-600 dark:text-primary-400">{selectedCase.id}</div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{selectedCase.summary}</div>
            </div>

            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {messages.str.agentLog}
              </div>
              <div className="space-y-2.5">
                {strSteps.map((step, index) => (
                  <div key={`${step.label}-${index}`} className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {step.status === 'done' ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500">
                          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : step.status === 'running' ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-200 border-t-primary-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-200 dark:border-gray-700" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-xs font-semibold leading-tight ${
                          step.status === 'running'
                            ? 'text-primary-600 dark:text-primary-400'
                            : step.status === 'done'
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </div>
                      {step.detail && step.status === 'done' && (
                        <div className="mt-0.5 truncate text-[10px] text-gray-400">{step.detail}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => void handleGenerateStr()}
              disabled={strLoading}
              className="w-full rounded-xl bg-primary-500 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-500/20 transition-colors hover:bg-primary-600 disabled:opacity-50"
            >
              {strLoading ? messages.str.generating : messages.str.generate}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{messages.str.report}</span>
              {strReport && (
                <button
                  onClick={handleCopyStr}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
                >
                  {strCopied ? (
                    <>
                      <svg className="h-3.5 w-3.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {messages.str.copied}
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {messages.str.copy}
                    </>
                  )}
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={strReport || (strLoading ? '' : messages.str.placeholder)}
              rows={22}
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-xs leading-relaxed text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300"
            />
            {strReport && <p className="text-[11px] text-gray-400">{messages.str.demoNote}</p>}
          </div>
        </div>
      )}
    </div>
  );

  const activeSection =
    activeView === 'alerts'
      ? messages.alerts
      : activeView === 'case'
      ? messages.case
      : activeView === 'network'
      ? messages.network
      : activeView === 'rag'
      ? messages.rag
      : messages.str;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: messages.summary.total, value: summaryStats.total, color: 'text-gray-800 dark:text-gray-200' },
          { label: messages.summary.critical, value: summaryStats.critical, color: 'text-primary-800 dark:text-primary-300' },
          { label: messages.summary.highRisk, value: summaryStats.highRisk, color: 'text-primary-600 dark:text-primary-400' },
          { label: messages.summary.pbocFilings, value: summaryStats.pbocFilings, color: 'text-primary-500 dark:text-primary-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900/40">
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
            <div className={`mt-0.5 text-2xl font-extrabold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 rounded-xl border border-gray-100 bg-gray-50 p-1.5 dark:border-gray-800 dark:bg-gray-900/40">
        {(['alerts', 'case', 'network', 'rag', 'str'] as ActiveView[]).map((view) => (
          <ViewTab
            key={view}
            id={view}
            label={messages.views[view]}
            active={activeView === view}
            onClick={setActiveView}
          />
        ))}
        {selectedCase && (
          <span className="ml-auto self-center text-xs text-primary-600 dark:text-primary-400">
            {selectedCase.id}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">{activeSection.title}</h3>
        {activeView !== 'case' && activeSection.subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{activeSection.subtitle}</p>
        )}
      </div>

      <div>
        {activeView === 'alerts' && AlertQueueView}
        {activeView === 'case' && CaseView}
        {activeView === 'network' && NetworkView}
        {activeView === 'rag' && RagView}
        {activeView === 'str' && StrView}
      </div>
    </div>
  );
}
