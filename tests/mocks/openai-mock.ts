import { ChatCompletion } from 'openai/resources';
import { vi } from 'vitest';

// Mock the openai module
vi.mock('openai', () => {
  const mockCreate = vi.fn();

  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    })),
  };
});

// Access the mocked `create` function
export async function mockOpenAICreate() {
  const OpenAI = (await import('openai')).default;
  const mockInstance = new OpenAI();
  return vi.mocked(mockInstance.chat.completions.create);
}

// Helper to create mock chat completion responses
export function createMockChatCompletion(
  content: string | null,
): ChatCompletion {
  return {
    id: 'chatcmpl-B9MHDbslfkBeAs8l4bebGdFOJ6PeG',
    object: 'chat.completion',
    created: 1741570283,
    model: 'gpt-4o-2024-08-06',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content,
          refusal: null,
        },
        logprobs: null,
        finish_reason: 'stop',
      },
    ],
    usage: {
      prompt_tokens: 1117,
      completion_tokens: 46,
      total_tokens: 1163,
      prompt_tokens_details: {
        cached_tokens: 0,
        audio_tokens: 0,
      },
      completion_tokens_details: {
        reasoning_tokens: 0,
        audio_tokens: 0,
        accepted_prediction_tokens: 0,
        rejected_prediction_tokens: 0,
      },
    },
    service_tier: 'default',
    system_fingerprint: 'fp_fc9f1d7035',
  };
}
