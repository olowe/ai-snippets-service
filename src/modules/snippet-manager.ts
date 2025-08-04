import SummaryGenerator from './summary-generator';

export interface CreateSnippetDTO {
  text: string;
}

export interface ISnippetResponse {
  id: string;
  text: string;
  summary: string;
}

export class SnippetService {
  private summaryGenerator: SummaryGenerator;

  constructor(summaryGenerator: SummaryGenerator) {
    this.summaryGenerator = summaryGenerator;
  }

  async createSnippet(): Promise<ISnippetResponse> {
    // Check dto text length
    // Use generator for summaries
    // Save to db
    // Return response
    throw new Error('Unavailable');
  }

  async getSnippetById(): Promise<ISnippetResponse | null> {
    // Validate id
    // Retrieve snippet
    // Return snippet (or null)
    throw new Error('Unavailable');
  }

  async getAllSnippets(): Promise<ISnippetResponse[]> {
    // Get raw snippets sorted by date created
    // Transform to response type
    throw new Error('Unavailable');
  }
}
