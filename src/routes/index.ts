import { Express } from 'express';
import auth from './auth';
import alerts from './alerts';
import tourists from './tourists';
import analytics from './analytics';
import health from './health';
import { apiRateLimiter } from '../midleware/rateLimiter';
import { requestLogger } from '../midleware/logger';

export function registerRoutes(app: Express) {
  app.use(requestLogger);
  app.use('/health', health);

  app.use('/api', apiRateLimiter);
  app.use('/api/auth', auth);
  app.use('/api/alerts', alerts);
  app.use('/api/tourists', tourists);
  app.use('/api/analytics', analytics);
}


