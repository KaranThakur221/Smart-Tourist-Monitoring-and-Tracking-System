import { NextFunction, Request, Response } from 'express';

// Not-found handler
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: 'Route not found' });
}

// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const isKnown = typeof err === 'object' && err !== null && 'status' in (err as Record<string, unknown>);
  const status = isKnown ? (err as { status?: number }).status || 500 : 500;
  const message = isKnown ? (err as { message?: string }).message || 'Unknown error' : 'Internal server error';

  res.status(status).json({ message });
}


