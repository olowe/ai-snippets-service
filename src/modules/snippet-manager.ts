import { Snippet } from '@/models/Snippet';
import SummaryGenerator from './summary-generator';

export interface CreateSnippetDTO {
  text: string;
}

export interface ISnippetResponse {
  id: string;
  text: string;
  summary: string;
}

class SnippetManager {
  private summaryGenerator: SummaryGenerator;

  constructor(summaryGenerator: SummaryGenerator) {
    this.summaryGenerator = summaryGenerator;
  }

  async createSnippet(data: CreateSnippetDTO): Promise<ISnippetResponse> {
    // Check dto text length
    if (data.text.length === 0) {
      throw new Error('Text content is required');
    }

    // Use generator for summaries
    const summary = await this.summaryGenerator.generate(data.text);

    // Save to db
    const snippet = new Snippet({
      text: data.text.trim(),
      summary,
    });

    const savedSnippet = await snippet.save();

    // Return response
    return {
      id: savedSnippet.id,
      text: savedSnippet.text,
      summary: savedSnippet.summary,
    };
  }

  async getSnippetById(id: string): Promise<ISnippetResponse | null> {
    // Validate id
    if (!id) {
      throw new Error('id is required');
    }

    // Retrieve snippet
    const snippet = await Snippet.findById(id);

    // Return snippet (or null)
    if (!snippet) {
      return null;
    }

    return {
      id: snippet.id,
      text: snippet.text,
      summary: snippet.summary,
    };
  }

  async getAllSnippets(): Promise<ISnippetResponse[]> {
    // Get raw snippets sorted by date created
    // Transform to response type
    throw new Error('Unavailable');
  }
}

export default SnippetManager;
