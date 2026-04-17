import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getValues = async (_req: Request, res: Response) => {
  try {
    const values = await prisma.value.findMany({ orderBy: { order: 'asc' } });
    res.json(values);
  } catch {
    res.status(500).json({ error: 'Failed to fetch values' });
  }
};
