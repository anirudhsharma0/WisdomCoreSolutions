import connectDB from '../lib/db.js';
import { Settings } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const handler = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();

    if (req.method === 'GET') {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = new Settings({});
        await settings.save();
      }
      return res.status(200).json(settings);
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const updateData = req.body;
      let settings = await Settings.findOneAndUpdate({}, updateData, { new: true, upsert: true });
      return res.status(200).json(settings);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
};

export default handler;
