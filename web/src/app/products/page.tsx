'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

function ProductsContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // Sync state with URL params
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const categories = ['All', 'Keyboards', 'Gaming Gear', 'Audio', 'Screens', 'Computer Gear', 'Accessories', 'Desk Setup'];

    // Update state if searchParams change (via Navbar search)
    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setCategory(searchParams.get('category') || 'All');
        setPage(1);
    }, [searchParams]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/products', {
                params: {
                    search: searchTerm,
                    category,
                    page,
                    limit: 8
                }
            });
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [category, page, searchTerm]); // Added searchTerm to dependency

    const handleSearchClick = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchProducts();
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
                <form onSubmit={handleSearchClick} className="relative w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search keyboards, desks..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-soft outline-none text-sm"
                    />
                </form>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setCategory(cat); setPage(1); }}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-soft whitespace-nowrap ${category === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
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
                    <div className="text-center py-32" key="empty">
                        <p className="text-lg text-gray-500 font-medium">No products found matching your criteria.</p>
                        <button onClick={() => { setSearchTerm(''); setCategory('All'); }} className="mt-4 text-primary font-bold hover:underline">
                            Clear all filters
                        </button>
                    </div>
                )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-10 h-10 rounded-xl font-bold transition-soft ${page === i + 1
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </main>
    );
}

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={
                <div className="flex items-center justify-center py-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            }>
                <ProductsContent />
            </Suspense>
        </div>
    );
}
