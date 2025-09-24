import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ method: 'GET', query: req.query });
});

router.get('/:id', (req: Request, res: Response) => {
  return res.json({ method: 'GET', params: req.params, query: req.query });
});

router.post('/', (req: Request, res: Response) => {
  return res.json({ method: 'POST', body: req.body, query: req.query });
});

export default router;


