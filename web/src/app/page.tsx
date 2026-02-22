'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Magnetic Button Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    setLoading(true);
    api.get('/products?limit=4')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Failed to fetch hero products', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-40">
        {/* Animated Background Overlay */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 -z-10 w-full h-full bg-gradient-to-br from-primary/10 via-white to-transparent blur-3xl opacity-40"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10 mb-8">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">New Season Drop</span>
              </div>

              <h1 className="text-4xl xs:text-6xl lg:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
                Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Setup</span>
              </h1>

              <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-xl">
                Experience the perfect blend of aesthetics and performance with our curated mechanical gear and desk accessories.
              </p>

              <div className="flex flex-wrap gap-6">
                <motion.div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ x: mouseX, y: mouseY }}
                  className="relative group"
                >
                  <Link href="/products" className="relative z-10 block px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold transition-all duration-300 group-hover:bg-primary group-hover:scale-105 shadow-2xl shadow-gray-900/20 active:scale-95">
                    Shop Now
                  </Link>
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-2xl scale-0 group-hover:scale-125 transition-transform duration-500 -z-10" />
                </motion.div>

                <Link href="/products?category=Desk Setup" className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center gap-2">
                  View Setup <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
                <img
                  src="https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&q=80&w=1200"
                  alt="Premium Workspace"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse" />
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-400/10 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Editor's Picks</h2>
              <p className="text-gray-500 text-lg">Finest essentials for your creative flow</p>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-primary font-black hover:gap-3 transition-all">
              Go to Store <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {!loading ? products.map((product, idx) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                index={idx}
              />
            )) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-[2rem]" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryCard title="Mechanical" tag="Keyboards" image="/Marketplace-App/images/category-mechanical.png" />
          <CategoryCard title="Studio" tag="Audio" image="/Marketplace-App/images/category-audio.png" />
          <CategoryCard title="Desk" tag="Accessories" image="/Marketplace-App/images/category-desk.png" />
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ title, tag, image }: { title: string; tag: string; image: string }) {
  return (
    <Link href={`/products?category=${tag}`}>
      <motion.div
        whileHover={{ y: -10 }}
        className="relative h-96 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">{tag}</span>
          <h3 className="text-3xl font-black text-white group-hover:translate-x-2 transition-transform">{title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
