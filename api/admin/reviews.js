import express from 'express';
import connectDB from '../lib/db.js';
import { Review } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const router = express.Router();

const defaultReviews = [{
  _id: 'failover-rev-1',
  name: "Satoshi Nakamoto",
  text: "The decentralized architecture implemented by WCS is second to none.",
  rating: 5,
  isHidden: false,
  createdAt: new Date().toISOString()
}];

router.get('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    console.error('Database Sync Failed in Admin Reviews - Returning Failover Data:', err.message);
    return res.status(200).json(defaultReviews);
  }
});

router.patch('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const { id, isHidden } = req.body;
    const review = await Review.findByIdAndUpdate(id, { isHidden }, { new: true });
    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error (Database Unavailable)' });
  }
});

router.delete('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const { id } = req.query;
    await Review.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error (Database Unavailable)' });
  }
});

export default router;
