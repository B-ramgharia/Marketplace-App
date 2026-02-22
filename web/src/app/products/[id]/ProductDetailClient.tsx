'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Heart, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { motion } from 'framer-motion';

export default function ProductDetailClient({ id }: { id: string }) {
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch((err) => {
                console.error("Failed to fetch product:", err);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const toggleFavorite = async () => {
        try {
            const res = await api.post(`/products/${id}/favorite`);
            setIsFavorite(res.data.includes(id));
        } catch (err) {
            router.push('/auth/login');
        }
    };

    if (loading || !product) return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center py-64">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 font-bold hover:text-primary transition-colors mb-8">
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100"
                    >
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="mb-8">
                            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
                                {product.category}
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-6 mb-4">{product.title}</h1>
                            <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed mb-10">
                            {product.description}
                        </p>

                        <div className="flex gap-4 mb-12">
                            <button className="flex-1 py-5 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-soft shadow-xl shadow-primary/25 flex items-center justify-center gap-3">
                                <ShoppingCart className="w-6 h-6" /> Add to Cart
                            </button>
                            <button
                                onClick={toggleFavorite}
                                className={`p-5 rounded-2xl transition-soft border-2 ${isFavorite ? "bg-red-50 text-red-500 border-red-100" : "bg-white text-gray-400 border-gray-100 hover:text-red-500"
                                    }`}
                            >
                                <Heart className={`w-7 h-7 ${isFavorite && "fill-current"}`} />
                            </button>
                        </div>

                        {/* Perks */}
                        <div className="grid grid-cols-3 gap-4 p-8 bg-gray-50 rounded-3xl">
                            <div className="text-center">
                                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-xs font-bold text-gray-900">Free Shipping</p>
                            </div>
                            <div className="text-center">
                                <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-xs font-bold text-gray-900">2 Year Warranty</p>
                            </div>
                            <div className="text-center">
                                <RefreshCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                                <p className="text-xs font-bold text-gray-900">30 Day Returns</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
