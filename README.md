# Micro Marketplace App

A comprehensive full-stack marketplace application with Web, Mobile, and Backend support, built for the Full Stack Developer Intern Assignment.

## 🚀 Features
- **Frontend (Web)**: Premium Next.js app with Tailwind CSS and Framer Motion animations.
- **Backend**: Express.js with MongoDB, JWT Auth, and Product CRUD.
- **Mobile**: Expo (React Native) app with a matching premium design.
- **Micro-interactions**: Smooth hover effects and page transitions.
- **Search & Pagination**: Robust product discovery on both web and mobile.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017/micromarket`)

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env (already created for you)
node scripts/seed.js # Seeds 10 products and 2 users
npm start # Starts on port 5000
```
**Test Credentials:**
- Email: `user@example.com`
- Password: `password123`

### 3. Web App Setup
```bash
cd web
npm install
npm run dev # Starts on port 3000
```

### 4. GitHub Pages (Static Mode)
The web application is configured for **Static Export**. You can host it on GitHub Pages without a backend.
- It uses `localStorage` to simulate a database.
- It uses a mock API client at `web/src/lib/api.ts`.

**To deploy:**
1. Push this repo to GitHub.
2. Go to **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will handle the rest.

---

## 📡 API Documentation

### Auth
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login and receive JWT.

### Products
- `GET /products`: List products (Supports `search`, `category`, `page`).
- `GET /products/:id`: Get product details.
- `POST /products/:id/favorite`: Toggle favorite status (Requires Auth).

---

## 🎨 Design Philosophy
Inspired by the **Stitch "Micro Marketplace"** design, the UI uses a clean, modern aesthetic with:
- **Primary Color**: `#5048e5` (Elegant Indigo)
- **Typography**: Inter (Modern sans-serif)
- **Glassmorphism**: Subtle translucent backgrounds.
- **Micro-interactions**: Responsive hover states and entrance animations to "wow" the user.

---

## 📈 Scalability
For production, this app can be scaled by:
- Using **Redis** for caching product listings.
- Moving to **Next.js Server Components** for better SEO/performance.
- Implementing **Image Optimization** (via Cloudinary/Next Image).
- Using **SecureStore** in the mobile app for token persistence.
