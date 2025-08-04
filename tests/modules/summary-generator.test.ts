import SummaryGenerator from '@/modules/summary-generator';
import { describe, expect, it } from 'vitest';

describe('SummaryGenerator', () => {
  const testAPIKey = 'test-api-key';

  describe('constructor', () => {
    it('should throw error if no API key provided', () => {
      expect(() => new SummaryGenerator('')).toThrow('API key is required');
    });

    it('should create valid instance when API key provided', () => {
      expect(() => new SummaryGenerator(testAPIKey)).not.toThrow();
    });
  });
});
