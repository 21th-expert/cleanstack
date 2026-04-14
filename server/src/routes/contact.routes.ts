import { Router } from 'express';
import { z } from 'zod';
import { submitContact } from '../controllers/contact.controller';
import { validate } from '../middleware/validate';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

const router = Router();
router.post('/', validate(contactSchema), submitContact);
export default router;
