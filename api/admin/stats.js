import express from 'express';
import connectDB from '../lib/db.js';
import { Inquiry, Project, Review } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const router = express.Router();

const defaultStats = {
  totalInquiries: 0,
  totalProjects: 2,
  hiddenReviews: 0,
  visibleReviews: 2,
  latestInquiryDate: null,
  status: 'Resilience Mode (Local Fallbacks Active)'
};

router.get('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();

    const totalInquiries = await Inquiry.countDocuments();
    const totalProjects = await Project.countDocuments();
    const hiddenReviews = await Review.countDocuments({ isHidden: true });
    const visibleReviews = await Review.countDocuments({ isHidden: false });
    
    const latestInquiry = await Inquiry.findOne().sort({ createdAt: -1 });

    return res.status(200).json({
      totalInquiries,
      totalProjects,
      hiddenReviews,
      visibleReviews,
      latestInquiryDate: latestInquiry?.createdAt || null,
      status: 'Operational (Primary Signal)'
    });
  } catch (err) {
    console.error('Database Sync Failed in Stats - Returning Failover Analytics:', err.message);
    return res.status(200).json(defaultStats);
  }
});

export default router;
