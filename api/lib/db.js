import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless function invocations in production.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const uri = process.env.MONGO_URI;
    if (!uri) {
      const errMsg = 'CRITICAL: MONGO_URI is not defined in environment variables.';
      console.error(errMsg);
      throw new Error(errMsg);
    }

    console.log('Attempting to connect to MongoDB serverless instance...');
    
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('MongoDB Signal Established Successfully');
      return mongoose;
    }).catch((error) => {
      console.error('MONGO CONNECTION ERROR DETAIL:', error.message);
      cached.promise = null; // Reset promise on failure
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;
