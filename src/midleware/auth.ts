import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'officer' | 'analyst' | 'tourist';
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.slice('Bearer '.length);
  // Placeholder verification; replace with real JWT verification
  if (!token || token === 'invalid') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Simulate decoded user
  req.user = { id: 'demo-user-id', role: 'officer' };
  return next();
}

export function requireRole(allowedRoles: Array<AuthenticatedRequest['user'] extends infer U ? U extends { role: infer R } ? R : never : never>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  };
}


