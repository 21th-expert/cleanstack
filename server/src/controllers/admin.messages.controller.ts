import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch { res.status(500).json({ error: 'Failed to fetch messages' }); }
};

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const [projects, messages] = await Promise.all([
      prisma.project.count(),
      prisma.contact.count(),
    ]);
    res.json({ projects, messages });
  } catch { res.status(500).json({ error: 'Failed to fetch stats' }); }
};
