import express from 'express';
import connectDB from './lib/db.js';
import { Inquiry } from './lib/models.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await connectDB();
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newInquiry = new Inquiry({ name, email, phone, service, message });
    await newInquiry.save();

    return res.status(201).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
