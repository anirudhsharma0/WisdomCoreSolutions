import express from 'express';
import connectDB from './lib/db.js';
import { Review } from './lib/models.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await connectDB();
    let reviews = await Review.find({}).sort({ createdAt: -1 });
    
    // Seed sample review if empty
    if (reviews.length === 0) {
       await Review.create({
          name: "Satoshi Nakamoto",
          text: "The decentralized architecture implemented by WCS is second to none. Absolute precision in their React ecosystems.",
          rating: 5
       });
       reviews = await Review.find({});
    }
    
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    await connectDB();
    const { name, text, rating } = req.body;
    const newReview = new Review({ name, text, rating });
    await newReview.save();
    return res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
