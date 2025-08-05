import { asyncHandler, createApiError } from '@/middleware/errors';
import SnippetManager from '@/modules/snippet-manager';
import SummaryGenerator from '@/modules/summary-generator';
import { Router, Request, Response } from 'express';

const router = Router();

// Initialize modules
const summaryGenerator = new SummaryGenerator(
  process.env.OPENAI_API_KEY as string,
);
const snippetManager = new SnippetManager(summaryGenerator);

// POST /snippets - Create a new snippet
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      throw createApiError('Text content is required', 400);
    }

    const snippet = await snippetManager.createSnippet({ text });
    res.status(201).json(snippet);
  }),
);

// GET /snippets/:id - Get a specific snippet
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const snippet = await snippetManager.getSnippetById(id as string);

    if (!snippet) {
      throw createApiError('Snippet not found', 404);
    }

    res.json(snippet);
  }),
);

// GET /snippets - Get all snippets
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const snippets = await snippetManager.getAllSnippets();
    res.json(snippets);
  }),
);

export default router;
