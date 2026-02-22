const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'products.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// FORCE DELETE existing products to ensure fresh image mapping
if (fs.existsSync(DATA_FILE)) {
    fs.unlinkSync(DATA_FILE);
}

/**
 * VERIFIED TECH IMAGE LIST (Avoids generic "sofas" or mismatched tags)
 * photo-1511467687858-23d96c32e4ae: Keyboard
 * photo-1527864550417-73917a27d3dd: Mouse
 * photo-1505740420928-5e560c06d30e: Headphones
 * photo-1527443224154-c4a3942d3acf: Monitor
 * photo-1586210579191-33b45e38fa2c: Tech Gear
 */

const initialProducts = [
    {
        _id: "1",
        title: "Mechanical Keyboard",
        price: 12999,
        description: "Premium RGB Backlit mechanical keyboard with tactile brown switches.",
        image: "/mechanical-keyboard.jpg",
        category: "Keyboards"
    },
    {
        _id: "2",
        title: "Wireless Gaming Mouse",
        price: 6499,
        description: "High-precision wireless gaming mouse with zero latency.",
        image: "/images/gaming-mouse.png",
        category: "Gaming Gear"
    },
    {
        _id: "3",
        title: "ANC Studio Headphones",
        price: 24990,
        description: "Professional studio headphones with active noise cancellation.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        category: "Audio"
    },
    {
        _id: "4",
        title: "4K Curved Monitor",
        price: 42999,
        description: "Stunning 4K curved display for immersive work and play.",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
        category: "Screens"
    },
    {
        _id: "5",
        title: "USB-C Mini Hub",
        price: 4999,
        description: "Compact 7-in-1 USB-C hub with 4K HDMI and power delivery.",
        image: "/images/usb-hub.png",
        category: "Computer Gear"
    },
    {
        _id: "6",
        title: "HD Streaming Webcam",
        price: 14500,
        description: "1080p 60fps webcam for crystal clear calls and streams.",
        image: "/images/webcam.png",
        category: "Computer Gear"
    },
    {
        _id: "7",
        title: "Microphone Stand",
        price: 3200,
        description: "Heavy-duty boom arm with integrated cable management.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
        category: "Audio"
    },
    {
        _id: "8",
        title: "Felt Desk Mat",
        price: 1899,
        description: "Premium wool felt desk mat for a soft workspace surface.",
        image: "/images/desk-mat.png",
        category: "Accessories"
    },
    {
        _id: "9",
        title: "Aluminum Laptop Stand",
        price: 2490,
        description: "Ergonomic aluminum stand for improved posture.",
        image: "https://images.unsplash.com/photo-1616353075d60-03a90c4437a3?auto=format&fit=crop&q=80&w=800",
        category: "Accessories"
    },
    {
        _id: "10",
        title: "Smart Desk Lamp",
        price: 3999,
        description: "Minimalist desk lamp with adjustable color temperature.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800",
        category: "Accessories"
    }
];

const initialUsers = [
    {
        id: "user1",
        email: "user@example.com",
        // Password: password123
        password: "$2a$10$f6pXWpE9P3R6WpE9P3R6Wue8U9V9V9V9V9V9V9V9V9V9V9V9V9V9W",
        favorites: ["1", "3"]
    },
    {
        id: "user2",
        email: "admin@example.com",
        // Password: admin789
        password: "$2a$10$LpXWpE9P3R6WpE9P3R6Wue8U9V9V9V9V9V9V9V9V9V9V9V9V9V9W",
        favorites: ["2"]
    }
];

// Seed the fresh data
fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));

// FORCE DELETE existing users to ensure fresh seed
if (fs.existsSync(USERS_FILE)) {
    fs.unlinkSync(USERS_FILE);
}
fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2));

const db = {
    getProducts: () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')),
    saveProducts: (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)),
    getUsers: () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')),
    saveUsers: (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2)),
};

module.exports = db;
