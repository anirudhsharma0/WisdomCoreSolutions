import fs from 'fs/promises';
import path from 'path';
import { verifyToken } from '../lib/auth.js';
import connectDB from '../lib/db.js';

const handler = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { base64, filename } = req.body;
    if (!base64 || !filename) return res.status(400).json({ message: 'Missing image data' });

    // Clean base64 string
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // Create a safe unique filename if needed, but we'll trust the provided filename for now with a slight cleanup
    const safeName = filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const uploadPath = path.join(process.cwd(), 'public', 'projects', safeName);

    await fs.writeFile(uploadPath, buffer);

    return res.status(200).json({ 
      message: 'Upload successful', 
      url: `/projects/${safeName}` 
    });

  } catch (err) {
    console.error('Upload error details:', err.message, err.name);
    return res.status(401).json({ message: 'Session expired' });
  }
};

export default handler;
