'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    index?: number;
}

const particleVariants: Variants = {
    initial: { scale: 0, opacity: 1 },
    animate: (i: number) => ({
        scale: [0, 1.2, 0],
        opacity: [1, 1, 0],
        x: Math.cos(i * 45) * 40,
        y: Math.sin(i * 45) * 40,
        transition: { duration: 0.6, ease: "easeOut" }
    })
};

export default function ProductCard({ id, title, price, image, category, index = 0 }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showParticles, setShowParticles] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await api.get('/auth/profile');
                if (res.data.favorites?.includes(id)) {
                    setIsFavorite(true);
                }
            } catch (err) {
                console.error('Failed to check favorite status');
            }
        };
        checkFavorite();
    }, [id]);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please sign in to favorite products');
            return;
        }

        setLoading(true);
        if (!isFavorite) setShowParticles(true);

        try {
            const res = await api.post(`/products/${id}/favorite`);
            const currentlyFavorite = res.data.includes(id);
            setIsFavorite(currentlyFavorite);

            if (!currentlyFavorite) setShowParticles(false);
            else setTimeout(() => setShowParticles(false), 600);
        } catch (err) {
            console.error('Failed to toggle favorite');
            setShowParticles(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 1.11, 0.81, 0.99]
            }}
            whileHover={{
                y: -10,
                rotateX: 2,
                rotateY: 2,
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 perspective-1000"
        >
            <Link href={`/products/${id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <motion.img
                        src={image || 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&q=80&w=800'}
                        alt={title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&q=80&w=800';
                        }}
                    />

                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-primary shadow-sm border border-white/20">
                            {category}
                        </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center justify-center">
                        <AnimatePresence>
                            {showParticles && Array.from({ length: 8 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    custom={i}
                                    variants={particleVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="absolute w-2 h-2 bg-red-500 rounded-full z-10 pointer-events-none"
                                />
                            ))}
                        </AnimatePresence>

                        <motion.button
                            onClick={toggleFavorite}
                            disabled={loading}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9, rotate: -15 }}
                            className={`relative p-3 rounded-full backdrop-blur-md transition-all duration-300 z-20 ${isFavorite
                                ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                                : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white'
                                }`}
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </motion.button>
                    </div>
                </div>

                <div className="p-6">
                    <motion.h3
                        className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1 mb-2 text-lg"
                    >
                        {title}
                    </motion.h3>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-gray-900">₹{price.toLocaleString('en-IN')}</span>
                        <div className="flex items-center gap-2 group/btn">
                            <span className="text-xs font-bold text-gray-400 group-hover/btn:text-primary transition-colors">Details</span>
                            <motion.div
                                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-colors"
                                whileHover={{ x: 5 }}
                            >
                                <span className="text-lg leading-none mt-[-2px]">→</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
