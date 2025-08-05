import OpenAI from 'openai';

class SummaryGenerator {
  private readonly MAX_SNIPPET_LEN = 3000;
  private readonly MIN_SNIPPET_LEN = 30;
  private openAI: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey.trim()) {
      throw new Error('API key is required');
    }

    this.openAI = new OpenAI({ apiKey });
  }

  async generate(text: string): Promise<string> {
    const trimmedText = text.trim();

    // Check minmax text length
    if (!text || trimmedText.length === 0) {
      throw new Error('Snippet text is required');
    }

    if (trimmedText.length < this.MIN_SNIPPET_LEN) {
      throw new Error(
        `Snippet text is too short. Minimum of ${this.MIN_SNIPPET_LEN} characters`,
      );
    }

    if (trimmedText.length > this.MAX_SNIPPET_LEN) {
      throw new Error(
        `Snippet text is too long. Maximum of ${this.MAX_SNIPPET_LEN} characters`,
      );
    }

    // Use openai for summary
    const response = await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that creates concise summaries. Always respond with exactly 30 words or fewer.',
        },
        {
          role: 'user',
          content: `Summarize the following text in exactly 30 words or fewer:\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    const summary = response.choices[0]?.message?.content?.trim();
    if (summary && summary.length > 0) {
      return summary;
    }

    // Handle errors
    throw new Error('Could not generate summary');
  }
}

export default SummaryGenerator;
