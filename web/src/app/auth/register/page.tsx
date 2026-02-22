'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', { email, password });
            localStorage.setItem('token', res.data.token);
            window.dispatchEvent(new Event('auth-change'));
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <div className="px-8 pt-12 pb-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-500">Join MicroMarket today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-soft outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-soft outline-none"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-soft shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        Already have an account?{' '}
                        <Link href="/auth/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
