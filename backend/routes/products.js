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

// POST /products - Create
router.post('/', auth, async (req, res) => {
    try {
        const { title, price, description, image, category } = req.body;
        const products = db.getProducts();

        const newProduct = {
            _id: Date.now().toString(),
            title,
            price: parseFloat(price),
            description,
            image: image || 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&q=80&w=800',
            category: category || 'General'
        };

        products.push(newProduct);
        db.saveProducts(products);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const products = db.getProducts();
        const index = products.findIndex(p => p._id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Product not found' });

        const { title, price, description, image, category } = req.body;

        products[index] = {
            ...products[index],
            title: title || products[index].title,
            price: price ? parseFloat(price) : products[index].price,
            description: description || products[index].description,
            image: image || products[index].image,
            category: category || products[index].category
        };

        db.saveProducts(products);
        res.json(products[index]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /products/:id - Delete
router.delete('/:id', auth, async (req, res) => {
    try {
        let products = db.getProducts();
        const exists = products.some(p => p._id === req.params.id);
        if (!exists) return res.status(404).json({ message: 'Product not found' });

        products = products.filter(p => p._id !== req.params.id);
        db.saveProducts(products);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
