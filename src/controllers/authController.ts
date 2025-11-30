import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from "jsonwebtoken";

import dotenv from 'dotenv';
import User from '../models/User';
dotenv.config();

const signToken = (id: string) => {
  return jwt.sign(
    { id } as any,
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" } as any
  );
};


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Email already used' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role: 'admin' });
    const token = signToken(user._id.toString());
    res.json({ success: true, data: { user: { email: user.email, id: user._id }, token } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success: false, error: 'Invalid credentials' });
    const token = signToken(user._id.toString());
    res.json({ success: true, data: { user: { email: user.email, id: user._id }, token } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
