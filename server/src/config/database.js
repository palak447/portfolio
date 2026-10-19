const mongoose = require('mongoose');

async function connectDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI is not configured; contact submissions will return 503 until MongoDB is available.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.info('Connected to MongoDB.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

module.exports = connectDatabase;
