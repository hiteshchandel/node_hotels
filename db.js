const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURL)
  .then(() => console.log('✅ Connected to MongoDB server'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Get the default connection
const db = mongoose.connection;

// ✅ Listen for the disconnected event
db.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

module.exports = db;
