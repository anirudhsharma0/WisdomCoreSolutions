import dotenv from 'dotenv';
dotenv.config();

console.log('--- Environment Check ---');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
if (process.env.MONGO_URI) {
    const masked = process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log('MONGO_URI (masked):', masked);
}
console.log('-------------------------');

import mongoose from 'mongoose';

async function test() {
    try {
        console.log('Attempting connection...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Success! Connection established.');
    } catch (err) {
        console.error('Connection failed:', err.message);
    } finally {
        process.exit();
    }
}

test();
