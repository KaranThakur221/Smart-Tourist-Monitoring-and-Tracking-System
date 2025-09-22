import { NextFunction, Request, Response } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const ms = Date.now() - start;
    const status = res.statusCode;
    // eslint-disable-next-line no-console
    console.log(`${method} ${originalUrl} ${status} - ${ms}ms`);
  });

  next();
}


