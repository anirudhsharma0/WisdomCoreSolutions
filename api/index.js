import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import routers
import contactRouter from './contact.js';
import projectsRouter from './projects.js';
import reviewsRouter from './reviews.js';
import settingsRouter from './settings.js';

// Admin routers
import adminLoginRouter from './admin/login.js';
import adminChangePasswordRouter from './admin/change-password.js';
import adminInquiriesRouter from './admin/inquiries.js';
import adminProjectsRouter from './admin/projects.js';
import adminReviewsRouter from './admin/reviews.js';
import adminSettingsRouter from './admin/settings.js';
import adminStatsRouter from './admin/stats.js';
import adminUploadRouter from './admin/upload.js';

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for flexibility in this specific setup if needed
}));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root API check
app.get('/api', (req, res) => {
  res.json({ message: 'WisdomCore API Operational' });
});

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/settings', settingsRouter);

// Admin Routes
app.use('/api/admin/login', adminLoginRouter);
app.use('/api/admin/change-password', adminChangePasswordRouter);
app.use('/api/admin/inquiries', adminInquiriesRouter);
app.use('/api/admin/projects', adminProjectsRouter);
app.use('/api/admin/reviews', adminReviewsRouter);
app.use('/api/admin/settings', adminSettingsRouter);
app.use('/api/admin/stats', adminStatsRouter);
app.use('/api/admin/upload', adminUploadRouter);

// Catch-all for 404
app.use('/api*', (req, res) => {
  res.status(404).json({ message: `API route ${req.originalUrl} not found` });
});

export default app;
