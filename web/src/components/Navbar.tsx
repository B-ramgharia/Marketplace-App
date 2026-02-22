'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const router = useRouter();

    const checkAuth = () => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    };

    useEffect(() => {
        checkAuth();
        // Listen for storage changes (for multiple tabs) or custom 'auth-change' events
        window.addEventListener('storage', checkAuth);
        window.addEventListener('auth-change', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('auth-change', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
        window.dispatchEvent(new Event('auth-change'));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-gray-100 px-4 md:px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <Link href="/" className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2 shrink-0">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        🛒
                    </motion.div>
                    <span className={isMobileSearchOpen ? 'hidden xs:block' : 'block'}>MicroMarket</span>
                </Link>

                {/* Search Bar (Desktop) */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search setup gear..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-soft outline-none text-sm"
                    />
                </form>

                {/* Search Bar (Mobile Inline) */}
                <AnimatePresence>
                    {isMobileSearchOpen && (
                        <motion.form
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onSubmit={handleSearch}
                            className="flex md:hidden flex-1 relative"
                        >
                            <input
                                autoFocus
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-4 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-primary transition-soft outline-none text-sm"
                            />
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-1 sm:gap-4">
                    <button
                        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Search className="w-5 h-5 text-gray-600" />
                    </button>

                    <Link href="/products" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-primary transition-colors">Browse</Link>

                    <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </Link>

                    {isLoggedIn ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                U
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/auth/login" className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-soft text-sm font-medium">
                            <User className="w-4 h-4" />
                            <span className="hidden xs:block">Sign In</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
