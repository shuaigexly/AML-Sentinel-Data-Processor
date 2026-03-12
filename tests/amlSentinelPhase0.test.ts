import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { amlAlerts } from '../src/lib/amlAlerts';
import { amlCases } from '../src/lib/amlCases';
import { amlNetworkData } from '../src/lib/amlNetworkData';
import { amlRegulations, searchRegulations } from '../src/lib/amlRegulations';
import {
  investigationChecklist,
  ruleConfigs,
  strTemplateSections,
} from '../src/lib/amlConfig';

const projectRoot = path.resolve(__dirname, '..');
const amlToolSource = fs.readFileSync(
  path.join(projectRoot, 'src/components/AmlSentinelTool.tsx'),
  'utf8'
);
const echartsWrapperSource = fs.readFileSync(
  path.join(projectRoot, 'src/components/charts/EChartsWrapper.tsx'),
  'utf8'
);

describe('AML Sentinel Phase 0 data acceptance', () => {
  it('ships 10 mock alerts covering every severity level', () => {
    expect(amlAlerts).toHaveLength(10);
    expect(new Set(amlAlerts.map((alert) => alert.severity))).toEqual(
      new Set(['low', 'medium', 'high', 'critical'])
    );
  });

  it('keeps every alert linked to a defined case', () => {
    const caseIds = new Set(amlCases.map((amlCase) => amlCase.id));
    expect(amlAlerts.every((alert) => caseIds.has(alert.caseId))).toBe(true);
  });

  it('covers the full case lifecycle state model in the mock cases', () => {
    expect(amlCases.length).toBeGreaterThanOrEqual(6);
    expect(new Set(amlCases.map((amlCase) => amlCase.status))).toEqual(
      new Set([
        'new_alert',
        'under_review',
        'need_more_evidence',
        'ready_for_supervisor_review',
        'closed_false_positive',
        'ready_for_reporting',
      ])
    );
  });

  it('keeps every case linked only to existing alerts', () => {
    const alertIds = new Set(amlAlerts.map((alert) => alert.id));
    expect(
      amlCases.every((amlCase) =>
        amlCase.alertIds.every((alertId) => alertIds.has(alertId))
      )
    ).toBe(true);
  });

  it('ships the expected Phase 0 network graph footprint', () => {
    expect(amlNetworkData.categories).toHaveLength(3);
    expect(amlNetworkData.nodes).toHaveLength(15);
    expect(amlNetworkData.edges).toHaveLength(10);
  });

  it('ships the expected Phase 0 config footprint', () => {
    expect(ruleConfigs).toHaveLength(6);
    expect(investigationChecklist).toHaveLength(8);
    expect(strTemplateSections).toHaveLength(6);
  });
});

describe('AML Sentinel Phase 0 regulation retrieval', () => {
  it('returns a Chinese AML statute chunk for Chinese reporting deadline queries', () => {
    const results = searchRegulations('可疑交易 报告 时限', 3);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].source).toBe('aml_law_2024');
    expect(results[0].article).toBe('第三十三条');
  });

  it('returns English analysis content for beneficial ownership queries', () => {
    const results = searchRegulations('beneficial ownership', 3);
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some((chunk) => chunk.text.toLowerCase().includes('beneficial ownership'))
    ).toBe(true);
  });

  it('ships 10 regulation chunks for mock mode', () => {
    expect(amlRegulations).toHaveLength(10);
  });
});

describe('AML Sentinel Phase 0 source invariants', () => {
  it('registers GraphChart in the ECharts wrapper', () => {
    expect(echartsWrapperSource).toContain('GraphChart');
    expect(echartsWrapperSource).toContain('echarts.use([');
  });

  it('keeps AmlSentinelTool as a client component', () => {
    const firstNonEmptyLine = amlToolSource
      .split(/\r?\n/)
      .find((line) => line.trim().length > 0);
    expect(firstNonEmptyLine).toBe("'use client';");
  });

  it('does not hardcode user-visible AML workbench copy that should come from i18n', () => {
    const forbiddenLiterals = [
      'Reporting Urgency',
      '上报紧迫性',
      'Current Case',
      '当前案件',
      'Click a node to view account details',
      '点击节点查看账户详情',
      'Click "Generate STR Draft" to begin...',
      '点击“生成 STR 草稿”开始...',
    ];

    for (const literal of forbiddenLiterals) {
      expect(amlToolSource).not.toContain(literal);
    }
  });
});
