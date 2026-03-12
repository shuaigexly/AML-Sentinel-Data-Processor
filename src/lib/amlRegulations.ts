export type RegulationSource =
  | 'aml_law_2024'
  | 'kpmg_analysis'
  | 'fatf_china_2019'
  | 'camlmac_report';

export interface RegulationChunk {
  id: string;
  source: RegulationSource;
  sourceTitle: string;
  article: string;
  text: string;
  keywords: string[];
  lang: 'zh' | 'en';
}

export const amlRegulations: RegulationChunk[] = [
  {
    id: 'REG-001',
    source: 'aml_law_2024',
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第三十一条',
    text: '金融机构应当按照规定向中国人民银行或者其分支机构报告大额交易和可疑交易。单笔或者当日累计现金收付金额超过人民币五万元的，应当报告大额现金交易；单笔或者当日累计转账金额超过人民币二百万元的，应当报告大额转账交易。',
    keywords: ['大额现金', '现金交易', '五万元', '大额转账', '二百万元', '报告义务', '人民银行', '申报阈值'],
    lang: 'zh',
  },
  {
    id: 'REG-002',
    source: 'aml_law_2024',
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第三十三条',
    text: '金融机构发现可疑交易的，应当在五个工作日内向中国反洗钱监测分析中心报告。情形紧急的，应当立即报告。金融机构不得以任何形式向当事人或者其他人员泄露已经提交可疑交易报告的事实及其内容。',
    keywords: ['可疑交易', '五个工作日', '报告时限', 'CAMLMAC', '中国反洗钱监测分析中心', '立即报告', '紧急上报', '保密要求'],
    lang: 'zh',
  },
  {
    id: 'REG-003',
    source: 'aml_law_2024',
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第五条',
    text: '政策性银行、商业银行、证券公司、基金管理公司、保险公司、信托公司等机构属于反洗钱义务机构，应当履行客户身份识别、交易记录保存和报告义务。',
    keywords: ['义务机构', '商业银行', '证券公司', '保险公司', '信托公司', '适用范围'],
    lang: 'zh',
  },
  {
    id: 'REG-004',
    source: 'aml_law_2024',
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第二十八条',
    text: '反洗钱义务机构应当建立健全客户身份识别制度，在建立业务关系或者提供规定金额以上一次性金融服务时，核验客户和受益所有人的真实身份，并留存相关资料。',
    keywords: ['客户身份识别', '受益所有人', 'KYC', '身份核验', '留存资料', '尽职调查'],
    lang: 'zh',
  },
  {
    id: 'REG-005',
    source: 'aml_law_2024',
    sourceTitle: '中华人民共和国反洗钱法（2024年修订）',
    article: '第五十三条',
    text: '反洗钱义务机构未按照规定报告大额交易或者可疑交易的，由有关主管部门责令限期改正，并可处以罚款；情节严重的，可以对直接责任人员采取行政处罚。',
    keywords: ['处罚', '罚款', '未按规定报告', '行政处罚', '整改要求'],
    lang: 'zh',
  },
  {
    id: 'REG-006',
    source: 'kpmg_analysis',
    sourceTitle: 'KPMG China New AML Law Analysis (2025)',
    article: 'Section 2: Key Changes',
    text: 'The 2024 AML Law revision expands the scope of obligated entities, strengthens beneficial ownership verification, and sharply increases institutional penalties for reporting failures.',
    keywords: ['beneficial ownership', 'obligated entities', 'penalties', 'scope expansion', 'reporting failures'],
    lang: 'en',
  },
  {
    id: 'REG-007',
    source: 'kpmg_analysis',
    sourceTitle: 'KPMG China New AML Law Analysis (2025)',
    article: 'Section 3: Compliance Implications',
    text: 'Institutions should review their STR workflows against the five-business-day filing requirement, update customer risk models, and reinforce controls against tipping off clients.',
    keywords: ['STR workflow', 'five-business-day', 'filing requirement', 'customer risk model', 'tipping-off'],
    lang: 'en',
  },
  {
    id: 'REG-008',
    source: 'fatf_china_2019',
    sourceTitle: 'FATF China Mutual Evaluation Report 2019',
    article: 'Immediate Outcome 5',
    text: 'China has a broadly developed AML/CFT framework, but effectiveness gaps remain in beneficial ownership transparency and enhanced due diligence for higher-risk customers.',
    keywords: ['beneficial ownership', 'transparency', 'enhanced due diligence', 'higher-risk customers'],
    lang: 'en',
  },
  {
    id: 'REG-009',
    source: 'fatf_china_2019',
    sourceTitle: 'FATF China Mutual Evaluation Report 2019',
    article: 'Immediate Outcome 7',
    text: 'The report notes underutilization of suspicious transaction reports in proactive money-laundering investigations and delays in the handoff from STR intelligence to case development.',
    keywords: ['STR', 'investigations', 'underutilization', 'case development', 'financial intelligence'],
    lang: 'en',
  },
  {
    id: 'REG-010',
    source: 'camlmac_report',
    sourceTitle: 'CAMLMAC AML Stability Report 2023',
    article: 'Section 1: Reporting Statistics',
    text: 'CAMLMAC reported that cross-border transfers to high-risk jurisdictions, repeated cash transactions below thresholds, and rapid fund movement remained leading suspicious reporting triggers in 2023.',
    keywords: ['CAMLMAC', 'reporting statistics', 'cross-border', 'structuring', 'rapid movement'],
    lang: 'en',
  },
];

const CJK_PATTERN = /[\u4e00-\u9fff]/;
const NORMALIZE_PATTERN = /[，。、“”‘’（）()【】[\],.:;!?/\-_]+/g;
const SOURCE_PRIORITY: Record<RegulationSource, number> = {
  aml_law_2024: 4,
  camlmac_report: 3,
  kpmg_analysis: 2,
  fatf_china_2019: 1,
};

function normalizeText(input: string): string {
  return input.toLowerCase().replace(NORMALIZE_PATTERN, ' ').replace(/\s+/g, ' ').trim();
}

function buildCjkTerms(query: string): { phrases: string[]; terms: string[] } {
  const compact = query.replace(/\s+/g, '');
  const phrases = new Set<string>();
  const terms = new Set<string>();

  for (const part of query.split(/\s+/).map((item) => item.trim()).filter(Boolean)) {
    phrases.add(part);
  }
  if (compact) {
    phrases.add(compact);
  }

  for (const phrase of phrases) {
    const chars = [...phrase];
    if (phrase.length <= 2) {
      terms.add(phrase);
      continue;
    }
    for (let index = 0; index < chars.length - 1; index += 1) {
      terms.add(chars.slice(index, index + 2).join(''));
    }
    chars.forEach((char) => terms.add(char));
  }

  return {
    phrases: [...phrases],
    terms: [...terms],
  };
}

function buildLatinTerms(query: string): { phrases: string[]; terms: string[] } {
  const normalized = normalizeText(query);
  const terms = normalized.split(' ').filter(Boolean);
  return {
    phrases: normalized ? [normalized] : [],
    terms,
  };
}

export function searchRegulations(query: string, topK = 5): RegulationChunk[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const isCjk = CJK_PATTERN.test(trimmed);
  const normalizedQuery = normalizeText(trimmed);
  const { phrases, terms } = isCjk ? buildCjkTerms(trimmed) : buildLatinTerms(trimmed);
  const preferredLang: RegulationChunk['lang'] = isCjk ? 'zh' : 'en';

  return amlRegulations
    .map((chunk) => {
      const haystack = normalizeText(
        [chunk.sourceTitle, chunk.article, chunk.text, ...chunk.keywords].join(' ')
      );
      const normalizedKeywords = chunk.keywords.map((keyword) => normalizeText(keyword));

      let score = 0;

      if (chunk.lang === preferredLang) {
        score += 12;
      }

      for (const phrase of phrases) {
        const normalizedPhrase = normalizeText(phrase);
        if (!normalizedPhrase) {
          continue;
        }
        if (haystack.includes(normalizedPhrase)) {
          score += normalizedPhrase.length >= 4 ? 18 : 10;
        }
        if (normalizedKeywords.some((keyword) => keyword === normalizedPhrase)) {
          score += 12;
        }
      }

      for (const term of terms) {
        const normalizedTerm = normalizeText(term);
        if (!normalizedTerm) {
          continue;
        }
        if (normalizedKeywords.some((keyword) => keyword.includes(normalizedTerm))) {
          score += normalizedTerm.length >= 2 ? 6 : 1;
          continue;
        }
        if (haystack.includes(normalizedTerm)) {
          score += normalizedTerm.length >= 2 ? 3 : 0;
        }
      }

      if (normalizedQuery && chunk.article && haystack.includes(normalizeText(chunk.article))) {
        score += 1;
      }

      return { chunk, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      if (right.chunk.lang !== left.chunk.lang) {
        return right.chunk.lang === preferredLang ? 1 : -1;
      }
      return SOURCE_PRIORITY[right.chunk.source] - SOURCE_PRIORITY[left.chunk.source];
    })
    .slice(0, topK)
    .map(({ chunk }) => chunk);
}
