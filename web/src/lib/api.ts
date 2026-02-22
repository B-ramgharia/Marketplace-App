import productsData from './products.json';

// Mock API to replace Axel/Backend for static hosting (GitHub Pages)
// This uses localStorage to simulate database persistence for users and favorites.

const DELAY = 500;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get users from localStorage
const getLocalUsers = () => {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('mock_users');
    return users ? JSON.parse(users) : [];
};

const saveLocalUsers = (users: any[]) => {
    localStorage.setItem('mock_users', JSON.stringify(users));
};

const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    const users = getLocalUsers();
    return users.find((u: any) => u.id === token) || null;
};

const api = {
    get: async (url: string, options?: any) => {
        await wait(DELAY);

        // GET /products/:id
        if (url.match(/\/products\/(\w+)/)) {
            const id = url.split('/').pop();
            const product = productsData.find(p => String(p._id) === String(id));
            if (!product) throw { response: { status: 404, data: { message: 'Not found' } } };
            return { data: product };
        }

        // GET /products
        if (url.startsWith('/products')) {
            const urlObj = new URL(url, 'http://localhost');
            const search = urlObj.searchParams.get('search')?.toLowerCase() || options?.params?.search?.toLowerCase();
            const category = urlObj.searchParams.get('category') || options?.params?.category;
            const limit = parseInt(options?.params?.limit || urlObj.searchParams.get('limit') || '100');
            const page = parseInt(options?.params?.page || urlObj.searchParams.get('page') || '1');

            let filtered = [...productsData];

            if (search) {
                filtered = filtered.filter(p =>
                    p.title.toLowerCase().includes(search) ||
                    p.description.toLowerCase().includes(search)
                );
            }

            if (category && category !== 'All') {
                filtered = filtered.filter(p => p.category === category);
            }

            const start = (page - 1) * limit;
            const paginated = filtered.slice(start, start + limit);

            return {
                data: {
                    products: paginated,
                    totalPages: Math.ceil(filtered.length / limit),
                    currentPage: page,
                    totalProducts: filtered.length
                }
            };
        }

        // GET /auth/profile
        if (url === '/auth/profile') {
            const user = getCurrentUser();
            if (!user) throw { response: { status: 401, data: { message: 'Unauthorized' } } };
            return { data: user };
        }

        throw new Error(`Mock API: Route ${url} not implemented`);
    },

    post: async (url: string, data?: any) => {
        await wait(DELAY);

        // POST /auth/register
        if (url === '/auth/register') {
            const users = getLocalUsers();
            if (users.find((u: any) => u.email === data.email)) {
                throw { response: { status: 400, data: { message: 'User already exists' } } };
            }
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                ...data,
                favorites: []
            };
            users.push(newUser);
            saveLocalUsers(users);
            return { data: { token: newUser.id } };
        }

        // POST /auth/login
        if (url === '/auth/login') {
            const users = getLocalUsers();
            const user = users.find((u: any) => u.email === data.email && u.password === data.password);
            if (!user) {
                throw { response: { status: 400, data: { message: 'Invalid credentials' } } };
            }
            return { data: { token: user.id } };
        }

        // POST /products/:id/favorite
        if (url.match(/\/products\/(\w+)\/favorite/)) {
            const id = url.split('/')[2];
            const currentUser = getCurrentUser();
            if (!currentUser) throw { response: { status: 401, data: { message: 'Unauthorized' } } };

            const users = getLocalUsers();
            const userIndex = users.findIndex((u: any) => u.id === currentUser.id);

            if (!users[userIndex].favorites) users[userIndex].favorites = [];

            const favIndex = users[userIndex].favorites.indexOf(id);
            if (favIndex > -1) {
                users[userIndex].favorites.splice(favIndex, 1);
            } else {
                users[userIndex].favorites.push(id);
            }

            saveLocalUsers(users);
            return { data: users[userIndex].favorites };
        }

        throw new Error(`Mock API: Route ${url} not implemented`);
    }
};

export default api;
