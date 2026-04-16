import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getAdminProjects, createProject, updateProject, deleteProject } from '../controllers/admin.projects.controller';
import { getMessages, getDashboardStats } from '../controllers/admin.messages.controller';

const router = Router();
router.use(authMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/projects', getAdminProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.get('/messages', getMessages);

export default router;
