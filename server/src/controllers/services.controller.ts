import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(services);
  } catch {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};
