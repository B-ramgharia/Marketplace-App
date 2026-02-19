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
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
        category: "Keyboards"
    },
    {
        _id: "2",
        title: "Wireless Gaming Mouse",
        price: 6499,
        description: "High-precision wireless gaming mouse with zero latency.",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800",
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
        description: "Compact 7-in-1 USB-C hub for all your peripherals.",
        image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=800",
        category: "Computer Gear"
    },
    {
        _id: "6",
        title: "HD Streaming Webcam",
        price: 14500,
        description: "1080p 60fps webcam for crystal clear calls and streams.",
        image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=800",
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
        image: "https://images.unsplash.com/photo-1626014303757-63661163aabf?auto=format&fit=crop&q=80&w=800",
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
    },
    {
        _id: "11",
        title: "Vertical Ergonomic Mouse",
        price: 7999,
        description: "Designed to reduce muscle strain and improve wrist posture.",
        image: "https://images.unsplash.com/photo-1586333240212-32a2f896b0ee?auto=format&fit=crop&q=80&w=800",
        category: "Computer Gear"
    },
    {
        _id: "12",
        title: "Wood Monitor Stand",
        price: 4500,
        description: "Handcrafted solid wood monitor riser with storage space.",
        image: "https://images.unsplash.com/photo-1593186139749-0149a1aa4031?auto=format&fit=crop&q=80&w=800",
        category: "Desk Setup"
    },
    {
        _id: "13",
        title: "Canvas Tech Pouch",
        price: 2200,
        description: "Organize your cables, chargers, and small tech gadgets.",
        image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=800",
        category: "Accessories"
    },
    {
        _id: "14",
        title: "Retro Mechanical Keycaps",
        price: 5500,
        description: "Custom PBT keycaps with a classic retro-inspired color palette.",
        image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?auto=format&fit=crop&q=80&w=800",
        category: "Keyboards"
    },
    {
        _id: "15",
        title: "Noise-Cancelling Earbuds",
        price: 18990,
        description: "Premium wireless earbuds with industry-leading noise cancellation.",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
        category: "Audio"
    }
];

// Seed the fresh data
fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

const db = {
    getProducts: () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')),
    saveProducts: (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)),
    getUsers: () => JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')),
    saveUsers: (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2)),
};

module.exports = db;
