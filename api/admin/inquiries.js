import connectDB from '../lib/db.js';
import { Inquiry } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB(); // Ensure DB is connected before operations

    if (req.method === 'GET') {
      const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
      return res.status(200).json(inquiries);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: 'Inquiry ID is required' });
      const result = await Inquiry.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: 'Inquiry not found' });
      return res.status(200).json({ message: 'Inquiry removed' });
    }
  } catch (error) {
    console.error('Database Sync Failed in Inquiries - Resilience Mode:', error.message);
    if (req.method === 'GET') return res.status(200).json([]);
    return res.status(500).json({ message: 'Internal Server Error (Database Unavailable)' });
  }
};

export default handler;
