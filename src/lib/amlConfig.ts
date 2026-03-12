import type { AlertSeverity, PbocRule } from './amlAlerts';

export interface RuleConfig {
  id: PbocRule;
  nameZh: string;
  nameEn: string;
  thresholdZh: string;
  thresholdEn: string;
  rationaleZh: string;
  rationaleEn: string;
  severity: AlertSeverity;
  pbocArticle: string;
}

export interface ChecklistItem {
  id: string;
  labelZh: string;
  labelEn: string;
  required: boolean;
}

export interface ReportTemplateSection {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  required: boolean;
}

export const ruleConfigs: RuleConfig[] = [
  {
    id: 'PBOC_LARGE_CASH',
    nameZh: '人民银行大额现金交易规则',
    nameEn: 'PBOC Large Cash Rule',
    thresholdZh: '单笔现金交易金额大于等于 CNY 50,000',
    thresholdEn: 'Single cash transaction greater than or equal to CNY 50,000',
    rationaleZh: '反洗钱法第三十一条要求金融机构对大额现金交易履行申报义务。',
    rationaleEn: 'AML Law Article 31 requires institutions to file for large cash transactions.',
    severity: 'high',
    pbocArticle: '第三十一条',
  },
  {
    id: 'PBOC_LARGE_TRANSFER',
    nameZh: '人民银行大额转账规则',
    nameEn: 'PBOC Large Transfer Rule',
    thresholdZh: '单笔转账金额大于等于 CNY 2,000,000',
    thresholdEn: 'Single transfer greater than or equal to CNY 2,000,000',
    rationaleZh: '反洗钱法第三十一条要求对大额转账进行监测和申报。',
    rationaleEn: 'AML Law Article 31 requires monitoring and filing for large transfers.',
    severity: 'high',
    pbocArticle: '第三十一条',
  },
  {
    id: 'HIGH_RISK_COUNTRY',
    nameZh: '高风险司法辖区规则',
    nameEn: 'High-Risk Jurisdiction Rule',
    thresholdZh: '交易对手位于 FATF 高风险或受监控地区',
    thresholdEn: 'Counterparty is located in a FATF high-risk or monitored jurisdiction',
    rationaleZh: '高风险司法辖区交易需要加强尽职调查并优先审查。',
    rationaleEn: 'Transactions involving high-risk jurisdictions require enhanced due diligence.',
    severity: 'high',
    pbocArticle: '第二十八条',
  },
  {
    id: 'SMURFING',
    nameZh: '化整为零识别规则',
    nameEn: 'Structuring Detection Rule',
    thresholdZh: '交易金额反复出现在 CNY 40,000 至 49,999 区间',
    thresholdEn: 'Repeated transaction amounts between CNY 40,000 and CNY 49,999',
    rationaleZh: '故意拆分交易以规避申报阈值，属于典型可疑交易模式。',
    rationaleEn: 'Deliberately splitting transactions below the reporting threshold is a suspicious pattern.',
    severity: 'high',
    pbocArticle: '第三十三条',
  },
  {
    id: 'RAPID_MOVEMENT',
    nameZh: '资金快速转移规则',
    nameEn: 'Rapid Movement Rule',
    thresholdZh: '资金在到账后 24 小时内被继续转出',
    thresholdEn: 'Funds are forwarded within 24 hours of receipt',
    rationaleZh: '快速转移是分层洗钱的常见特征，可能表明过渡账户或漏斗账户。',
    rationaleEn: 'Rapid movement is a common layering indicator and may signal a funnel account.',
    severity: 'medium',
    pbocArticle: '第三十三条',
  },
  {
    id: 'FREQUENT_CASH',
    nameZh: '高频现金活动规则',
    nameEn: 'High-Frequency Cash Activity Rule',
    thresholdZh: '30 天内现金交易超过 15 笔，或单日超过 5 笔',
    thresholdEn: 'More than 15 cash events in 30 days, or more than 5 in one day',
    rationaleZh: '异常高频的现金活动可能反映现金投放与化整为零行为。',
    rationaleEn: 'Unusually frequent cash activity may indicate placement or structuring.',
    severity: 'medium',
    pbocArticle: '第三十一条',
  },
];

export const investigationChecklist: ChecklistItem[] = [
  { id: 'chk-001', labelZh: '确认主体账户身份信息完整', labelEn: 'Confirm subject account identity on file', required: true },
  { id: 'chk-002', labelZh: '核验触发规则对应的原始交易凭证', labelEn: 'Verify source documents for the triggering transactions', required: true },
  { id: 'chk-003', labelZh: '检查关联账户与反向交易路径', labelEn: 'Review linked accounts and reverse transaction paths', required: true },
  { id: 'chk-004', labelZh: '评估客户申报用途是否合理', labelEn: 'Assess whether the stated business purpose is plausible', required: true },
  { id: 'chk-005', labelZh: '确认交易对手风险等级', labelEn: 'Confirm counterparty risk classification', required: false },
  { id: 'chk-006', labelZh: '检查是否存在跨案件关联账户', labelEn: 'Check for cross-case account linkages', required: false },
  { id: 'chk-007', labelZh: '记录排除误报的依据', labelEn: 'Document the basis for ruling out a false positive', required: false },
  { id: 'chk-008', labelZh: '主管确认上报时限与紧迫性', labelEn: 'Supervisor confirms reporting urgency and deadline', required: true },
];

export const strTemplateSections: ReportTemplateSection[] = [
  {
    id: 'str-s1',
    titleZh: '报告机构信息',
    titleEn: 'Reporting Institution',
    descriptionZh: '机构名称、牌照编号和联络人信息。',
    descriptionEn: 'Institution name, license number, and contact officer.',
    required: true,
  },
  {
    id: 'str-s2',
    titleZh: '可疑主体信息',
    titleEn: 'Subject Information',
    descriptionZh: '主体账户、身份类型和关键识别信息。',
    descriptionEn: 'Subject account, entity type, and key identification details.',
    required: true,
  },
  {
    id: 'str-s3',
    titleZh: '可疑交易摘要',
    titleEn: 'Transaction Summary',
    descriptionZh: '时间、金额、类型以及触发规则。',
    descriptionEn: 'Date, amount, type, and triggered rules.',
    required: true,
  },
  {
    id: 'str-s4',
    titleZh: '可疑行为描述',
    titleEn: 'Suspicious Activity Description',
    descriptionZh: '行为模式、洗钱类型判断和证据摘要。',
    descriptionEn: 'Behavior pattern, typology assessment, and evidence summary.',
    required: true,
  },
  {
    id: 'str-s5',
    titleZh: '监管依据',
    titleEn: 'Regulatory Basis',
    descriptionZh: '适用条文、监管口径和引用依据。',
    descriptionEn: 'Applicable articles, guidance, and supporting citations.',
    required: true,
  },
  {
    id: 'str-s6',
    titleZh: '分析师建议',
    titleEn: 'Analyst Recommendation',
    descriptionZh: '是否建议上报、时限和后续复核要求。',
    descriptionEn: 'Recommendation to file, required deadline, and review steps.',
    required: true,
  },
];
