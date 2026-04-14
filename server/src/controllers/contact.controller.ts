import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const contact = await prisma.contact.create({
      data: { name, email, message },
    });
    res.status(201).json({ success: true, id: contact.id });
  } catch {
    res.status(500).json({ error: 'Failed to submit contact' });
  }
};
