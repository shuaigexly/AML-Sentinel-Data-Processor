export type ControlType = 'preventive' | 'detective';
export type ControlFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'adHoc';
export type SamplingMethod = 'attribute' | 'judgmental' | 'random';
export type TestResult = 'pass' | 'fail' | 'exception';
export type Severity = 'high' | 'medium' | 'low';

export interface WorkpaperInput {
  auditObjective: string;
  riskStatement: string;
  controlDescription: string;
  controlType: ControlType;
  controlFrequency: ControlFrequency;
  populationDescription: string;
  samplingMethod: SamplingMethod;
  sampleSize: number;
  testProcedure: string;
  evidenceCaptured: string;
  testResult: TestResult;
  exceptionDetail: string;
  conclusion: string;
}

export interface Finding {
  message: string;
  severity: Severity;
  category: string;
  whyItMatters: string;
}

export interface RubricScore {
  category: string;
  score: number;
  maxScore: number;
  findings: string[];
}

export interface QcResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  rubricBreakdown: RubricScore[];
  findings: Finding[];
  suggestions: string[];
}

export interface SamplingSuggestion {
  populationSize: number;
  confidenceLevel: number;
  tolerableDeviation: number;
  suggestedSampleSize: number;
  explanation: string;
}

const VAGUE_TERMS = [
  'appropriate',
  'adequate',
  'good',
  'reasonable',
  'proper',
  'sufficient',
  'satisfactory',
  'acceptable',
  'suitable',
  'correct',
];

const VAGUE_TERMS_ZH = [
  '合适',
  '适当',
  '充分',
  '良好',
  '合理',
  '正确',
  '满意',
  '可接受',
];

const CONCLUSION_KEYWORDS = [
  'criteria',
  'condition',
  'cause',
  'impact',
  'recommendation',
  'effect',
  'root cause',
];

const CONCLUSION_KEYWORDS_ZH = [
  '标准',
  '情况',
  '原因',
  '影响',
  '建议',
  '效果',
  '根本原因',
];

export function detectVagueTerms(text: string): string[] {
  const lowerText = text.toLowerCase();
  const englishMatches = VAGUE_TERMS.filter((term) => new RegExp(`\\b${term}\\b`, 'i').test(lowerText));
  const chineseMatches = VAGUE_TERMS_ZH.filter((term) => text.includes(term));
  return [...englishMatches, ...chineseMatches];
}

export function checkFieldPresence(value: string, minLength: number = 10): boolean {
  return value.trim().length >= minLength;
}

export function checkRiskControlAlignment(risk: string, control: string): boolean {
  if (!risk || !control) return false;

  const riskWords = risk.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const controlWords = control.toLowerCase().split(/\s+/).filter((w) => w.length > 3);

  const commonWords = riskWords.filter((word) => controlWords.includes(word));
  return commonWords.length >= 2 || (risk.length > 50 && control.length > 50);
}

export function checkProcedureQuality(procedure: string, controlType: ControlType): { score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 0;
  const maxScore = 20;

  const hasSteps = /\d+\.|step\s*\d+|第\s*\d+\s*步|\n-|\n•/i.test(procedure);
  if (hasSteps) {
    score += 5;
  } else {
    issues.push('Procedure lacks clear numbered steps');
  }

  const hasDataSource = /data source|system|report|database|file|数据源|系统|报告|数据库|文件/i.test(procedure);
  if (hasDataSource) {
    score += 5;
  } else {
    issues.push('Procedure does not specify data source');
  }

  const hasException = /exception|error|deviation|fail|issue|例外|错误|偏差|失败|问题/i.test(procedure);
  if (hasException) {
    score += 5;
  } else {
    issues.push('Procedure does not define what constitutes an exception');
  }

  if (controlType === 'preventive') {
    const hasPreventiveEvidence = /approval|authorize|gating|before|prior|审批|授权|之前/i.test(procedure);
    if (hasPreventiveEvidence) {
      score += 5;
    } else {
      issues.push('Preventive control procedure should test before-the-fact evidence (approvals, gating)');
    }
  } else {
    const hasDetectiveEvidence = /review|reconcil|after|subsequent|check|审查|对账|之后|核对/i.test(procedure);
    if (hasDetectiveEvidence) {
      score += 5;
    } else {
      issues.push('Detective control procedure should test after-the-fact evidence (review, reconciliation)');
    }
  }

  return { score, issues };
}

export function checkConclusionQuality(conclusion: string, testResult: TestResult, exceptionDetail: string): { score: number; issues: string[] } {
  const issues: string[] = [];
  const lowerConclusion = conclusion.toLowerCase();
  const allKeywords = [...CONCLUSION_KEYWORDS, ...CONCLUSION_KEYWORDS_ZH];
  const keywordCount = allKeywords.filter((kw) => lowerConclusion.includes(kw.toLowerCase())).length;

  let score = Math.min(keywordCount * 4, 12);
  if (keywordCount < 3) {
    issues.push('Conclusion should include criteria, condition, cause, impact, and recommendation');
  }

  const hasException = testResult === 'fail' || testResult === 'exception';
  if (hasException) {
    if (!exceptionDetail || exceptionDetail.trim().length < 20) {
      issues.push('Exception detail is required when test result is Fail/Exception');
      score -= 5;
    }
    const hasRecommendation = /recommend|suggest|should|action|建议|应该|措施/i.test(conclusion);
    if (!hasRecommendation) {
      issues.push('Conclusion should include a recommendation when exceptions are found');
      score -= 3;
    } else {
      score += 5;
    }
  } else if (conclusion.length >= 50) {
    score += 8;
  }

  return { score: Math.max(0, score), issues };
}

export function checkSamplingPeriodAlignment(frequency: ControlFrequency, population: string): boolean {
  const monthlyTerms = /month|monthly|月|每月/i;
  const quarterlyTerms = /quarter|quarterly|Q[1-4]|季度|每季/i;
  const yearlyTerms = /year|annual|yearly|年|年度/i;

  if (frequency === 'monthly' || frequency === 'quarterly') {
    return monthlyTerms.test(population) || quarterlyTerms.test(population) || yearlyTerms.test(population);
  }

  return true;
}

export function evaluateWorkpaper(input: WorkpaperInput): QcResult {
  const rubricBreakdown: RubricScore[] = [];
  const findings: Finding[] = [];
  const suggestions: string[] = [];

  // 1. Completeness (20 points)
  const completenessFindings: string[] = [];
  let completenessScore = 0;

  const requiredFields: { field: keyof WorkpaperInput; name: string; minLength: number }[] = [
    { field: 'auditObjective', name: 'Audit Objective', minLength: 20 },
    { field: 'riskStatement', name: 'Risk Statement', minLength: 20 },
    { field: 'controlDescription', name: 'Control Description', minLength: 30 },
    { field: 'populationDescription', name: 'Population Description', minLength: 20 },
    { field: 'testProcedure', name: 'Test Procedure', minLength: 50 },
    { field: 'evidenceCaptured', name: 'Evidence Captured', minLength: 20 },
    { field: 'conclusion', name: 'Conclusion', minLength: 30 },
  ];

  for (const { field, name, minLength } of requiredFields) {
    const value = input[field];
    if (typeof value === 'string' && checkFieldPresence(value, minLength)) {
      completenessScore += Math.floor(20 / requiredFields.length);
    } else {
      completenessFindings.push(`${name} is missing or too brief (min ${minLength} chars)`);
    }
  }

  rubricBreakdown.push({
    category: 'completeness',
    score: completenessScore,
    maxScore: 20,
    findings: completenessFindings,
  });

  if (completenessFindings.length > 0) {
    findings.push({
      message: `${completenessFindings.length} mandatory fields are incomplete`,
      severity: completenessFindings.length > 3 ? 'high' : 'medium',
      category: 'Completeness',
      whyItMatters: 'Incomplete workpapers may not provide sufficient documentation for review and cannot support audit conclusions.',
    });
  }

  // 2. Traceability (20 points)
  const traceabilityFindings: string[] = [];
  let traceabilityScore = 0;

  if (checkRiskControlAlignment(input.riskStatement, input.controlDescription)) {
    traceabilityScore += 10;
  } else {
    traceabilityFindings.push('Risk statement does not clearly align with control description');
    findings.push({
      message: 'Risk-control mismatch detected',
      severity: 'high',
      category: 'Traceability',
      whyItMatters: 'The control should directly address the identified risk. Misalignment indicates the wrong control may be tested.',
    });
  }

  const procedureMentionsControl = input.testProcedure.toLowerCase().includes('control') ||
    input.testProcedure.length > 100;
  if (procedureMentionsControl) {
    traceabilityScore += 10;
  } else {
    traceabilityFindings.push('Test procedure does not clearly link to the control being tested');
  }

  rubricBreakdown.push({
    category: 'traceability',
    score: traceabilityScore,
    maxScore: 20,
    findings: traceabilityFindings,
  });

  // 3. Sampling Rationale (15 points)
  const samplingFindings: string[] = [];
  let samplingScore = 0;

  if (input.populationDescription.length >= 30) {
    samplingScore += 5;
  } else {
    samplingFindings.push('Population description lacks detail');
  }

  if (input.sampleSize > 0) {
    samplingScore += 5;
  } else {
    samplingFindings.push('Sample size not specified');
  }

  if (checkSamplingPeriodAlignment(input.controlFrequency, input.populationDescription)) {
    samplingScore += 5;
  } else {
    samplingFindings.push('Sampling period may not align with control frequency');
    findings.push({
      message: 'Sampling period misalignment',
      severity: 'medium',
      category: 'Sampling',
      whyItMatters: 'For monthly/quarterly controls, the sampling period should cover the appropriate timeframe to ensure representative testing.',
    });
  }

  rubricBreakdown.push({
    category: 'samplingRationale',
    score: samplingScore,
    maxScore: 15,
    findings: samplingFindings,
  });

  // 4. Evidence Sufficiency (15 points)
  const evidenceFindings: string[] = [];
  let evidenceScore = 0;

  if (input.evidenceCaptured.length >= 30) {
    evidenceScore += 5;
  } else {
    evidenceFindings.push('Evidence description is too brief');
  }

  const hasLocation = /folder|drive|sharepoint|path|link|file|attachment|文件夹|路径|链接|附件/i.test(input.evidenceCaptured);
  if (hasLocation) {
    evidenceScore += 5;
  } else {
    evidenceFindings.push('Evidence location/storage not specified');
    findings.push({
      message: 'Evidence storage location not documented',
      severity: 'medium',
      category: 'Evidence',
      whyItMatters: 'Reviewers and future auditors need to know where evidence is stored to verify conclusions.',
    });
  }

  const evidenceSupportsResult = input.evidenceCaptured.length > 20 && input.testResult;
  if (evidenceSupportsResult) {
    evidenceScore += 5;
  }

  rubricBreakdown.push({
    category: 'evidenceSufficiency',
    score: evidenceScore,
    maxScore: 15,
    findings: evidenceFindings,
  });

  // 5. Conclusion Quality (15 points)
  const conclusionCheck = checkConclusionQuality(input.conclusion, input.testResult, input.exceptionDetail);
  const conclusionScore = Math.min(conclusionCheck.score, 15);

  rubricBreakdown.push({
    category: 'conclusionQuality',
    score: conclusionScore,
    maxScore: 15,
    findings: conclusionCheck.issues,
  });

  if (conclusionCheck.issues.length > 0) {
    for (const issue of conclusionCheck.issues) {
      findings.push({
        message: issue,
        severity: issue.includes('required') ? 'high' : 'medium',
        category: 'Conclusion',
        whyItMatters: 'A well-structured conclusion ensures findings are actionable and provides clear guidance for remediation.',
      });
    }
  }

  // 6. Professional Tone (15 points)
  const toneFindings: string[] = [];
  let toneScore = 15;

  const vagueTerms = detectVagueTerms(
    `${input.testProcedure} ${input.conclusion} ${input.evidenceCaptured}`
  );

  if (vagueTerms.length > 0) {
    toneScore -= Math.min(vagueTerms.length * 3, 10);
    toneFindings.push(`Vague terms detected: ${vagueTerms.join(', ')}`);
    findings.push({
      message: `Vague language detected: "${vagueTerms.slice(0, 3).join('", "')}"`,
      severity: 'low',
      category: 'Professional Tone',
      whyItMatters: 'Vague terms like "appropriate" or "adequate" lack specificity and may not withstand audit scrutiny.',
    });
    suggestions.push(
      `Replace vague terms with specific criteria. For example, instead of "appropriate approvals", specify "approval by Department Manager per Policy ABC-123".`
    );
  }

  const casualTerms = /gonna|wanna|kinda|pretty much|basically|stuff|things|等等|之类的/i;
  if (casualTerms.test(input.conclusion) || casualTerms.test(input.testProcedure)) {
    toneScore -= 5;
    toneFindings.push('Casual language detected');
  }

  rubricBreakdown.push({
    category: 'professionalTone',
    score: Math.max(0, toneScore),
    maxScore: 15,
    findings: toneFindings,
  });

  // Generate suggestions
  const procedureCheck = checkProcedureQuality(input.testProcedure, input.controlType);
  if (procedureCheck.issues.length > 0) {
    suggestions.push(
      `Improve test procedure: ${procedureCheck.issues.join('; ')}. Consider using numbered steps like: "1. Obtain data from [source], 2. Select [n] items using [method], 3. For each item, verify [criteria], 4. Document exceptions when [condition]."`
    );
  }

  if ((input.testResult === 'fail' || input.testResult === 'exception') && input.conclusion.length < 100) {
    suggestions.push(
      `Strengthen your conclusion by following the "5 Cs" format: Criteria (what should happen), Condition (what actually happened), Cause (why it happened), Consequence/Impact (what's the risk), and Corrective Action/Recommendation (what should be done).`
    );
  }

  // Calculate totals
  const totalScore = rubricBreakdown.reduce((sum, r) => sum + r.score, 0);
  const maxScore = rubricBreakdown.reduce((sum, r) => sum + r.maxScore, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore,
    maxScore,
    percentage,
    rubricBreakdown,
    findings,
    suggestions,
  };
}

// Sampling size calculation using simplified attribute sampling table
export function calculateSampleSize(
  populationSize: number,
  confidenceLevel: 90 | 95,
  tolerableDeviation: number
): SamplingSuggestion {
  // Simplified attribute sampling table based on AICPA guidance
  const samplingTable: Record<number, Record<number, number[]>> = {
    // [confidence level]: { [tolerable deviation %]: [population brackets] }
    90: {
      5: [45, 45, 55, 55, 60, 60],
      7: [30, 35, 40, 40, 45, 45],
      10: [20, 25, 25, 30, 30, 30],
    },
    95: {
      5: [60, 75, 90, 100, 110, 115],
      7: [45, 55, 60, 65, 70, 75],
      10: [30, 35, 40, 45, 50, 50],
    },
  };

  // Population size brackets: [100, 500, 1000, 2000, 5000, 10000+]
  const getBracketIndex = (popSize: number): number => {
    if (popSize <= 100) return 0;
    if (popSize <= 500) return 1;
    if (popSize <= 1000) return 2;
    if (popSize <= 2000) return 3;
    if (popSize <= 5000) return 4;
    return 5;
  };

  const tolerableKey = tolerableDeviation <= 5 ? 5 : tolerableDeviation <= 7 ? 7 : 10;
  const bracketIndex = getBracketIndex(populationSize);

  const baseSampleSize = samplingTable[confidenceLevel]?.[tolerableKey]?.[bracketIndex] ?? 25;

  // Adjust for small populations using finite population correction
  let suggestedSampleSize = baseSampleSize;
  if (populationSize < baseSampleSize * 2) {
    suggestedSampleSize = Math.ceil((baseSampleSize * populationSize) / (baseSampleSize + populationSize));
  }

  // Ensure minimum sample size
  suggestedSampleSize = Math.max(suggestedSampleSize, Math.min(25, populationSize));

  // Cap at population size
  suggestedSampleSize = Math.min(suggestedSampleSize, populationSize);

  const explanation = `Based on a population of ${populationSize}, ${confidenceLevel}% confidence level, and ${tolerableDeviation}% tolerable deviation rate, the suggested sample size is ${suggestedSampleSize}. This is derived from attribute sampling guidelines and adjusted for the population size.`;

  return {
    populationSize,
    confidenceLevel,
    tolerableDeviation,
    suggestedSampleSize,
    explanation,
  };
}

export function generateMarkdownWorkpaper(input: WorkpaperInput, result: QcResult): string {
  const qualityBadge = result.percentage >= 80 ? '✓ Good' : result.percentage >= 60 ? '△ Needs Improvement' : '✗ Significant Gaps';

  return `# Internal Audit Workpaper

## Quality Assessment
**Score:** ${result.totalScore}/${result.maxScore} (${result.percentage}%) - ${qualityBadge}

---

## Objective
${input.auditObjective}

## Scope
- **Control Type:** ${input.controlType.charAt(0).toUpperCase() + input.controlType.slice(1)}
- **Control Frequency:** ${input.controlFrequency.charAt(0).toUpperCase() + input.controlFrequency.slice(1)}
- **Sampling Method:** ${input.samplingMethod.charAt(0).toUpperCase() + input.samplingMethod.slice(1)}
- **Sample Size:** ${input.sampleSize}

## Risk Statement
${input.riskStatement}

## Control Description
${input.controlDescription}

## Population
${input.populationDescription}

## Sampling
- **Method:** ${input.samplingMethod}
- **Size:** ${input.sampleSize} items

## Test Procedure
${input.testProcedure}

## Evidence
${input.evidenceCaptured}

## Test Results
**Result:** ${input.testResult.toUpperCase()}
${input.testResult !== 'pass' && input.exceptionDetail ? `\n**Exception Detail:**\n${input.exceptionDetail}` : ''}

## Conclusion
${input.conclusion}

---

## Reviewer Notes
${result.findings.length > 0 ? `### Findings\n${result.findings.map((f) => `- [${f.severity.toUpperCase()}] ${f.message}`).join('\n')}` : 'No significant findings.'}

${result.suggestions.length > 0 ? `### Suggestions\n${result.suggestions.map((s) => `- ${s}`).join('\n')}` : ''}

---
*Generated by Workpaper QC Tool*
`;
}

export const exampleWorkpaperData: WorkpaperInput = {
  auditObjective: 'To verify that all vendor payments above €10,000 have appropriate dual approval before processing, ensuring compliance with the company\'s payment authorization policy.',
  riskStatement: 'Unauthorized or fraudulent payments may be processed without proper management oversight, leading to financial loss and potential fraud.',
  controlDescription: 'The Finance Manager and Department Head must both approve all vendor payments exceeding €10,000 in the ERP system before the payment file is generated. The control owner is the Treasury team, and the control operates for each payment batch processed.',
  controlType: 'preventive',
  controlFrequency: 'daily',
  populationDescription: 'All vendor payments above €10,000 processed through the ERP system during Q1 2025 (January 1 - March 31, 2025). Total population: 847 transactions sourced from the AP Payment Register report.',
  samplingMethod: 'random',
  sampleSize: 45,
  testProcedure: '1. Obtain the AP Payment Register for Q1 2025 from the ERP system.\n2. Filter for payments exceeding €10,000.\n3. Randomly select 45 transactions using Excel RANDBETWEEN function.\n4. For each selected transaction:\n   a. Verify Finance Manager approval is documented in the system before payment date.\n   b. Verify Department Head approval is documented in the system before payment date.\n   c. Confirm both approvers are authorized signatories per the Delegation of Authority matrix.\n5. Document any exceptions where:\n   - Approval is missing or dated after payment processing\n   - Approver is not on the authorized signatory list\n   - Same person provided both approvals',
  evidenceCaptured: 'Evidence stored in SharePoint: /Audit/2025/Q1/PaymentApprovals/\n- Screenshot of approval workflow for each sampled transaction\n- AP Payment Register extract\n- Sample selection spreadsheet with random number generation\n- Delegation of Authority matrix (as of March 2025)',
  testResult: 'exception',
  exceptionDetail: '3 out of 45 transactions (6.7%) showed exceptions:\n- Transaction #12847: Department Head approval dated 2 days after payment processing\n- Transaction #15923: Approver not listed on current Delegation of Authority matrix\n- Transaction #18456: System shows approval by same Finance Manager twice (system glitch suspected)',
  conclusion: 'Criteria: Per Payment Authorization Policy v3.2, all payments >€10,000 require dual approval from Finance Manager and Department Head before processing.\n\nCondition: 3 of 45 (6.7%) sampled transactions did not meet the dual approval requirement.\n\nCause: Root cause analysis indicates: (1) inadequate system controls allowing late approvals, (2) outdated DOA matrix not reflecting recent personnel changes, (3) system configuration issue allowing duplicate approver.\n\nImpact: Elevated risk of unauthorized payments. While no fraud was identified in the exceptions noted, the control weaknesses could be exploited.\n\nRecommendation:\n1. IT to implement hard stop preventing payment processing without prior dual approval (High priority)\n2. Treasury to update DOA matrix monthly and reconcile to system access (Medium priority)\n3. IT to investigate and fix duplicate approver system bug (High priority)',
};
