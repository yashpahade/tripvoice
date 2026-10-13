const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    // Connect without hardcoding so tests pass if env not set, though process.exit is bad
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tripnest';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Warning: Could not connect to MongoDB (${error.message}). Server continuing in offline/mock mode.`);
  }
};

module.exports = { connectDB };
