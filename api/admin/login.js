import connectDB from '../lib/db.js';
import { Admin } from '../lib/models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();
    const { username, password } = req.body;

    let admin;
    try {
      admin = await Admin.findOne({ username });
      // Seed admin if not exists (for demo/initial setup)
      if (!admin && username === 'admin' && password === (process.env.ADMIN_PASSWORD || 'admin123')) {
         const hashedPassword = await bcrypt.hash(password, 10);
         admin = new Admin({ username, password: hashedPassword });
         await admin.save();
      }
    } catch (dbErr) {
       console.error('Database unreachable during login check - using failover logic:', dbErr.message);
       // Failover: Allow login with admin123 if DB is totally dead
       if (username === 'admin' && password === (process.env.ADMIN_PASSWORD || 'admin123')) {
         const { getSecret } = await import('../lib/auth.js');
         const secret = getSecret();
         const token = jwt.sign({ id: 'failover-admin-id' }, secret, { expiresIn: '24h' });
         return res.status(200).json({ token, message: 'Login successful (Resilience Mode)' });
       }
       return res.status(401).json({ message: 'Database Unavailable & Credentials Mismatch' });
    }

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { getSecret } = await import('../lib/auth.js');
    const secret = getSecret();
    const token = jwt.sign({ id: admin._id }, secret, { expiresIn: '24h' });

    return res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;
