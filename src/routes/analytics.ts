import { Router, Request, Response } from 'express';
import { requireAuth, requireRole } from '../midleware/auth';

const router = Router();

router.get('/summary', requireAuth, requireRole(['admin', 'analyst']), (_req: Request, res: Response) => {
  return res.json({ tourists: 0, activeAlerts: 0, trends: [] });
});

export default router;


