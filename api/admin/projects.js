import connectDB from '../lib/db.js';
import { Project } from '../lib/models.js';
import { verifyToken } from '../lib/auth.js';

const handler = async (req, res) => {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: 'Session expired' });

  try {
    await connectDB();

    if (req.method === 'POST') {
      const { title, description, image, tags, link, status } = req.body;
      const newProject = new Project({ title, description, image, tags, link, status });
      await newProject.save();
      return res.status(201).json(newProject);
    }

    if (req.method === 'PUT') {
      const { id, title, description, image, tags, link, status } = req.body;
      const updatedProject = await Project.findByIdAndUpdate(
        id, 
        { title, description, image, tags, link, status }, 
        { new: true }
      );
      return res.status(200).json(updatedProject);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Project removed' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(401).json({ message: 'Session expired' });
  }
};

export default handler;
