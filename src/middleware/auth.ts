import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'No token' });
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET!;
    const payload: any = jwt.verify(token, secret);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ success: false, error: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
};
