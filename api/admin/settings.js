import express from 'express';
import connectDB from '../lib/db.js';
import { Settings } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
      await settings.save();
    }
    return res.status(200).json(settings);
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
});

router.post('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const updateData = req.body;
    let settings = await Settings.findOneAndUpdate({}, updateData, { new: true, upsert: true });
    return res.status(200).json(settings);
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
});

router.put('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const updateData = req.body;
    let settings = await Settings.findOneAndUpdate({}, updateData, { new: true, upsert: true });
    return res.status(200).json(settings);
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
});

export default router;
