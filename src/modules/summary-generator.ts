import OpenAI from 'openai';

class SummaryGenerator {
  private readonly MAX_SNIPPET_LEN = 3000;
  private openAI: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey.trim()) {
      throw new Error('API key is required');
    }

    this.openAI = new OpenAI({ apiKey });
  }

  async generate(): Promise<string> {
    // Check minmax text length
    // Use openai for summary
    // Handle errors
    throw new Error('Unavailable');
  }
}

export default SummaryGenerator;
