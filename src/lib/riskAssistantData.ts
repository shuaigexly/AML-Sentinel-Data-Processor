// Payment Risk Policy & Monitoring Assistant — Static Data & Business Logic
// Portfolio prototype for risk/compliance workflow demonstration

export interface Regulation {
  id: string;
  title: string;
  jurisdiction: string;
  category: string;
  description: string;
  riskCategoryIds: string[];
  controlIds: string[];
  effectiveDate: string;
  status: 'active' | 'draft' | 'superseded';
  sourceRef: string;   // 法规文号或官方引用
  sourceUrl: string;   // 官方原文链接
}

export interface RiskCategory {
  id: string;
  name: string;
  description: string;
  severityWeight: number; // 1–5
  businessArea: 'merchant' | 'transaction' | 'compliance' | 'operations';
}

export interface Control {
  id: string;
  name: string;
  type: 'preventive' | 'detective' | 'corrective';
  description: string;
  riskCategoryIds: string[];
  frequency: string;
  owner: string;
  metricIds: string[];
}

export interface MonitoringMetric {
  id: string;
  name: string;
  description: string;
  threshold: string;
  currentValue: string;
  status: 'normal' | 'warning' | 'critical';
  unit: string;
  controlIds: string[];
}

export interface Scenario {
  id: string;
  name: string;
  category: 'onboarding' | 'transaction' | 'behavior' | 'reporting';
  description: string;
  riskCategoryIds: string[];
  controlIds: string[];
  metricIds: string[];
  escalationLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface Alert {
  id: string;
  date: string;
  title: string;
  description: string;
  scenarioId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  riskCategoryId: string;
  suggestedAction: string;
  merchant?: string;
}

export interface RiskScore {
  score: number;
  classification: 'low' | 'medium' | 'high' | 'critical';
  breakdown: { baseScore: number; alertPenalty: number; controlCoverage: number };
}

// ─────────────────────────────────────────────
// REGULATIONS（均来自中国官方法规文件，附原文链接）
// ─────────────────────────────────────────────
export const regulations: Regulation[] = [
  {
    id: 'PR-001',
    title: '非银行支付机构监督管理条例',
    jurisdiction: '国务院 / 中国人民银行',
    category: '商户准入',
    description: '条例第二章规定非银行支付机构须对特约商户开展尽职调查，核实经营主体真实性、业务合法性及受益所有人信息，建立特约商户管理制度，禁止为无真实交易背景的主体提供资金结算服务。',
    riskCategoryIds: ['RC-001', 'RC-007'],
    controlIds: ['CT-001', 'CT-008'],
    effectiveDate: '2024-05-01',
    status: 'active',
    sourceRef: '国务院令第768号',
    sourceUrl: 'https://www.gov.cn/zhengce/content/202312/content_6920724.htm',
  },
  {
    id: 'PR-002',
    title: '金融机构大额交易和可疑交易报告管理办法',
    jurisdiction: '中国人民银行',
    category: '交易监控 / AML',
    description: '办法规定金融机构（含非银行支付机构）须对单笔人民币5万元以上现金交易、跨境交易等履行大额交易报告义务；对存在洗钱风险特征的交易须在20个工作日内向中国反洗钱监测分析中心报送可疑交易报告。',
    riskCategoryIds: ['RC-003', 'RC-002'],
    controlIds: ['CT-002', 'CT-007', 'CT-009'],
    effectiveDate: '2017-07-01',
    status: 'active',
    sourceRef: '中国人民银行令〔2016〕第3号',
    sourceUrl: 'https://www.pbc.gov.cn/fxqzhongxin/3558093/3558113/3561784/index.html',
  },
  {
    id: 'PR-003',
    title: '金融机构反洗钱和反恐怖融资监督管理办法',
    jurisdiction: '中国人民银行',
    category: 'AML / 合规',
    description: '办法明确从事支付清算业务的非银行机构须建立健全内部反洗钱组织体系，开展客户洗钱风险分级评定，对高风险客户实施加强尽职调查，定期开展洗钱风险自评估，并接受人民银行的监督检查。',
    riskCategoryIds: ['RC-002', 'RC-006'],
    controlIds: ['CT-002', 'CT-007', 'CT-010'],
    effectiveDate: '2021-08-01',
    status: 'active',
    sourceRef: '中国人民银行令〔2021〕第3号',
    sourceUrl: 'https://www.gov.cn/zhengce/zhengceku/2021-04/16/content_5600189.htm',
  },
  {
    id: 'PR-004',
    title: '金融机构客户尽职调查和客户身份资料及交易记录保存管理办法',
    jurisdiction: '中国人民银行 / 银保监会 / 证监会',
    category: 'KYC / 客户身份',
    description: '办法要求金融机构（含支付机构）在业务关系建立时核验客户身份，留存客户身份证明文件、交易记录至少5年；对高风险客户须在业务关系存续期间持续开展尽职调查，更新客户信息。',
    riskCategoryIds: ['RC-001', 'RC-002'],
    controlIds: ['CT-001', 'CT-003', 'CT-011'],
    effectiveDate: '2022-03-01',
    status: 'active',
    sourceRef: '人民银行、银保监、证监会令〔2022〕第1号',
    sourceUrl: 'https://www.gov.cn/zhengce/2022-09/27/content_5712754.htm',
  },
  {
    id: 'PR-005',
    title: '非银行支付机构网络支付业务管理办法',
    jurisdiction: '中国人民银行',
    category: '支付数据安全',
    description: '办法要求支付机构对支付账户实行实名制管理，按账户类型设定交易限额；须建立安全可靠的网络支付系统及灾备系统，对客户资金、交易数据进行加密保护，防范欺诈和信息泄露风险。',
    riskCategoryIds: ['RC-005', 'RC-008'],
    controlIds: ['CT-006'],
    effectiveDate: '2016-07-01',
    status: 'active',
    sourceRef: '中国人民银行公告〔2015〕第43号',
    sourceUrl: 'http://www.pbc.gov.cn/zhifujiesuansi/128525/128545/128643/2891368/index.html',
  },
  {
    id: 'PR-006',
    title: '支付机构外汇业务管理办法',
    jurisdiction: '国家外汇管理局',
    category: '跨境支付',
    description: '办法规定支付机构开展跨境外汇支付须取得外汇业务资质，仅可为具有真实贸易背景的交易提供结售汇及资金收付服务，须对交易真实性进行合理审核，留存相关凭证5年备查，禁止利用汇率价差非法牟利。',
    riskCategoryIds: ['RC-009', 'RC-002'],
    controlIds: ['CT-012'],
    effectiveDate: '2019-09-01',
    status: 'active',
    sourceRef: '国家外汇管理局汇发〔2019〕25号',
    sourceUrl: 'https://www.gov.cn/gongbao/content/2019/content_5428473.htm',
  },
  {
    id: 'PR-007',
    title: '关于加强支付受理终端及相关业务管理的通知',
    jurisdiction: '中国人民银行',
    category: '商户管理',
    description: '通知要求收单机构对特约商户实施"一机一户"管理，禁止"大商户"模式下的二次清分，须建立商户巡检制度，对高风险商户（如涉诈、涉赌场景）及时上报并采取限制措施，强化收款码实名绑定管理。',
    riskCategoryIds: ['RC-001', 'RC-007'],
    controlIds: ['CT-001', 'CT-003', 'CT-008'],
    effectiveDate: '2022-03-01',
    status: 'active',
    sourceRef: '银发〔2021〕259号',
    sourceUrl: 'https://fgw.sh.gov.cn/cmsres/c0/c0749657414b4b8aad378ea2982093cd/6ba9ebf6852589739070044c401c32a6.pdf',
  },
  {
    id: 'PR-008',
    title: '关于加强支付结算管理防范电信网络新型违法犯罪有关事项的通知',
    jurisdiction: '中国人民银行',
    category: '反诈骗 / 商户风控',
    description: '通知要求支付机构建立商户异常交易监测机制，对涉及电信诈骗、跑分等违法活动的商户实施断卡断户；须配合公安机关开展资金核查，建立涉诈商户黑名单共享机制。',
    riskCategoryIds: ['RC-004', 'RC-007'],
    controlIds: ['CT-004', 'CT-009'],
    effectiveDate: '2016-10-01',
    status: 'active',
    sourceRef: '银发〔2016〕261号',
    sourceUrl: 'https://www.pbc.gov.cn/zhifujiesuansi/128525/128535/128620/3301181/index.html',
  },
  {
    id: 'PR-009',
    title: '银行跨境业务反洗钱和反恐怖融资工作指引（试行）',
    jurisdiction: '中国人民银行 / 国家外汇管理局',
    category: '跨境AML',
    description: '指引要求金融机构对跨境支付业务开展专项反洗钱监控，识别涉及制裁名单、高风险国家/地区的交易，对可疑跨境资金流动须暂停处理并在规定时限内上报，建立跨境业务合规档案。',
    riskCategoryIds: ['RC-009', 'RC-002', 'RC-006'],
    controlIds: ['CT-007', 'CT-012'],
    effectiveDate: '2022-01-01',
    status: 'active',
    sourceRef: '银反洗发〔2022〕5号（试行）',
    sourceUrl: 'http://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4693549/4185365/index.html',
  },
  {
    id: 'PR-010',
    title: '法人金融机构洗钱和恐怖融资风险自评估指引',
    jurisdiction: '中国人民银行',
    category: '风险管理 / 内控',
    description: '指引要求支付机构等法人金融机构建立洗钱和恐怖融资风险自评估制度，识别固有风险（客户、产品、地域、交易渠道），评估控制措施有效性，形成剩余风险评级，并将自评估结果用于指导内部AML资源配置和控制优化。',
    riskCategoryIds: ['RC-008', 'RC-010'],
    controlIds: ['CT-006', 'CT-010'],
    effectiveDate: '2022-01-01',
    status: 'active',
    sourceRef: '银反洗发〔2021〕1号',
    sourceUrl: 'https://www.gov.cn/zhengce/2022-09/27/content_5712754.htm',
  },
  {
    id: 'PR-011',
    title: '个人信息保护法（支付场景适用）',
    jurisdiction: '全国人大常委会',
    category: '数据隐私',
    description: '《个人信息保护法》第51条要求处理个人信息须采取必要措施保障信息安全；支付机构处理用户支付账户、交易记录等个人信息须遵循最小必要原则，取得明确同意，并在信息泄露时72小时内向主管部门报告。',
    riskCategoryIds: ['RC-005'],
    controlIds: ['CT-006'],
    effectiveDate: '2021-11-01',
    status: 'active',
    sourceRef: '中华人民共和国个人信息保护法（2021年）',
    sourceUrl: 'https://www.gov.cn/xinwen/2021-08/20/content_5632486.htm',
  },
];

// ─────────────────────────────────────────────
// RISK CATEGORIES
// ─────────────────────────────────────────────
export const riskCategories: RiskCategory[] = [
  { id: 'RC-001', name: '商户身份欺诈', businessArea: 'merchant', severityWeight: 5,
    description: '商户在入网或日常审核中提供虚假身份证明文件或受益所有人信息，包括伪造营业执照、冒用他人身份等行为。' },
  { id: 'RC-002', name: '支付通道洗钱', businessArea: 'transaction', severityWeight: 5,
    description: '不法分子利用支付平台对非法资金进行分层、转移或整合，常见手法包括化整为零拆分交易、虚构贸易背景等。' },
  { id: 'RC-003', name: '交易模式异常', businessArea: 'transaction', severityWeight: 4,
    description: '交易量、频次或收款方向出现显著偏离历史基线的异常变化，可能预示欺诈、套现或业务性质改变等风险。' },
  { id: 'RC-004', name: '拒付滥用', businessArea: 'merchant', severityWeight: 3,
    description: '商户拒付率持续偏高，可能源于货不对板、虚假发货、诱导消费等行为，也可能是消费者欺诈性拒付。' },
  { id: 'RC-005', name: '支付数据安全泄露', businessArea: 'operations', severityWeight: 4,
    description: '未经授权访问支付账户数据、用户个人信息或交易记录，涵盖外部攻击、内部人员违规操作等场景。' },
  { id: 'RC-006', name: '监管报告合规失败', businessArea: 'compliance', severityWeight: 4,
    description: '未在规定时限内向监管机构（人民银行、外汇局等）提交大额交易报告、可疑交易报告，或报送内容存在重大错误。' },
  { id: 'RC-007', name: '商户异常行为', businessArea: 'merchant', severityWeight: 4,
    description: '商户出现交易量骤增、突然拓展新业务品类、跨地域异常扩张等红旗信号，且事先未向收单机构披露。' },
  { id: 'RC-008', name: '第三方接入风险', businessArea: 'operations', severityWeight: 3,
    description: '通过技术服务商、支付聚合商或API对接引入的漏洞，超出平台直接控制范围，可能成为攻击或数据泄露入口。' },
  { id: 'RC-009', name: '跨境支付合规风险', businessArea: 'transaction', severityWeight: 3,
    description: '跨境交易中涉及外汇管制违规、贸易背景虚假、境外受益人尽职调查不足，以及涉及制裁名单主体等风险。' },
  { id: 'RC-010', name: '内部操作流程失控', businessArea: 'operations', severityWeight: 2,
    description: '内部流程执行缺失，包括人工操作失误、截止日期违约、风控工作流文档不完整等运营层面的管理风险。' },
];

// ─────────────────────────────────────────────
// CONTROLS
// ─────────────────────────────────────────────
export const controls: Control[] = [
  {
    id: 'CT-001', name: '商户身份核验清单', type: 'preventive',
    frequency: '每次入网', owner: '商户运营部',
    description: '结构化核验清单，覆盖营业执照、法定代表人身份证、受益所有人信息及注册地址，账户激活前须全项完成。',
    riskCategoryIds: ['RC-001', 'RC-007'], metricIds: ['KPI-003'],
  },
  {
    id: 'CT-002', name: '自动化交易监控规则引擎', type: 'detective',
    frequency: '实时', owner: '风险技术部',
    description: '内置30+风险场景的规则引擎，对实时交易数据进行反洗钱、欺诈识别和行为异常模式的多维度扫描。',
    riskCategoryIds: ['RC-002', 'RC-003'], metricIds: ['KPI-002', 'KPI-010'],
  },
  {
    id: 'CT-003', name: '商户定期复查与重新KYC', type: 'detective',
    frequency: '普通商户每年一次 / 高风险商户每半年一次', owner: '合规部',
    description: '定期复查机制：普通商户每年、高风险商户每半年，以及触发预警事件时的专项复查，更新KYC档案及风险评级。',
    riskCategoryIds: ['RC-001', 'RC-007'], metricIds: ['KPI-011'],
  },
  {
    id: 'CT-004', name: '风险事件升级处置程序', type: 'corrective',
    frequency: '每次预警触发', owner: '风险管理部',
    description: '标准化升级路径：一线预警分诊 → 风险分析师 → 合规官。SLA要求：严重案例4小时内完成处置。',
    riskCategoryIds: ['RC-002', 'RC-006', 'RC-007'], metricIds: ['KPI-005'],
  },
  {
    id: 'CT-005', name: '拒付率监控与响应', type: 'detective',
    frequency: '每月', owner: '商户风控部',
    description: '按商户追踪月度拒付率：0.5%自动预警，1%触发人工复查，2%启动停用评估流程。',
    riskCategoryIds: ['RC-004'], metricIds: ['KPI-001'],
  },
  {
    id: 'CT-006', name: '安全审计与渗透测试', type: 'detective',
    frequency: '每季度漏洞扫描 / 每年渗透测试', owner: '信息安全部',
    description: '每年对支付处理系统、API接口及数据存储环境开展一次渗透测试，每季度执行漏洞扫描，确保安全合规覆盖率。',
    riskCategoryIds: ['RC-005', 'RC-008'], metricIds: ['KPI-009'],
  },
  {
    id: 'CT-007', name: '可疑交易报告（STR）提交', type: 'corrective',
    frequency: '每次触发事件', owner: '合规部',
    description: '端到端STR工作流：初步识别 → 内部审核 → 材料整理 → 在监管规定20个工作日内向中国反洗钱监测分析中心报送。',
    riskCategoryIds: ['RC-002', 'RC-006'], metricIds: ['KPI-004'],
  },
  {
    id: 'CT-008', name: '基于风险的商户入网评分', type: 'preventive',
    frequency: '每次入网', owner: '商户运营部',
    description: '综合风险评分模型（0–100分），评估商户行业风险、地域风险、交易画像及股权结构，高分商户须触发加强尽调。',
    riskCategoryIds: ['RC-001', 'RC-007'], metricIds: ['KPI-008'],
  },
  {
    id: 'CT-009', name: '实时预警分诊工作流', type: 'detective',
    frequency: '实时', owner: '风险运营部',
    description: '系统生成预警的标准化分诊流程：分类标注、优先级排序、分析师分配及处置结果文档留存。',
    riskCategoryIds: ['RC-003', 'RC-007'], metricIds: ['KPI-005', 'KPI-007'],
  },
  {
    id: 'CT-010', name: '监管报送日终对账', type: 'corrective',
    frequency: '每日', owner: '合规部',
    description: '每日核对监管报送队列，确保所有大额交易报告（CTR）、可疑交易报告（STR）均在法定时限内提交，无遗漏。',
    riskCategoryIds: ['RC-006', 'RC-010'], metricIds: ['KPI-004', 'KPI-006'],
  },
  {
    id: 'CT-011', name: '高风险商户加强尽职调查（EDD）', type: 'preventive',
    frequency: '每次风险分级触发', owner: '合规部',
    description: '针对高风险商户的额外EDD步骤：实地核查、第三方背景调查、高管审批，所有结果须留档备查。',
    riskCategoryIds: ['RC-001', 'RC-007'], metricIds: ['KPI-011'],
  },
  {
    id: 'CT-012', name: '跨境交易合规筛查', type: 'preventive',
    frequency: '实时', owner: '风险技术部',
    description: '对所有跨境支付流自动比对制裁名单，审核贸易背景真实性，监控外汇额度阈值，对可疑流向实施暂停处理。',
    riskCategoryIds: ['RC-009', 'RC-002'], metricIds: ['KPI-010'],
  },
  {
    id: 'CT-013', name: '每日KPI仪表板巡检', type: 'detective',
    frequency: '每日', owner: '风险管理部',
    description: '风险团队每日查阅监控KPI仪表板，记录异常指标，对触发阈值的指标发起跟进处置并留存记录。',
    riskCategoryIds: ['RC-010'], metricIds: ['KPI-002', 'KPI-001'],
  },
];

// ─────────────────────────────────────────────
// MONITORING METRICS
// ─────────────────────────────────────────────
export const monitoringMetrics: MonitoringMetric[] = [
  { id: 'KPI-001', name: '拒付率', unit: '%', threshold: '≤ 1.0%', currentValue: '0.68%', status: 'normal',
    description: '单一商户过去30天内因拒付产生的交易退款比例，超过阈值触发商户风险复查。', controlIds: ['CT-005', 'CT-013'] },
  { id: 'KPI-002', name: '日交易量偏离度', unit: '%', threshold: '≤ 40%', currentValue: '61%', status: 'critical',
    description: '当日交易量相对30日滚动均值的偏差幅度，偏差超40%时自动触发异常交易预警。', controlIds: ['CT-002', 'CT-013'] },
  { id: 'KPI-003', name: '商户KYC完成率', unit: '%', threshold: '≥ 95%', currentValue: '97.2%', status: 'normal',
    description: '新入网商户在规定SLA时限内完成全部KYC材料提交的比例。', controlIds: ['CT-001'] },
  { id: 'KPI-004', name: '可疑交易报告及时率', unit: '%', threshold: '≥ 98%', currentValue: '94.1%', status: 'warning',
    description: '在法定20个工作日内向中国反洗钱监测分析中心完成可疑交易报告提交的比例。', controlIds: ['CT-007', 'CT-010'] },
  { id: 'KPI-005', name: '高风险预警平均处置时长', unit: '小时', threshold: '≤ 8小时', currentValue: '11.3小时', status: 'warning',
    description: '高级别及严重级别预警从生成到最终关闭的平均耗时，超标说明处置资源存在瓶颈。', controlIds: ['CT-004', 'CT-009'] },
  { id: 'KPI-006', name: '监管报送错误率', unit: '%', threshold: '≤ 1%', currentValue: '0.3%', status: 'normal',
    description: '因数据错误被监管机构退回要求补正的报告比例。', controlIds: ['CT-010'] },
  { id: 'KPI-007', name: '异常商户识别率', unit: '%', threshold: '≥ 85%', currentValue: '79.4%', status: 'warning',
    description: '监控系统在30日窗口内检出存在行为异常商户的比例，低于阈值说明规则覆盖存在盲区。', controlIds: ['CT-009'] },
  { id: 'KPI-008', name: '商户入网审核完成时长', unit: '天', threshold: '≤ 5天', currentValue: '3.8天', status: 'normal',
    description: '商户提交申请至最终审批决定的平均天数，反映入网流程效率。', controlIds: ['CT-008'] },
  { id: 'KPI-009', name: '安全合规覆盖率', unit: '%', threshold: '≥ 100%', currentValue: '96.5%', status: 'warning',
    description: '已完成当期安全审计要求的在范围系统比例，未达100%说明存在未审计系统。', controlIds: ['CT-006'] },
  { id: 'KPI-010', name: '交易筛查误报率', unit: '%', threshold: '≤ 30%', currentValue: '27.8%', status: 'normal',
    description: '自动化筛查预警经分析师复核后无需进一步处置的比例，过高说明规则精度需优化。', controlIds: ['CT-002', 'CT-012'] },
  { id: 'KPI-011', name: '高风险商户重新KYC完成率', unit: '%', threshold: '≥ 90%', currentValue: '83.3%', status: 'critical',
    description: '高风险商户按计划周期完成重新KYC复查的比例，未达标意味着存在合规敞口。', controlIds: ['CT-003', 'CT-011'] },
];

// ─────────────────────────────────────────────
// SCENARIOS
// ─────────────────────────────────────────────
export const scenarios: Scenario[] = [
  {
    id: 'SCN-001', name: '商户入网合规审查', category: 'onboarding',
    escalationLevel: 'medium',
    description: '一家农资行业商户提交入网申请，注册地为三线城市，初步筛查发现多名董事征信记录有限，营业执照取得仅6个月。申请材料完整但背景存疑，需开展加强尽职调查。',
    riskCategoryIds: ['RC-001', 'RC-007', 'RC-010'],
    controlIds: ['CT-001', 'CT-008', 'CT-011'],
    metricIds: ['KPI-003', 'KPI-008'],
  },
  {
    id: 'SCN-002', name: '交易量异常骤增', category: 'transaction',
    escalationLevel: 'critical',
    description: '某消费电子行业商户在72小时内日交易量暴增340%，交易金额集中在9500–9900元区间（刚好低于1万元大额报告阈值），且多笔交易来自共享同一设备ID的新注册用户画像，疑似化整为零规避监控。',
    riskCategoryIds: ['RC-002', 'RC-003', 'RC-007'],
    controlIds: ['CT-002', 'CT-004', 'CT-007', 'CT-009'],
    metricIds: ['KPI-002', 'KPI-005'],
  },
  {
    id: 'SCN-003', name: '商户异常行为模式', category: 'behavior',
    escalationLevel: 'high',
    description: '某教育服务类商户开始处理大量与教育无关的交易，60日内拒付率升至2.3%，超过政策阈值1%的两倍以上，客户投诉量增加180%，投诉类型集中于服务未履约，疑似经营性质发生实质变更。',
    riskCategoryIds: ['RC-004', 'RC-007', 'RC-001'],
    controlIds: ['CT-003', 'CT-005', 'CT-004'],
    metricIds: ['KPI-001', 'KPI-007'],
  },
];

// ─────────────────────────────────────────────
// ALERTS
// ─────────────────────────────────────────────
export const alerts: Alert[] = [
  {
    id: 'ALT-001', date: '2025-03-04', severity: 'critical', status: 'investigating', scenarioId: 'SCN-002', riskCategoryId: 'RC-003', merchant: 'M-4892（消费电子）',
    title: '交易量异常骤增预警 — 商户 M-4892',
    description: '自动监控系统检测到商户M-4892在72小时内交易量较基线上涨340%，交易金额集中在9500–9900元区间，多笔交易来自共享同一设备ID的新用户，疑似拆单规避大额报告阈值。',
    suggestedAction: '启动二级复查；暂停该商户新客户入驻；若确认拆单行为，在20个工作日内向中国反洗钱监测分析中心报送可疑交易报告。',
  },
  {
    id: 'ALT-002', date: '2025-03-03', severity: 'high', status: 'open', scenarioId: 'SCN-003', riskCategoryId: 'RC-004', merchant: 'M-7105（教育服务）',
    title: '拒付率超标预警 — 商户 M-7105',
    description: '商户M-7105在60日监控窗口内拒付率达2.3%，超过政策阈值1%的两倍以上，客诉集中反映服务未履约。',
    suggestedAction: '升级至商户风控团队；要求商户提供拒付根因分析材料；评估是否对该商户实施交易限额限制。',
  },
  {
    id: 'ALT-003', date: '2025-03-03', severity: 'high', status: 'investigating', scenarioId: 'SCN-002', riskCategoryId: 'RC-006',
    title: '可疑交易报告提交逾期风险 — AML队列积压',
    description: '合规待处理队列中有3笔可疑交易报告即将超过法定20个工作日报送截止日，当前团队负荷率达85%。',
    suggestedAction: '重新分配合规分析师资源；优先处理最早触发的案件；由合规官发起紧急会签，防止监管报送逾期。',
  },
  {
    id: 'ALT-004', date: '2025-03-02', severity: 'medium', status: 'open', scenarioId: 'SCN-001', riskCategoryId: 'RC-001', merchant: 'M-6341（餐饮）',
    title: 'KYC材料缺失 — 商户 M-6341',
    description: '商户M-6341（餐饮行业）已处于KYC待提交状态超过8个工作日，受益所有人证明文件至今未收到。',
    suggestedAction: '发送最终催件通知；若48小时内仍无回应，按PR-001政策取消入网申请。',
  },
  {
    id: 'ALT-005', date: '2025-03-01', severity: 'high', status: 'open', scenarioId: 'SCN-001', riskCategoryId: 'RC-007',
    title: '重新KYC逾期未完成 — 4家高风险商户',
    description: '4家已列为高风险的商户均已超过半年度重新KYC截止日期30天以上，合规敞口持续扩大。',
    suggestedAction: '对4家商户强制启动重新KYC流程；在复查完成前对其实施交易限额限制。',
  },
  {
    id: 'ALT-006', date: '2025-02-28', severity: 'high', status: 'investigating', scenarioId: 'SCN-002', riskCategoryId: 'RC-009', merchant: 'M-3317（进出口贸易）',
    title: '跨境合规筛查命中 — 商户 M-3317',
    description: '商户M-3317向一家注册在FATF灰名单管辖区的实体汇款28万元，跨境筛查系统已触发命中，贸易背景审核材料尚未提交。',
    suggestedAction: '暂停该笔支付处理；要求商户提供受益方核实材料；24小时内升级至合规官。',
  },
  {
    id: 'ALT-007', date: '2025-02-27', severity: 'critical', status: 'escalated', scenarioId: 'SCN-003', riskCategoryId: 'RC-007', merchant: 'M-5501（零售）',
    title: '疑似账户被盗用 — 商户 M-5501',
    description: '6小时内有47个不同设备ID登录商户M-5501后台，较行为基线偏离890%，账户被盗用风险极高。',
    suggestedAction: '立即暂停账户访问权限；要求重新完成多因素认证；启动安全事件复查工作流。',
  },
  {
    id: 'ALT-008', date: '2025-02-26', severity: 'low', status: 'investigating', scenarioId: 'SCN-002', riskCategoryId: 'RC-010',
    title: '监控规则误报率接近阈值',
    description: '规则集RS-14（小额聚合）7日内产生312条预警，误报率29.1%，接近30%的政策上限，规则精度有待优化。',
    suggestedAction: '安排规则校准评审；调整阈值参数；在规则管理日志中记录变更内容。',
  },
  {
    id: 'ALT-009', date: '2025-02-25', severity: 'high', status: 'open', scenarioId: 'SCN-003', riskCategoryId: 'RC-003', merchant: 'M-9204（平台电商）',
    title: '异常退款模式预警 — 商户 M-9204',
    description: '商户M-9204单日处理89笔退款，占其月度交易总量的42%，且退款对应的客户ID与原始购买记录不匹配。',
    suggestedAction: '冻结退款处理功能；要求商户提供交易凭证；启动欺诈调查工作流。',
  },
  {
    id: 'ALT-010', date: '2025-02-24', severity: 'medium', status: 'open', scenarioId: 'SCN-001', riskCategoryId: 'RC-005',
    title: '安全漏洞未修复 — 支付网关API',
    description: '季度漏洞扫描发现支付网关API存在2个中级漏洞，均为上一季度已识别但尚未修复的遗留问题。',
    suggestedAction: '将修复任务分配给技术团队并设定15天截止日期；完成后通过跟进扫描验证修复效果。',
  },
  {
    id: 'ALT-011', date: '2025-02-23', severity: 'medium', status: 'resolved', scenarioId: 'SCN-001', riskCategoryId: 'RC-006',
    title: '监管报告提交错误 — 大额报告 CTR-2025-0089',
    description: '大额交易报告CTR-2025-0089因商户注册号格式错误被监管机构退回，需补正后重新提交。',
    suggestedAction: '24小时内重新提交修正版报告；更新合规操作规程文档以防止同类错误重现。',
  },
  {
    id: 'ALT-012', date: '2025-02-21', severity: 'medium', status: 'investigating', scenarioId: 'SCN-001', riskCategoryId: 'RC-001', merchant: 'M-8821（网络游戏周边）',
    title: '入网风险评分偏高 — 商户 M-8821',
    description: '商户申请M-8821在基于风险的入网评分模型中获74/100分，触发加强尽职调查要求，行业为网络游戏周边。',
    suggestedAction: '升级至EDD工作流；要求补充材料；须经合规官审批后方可完成入网。',
  },
];

// ─────────────────────────────────────────────
// SCORING LOGIC
// ─────────────────────────────────────────────
/**
 * Risk Scoring Algorithm (v1)
 *
 * score = (sum of risk category severity weights × 3) + alertPenalty − controlCoverage
 *
 * alertPenalty:
 *   critical/escalated alert = +15
 *   high alert               = +10
 *   medium alert             = +5
 *   low alert                = +2
 *
 * controlCoverage:
 *   preventive control = −3
 *   detective control  = −2
 *   corrective control = −1
 *
 * Classification:
 *   < 20  → Low
 *   20–35 → Medium
 *   36–50 → High
 *   > 50  → Critical
 */
export function calculateRiskScore(scenario: Scenario): RiskScore {
  const baseScore = scenario.riskCategoryIds.reduce((sum, id) => {
    const rc = riskCategories.find((r) => r.id === id);
    return sum + (rc ? rc.severityWeight * 3 : 0);
  }, 0);

  const openAlerts = alerts.filter(
    (a) => a.scenarioId === scenario.id && a.status !== 'resolved'
  );
  const alertPenalty = openAlerts.reduce((sum, a) => {
    if (a.severity === 'critical' || a.status === 'escalated') return sum + 15;
    if (a.severity === 'high') return sum + 10;
    if (a.severity === 'medium') return sum + 5;
    return sum + 2;
  }, 0);

  const controlCoverage = scenario.controlIds.reduce((sum, id) => {
    const ct = controls.find((c) => c.id === id);
    if (!ct) return sum;
    return sum + (ct.type === 'preventive' ? 3 : ct.type === 'detective' ? 2 : 1);
  }, 0);

  const score = Math.max(0, Math.min(100, baseScore + alertPenalty - controlCoverage));
  const classification: RiskScore['classification'] =
    score < 20 ? 'low' : score < 36 ? 'medium' : score < 51 ? 'high' : 'critical';

  return { score, classification, breakdown: { baseScore, alertPenalty, controlCoverage } };
}

// ─────────────────────────────────────────────
// SUMMARY GENERATOR
// ─────────────────────────────────────────────
export function generateSummaryMemo(scenario: Scenario): string {
  const score = calculateRiskScore(scenario);
  const linkedRisks = scenario.riskCategoryIds
    .map((id) => riskCategories.find((r) => r.id === id))
    .filter(Boolean) as RiskCategory[];
  const linkedControls = scenario.controlIds
    .map((id) => controls.find((c) => c.id === id))
    .filter(Boolean) as Control[];
  const openAlerts = alerts.filter(
    (a) => a.scenarioId === scenario.id && a.status !== 'resolved'
  );
  const metrics = scenario.metricIds
    .map((id) => monitoringMetrics.find((m) => m.id === id))
    .filter(Boolean) as MonitoringMetric[];
  const breachedMetrics = metrics.filter((m) => m.status !== 'normal');
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `INTERNAL RISK ASSESSMENT MEMO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scenario:        ${scenario.name}
Assessment Date: ${date}
Risk Score:      ${score.score} / 100
Classification:  ${score.classification.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENARIO OVERVIEW
${scenario.description}

IDENTIFIED RISK CATEGORIES (${linkedRisks.length})
${linkedRisks.map((r) => `• [${r.id}] ${r.name}  —  Severity Weight: ${r.severityWeight}/5`).join('\n')}

APPLICABLE CONTROL MEASURES (${linkedControls.length})
${linkedControls.map((c) => `• [${c.id}] ${c.name}  (${c.type.charAt(0).toUpperCase() + c.type.slice(1)} | ${c.frequency})`).join('\n')}

OPEN ALERTS (${openAlerts.length})
${openAlerts.length > 0
    ? openAlerts.map((a) => `• [${a.id}] ${a.title}  —  ${a.severity.toUpperCase()} / ${a.status.toUpperCase()}`).join('\n')
    : '• No open alerts at this time.'}

MONITORING INDICATORS
${metrics.map((m) => `• [${m.id}] ${m.name}: ${m.currentValue}  (threshold: ${m.threshold})  [${m.status.toUpperCase()}]`).join('\n')}

SCORE BREAKDOWN
  Base Score (risk severity × 3):    ${score.breakdown.baseScore}
  Alert Penalty (open alerts):       +${score.breakdown.alertPenalty}
  Control Coverage Reduction:        −${score.breakdown.controlCoverage}
  ─────────────────────────────────
  Final Score:                        ${score.score} / 100

RECOMMENDED ESCALATION:  ${scenario.escalationLevel.toUpperCase()}

PRIORITY ACTIONS
${openAlerts
    .filter((a) => a.severity === 'critical' || a.severity === 'high')
    .map((a) => `• ${a.suggestedAction}`)
    .join('\n') || '• No critical/high alerts requiring immediate action.'}
${breachedMetrics
    .map((m) => `• Address KPI breach: ${m.name} (current: ${m.currentValue}, threshold: ${m.threshold})`)
    .join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This assessment was generated by the Payment Risk Policy & Monitoring Assistant.
For portfolio demonstration purposes only. Not a legal or compliance opinion.`;
}

// ─────────────────────────────────────────────
// HELPER LOOKUPS & STYLE CONSTANTS
// ─────────────────────────────────────────────
export const SEVERITY_COLORS = {
  low:      'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  medium:   'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  high:     'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  critical: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  normal:   'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  warning:  'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
};

export const STATUS_COLORS = {
  open:          'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  investigating: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  resolved:      'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  escalated:     'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
  active:        'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  draft:         'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300',
  superseded:    'bg-gray-100 text-gray-400 dark:bg-gray-700/50 dark:text-gray-500',
};
