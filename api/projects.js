import express from 'express';
import connectDB from './lib/db.js';
import { Project } from './lib/models.js';

const router = express.Router();

const initialProjects = [
  {
    _id: 'default-1',
    title: 'Milk Dairy System',
    description: 'A comprehensive ERP solution for milk production and distribution tracking.',
    image: '/projects/dairy.webp',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    status: 'Live Application'
  },
  {
    _id: 'default-2',
    title: 'Construction ERP',
    description: 'High-end management system for construction project lifecycle and finances.',
    image: '/projects/construction.webp',
    tags: ['React', 'Express', 'JWT'],
    link: '#',
    status: 'Live Application'
  }
];

router.get('/', async (req, res) => {
  try {
    await connectDB();
    let projects = await Project.find({});

    if (projects.length === 0) {
      await Project.insertMany(initialProjects.map(({_id, ...rest}) => rest));
      projects = await Project.find({});
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Database Unavailable - Using Fallback Projects:', error.message);
    // Return hardcoded data on failure to ensure site reliability
    return res.status(200).json(initialProjects);
  }
});

export default router;
