const express = require('express');
const db = require('../lib/jsonDb');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /products - List with search and pagination
router.get('/', async (req, res) => {
    try {
        const { search, category, page = 1, limit = 8 } = req.query;
        let products = db.getProducts();

        if (search) {
            const s = search.toLowerCase();
            products = products.filter(p =>
                p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
            );
        }
        if (category && category !== 'All') {
            products = products.filter(p => p.category === category);
        }

        const start = (page - 1) * limit;
        const paginatedProducts = products.slice(start, start + parseInt(limit));

        res.json({
            products: paginatedProducts,
            totalPages: Math.ceil(products.length / limit),
            currentPage: parseInt(page),
            totalProducts: products.length,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /products/:id - Details
router.get('/:id', async (req, res) => {
    try {
        const products = db.getProducts();
        const product = products.find(p => p._id === req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /products/:id/favorite - Toggle favorite
router.post('/:id/favorite', auth, async (req, res) => {
    try {
        const users = db.getUsers();
        const userIndex = users.findIndex(u => u.id === req.user.id);
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

        const productId = req.params.id;
        const favorites = users[userIndex].favorites || [];

        if (favorites.includes(productId)) {
            users[userIndex].favorites = favorites.filter(id => id !== productId);
        } else {
            users[userIndex].favorites.push(productId);
        }

        db.saveUsers(users);
        res.json(users[userIndex].favorites);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
