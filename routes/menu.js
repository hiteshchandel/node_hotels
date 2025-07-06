const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

// POST - Create menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - All menu items
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET - Filter by taste
router.get('/:taste', async (req, res) => {
    try {
        const tasteParam = req.params.taste;
        const data = await MenuItem.find({ taste: tasteParam });
        if (data.length === 0) {
            return res.status(404).json({ message: 'No items found with that taste' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
