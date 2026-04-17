import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getTeamMembers = async (_req: Request, res: Response) => {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
    res.json(team);
  } catch {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};
