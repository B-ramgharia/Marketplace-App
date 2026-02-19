require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

const products = [
    {
        title: "Mechanical Keyboard",
        price: 129,
        description: "RGB, Brown Switches, PBT Caps. Experience tactile feedback and vibrant aesthetics.",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
        category: "Peripherals"
    },
    {
        title: "Wireless Mouse",
        price: 89,
        description: "Ergonomic, 16k DPI, Low Latency. Perfect for precision gaming and productivity.",
        image: "https://images.unsplash.com/photo-1527864550417-73917a27d3dd?auto=format&fit=crop&q=80&w=800",
        category: "Peripherals"
    },
    {
        title: "ANC Headphones",
        price: 299,
        description: "Noise Cancelling, 40h Battery. Immersive studio-grade audio quality.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        category: "Audio"
    },
    {
        title: "Ultra-wide Monitor",
        price: 499,
        description: "34\" Curved, 144Hz, IPS Panel. Maximum real estate for your dream setup.",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
        category: "Tech"
    },
    {
        title: "USB-C Dock Station",
        price: 79,
        description: "11-in-1, Dual HDMI, Power Delivery. Connect all your devices with a single cable.",
        image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=800",
        category: "Tech"
    },
    {
        title: "Webcam 4K",
        price: 149,
        description: "Auto-focus, Dual Mic, Privacy Cover. Crystal clear video for meetings and streaming.",
        image: "https://images.unsplash.com/photo-1583394138235-981f0bba1979?auto=format&fit=crop&q=80&w=800",
        category: "Tech"
    },
    {
        title: "Microphone Arm",
        price: 59,
        description: "Adjustable Steel, Cable Management. Professional look for your audio setup.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
        category: "Audio"
    },
    {
        title: "Minimalist Desk Mat",
        price: 39,
        description: "Premium Felt, Anti-Slip Base. Protect your desk with a sleek, minimal look.",
        image: "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?auto=format&fit=crop&q=80&w=800",
        category: "Accessories"
    },
    {
        title: "Aluminum Laptop Stand",
        price: 45,
        description: "Ergonomic Tilt, Heat Dissipation. Improve your posture and keep your laptop cool.",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
        category: "Desk Setup"
    },
    {
        title: "Smart Desk Lamp",
        price: 69,
        description: "LED Touch Control, 3 Modes. Perfect lighting for every task.",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
        category: "Desk Setup"
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        await User.deleteMany({});
        await Product.deleteMany({});

        await Product.insertMany(products);
        console.log('Products seeded');

        const testUsers = [
            { email: 'user@example.com', password: 'password123' },
            { email: 'admin@example.com', password: 'adminpassword' }
        ];

        for (const user of testUsers) {
            await new User(user).save();
        }
        console.log('Users seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
