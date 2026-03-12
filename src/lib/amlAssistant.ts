import type { AmlAlert, PbocRule } from './amlAlerts';
import type { AmlCase } from './amlCases';
import { ruleConfigs } from './amlConfig';
import { amlRegulations, searchRegulations, type RegulationChunk } from './amlRegulations';

export type AmlLocale = 'zh' | 'en';

export interface RagRequestBody {
  query: string;
  relevantChunks: RegulationChunk[];
  locale?: AmlLocale;
}

export interface StrRequestBody {
  caseId: string;
  amlCase: AmlCase;
  caseAlerts: AmlAlert[];
  locale?: AmlLocale;
}

export interface ResolvedStrContext {
  primaryAlert: AmlAlert;
  regulationChunks: RegulationChunk[];
  stepDetails: string[];
  promptContext: string;
  fallbackReport: string;
}

const CLEAN_CHUNK_OVERRIDES: Partial<
  Record<
    string,
    Pick<RegulationChunk, 'sourceTitle' | 'article' | 'text' | 'keywords'>
  >
> = {
  'REG-001': {
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第三十一条',
    text:
      '金融机构应当按照规定向中国人民银行或者其分支机构报告大额交易和可疑交易。单笔或者当日累计现金收付金额超过人民币五万元的，应当报告大额现金交易；单笔或者当日累计转账金额超过人民币二百万元的，应当报告大额转账交易。',
    keywords: ['大额现金', '现金交易', '五万元', '大额转账', '二百万元', '报告义务', '人民银行', '申报阈值'],
  },
  'REG-002': {
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第三十三条',
    text:
      '金融机构发现可疑交易的，应当在五个工作日内向中国反洗钱监测分析中心报告。情形紧急的，应当立即报告。金融机构不得以任何形式向当事人或者其他人员泄露已提交可疑交易报告的事实及其内容。',
    keywords: ['可疑交易', '五个工作日', '报告时限', 'CAMLMAC', '中国反洗钱监测分析中心', '立即报告', '紧急上报', '保密要求'],
  },
  'REG-003': {
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第五条',
    text:
      '政策性银行、商业银行、证券公司、基金管理公司、保险公司、信托公司等机构属于反洗钱义务机构，应当履行客户身份识别、交易记录保存和报告义务。',
    keywords: ['义务机构', '商业银行', '证券公司', '保险公司', '信托公司', '适用范围'],
  },
  'REG-004': {
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第二十八条',
    text:
      '反洗钱义务机构应当建立健全客户身份识别制度，在建立业务关系或者提供规定金额以上一次性金融服务时，核验客户和受益所有人的真实身份，并留存相关资料。',
    keywords: ['客户身份识别', '受益所有人', 'KYC', '身份核验', '留存资料', '尽职调查'],
  },
  'REG-005': {
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第五十三条',
    text:
      '反洗钱义务机构未按照规定报告大额交易或者可疑交易的，由有关主管部门责令限期改正，并可以处以罚款；情节严重的，可以对直接责任人员采取行政处罚。',
    keywords: ['处罚', '罚款', '未按规定报告', '行政处罚', '整改要求'],
  },
};

const SOURCE_TITLES: Record<RegulationChunk['source'], Record<AmlLocale, string>> = {
  aml_law_2024: {
    zh: '《反洗钱法（2024）》',
    en: 'AML Law (2024)',
  },
  kpmg_analysis: {
    zh: 'KPMG 中国 AML 新法解读',
    en: 'KPMG China AML Law Analysis',
  },
  fatf_china_2019: {
    zh: 'FATF 中国互评报告 2019',
    en: 'FATF China MER 2019',
  },
  camlmac_report: {
    zh: 'CAMLMAC 稳定性报告 2023',
    en: 'CAMLMAC Stability Report 2023',
  },
};

const DEFAULT_REGULATION_IDS = ['REG-001', 'REG-002', 'REG-007'];

function titleCaseFromSlug(value: string): string {
  return value
    .split(/[_-]+/)
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(' ');
}

function getRuleLabel(ruleId: PbocRule, locale: AmlLocale): string {
  const match = ruleConfigs.find((rule) => rule.id === ruleId);
  if (!match) {
    return ruleId;
  }
  return locale === 'zh' ? match.nameZh : match.nameEn;
}

function normalizeChunk(chunk: RegulationChunk): RegulationChunk {
  const override = CLEAN_CHUNK_OVERRIDES[chunk.id];
  if (!override) {
    return chunk;
  }

  return {
    ...chunk,
    ...override,
  };
}

function getDefaultRegulationChunks(): RegulationChunk[] {
  const fallback = amlRegulations.filter((chunk) => DEFAULT_REGULATION_IDS.includes(chunk.id));
  return fallback.map((chunk) => normalizeChunk(chunk));
}

export function getPrimaryAlert(caseAlerts: AmlAlert[]): AmlAlert | null {
  if (caseAlerts.length === 0) {
    return null;
  }

  return [...caseAlerts].sort((left, right) => right.riskScore - left.riskScore)[0];
}

export function chunkText(text: string, maxChunkSize = 96): string[] {
  if (text.length <= maxChunkSize) {
    return [text];
  }

  const chunks: string[] = [];
  let buffer = '';

  for (const token of text.split(/(\s+)/)) {
    if (buffer.length + token.length > maxChunkSize && buffer.trim()) {
      chunks.push(buffer);
      buffer = token.trimStart();
      continue;
    }
    buffer += token;
  }

  if (buffer.trim()) {
    chunks.push(buffer);
  }

  return chunks.length > 0 ? chunks : [text];
}

export function getCitationLabel(chunk: RegulationChunk, locale: AmlLocale): string {
  const normalized = normalizeChunk(chunk);
  const sourceTitle = SOURCE_TITLES[normalized.source][locale];

  if (normalized.source === 'aml_law_2024') {
    return `${sourceTitle} ${normalized.article}`;
  }

  if (normalized.source === 'fatf_china_2019') {
    return `${sourceTitle}, ${normalized.article}`;
  }

  return `${sourceTitle}, ${normalized.article}`;
}

export function buildRagContextText(relevantChunks: RegulationChunk[], locale: AmlLocale): string {
  return relevantChunks
    .map((chunk) => {
      const normalized = normalizeChunk(chunk);
      return `[${getCitationLabel(normalized, locale)}]\n${normalized.text}`;
    })
    .join('\n\n---\n\n');
}

export function buildRagSystemPrompt(locale: AmlLocale): string {
  if (locale === 'zh') {
    return [
      '你是银行反洗钱合规助手。',
      '只能依据提供的监管摘录作答，不得补充未提供的事实。',
      '回答必须先给结论，再给监管依据，并在关键结论后附上明确引用。',
      '若依据不足，明确说明“现有材料不足以得出确定结论，需要人工复核”。',
      '禁止声称系统会自动报送或自动作出合规决定。',
    ].join(' ');
  }

  return [
    'You are a bank AML compliance copilot.',
    'Answer only from the supplied regulatory excerpts and do not invent extra facts.',
    'Lead with the conclusion, then explain the regulatory basis, and attach explicit citations to key claims.',
    'If the material is insufficient, say that the current evidence is insufficient and manual compliance review is required.',
    'Do not claim the system can auto-file or make autonomous compliance decisions.',
  ].join(' ');
}

export function buildRagFallbackAnswer(
  query: string,
  relevantChunks: RegulationChunk[],
  locale: AmlLocale
): string {
  const normalizedChunks = relevantChunks.map((chunk) => normalizeChunk(chunk));
  const topChunk = normalizedChunks[0];
  const supportingChunks = normalizedChunks.slice(1, 3);

  if (!topChunk) {
    return locale === 'zh'
      ? '现有检索材料不足以回答该问题，需要人工补充法规依据。'
      : 'The retrieved material is insufficient to answer this question and requires manual compliance review.';
  }

  if (locale === 'zh') {
    return [
      `针对“${query}”，当前最直接的依据是 ${getCitationLabel(topChunk, locale)}。`,
      '',
      topChunk.text,
      '',
      supportingChunks.length > 0 ? '补充依据：' : '补充依据：暂无。',
      ...supportingChunks.map(
        (chunk) => `- ${getCitationLabel(chunk, locale)}：${normalizeChunk(chunk).text}`
      ),
      '',
      '以上内容仅用于分析辅助，是否上报仍需合规人员复核。',
    ].join('\n');
  }

  return [
    `For "${query}", the strongest basis in the retrieved materials is ${getCitationLabel(topChunk, locale)}.`,
    '',
    topChunk.text,
    '',
    supportingChunks.length > 0 ? 'Supporting references:' : 'Supporting references: none beyond the primary excerpt.',
    ...supportingChunks.map(
      (chunk) => `- ${getCitationLabel(chunk, locale)}: ${normalizeChunk(chunk).text}`
    ),
    '',
    'This output is advisory only and still requires analyst review before any filing decision.',
  ].join('\n');
}

function buildStrRegulationQuery(amlCase: AmlCase, caseAlerts: AmlAlert[]): string {
  const ruleTerms = caseAlerts.flatMap((alert) => alert.triggeredRules);
  const typologyTerms = amlCase.suggestedTypologies;
  return [...ruleTerms, ...typologyTerms, amlCase.reportingUrgency, 'suspicious transaction report'].join(' ');
}

function getUrgencyText(amlCase: AmlCase, locale: AmlLocale): string {
  if (locale === 'zh') {
    if (amlCase.reportingUrgency === 'immediate') {
      return amlCase.reportingDeadline
        ? `立即上报，建议截止日期 ${amlCase.reportingDeadline}`
        : '立即上报';
    }
    if (amlCase.reportingUrgency === 'priority') {
      return amlCase.reportingDeadline
        ? `优先处理，建议截止日期 ${amlCase.reportingDeadline}`
        : '优先处理';
    }
    return '常规时效处理';
  }

  if (amlCase.reportingUrgency === 'immediate') {
    return amlCase.reportingDeadline
      ? `Immediate filing recommended by ${amlCase.reportingDeadline}`
      : 'Immediate filing recommended';
  }
  if (amlCase.reportingUrgency === 'priority') {
    return amlCase.reportingDeadline
      ? `Priority review with target deadline ${amlCase.reportingDeadline}`
      : 'Priority review required';
  }
  return 'Standard review timeline';
}

export function buildStrSystemPrompt(locale: AmlLocale): string {
  if (locale === 'zh') {
    return [
      '你是银行反洗钱调查助理，负责起草可疑交易报告草稿。',
      '只能使用提供的案件事实、关联预警和法规依据。',
      '报告必须体现人工复核前提，不得暗示系统会自动提交。',
      '输出需要结构清晰、事实准确、语言审慎，并在监管依据部分附上引用。',
    ].join(' ');
  }

  return [
    'You are a bank AML investigation assistant drafting a suspicious transaction report.',
    'Use only the supplied case facts, linked alerts, and regulatory basis.',
    'Keep a clear human-review posture and never imply the system will auto-submit the report.',
    'Produce a structured, cautious, bank-style draft with explicit citations in the regulatory basis section.',
  ].join(' ');
}

function buildStrPromptText(amlCase: AmlCase, caseAlerts: AmlAlert[], locale: AmlLocale): string {
  const context = resolveStrContext(amlCase, caseAlerts, locale);

  if (locale === 'zh') {
    return [
      '请根据以下案件材料起草一份中文可疑交易报告草稿。',
      '要求：',
      '1. 使用正式、审慎的银行合规语气。',
      '2. 明确列出案件摘要、关联预警、可疑行为、监管依据、时效判断和分析建议。',
      '3. 监管依据部分必须逐条引用。',
      '4. 不得编造缺失事实；如有不足，请写明需人工补充核验。',
      '',
      context.promptContext,
    ].join('\n');
  }

  return [
    'Draft an English suspicious transaction report based on the case materials below.',
    'Requirements:',
    '1. Use formal bank-compliance language.',
    '2. Include case summary, linked alerts, suspicious activity, regulatory basis, urgency, and recommendation.',
    '3. Cite each regulatory basis item explicitly.',
    '4. Do not invent missing facts; state where manual review is still required.',
    '',
    context.promptContext,
  ].join('\n');
}

export function resolveStrContext(
  amlCase: AmlCase,
  caseAlerts: AmlAlert[],
  locale: AmlLocale
): ResolvedStrContext {
  const primaryAlert = getPrimaryAlert(caseAlerts);
  if (!primaryAlert) {
    throw new Error('At least one alert is required to draft an STR.');
  }

  const regulationQuery = buildStrRegulationQuery(amlCase, caseAlerts);
  const matchedChunks = searchRegulations(regulationQuery, 3).map((chunk) => normalizeChunk(chunk));
  const regulationChunks = matchedChunks.length > 0 ? matchedChunks : getDefaultRegulationChunks();

  const ruleLabels = [
    ...new Set(caseAlerts.flatMap((alert) => alert.triggeredRules).map((rule) => getRuleLabel(rule, locale))),
  ];
  const typologies = amlCase.suggestedTypologies.length > 0
    ? amlCase.suggestedTypologies.map((item) => titleCaseFromSlug(item))
    : [locale === 'zh' ? '暂无明确类型' : 'No confirmed typology yet'];

  const stepDetails =
    locale === 'zh'
      ? [
          `${amlCase.id} / ${amlCase.subjectAccountId} / ${amlCase.status}`,
          `${caseAlerts.length} 条关联预警，主预警 ${primaryAlert.id}（${primaryAlert.riskScore}/100）`,
          regulationChunks.map((chunk) => getCitationLabel(chunk, locale)).join('；'),
          typologies.join('、'),
          getUrgencyText(amlCase, locale),
          '根据案件事实生成 STR 草稿',
        ]
      : [
          `${amlCase.id} / ${amlCase.subjectAccountId} / ${amlCase.status}`,
          `${caseAlerts.length} linked alerts, primary ${primaryAlert.id} (${primaryAlert.riskScore}/100)`,
          regulationChunks.map((chunk) => getCitationLabel(chunk, locale)).join('; '),
          typologies.join(', '),
          getUrgencyText(amlCase, locale),
          'Drafting STR narrative from the resolved case context',
        ];

  const linkedAlertSummary = caseAlerts
    .map((alert) => {
      const rules =
        alert.triggeredRules.length > 0
          ? alert.triggeredRules.map((rule) => getRuleLabel(rule, locale)).join(', ')
          : locale === 'zh'
          ? '无明确规则触发'
          : 'No explicit rule trigger';
      return `- ${alert.id}: ${alert.transactionType} / CNY ${alert.amount.toLocaleString('en-US')} / ${rules}`;
    })
    .join('\n');

  const promptContext = [
    `Case ID: ${amlCase.id}`,
    `Status: ${amlCase.status}`,
    `Subject Account: ${amlCase.subjectAccountId} (${amlCase.subjectType})`,
    `Summary: ${amlCase.summary}`,
    `Key Findings:\n${amlCase.keyFindings.map((finding) => `- ${finding}`).join('\n')}`,
    `Linked Alerts:\n${linkedAlertSummary}`,
    `Typologies: ${typologies.join(', ')}`,
    `Urgency: ${getUrgencyText(amlCase, locale)}`,
    `Analyst Notes: ${amlCase.analystNotes || 'N/A'}`,
    `Regulatory Basis:\n${regulationChunks
      .map((chunk) => `- ${getCitationLabel(chunk, locale)}: ${normalizeChunk(chunk).text}`)
      .join('\n')}`,
  ].join('\n\n');

  return {
    primaryAlert,
    regulationChunks,
    stepDetails,
    promptContext,
    fallbackReport: buildFallbackStrReport(amlCase, caseAlerts, regulationChunks, locale),
  };
}

export function buildStrPrompt(amlCase: AmlCase, caseAlerts: AmlAlert[], locale: AmlLocale): string {
  return buildStrPromptText(amlCase, caseAlerts, locale);
}

export function buildFallbackStrReport(
  amlCase: AmlCase,
  caseAlerts: AmlAlert[],
  regulationChunks: RegulationChunk[],
  locale: AmlLocale
): string {
  const primaryAlert = getPrimaryAlert(caseAlerts);
  if (!primaryAlert) {
    throw new Error('At least one alert is required to build the fallback STR report.');
  }

  const ruleLines = [
    ...new Set(
      caseAlerts.flatMap((alert) =>
        alert.triggeredRules.map((rule) => `- ${getRuleLabel(rule, locale)}`)
      )
    ),
  ];
  const typologies =
    amlCase.suggestedTypologies.length > 0
      ? amlCase.suggestedTypologies.map((item) => titleCaseFromSlug(item))
      : [locale === 'zh' ? '暂无明确类型' : 'No confirmed typology'];
  const regulatoryLines = regulationChunks.map(
    (chunk) => `- ${getCitationLabel(chunk, locale)}: ${normalizeChunk(chunk).text}`
  );
  const alertLines = caseAlerts.map(
    (alert) =>
      `- ${alert.id} | ${alert.date} | ${alert.transactionType} | CNY ${alert.amount.toLocaleString('en-US')} | score ${alert.riskScore}`
  );

  if (locale === 'zh') {
    return [
      '可疑交易报告（草稿）',
      '仅供演示与分析辅助，不得直接提交监管机构。',
      '',
      `案件编号：${amlCase.id}`,
      `主体账户：${amlCase.subjectAccountId}（${amlCase.subjectType === 'individual' ? '个人' : '企业'}）`,
      `主预警：${primaryAlert.id}，风险分 ${primaryAlert.riskScore}/100`,
      '',
      '一、案件摘要',
      amlCase.summary,
      '',
      '二、关联预警',
      ...alertLines,
      '',
      '三、可疑行为与关键发现',
      ...amlCase.keyFindings.map((finding) => `- ${finding}`),
      `- 建议可疑类型：${typologies.join('、')}`,
      ...(ruleLines.length > 0 ? ['- 触发规则：', ...ruleLines] : ['- 触发规则：暂无']),
      '',
      '四、监管依据',
      ...regulatoryLines,
      '',
      '五、上报时效判断',
      `- ${getUrgencyText(amlCase, locale)}`,
      '',
      '六、分析建议',
      '- 建议由合规分析师完成人工复核后决定是否上报。',
      '- 如需上报，应结合客户背景、交易目的与补充材料进一步完善事实依据。',
      '',
      'AML Sentinel 生成的草稿仅为工作底稿，不构成自动申报。',
    ].join('\n');
  }

  return [
    'SUSPICIOUS TRANSACTION REPORT (DRAFT)',
    'For demonstration and analyst support only. Do not submit directly to regulators.',
    '',
    `Case ID: ${amlCase.id}`,
    `Subject Account: ${amlCase.subjectAccountId} (${amlCase.subjectType})`,
    `Primary Alert: ${primaryAlert.id} with risk score ${primaryAlert.riskScore}/100`,
    '',
    '1. Case Summary',
    amlCase.summary,
    '',
    '2. Linked Alerts',
    ...alertLines,
    '',
    '3. Suspicious Activity and Findings',
    ...amlCase.keyFindings.map((finding) => `- ${finding}`),
    `- Suggested typologies: ${typologies.join(', ')}`,
    ...(ruleLines.length > 0 ? ['- Triggered rules:', ...ruleLines] : ['- Triggered rules: none explicitly assigned']),
    '',
    '4. Regulatory Basis',
    ...regulatoryLines,
    '',
    '5. Reporting Urgency',
    `- ${getUrgencyText(amlCase, locale)}`,
    '',
    '6. Analyst Recommendation',
    '- Escalate for human compliance review before any filing decision.',
    '- If the case proceeds to filing, append documentary support and beneficiary verification results.',
    '',
    'Generated by AML Sentinel in advisory mode only.',
  ].join('\n');
}
