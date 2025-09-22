import { Router, Request, Response } from 'express';
import { requireAuth, requireRole } from '../midleware/auth';
import { validateBody } from '../midleware/validateRequest';

const router = Router();

const verifyValidator = (data: unknown) => {
  const body = data as Record<string, unknown>;
  const errors: Record<string, string> = {};
  if (typeof body?.passportNumber !== 'string') errors.passportNumber = 'passportNumber is required';
  if (typeof body?.fullName !== 'string') errors.fullName = 'fullName is required';
  return { success: Object.keys(errors).length === 0, errors };
};

router.post('/verify', requireAuth, requireRole(['admin', 'officer']), validateBody(verifyValidator), (req: Request, res: Response) => {
  return res.json({ status: 'verified', data: req.body });
});

router.get('/', requireAuth, requireRole(['admin', 'officer', 'analyst']), (_req: Request, res: Response) => {
  return res.json({ items: [], total: 0 });
});

export default router;


