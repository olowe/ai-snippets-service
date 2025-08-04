import SummaryGenerator from '@/modules/summary-generator';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockChatCompletion } from '../mocks/openai-mock';

const mockCreate = vi.fn();

vi.mock('openai', () => {
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

describe('SummaryGenerator', () => {
  const testAPIKey = 'test-api-key';

  const maxSnippetTextLength = 3000;
  const minSnippetTextLength = 30;

  describe('constructor', () => {
    it('should throw error if no API key provided', () => {
      expect(() => new SummaryGenerator('')).toThrow('API key is required');
    });

    it('should create valid instance when API key provided', () => {
      expect(() => new SummaryGenerator(testAPIKey)).not.toThrow();
    });
  });

  describe('generate', () => {
    let summaryGenerator: SummaryGenerator;

    beforeEach(async () => {
      vi.clearAllMocks();
      summaryGenerator = new SummaryGenerator(testAPIKey);
    });

    it('should throw error for empty text', async () => {
      await expect(() => summaryGenerator.generate('')).rejects.toThrow(
        'Snippet text is required',
      );
    });

    it('should throw error for text that is too long', async () => {
      const longSnippet = 'x'.repeat(maxSnippetTextLength + 1);

      await expect(() =>
        summaryGenerator.generate(longSnippet),
      ).rejects.toThrow(
        `Snippet text is too long. Maximum of ${maxSnippetTextLength} characters`,
      );
    });

    it('should throw error for text that is too short', async () => {
      const invalidSnippet = 'x'.repeat(minSnippetTextLength - 1);

      await expect(() =>
        summaryGenerator.generate(invalidSnippet),
      ).rejects.toThrow(
        `Snippet text is too short. Minimum of ${minSnippetTextLength} characters`,
      );
    });

    it('should generate summary for valid text', async () => {
      const input = 'x'.repeat(100);
      const output = 'summary';

      mockCreate.mockResolvedValue(createMockChatCompletion(output));

      const result = await summaryGenerator.generate(input);

      expect(result).toBe(output);
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: expect.any(String),
          messages: expect.any(Array),
          temperature: expect.any(Number),
        }),
      );
    });
  });
});
