import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errors';
import { snippetsRouter } from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/snippets', snippetsRouter);

// Route middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = Number.parseInt(process.env.PORT || '3000');
    app.listen(PORT, function () {
      console.log(`ai-snippet-service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
