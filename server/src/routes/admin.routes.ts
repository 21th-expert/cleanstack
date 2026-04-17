import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getAdminProjects, createProject, updateProject, deleteProject } from '../controllers/admin.projects.controller';
import { getMessages, getDashboardStats, deleteMessage, replyMessage } from '../controllers/admin.messages.controller';
import { getAdminServices, createService, updateService, deleteService } from '../controllers/admin.services.controller';
import {
  getAdminTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getAdminValues,
  createValue,
  updateValue,
  deleteValue,
} from '../controllers/admin.about.controller';

const router = Router();
router.use(authMiddleware);

router.get('/dashboard', getDashboardStats);
router.get('/projects', getAdminProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.get('/services', getAdminServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

router.get('/team', getAdminTeam);
router.post('/team', createTeamMember);
router.put('/team/:id', updateTeamMember);
router.delete('/team/:id', deleteTeamMember);

router.get('/values', getAdminValues);
router.post('/values', createValue);
router.put('/values/:id', updateValue);
router.delete('/values/:id', deleteValue);

router.get('/messages', getMessages);
router.delete('/messages/:id', deleteMessage);
router.post('/messages/reply', replyMessage);

export default router;
