const express = require('express');
const mongoose = require('mongoose');
const personRouter = require('./routes/person');
const menuRouter = require('./routes/menu');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/restaurant-db')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('DB Connection Error:', err));

// Routes
app.use('/person', personRouter);
app.use('/menu', menuRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// updated project