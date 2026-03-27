import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is undefined in process.env');
    console.log(`Connecting to Signal: ${uri.substring(0, 20)}...`);
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB;
