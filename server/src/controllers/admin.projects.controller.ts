import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAdminProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(projects);
  } catch { res.status(500).json({ error: 'Failed to fetch projects' }); }
};

export const createProject = async (req: Request, res: Response) => {
  const { name, description, techStack, imageUrl, projectUrl } = req.body;
  if (!name || !description) { res.status(400).json({ error: 'Name and description required' }); return; }
  try {
    const project = await prisma.project.create({
      data: { name, description, techStack: techStack || [], imageUrl, projectUrl },
    });
    res.status(201).json(project);
  } catch { res.status(500).json({ error: 'Failed to create project' }); }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, techStack, imageUrl, projectUrl } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name, description, techStack: techStack || [], imageUrl, projectUrl },
    });
    res.json(project);
  } catch { res.status(500).json({ error: 'Failed to update project' }); }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({ where: { id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Failed to delete project' }); }
};
