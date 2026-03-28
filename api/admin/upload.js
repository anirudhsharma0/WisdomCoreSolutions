import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { verifyToken } from '../lib/auth.js';
import connectDB from '../lib/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    
    const { base64, filename } = req.body;
    if (!base64 || !filename) return res.status(400).json({ message: 'Missing image data' });

    // Return the Data URI directly so it can be saved to MongoDB
    // Vercel Serverless has a Read-Only filesystem, so we cannot use fs.writeFile
    return res.status(200).json({ 
      message: 'Upload successful', 
      url: base64 
    });

  } catch (err) {
    console.error('Upload error details:', err.message, err.name);
    return res.status(500).json({ message: 'Upload failed: ' + err.message });
  }
});

export default router;
