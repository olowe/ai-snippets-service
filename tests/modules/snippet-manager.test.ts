import SnippetManager from '@/modules/snippet-manager';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('SnippetManager', () => {
  let snippetManager: SnippetManager;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSummaryGenerator: any;

  beforeEach(() => {
    // Create a mock SummaryGenerator
    mockSummaryGenerator = {
      generate: vi.fn(),
    };

    // Inject the mock into SnippetManager
    snippetManager = new SnippetManager(mockSummaryGenerator);
  });

  describe('createSnippet', () => {
    it('should throw error for empty text', async () => {
      await expect(snippetManager.createSnippet()).rejects.toThrow(
        'Text content is required',
      );
    });

    it('should create snippet with valid text', async () => {
      const input = 'x'.repeat(100);
      const output = 'summary';

      vi.mocked(mockSummaryGenerator.generateSummary).mockResolvedValue(output);

      const result = await snippetManager.createSnippet();

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('summary');
      expect(result.text).toBe(input);
      expect(result.summary).toBe(output);
      expect(mockSummaryGenerator.generateSummary).toHaveBeenCalledWith(input);
    });
  });
});
