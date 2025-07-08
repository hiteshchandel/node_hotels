const express = require('express');
const mongoose = require('mongoose');
const personRouter = require('./routes/person');
const menuRouter = require('./routes/menu');
const Person = require('./models/Person');
const passport = require('./auth.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} Request Made to: ${req.originalUrl}`);
    next();
};
app.use(logRequest);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/restaurant-db')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('DB Connection Error:', err));



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

// Protected Route
app.get('/', localAuthMiddleware , (req, res) => {
    res.send("Welcome to our Hotel");
});

// Routes
app.use('/person',localAuthMiddleware, personRouter);
app.use('/menu', menuRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
