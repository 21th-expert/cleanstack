import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { prisma } from '../lib/prisma';

export const getMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  } catch { res.status(500).json({ error: 'Failed to fetch messages' }); }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.contact.delete({ where: { id } });
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Failed to delete message' }); }
};

export const replyMessage = async (req: Request, res: Response) => {
  const { to, subject, body } = req.body;
  if (!to || !body) { res.status(400).json({ error: 'to and body are required' }); return; }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass || pass === 'your_app_password_here') {
    res.status(400).json({
      error: 'SMTP not configured. Set SMTP_USER and SMTP_PASS (Gmail App Password) in server/.env. Get one at: https://myaccount.google.com/apppasswords',
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || user,
      to,
      subject: subject || 'Re: Your message to Cleanstack',
      text: body,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <p style="color:#1e293b;font-size:15px;line-height:1.7">${body.replace(/\n/g, '<br/>')}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
        <p style="color:#94a3b8;font-size:12px">Cleanstack Studio &middot; hello@cleanstack.dev</p>
      </div>`,
    });

    res.json({ success: true });
  } catch (err: any) {
    console.error('SMTP error:', err.message);
    if (err.code === 'EAUTH') {
      res.status(500).json({
        error: 'Gmail login failed. SMTP_PASS must be a 16-character App Password, not your regular Gmail password. Generate one at: https://myaccount.google.com/apppasswords',
      });
    } else {
      res.status(500).json({ error: err.message || 'Failed to send email' });
    }
  }
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
