import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import contactHandler from './api/contact.js';
import loginHandler from './api/admin/login.js';
import inquiriesHandler from './api/admin/inquiries.js';
import projectsHandler from './api/projects.js';
import adminProjectsHandler from './api/admin/projects.js';
import adminReviewsHandler from './api/admin/reviews.js';
import adminUploadHandler from './api/admin/upload.js';
import adminStatsHandler from './api/admin/stats.js';
import adminSettingsHandler from './api/admin/settings.js';
import adminChangePasswordHandler from './api/admin/change-password.js';
import publicSettingsHandler from './api/settings.js';
import connectDB from './api/lib/db.js';
import { Review } from './api/lib/models.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Mapping serverless handlers to Express routes
app.all('/api/contact', contactHandler);
app.all('/api/admin/login', loginHandler);
app.all('/api/admin/inquiries', inquiriesHandler);
app.all('/api/projects', projectsHandler);
app.all('/api/admin/projects', adminProjectsHandler);
app.all('/api/admin/reviews', adminReviewsHandler);
app.all('/api/admin/upload', adminUploadHandler);
app.all('/api/admin/stats', adminStatsHandler);
app.all('/api/admin/change-password', adminChangePasswordHandler);
app.all('/api/admin/settings', (req, res, next) => {
  console.log('Admin Settings Route Hit:', req.method, req.url);
  next();
}, adminSettingsHandler);
app.all('/api/settings', (req, res, next) => {
  console.log('Public Settings Route Hit:', req.method, req.url);
  next();
}, publicSettingsHandler);
app.all('/api/reviews', async (req, res) => {
  console.log('Inlined Reviews Handler Triggered', req.method, req.url);
  const defaultReviews = [{
    name: "Satoshi Nakamoto",
    text: "The decentralized architecture implemented by WCS is second to none. Absolute precision in their React ecosystems.",
    rating: 5
  }];

  try {
    await connectDB();
    if (req.method === 'GET') {
      let reviews = await Review.find({ isHidden: false }).sort({ createdAt: -1 });
      if (reviews.length === 0) {
         await Review.create(defaultReviews[0]);
         reviews = await Review.find({});
      }
      return res.status(200).json(reviews);
    }
    if (req.method === 'POST') {
      const { name, text, rating } = req.body;
      const newReview = new Review({ name, text, rating });
      await newReview.save();
      return res.status(201).json(newReview);
    }
  } catch (err) {
    console.error('Database Unavailable - Using Fallback Reviews:', err.message);
    return res.status(200).json(defaultReviews);
  }
  return res.status(405).json({ message: 'Method not allowed' });
});

app.use((req, res) => {
  console.log('404 Access:', req.method, req.url);
  res.status(404).send('Custom 404: ' + req.url);
});

connectDB()
  .then(() => console.log('Primary Signal Established: MongoDB Connected'))
  .catch(err => console.error('Secondary Protocol Engaged: MongoDB Connection Failed (Using Local Fallbacks)', err.message));

app.listen(PORT, () => {
  console.log(`Backend Pulse Active at http://localhost:${PORT}`);
});
