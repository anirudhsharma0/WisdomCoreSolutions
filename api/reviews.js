import connectDB from './lib/db.js';
import { Review } from './lib/models.js';

const handler = async (req, res) => {
  console.log('Reviews Handler Triggered', req.method, req.url);
  await connectDB();

  if (req.method === 'GET') {
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
  }

  if (req.method === 'POST') {
    const { name, text, rating } = req.body;
    const newReview = new Review({ name, text, rating });
    await newReview.save();
    return res.status(201).json(newReview);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
