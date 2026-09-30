import cors from 'cors';
import express from 'express';
import type { ErrorRequestHandler } from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.use('/api', apiRouter);

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API route not found' });
});

const handleApiError: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(handleApiError);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit Tracker API:', error);
    process.exitCode = 1;
  }
}

void startServer();