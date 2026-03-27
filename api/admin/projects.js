import express from 'express';
import connectDB from '../lib/db.js';
import { Project } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const { title, description, image, tags, link, status } = req.body;
    const newProject = new Project({ title, description, image, tags, link, status });
    await newProject.save();
    return res.status(201).json(newProject);
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
});

router.put('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const { id, title, description, image, tags, link, status } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      id, 
      { title, description, image, tags, link, status }, 
      { new: true }
    );
    return res.status(200).json(updatedProject);
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
});

router.delete('/', async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();
    const { id } = req.query;
    await Project.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Project removed' });
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
});

export default router;
