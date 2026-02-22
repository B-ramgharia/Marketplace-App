'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Heart, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FavoritesPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            // First get profile for favorite IDs
            const profileRes = await api.get('/auth/profile');
            const favoriteIds = profileRes.data.favorites;

            if (favoriteIds && favoriteIds.length > 0) {
                // Fetch all products and filter locally for simplicity in JSON mode
                const productsRes = await api.get('/products', { params: { limit: 100 } });
                const favProducts = productsRes.data.products.filter((p: any) => favoriteIds.includes(p._id));
                setProducts(favProducts);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error('Failed to fetch favorites', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">My Favorites</h1>
                    <p className="text-gray-500">Items you've liked from our marketplace</p>
                </header>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="flex items-center justify-center py-32" key="loader">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : products.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                            key="grid"
                        >
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    category={product.category}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200" key="empty">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-lg text-gray-500 font-medium">You haven't favorited any items yet.</p>
                            <Link href="/products" className="mt-4 inline-block px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-soft">
                                Browse Products
                            </Link>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
