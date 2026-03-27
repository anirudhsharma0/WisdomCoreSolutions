import connectDB from './lib/db.js';
import { Settings } from './lib/models.js';

const handler = async (req, res) => {
  console.log('Inside Settings Handler:', req.method, req.url);
  const defaultSettings = {
    github: 'https://github.com/wisdomcoresolutions',
    linkedin: 'https://linkedin.com/company/wisdomcoresolutions',
    twitter: 'https://twitter.com/wisdom_core',
    instagram: 'https://instagram.com/wisdomcoresolutions',
    email: 'hq@wisdomcore.com',
    phone: '+1 (555) 000-0000',
    address: 'Global Operations / Remote Excellence'
  };

  try {
    await connectDB();
    if (req.method === 'GET') {
      let settings = await Settings.findOne();
      if (!settings) {
        settings = new Settings(defaultSettings);
        await settings.save();
      }
      return res.status(200).json(settings);
    }
  } catch (err) {
    console.error('Database Unavailable - Using Fallback Settings:', err.message);
    return res.status(200).json(defaultSettings);
  }
  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
