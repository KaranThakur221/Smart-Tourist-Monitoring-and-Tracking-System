import { NextFunction, Request, Response } from 'express';

export type Validator = (data: unknown) => { success: boolean; errors?: Record<string, string> };

export function validateBody(validator: Validator) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validator(req.body);
    if (!result.success) {
      return res.status(400).json({ message: 'Validation failed', errors: result.errors || {} });
    }
    return next();
  };
}

export function validateQuery(validator: Validator) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validator(req.query);
    if (!result.success) {
      return res.status(400).json({ message: 'Validation failed', errors: result.errors || {} });
    }
    return next();
  };
}


