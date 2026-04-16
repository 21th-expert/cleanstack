import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import servicesRoutes from './routes/services.routes';
import projectsRoutes from './routes/projects.routes';
import contactRoutes from './routes/contact.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Public routes
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);

// Auth
app.use('/api/auth', authRoutes);

// Admin (protected)
app.use('/api/admin', adminRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;
