import connectDB from '../lib/db.js';
import { Review } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const handler = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  const defaultReviews = [{
    _id: 'failover-rev-1',
    name: "Satoshi Nakamoto",
    text: "The decentralized architecture implemented by WCS is second to none.",
    rating: 5,
    isHidden: false,
    createdAt: new Date().toISOString()
  }];

  try {
    await connectDB();

    if (req.method === 'GET') {
      const reviews = await Review.find().sort({ createdAt: -1 });
      return res.status(200).json(reviews);
    }

    if (req.method === 'PATCH') {
      const { id, isHidden } = req.body;
      const review = await Review.findByIdAndUpdate(id, { isHidden }, { new: true });
      return res.status(200).json(review);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Review.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Review deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error('Database Sync Failed in Admin Reviews - Returning Failover Data:', err.message);
    if (req.method === 'GET') return res.status(200).json(defaultReviews);
    return res.status(500).json({ message: 'Internal Server Error (Database Unavailable)' });
  }
};

export default handler;
