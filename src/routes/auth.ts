import { Router, Request, Response } from 'express';
import { validateBody } from '../midleware/validateRequest';

const router = Router();

const loginValidator = (data: unknown) => {
  const body = data as Record<string, unknown>;
  const errors: Record<string, string> = {};
  if (typeof body?.username !== 'string' || !body.username) errors.username = 'username is required';
  if (typeof body?.password !== 'string' || !body.password) errors.password = 'password is required';
  return { success: Object.keys(errors).length === 0, errors };
};

router.post('/login', validateBody(loginValidator), (req: Request, res: Response) => {
  // Demo login response
  return res.json({ token: 'demo-token', user: { id: 'demo-user-id', role: 'officer' } });
});

router.post('/logout', (_req: Request, res: Response) => {
  return res.status(204).send();
});

export default router;


