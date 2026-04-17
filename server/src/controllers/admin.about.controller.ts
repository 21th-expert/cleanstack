import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAdminTeam = async (_req: Request, res: Response) => {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
    res.json(team);
  } catch {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

export const createTeamMember = async (req: Request, res: Response) => {
  const { name, role, photoUrl, portfolioUrl, githubUrl, order } = req.body;
  if (!name || !role) {
    res.status(400).json({ error: 'Name and role are required' });
    return;
  }

  try {
    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        photoUrl,
        portfolioUrl,
        githubUrl,
        order: Number(order) || 0,
      },
    });
    res.status(201).json(member);
  } catch {
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, role, photoUrl, portfolioUrl, githubUrl, order } = req.body;

  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        photoUrl,
        portfolioUrl,
        githubUrl,
        order: Number(order) || 0,
      },
    });
    res.json(member);
  } catch {
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.teamMember.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

export const getAdminValues = async (_req: Request, res: Response) => {
  try {
    const values = await prisma.value.findMany({ orderBy: { order: 'asc' } });
    res.json(values);
  } catch {
    res.status(500).json({ error: 'Failed to fetch values' });
  }
};

export const createValue = async (req: Request, res: Response) => {
  const { icon, title, body, order } = req.body;
  if (!title || !body) {
    res.status(400).json({ error: 'Title and body are required' });
    return;
  }

  try {
    const value = await prisma.value.create({
      data: {
        icon: icon || '?',
        title,
        body,
        order: Number(order) || 0,
      },
    });
    res.status(201).json(value);
  } catch {
    res.status(500).json({ error: 'Failed to create value' });
  }
};

export const updateValue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { icon, title, body, order } = req.body;

  try {
    const value = await prisma.value.update({
      where: { id },
      data: {
        icon,
        title,
        body,
        order: Number(order) || 0,
      },
    });
    res.json(value);
  } catch {
    res.status(500).json({ error: 'Failed to update value' });
  }
};

export const deleteValue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.value.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete value' });
  }
};
