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

  describe('getSnippetById', () => {
    it('should throw error for invalid id', async () => {
      await expect(snippetManager.getSnippetById('')).rejects.toThrow(
        'id is required',
      );
    });

    it('should return snippet when found', async () => {
      const input = 'x'.repeat(100);
      const output = 'summary';

      mockGenerate.mockResolvedValue(output);
      const newSnippet = await snippetManager.createSnippet({ text: input });

      const result = await snippetManager.getSnippetById(newSnippet.id);
      expect(result).toEqual(newSnippet);
    });

    it('should return null when snippet not found', async () => {
      const result = await snippetManager.getSnippetById(
        '0123456789acc4a62520d2f5',
      );
      expect(result).toBeNull();
    });
  });
});
