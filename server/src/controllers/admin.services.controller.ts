import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAdminServices = async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    res.json(services);
  } catch {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const createService = async (req: Request, res: Response) => {
  const { title, description, techStack, order } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  try {
    const service = await prisma.service.create({
      data: {
        title,
        description,
        techStack: Array.isArray(techStack) ? techStack : [],
        order: Number(order) || 0,
      },
    });
    res.status(201).json(service);
  } catch {
    res.status(500).json({ error: 'Failed to create service' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, techStack, order } = req.body;

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        techStack: Array.isArray(techStack) ? techStack : [],
        order: Number(order) || 0,
      },
    });
    res.json(service);
  } catch {
    res.status(500).json({ error: 'Failed to update service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.service.delete({ where: { id } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};
