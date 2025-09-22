import { Router, Request, Response } from 'express';
import { requireAuth, requireRole } from '../midleware/auth';
import { validateBody, validateQuery } from '../midleware/validateRequest';

const router = Router();

const createAlertValidator = (data: unknown) => {
  const body = data as Record<string, unknown>;
  const errors: Record<string, string> = {};
  if (typeof body?.type !== 'string') errors.type = 'type is required';
  if (typeof body?.location !== 'string') errors.location = 'location is required';
  if (typeof body?.severity !== 'string') errors.severity = 'severity is required';
  return { success: Object.keys(errors).length === 0, errors };
};

const listQueryValidator = (data: unknown) => {
  const q = data as Record<string, unknown>;
  return { success: true, errors: {} };
};

router.get('/', requireAuth, validateQuery(listQueryValidator), (_req: Request, res: Response) => {
  return res.json({ items: [], total: 0 });
});

router.post('/', requireAuth, requireRole(['admin', 'officer']), validateBody(createAlertValidator), (req: Request, res: Response) => {
  return res.status(201).json({ id: 'alert-id', ...(req.body as object) });
});

export default router;


