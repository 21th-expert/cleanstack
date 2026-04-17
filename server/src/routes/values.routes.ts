import { Router } from 'express';
import { getValues } from '../controllers/values.controller';

const router = Router();
router.get('/', getValues);

export default router;
