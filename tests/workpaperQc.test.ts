import { describe, it, expect } from 'vitest';
import {
  detectVagueTerms,
  checkFieldPresence,
  checkRiskControlAlignment,
  checkProcedureQuality,
  checkConclusionQuality,
  checkSamplingPeriodAlignment,
  evaluateWorkpaper,
  calculateSampleSize,
  generateMarkdownWorkpaper,
  exampleWorkpaperData,
  type WorkpaperInput,
} from '../src/lib/workpaperQc';

describe('detectVagueTerms', () => {
  it('should detect vague English terms', () => {
    const text = 'The control is appropriate and adequate for the process.';
    const result = detectVagueTerms(text);
    expect(result).toContain('appropriate');
    expect(result).toContain('adequate');
  });

  it('should detect vague Chinese terms', () => {
    const text = '该控制措施充分且合理。';
    const result = detectVagueTerms(text);
    expect(result).toContain('充分');
    expect(result).toContain('合理');
  });

  it('should return empty array when no vague terms found', () => {
    const text = 'The control requires dual approval from Finance Manager and Department Head.';
    const result = detectVagueTerms(text);
    expect(result).toHaveLength(0);
  });

  it('should handle case-insensitive matching', () => {
    const text = 'APPROPRIATE and Reasonable controls.';
    const result = detectVagueTerms(text);
    expect(result).toContain('appropriate');
    expect(result).toContain('reasonable');
  });
});

describe('checkFieldPresence', () => {
  it('should return true for fields with sufficient length', () => {
    expect(checkFieldPresence('This is a valid field with enough content', 10)).toBe(true);
  });

  it('should return false for fields below minimum length', () => {
    expect(checkFieldPresence('Short', 10)).toBe(false);
  });

  it('should handle empty strings', () => {
    expect(checkFieldPresence('', 10)).toBe(false);
  });

  it('should trim whitespace before checking', () => {
    expect(checkFieldPresence('   short   ', 10)).toBe(false);
  });
});

describe('checkRiskControlAlignment', () => {
  it('should return true when risk and control have common keywords', () => {
    const risk = 'Unauthorized payments may be processed without approval';
    const control = 'All payments require dual approval before processing';
    expect(checkRiskControlAlignment(risk, control)).toBe(true);
  });

  it('should return false when risk and control are unrelated', () => {
    const risk = 'Data breach may occur';
    const control = 'Inventory counts are performed weekly';
    expect(checkRiskControlAlignment(risk, control)).toBe(false);
  });

  it('should handle empty inputs', () => {
    expect(checkRiskControlAlignment('', 'Some control')).toBe(false);
    expect(checkRiskControlAlignment('Some risk', '')).toBe(false);
  });

  it('should allow alignment for long detailed descriptions', () => {
    const risk = 'This is a very detailed risk statement that describes potential issues with the financial reporting process and how it could lead to material misstatements.';
    const control = 'Management reviews financial reports monthly and investigates any unusual variances or anomalies in the reported figures before approval.';
    expect(checkRiskControlAlignment(risk, control)).toBe(true);
  });
});

describe('checkProcedureQuality', () => {
  it('should give higher score for procedures with numbered steps', () => {
    const procedure = '1. Obtain data from ERP\n2. Select sample\n3. Review evidence';
    const result = checkProcedureQuality(procedure, 'preventive');
    expect(result.score).toBeGreaterThan(0);
  });

  it('should flag procedures without data source', () => {
    const procedure = 'Review the approvals and verify they are complete.';
    const result = checkProcedureQuality(procedure, 'preventive');
    expect(result.issues.some((i) => i.includes('data source'))).toBe(true);
  });

  it('should flag procedures without exception definition', () => {
    const procedure = 'Obtain data from system and review.';
    const result = checkProcedureQuality(procedure, 'preventive');
    expect(result.issues.some((i) => i.includes('exception'))).toBe(true);
  });

  it('should require before-the-fact evidence for preventive controls', () => {
    const procedure = 'Review the reconciliation report after month-end close.';
    const result = checkProcedureQuality(procedure, 'preventive');
    expect(result.issues.some((i) => i.includes('before-the-fact'))).toBe(true);
  });

  it('should require after-the-fact evidence for detective controls', () => {
    const procedure = 'Verify approval before transaction is processed.';
    const result = checkProcedureQuality(procedure, 'detective');
    expect(result.issues.some((i) => i.includes('after-the-fact'))).toBe(true);
  });
});

describe('checkConclusionQuality', () => {
  it('should give higher score for conclusions with multiple keywords', () => {
    const conclusion = 'Criteria: Policy requires approval. Condition: 3 exceptions found. Cause: System glitch. Impact: Risk of unauthorized payments. Recommendation: Fix system.';
    const result = checkConclusionQuality(conclusion, 'exception', 'Found 3 exceptions');
    expect(result.score).toBeGreaterThan(10);
  });

  it('should require exception detail when test result is fail', () => {
    const result = checkConclusionQuality('Control failed testing.', 'fail', '');
    expect(result.issues.some((i) => i.includes('Exception detail'))).toBe(true);
  });

  it('should require recommendation when exceptions are found', () => {
    const result = checkConclusionQuality('Found exceptions in testing.', 'exception', 'Some exceptions found');
    expect(result.issues.some((i) => i.includes('recommendation'))).toBe(true);
  });

  it('should not require exception detail for passing results', () => {
    const result = checkConclusionQuality('Control is operating effectively.', 'pass', '');
    expect(result.issues.some((i) => i.includes('Exception detail'))).toBe(false);
  });
});

describe('checkSamplingPeriodAlignment', () => {
  it('should return true for monthly control with monthly population', () => {
    expect(checkSamplingPeriodAlignment('monthly', 'All transactions for the month of January 2025')).toBe(true);
  });

  it('should return true for quarterly control with quarterly population', () => {
    expect(checkSamplingPeriodAlignment('quarterly', 'Q1 2025 transactions')).toBe(true);
  });

  it('should return false for monthly control without time period', () => {
    expect(checkSamplingPeriodAlignment('monthly', 'All vendor payments above $10,000')).toBe(false);
  });

  it('should always return true for daily controls', () => {
    expect(checkSamplingPeriodAlignment('daily', 'Random population description')).toBe(true);
  });
});

describe('evaluateWorkpaper', () => {
  const minimalInput: WorkpaperInput = {
    auditObjective: '',
    riskStatement: '',
    controlDescription: '',
    controlType: 'preventive',
    controlFrequency: 'monthly',
    populationDescription: '',
    samplingMethod: 'random',
    sampleSize: 0,
    testProcedure: '',
    evidenceCaptured: '',
    testResult: 'pass',
    exceptionDetail: '',
    conclusion: '',
  };

  it('should penalize missing fields', () => {
    const result = evaluateWorkpaper(minimalInput);
    expect(result.percentage).toBeLessThan(50);
    expect(result.findings.some((f) => f.category === 'Completeness')).toBe(true);
  });

  it('should detect risk-control mismatch', () => {
    const input: WorkpaperInput = {
      ...minimalInput,
      riskStatement: 'Data breach may occur due to weak access controls',
      controlDescription: 'Inventory counts are performed weekly by warehouse staff',
    };
    const result = evaluateWorkpaper(input);
    expect(result.findings.some((f) => f.message.includes('Risk-control mismatch'))).toBe(true);
  });

  it('should require exception handling when test fails', () => {
    const input: WorkpaperInput = {
      ...minimalInput,
      auditObjective: 'Test payment approval controls for compliance',
      riskStatement: 'Unauthorized payments may be processed without proper approval',
      controlDescription: 'Dual approval required for payments over $10,000 by Finance Manager and Department Head',
      testResult: 'fail',
      exceptionDetail: '',
      conclusion: 'Control failed testing.',
    };
    const result = evaluateWorkpaper(input);
    expect(result.findings.some((f) => f.message.includes('Exception detail'))).toBe(true);
  });

  it('should detect vague language', () => {
    const input: WorkpaperInput = {
      ...minimalInput,
      testProcedure: 'Verify that the control is working appropriately and adequately.',
      conclusion: 'The control appears to be reasonable and sufficient.',
    };
    const result = evaluateWorkpaper(input);
    expect(result.findings.some((f) => f.category === 'Professional Tone')).toBe(true);
  });

  it('should give high score for complete example data', () => {
    const result = evaluateWorkpaper(exampleWorkpaperData);
    expect(result.percentage).toBeGreaterThan(60);
  });
});

describe('calculateSampleSize', () => {
  it('should suggest larger samples for higher confidence levels', () => {
    const sample90 = calculateSampleSize(1000, 90, 5);
    const sample95 = calculateSampleSize(1000, 95, 5);
    expect(sample95.suggestedSampleSize).toBeGreaterThan(sample90.suggestedSampleSize);
  });

  it('should suggest smaller samples for higher tolerable deviation', () => {
    const sample5 = calculateSampleSize(1000, 95, 5);
    const sample10 = calculateSampleSize(1000, 95, 10);
    expect(sample10.suggestedSampleSize).toBeLessThan(sample5.suggestedSampleSize);
  });

  it('should cap sample size at population size', () => {
    const result = calculateSampleSize(20, 95, 5);
    expect(result.suggestedSampleSize).toBeLessThanOrEqual(20);
  });

  it('should provide minimum sample size of 25 for large populations', () => {
    const result = calculateSampleSize(10000, 90, 10);
    expect(result.suggestedSampleSize).toBeGreaterThanOrEqual(25);
  });

  it('should include explanation in the result', () => {
    const result = calculateSampleSize(1000, 95, 5);
    expect(result.explanation).toBeDefined();
    expect(result.explanation.length).toBeGreaterThan(50);
  });

  it('should apply finite population correction for small populations', () => {
    const smallPop = calculateSampleSize(100, 95, 5);
    const largePop = calculateSampleSize(10000, 95, 5);
    expect(smallPop.suggestedSampleSize).toBeLessThan(largePop.suggestedSampleSize);
  });
});

describe('generateMarkdownWorkpaper', () => {
  it('should generate valid markdown with all sections', () => {
    const result = evaluateWorkpaper(exampleWorkpaperData);
    const markdown = generateMarkdownWorkpaper(exampleWorkpaperData, result);

    expect(markdown).toContain('# Internal Audit Workpaper');
    expect(markdown).toContain('## Objective');
    expect(markdown).toContain('## Risk Statement');
    expect(markdown).toContain('## Control Description');
    expect(markdown).toContain('## Test Procedure');
    expect(markdown).toContain('## Evidence');
    expect(markdown).toContain('## Conclusion');
    expect(markdown).toContain('## Reviewer Notes');
  });

  it('should include quality score in output', () => {
    const result = evaluateWorkpaper(exampleWorkpaperData);
    const markdown = generateMarkdownWorkpaper(exampleWorkpaperData, result);

    expect(markdown).toContain('Quality Assessment');
    expect(markdown).toContain(`${result.percentage}%`);
  });

  it('should include exception detail when applicable', () => {
    const result = evaluateWorkpaper(exampleWorkpaperData);
    const markdown = generateMarkdownWorkpaper(exampleWorkpaperData, result);

    expect(markdown).toContain('Exception Detail');
    expect(markdown).toContain(exampleWorkpaperData.exceptionDetail.substring(0, 50));
  });

  it('should list findings when present', () => {
    const minimalInput: WorkpaperInput = {
      auditObjective: '',
      riskStatement: '',
      controlDescription: '',
      controlType: 'preventive',
      controlFrequency: 'monthly',
      populationDescription: '',
      samplingMethod: 'random',
      sampleSize: 0,
      testProcedure: '',
      evidenceCaptured: '',
      testResult: 'pass',
      exceptionDetail: '',
      conclusion: '',
    };
    const result = evaluateWorkpaper(minimalInput);
    const markdown = generateMarkdownWorkpaper(minimalInput, result);

    expect(markdown).toContain('### Findings');
  });
});
