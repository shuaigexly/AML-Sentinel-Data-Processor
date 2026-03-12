const encoder = new TextEncoder();

function serializeEvent(payload: unknown): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function createSseResponse(
  handler: (send: (payload: unknown) => void) => Promise<void>
): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(serializeEvent(payload));
      };

      void (async () => {
        try {
          await handler(send);
        } catch (error) {
          send({
            type: 'error',
            message: error instanceof Error ? error.message : 'Unknown streaming error.',
          });
        } finally {
          controller.close();
        }
      })();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
