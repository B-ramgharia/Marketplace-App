import productsData from './products.json';
import { Platform } from 'react-native';

// Mock API for Mobile to support offline/demo mode without a backend
// Using an in-memory store for users and favorites to avoid extra dependencies

const DELAY = 500;
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let mockUsers: any[] = [];
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
    authToken = token;
};

const getCurrentUser = () => {
    if (!authToken) return null;
    return mockUsers.find(u => u.id === authToken) || null;
};

const api = {
    get: async (url: string) => {
        await wait(DELAY);

        if (url.startsWith('/products')) {
            const search = url.includes('search=') ? decodeURIComponent(url.split('search=')[1].split('&')[0]).toLowerCase() : null;
            const category = url.includes('category=') ? decodeURIComponent(url.split('category=')[1].split('&')[0]) : null;

            let filtered = [...productsData];
            if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
            if (category && category !== 'All') filtered = filtered.filter(p => p.category === category);

            return {
                data: {
                    products: filtered,
                    totalPages: 1,
                    currentPage: 1,
                    totalProducts: filtered.length
                }
            };
        }

        if (url === '/auth/profile') {
            const user = getCurrentUser();
            if (!user) throw { response: { status: 401 } };
            return { data: user };
        }

        return { data: productsData[0] }; // Fallback
    },

    post: async (url: string, data?: any) => {
        await wait(DELAY);

        if (url === '/auth/login') {
            // Simple mock login - any email works, or create a default
            let user = mockUsers.find(u => u.email === data.email);
            if (!user) {
                user = { id: Math.random().toString(), email: data.email, favorites: [] };
                mockUsers.push(user);
            }
            authToken = user.id;
            return { data: { token: user.id } };
        }

        if (url.match(/\/products\/(\w+)\/favorite/)) {
            const id = url.split('/')[2];
            const user = getCurrentUser();
            if (!user) throw { response: { status: 401 } };

            if (!user.favorites) user.favorites = [];
            const idx = user.favorites.indexOf(id);
            if (idx > -1) user.favorites.splice(idx, 1);
            else user.favorites.push(id);

            return { data: user.favorites };
        }

        return { data: {} };
    }
};

export default api;
