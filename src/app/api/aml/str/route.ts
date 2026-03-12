import Anthropic from '@anthropic-ai/sdk';
import {
  buildStrPrompt,
  buildStrSystemPrompt,
  chunkText,
  resolveStrContext,
  type AmlLocale,
  type StrRequestBody,
} from '@/lib/amlAssistant';
import { createSseResponse, sleep } from '@/lib/serverSse';

export const dynamic = 'force-dynamic';

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929';

function getLocale(value: unknown): AmlLocale {
  return value === 'zh' ? 'zh' : 'en';
}

function isValidBody(body: unknown): body is StrRequestBody {
  if (!body || typeof body !== 'object') {
    return false;
  }

  const candidate = body as Partial<StrRequestBody>;
  return (
    typeof candidate.caseId === 'string' &&
    !!candidate.amlCase &&
    typeof candidate.amlCase === 'object' &&
    Array.isArray(candidate.caseAlerts)
  );
}

async function streamReport(send: (payload: unknown) => void, report: string): Promise<void> {
  for (const chunk of chunkText(report, 120)) {
    send({ type: 'report_delta', delta: chunk });
    await sleep(18);
  }
}

async function emitStep(
  send: (payload: unknown) => void,
  stepIndex: number,
  detail: string
): Promise<void> {
  send({ type: 'step', stepIndex, status: 'running' });
  await sleep(55);
  send({ type: 'step', stepIndex, status: 'done', detail });
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const locale = getLocale(body.locale);
  const { caseId, amlCase, caseAlerts } = body;

  if (caseId !== amlCase.id) {
    return Response.json({ error: 'caseId does not match amlCase.id.' }, { status: 400 });
  }

  if (caseAlerts.length === 0) {
    return Response.json({ error: 'At least one case alert is required.' }, { status: 400 });
  }

  const resolved = resolveStrContext(amlCase, caseAlerts, locale);

  return createSseResponse(async (send) => {
    for (let stepIndex = 0; stepIndex < resolved.stepDetails.length - 1; stepIndex += 1) {
      await emitStep(send, stepIndex, resolved.stepDetails[stepIndex]);
    }

    const finalStepIndex = resolved.stepDetails.length - 1;
    send({ type: 'step', stepIndex: finalStepIndex, status: 'running' });

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      await streamReport(send, resolved.fallbackReport);
      send({
        type: 'step',
        stepIndex: finalStepIndex,
        status: 'done',
        detail: resolved.stepDetails[finalStepIndex],
      });
      send({ type: 'done' });
      return;
    }

    try {
      const client = new Anthropic({ apiKey });
      const stream = await client.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: 1800,
        temperature: 0.2,
        system: buildStrSystemPrompt(locale),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: buildStrPrompt(amlCase, caseAlerts, locale),
              },
            ],
          },
        ],
        stream: true,
      });

      let emittedText = false;

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          emittedText = true;
          send({ type: 'report_delta', delta: event.delta.text });
        }
      }

      if (!emittedText) {
        await streamReport(send, resolved.fallbackReport);
      }
    } catch {
      await streamReport(send, resolved.fallbackReport);
    }

    send({
      type: 'step',
      stepIndex: finalStepIndex,
      status: 'done',
      detail: resolved.stepDetails[finalStepIndex],
    });
    send({ type: 'done' });
  });
}
