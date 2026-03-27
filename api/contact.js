import connectDB from './lib/db.js';
import { Inquiry } from './lib/models.js';
import cors from 'cors';
import helmet from 'helmet';

const handler = async (req, res) => {
  // CORS & Security middleware (simplified for serverless)
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
};

export default handler;
