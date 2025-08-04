import SummaryGenerator from '@/modules/summary-generator';
import {
  createMockChatCompletion,
  mockOpenAICreate,
} from 'tests/mocks/openai-mock';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';

describe('SummaryGenerator', () => {
  const testAPIKey = 'test-api-key';

  const maxSnippetTextLength = 3000;
  const minSnippetTextLength = 25;

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockedOpenAICreate: MockedFunction<any>;

    beforeEach(async () => {
      vi.clearAllMocks();

      // Get the mocked create function
      mockedOpenAICreate = await mockOpenAICreate();

      summaryGenerator = new SummaryGenerator(testAPIKey);
    });

    it('should throw error for empty text', async () => {
      await expect(() => summaryGenerator.generate()).rejects.toThrow(
        'Snippet text is required',
      );
    });

    it('should throw error for text that is too long', async () => {
      await expect(() => summaryGenerator.generate()).rejects.toThrow(
        `Snippet text is too long. Maximum of ${maxSnippetTextLength} characters`,
      );
    });

    it('should throw error for text that is too short', async () => {
      await expect(() => summaryGenerator.generate()).rejects.toThrow(
        `Snippet text is too long. Minimum of ${minSnippetTextLength} characters`,
      );
    });

    it('should generate summary for valid text', async () => {
      mockedOpenAICreate.mockResolvedValue(createMockChatCompletion('Summary'));

      const result = await summaryGenerator.generate();

      expect(result).toBe('Summary');
      expect(mockedOpenAICreate).toHaveBeenCalledTimes(1);
      expect(mockedOpenAICreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: expect.any(String),
          message: expect.any(Array),
        }),
      );

      await expect(() => summaryGenerator.generate()).rejects.toThrow(
        `Snippet text is too long. Minimum of ${minSnippetTextLength} characters`,
      );
    });
  });
});
