import Anthropic from '@anthropic-ai/sdk';
import {
  buildRagContextText,
  buildRagFallbackAnswer,
  buildRagSystemPrompt,
  chunkText,
  type AmlLocale,
  type RagRequestBody,
} from '@/lib/amlAssistant';
import { createSseResponse, sleep } from '@/lib/serverSse';

export const dynamic = 'force-dynamic';

const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929';

function getLocale(value: unknown): AmlLocale {
  return value === 'zh' ? 'zh' : 'en';
}

function isValidBody(body: unknown): body is RagRequestBody {
  if (!body || typeof body !== 'object') {
    return false;
  }

  const candidate = body as Partial<RagRequestBody>;
  return typeof candidate.query === 'string' && Array.isArray(candidate.relevantChunks);
}

async function streamFallbackAnswer(
  send: (payload: unknown) => void,
  answer: string
): Promise<void> {
  for (const chunk of chunkText(answer, 88)) {
    send({ type: 'answer_delta', delta: chunk });
    await sleep(20);
  }
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
  const query = body.query.trim();
  const relevantChunks = body.relevantChunks.slice(0, 5);

  if (!query) {
    return Response.json({ error: 'Query is required.' }, { status: 400 });
  }

  if (relevantChunks.length === 0) {
    return Response.json({ error: 'No relevant regulation chunks provided.' }, { status: 400 });
  }

  return createSseResponse(async (send) => {
    send({ type: 'status', status: 'generating' });

    const fallbackAnswer = buildRagFallbackAnswer(query, relevantChunks, locale);
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      await streamFallbackAnswer(send, fallbackAnswer);
      send({ type: 'done' });
      return;
    }

    try {
      const client = new Anthropic({ apiKey });
      const stream = await client.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: 900,
        temperature: 0.2,
        system: buildRagSystemPrompt(locale),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: [
                  `Question: ${query}`,
                  '',
                  'Retrieved regulatory context:',
                  buildRagContextText(relevantChunks, locale),
                ].join('\n'),
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
          send({ type: 'answer_delta', delta: event.delta.text });
        }
      }

      if (!emittedText) {
        await streamFallbackAnswer(send, fallbackAnswer);
      }

      send({ type: 'done' });
    } catch {
      await streamFallbackAnswer(send, fallbackAnswer);
      send({ type: 'done' });
    }
  });
}
