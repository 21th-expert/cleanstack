import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) { res.status(400).json({ error: 'Email and password required' }); return; }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) { res.status(401).json({ error: 'Invalid credentials' }); return; }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) { res.status(401).json({ error: 'Invalid credentials' }); return; }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    res.json({ token, email: admin.email });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
};
