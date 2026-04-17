import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getAdminProjects, createProject, updateProject, deleteProject } from '../controllers/admin.projects.controller';
import { getMessages, getDashboardStats, deleteMessage, replyMessage } from '../controllers/admin.messages.controller';

const router = Router();
router.use(authMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/projects', getAdminProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.get('/messages', getMessages);
router.delete('/messages/:id', deleteMessage);
router.post('/messages/reply', replyMessage);

export default router;
