import SnippetManager from '@/modules/snippet-manager';
import SummaryGenerator from '@/modules/summary-generator';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockGenerate = vi.fn();

vi.mock('@/modules/summary-generator', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      generate: mockGenerate,
    })),
  };
});

describe('SnippetManager', () => {
  const mockSummaryGenerator = new SummaryGenerator('key');

  let snippetManager: SnippetManager;

  beforeEach(() => {
    vi.clearAllMocks();
    snippetManager = new SnippetManager(mockSummaryGenerator);
  });

  describe('createSnippet', () => {
    it('should throw error for empty text', async () => {
      await expect(snippetManager.createSnippet({ text: '' })).rejects.toThrow(
        'Text content is required',
      );
    });

    it('should create snippet with valid text', async () => {
      const input = 'x'.repeat(100);
      const output = 'summary';

      mockGenerate.mockResolvedValue(output);

      const result = await snippetManager.createSnippet({ text: input });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('text');
      expect(result).toHaveProperty('summary');
      expect(result.text).toBe(input);
      expect(result.summary).toBe(output);
      expect(mockSummaryGenerator.generate).toHaveBeenCalledWith(input);
    });
  });
});
