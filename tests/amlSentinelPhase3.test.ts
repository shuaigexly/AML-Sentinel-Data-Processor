import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { POST as postRag } from '../src/app/api/aml/rag/route';
import { POST as postStr } from '../src/app/api/aml/str/route';
import { amlAlerts } from '../src/lib/amlAlerts';
import { amlCases } from '../src/lib/amlCases';
import { amlRegulations } from '../src/lib/amlRegulations';

const projectRoot = path.resolve(__dirname, '..');
const toolSource = fs.readFileSync(
  path.join(projectRoot, 'src/components/AmlSentinelTool.tsx'),
  'utf8'
);
const envExample = fs.readFileSync(path.join(projectRoot, '.env.example'), 'utf8');
const originalAnthropicKey = process.env.ANTHROPIC_API_KEY;

function parseSsePayloads(raw: string): Array<Record<string, unknown>> {
  return raw
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) =>
      block
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('data:'))
        .map((line) => JSON.parse(line.slice(5).trim()) as Record<string, unknown>)
    );
}

beforeEach(() => {
  delete process.env.ANTHROPIC_API_KEY;
});

afterAll(() => {
  if (originalAnthropicKey === undefined) {
    delete process.env.ANTHROPIC_API_KEY;
    return;
  }
  process.env.ANTHROPIC_API_KEY = originalAnthropicKey;
});

describe('AML Sentinel Phase 3 SSE routes', () => {
  it('streams a fallback RAG answer when no Anthropic key is configured', async () => {
    const response = await postRag(
      new Request('http://localhost/api/aml/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'beneficial ownership',
          relevantChunks: amlRegulations.slice(5, 8),
          locale: 'en',
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/event-stream');

    const events = parseSsePayloads(await response.text());
    expect(events.some((event) => event.type === 'answer_delta')).toBe(true);
    expect(events.at(-1)?.type).toBe('done');
  });

  it('rejects invalid RAG requests before opening the stream', async () => {
    const response = await postRag(
      new Request('http://localhost/api/aml/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'threshold',
          relevantChunks: [],
          locale: 'en',
        }),
      })
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'No relevant regulation chunks provided.',
    });
  });

  it('streams STR step events and a fallback report for a linked case bundle', async () => {
    const amlCase = amlCases.find((item) => item.id === 'CASE-004');
    expect(amlCase).toBeTruthy();
    const caseAlerts = amlAlerts.filter((alert) => amlCase?.alertIds.includes(alert.id));

    const response = await postStr(
      new Request('http://localhost/api/aml/str', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: amlCase?.id,
          amlCase,
          caseAlerts,
          locale: 'en',
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/event-stream');

    const events = parseSsePayloads(await response.text());
    const stepEvents = events.filter((event) => event.type === 'step');
    expect(stepEvents).toHaveLength(12);
    expect(events.some((event) => event.type === 'report_delta')).toBe(true);
    expect(events.at(-1)?.type).toBe('done');
  });
});

describe('AML Sentinel Phase 3 integration surface', () => {
  it('wires the frontend workbench to the AML API routes', () => {
    expect(toolSource).toContain("/api/aml/rag");
    expect(toolSource).toContain("/api/aml/str");
    expect(toolSource).toContain('consumeSseStream');
  });

  it('documents Anthropic environment variables in .env.example', () => {
    expect(envExample).toContain('ANTHROPIC_API_KEY');
    expect(envExample).toContain('ANTHROPIC_MODEL');
  });

  it('ships the three AML preprocessing scripts with healthy --help entrypoints', () => {
    const scripts = [
      'scripts/aml/preprocess_cases.py',
      'scripts/aml/build_network.py',
      'scripts/aml/chunk_regulations.py',
    ];

    for (const script of scripts) {
      const absolutePath = path.join(projectRoot, script);
      expect(fs.existsSync(absolutePath)).toBe(true);

      const result = spawnSync('python', [absolutePath, '--help'], {
        cwd: projectRoot,
        encoding: 'utf8',
      });

      expect(result.status).toBe(0);
      expect(result.stdout.toLowerCase()).toContain('usage');
    }
  });
});
