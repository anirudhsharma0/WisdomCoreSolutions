import express from 'express';
import connectDB from '../lib/db.js';
import { Admin } from '../lib/models.js';
import bcrypt from 'bcryptjs';
import { verifyToken } from '../lib/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return res.status(401).json({ message: 'Session expired or unauthorized access' });
    }

    await connectDB();
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'New Access Key must be at least 6 characters.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin. Note: using the ID from the decoded token for security.
    const result = await Admin.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    if (!result) {
      return res.status(404).json({ message: 'Administrator record not found in system.' });
    }

    return res.status(200).json({ message: 'Security Protocol Updated Successfully' });
  } catch (error) {
    console.error('Password Update Error:', error);
    return res.status(500).json({ message: 'Internal Server Error. Security protocol synchronization failed.' });
  }
});

export default router;
