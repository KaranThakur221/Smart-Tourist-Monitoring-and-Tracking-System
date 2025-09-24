import express from 'express';
import { registerRoutes } from './routes';
import { notFoundHandler, errorHandler } from './midleware/errorHandler';

const app = express();

// Basic CORS (allow all origins). Replace with stricter config as needed.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register application routes
registerRoutes(app);

// 404 and centralized error handler
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});

export default app;


