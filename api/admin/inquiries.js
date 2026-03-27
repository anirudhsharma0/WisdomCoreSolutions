import express from 'express';
import connectDB from '../lib/db.js';
import { Inquiry } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return res.status(200).json(inquiries);
  } catch (error) {
    console.error('Database Sync Failed in Inquiries - Resilience Mode:', error.message);
    return res.status(200).json([]);
  }
});

router.delete('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Inquiry ID is required' });
    const result = await Inquiry.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Inquiry not found' });
    return res.status(200).json({ message: 'Inquiry removed' });
  } catch (error) {
    console.error('Database Sync Failed in Inquiries:', error.message);
    return res.status(500).json({ message: 'Internal Server Error (Database Unavailable)' });
  }
});

export default router;
