import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState(PRODUCTS_DATA);

    // UI State
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);

    // Auth State (Mock)
    const [user, setUser] = useState(null); // { name, email, role }

    // Theme State
    const [theme, setTheme] = useState(() => localStorage.getItem('nexus_theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nexus_theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    const navigate = useNavigate();

    const navigateToCategory = (categoryId) => {
        navigate(`/products?category=${categoryId}`);
    };

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity === 0) removeFromCart(productId);
        else setCart(cart.map(item => item.id === productId ? { ...item, quantity } : item));
    };

    const addToWishlist = (product) => {
        if (!wishlist.find(item => item.id === product.id)) {
            setWishlist([...wishlist, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(wishlist.filter(item => item.id !== productId));
    };

    const placeOrder = (orderData) => {
        const newOrder = {
            id: Date.now(),
            items: [...cart],
            total: cartTotal,
            customerInfo: orderData,
            date: new Date().toISOString(),
            status: 'Processing'
        };
        setOrders([...orders, newOrder]);
        setCart([]);
        return newOrder;
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // ─── Auth helpers ─────────────────────────────────────────────────────────
    const USERS_KEY = 'nexus_users'; // { [email]: { name, password, role } }

    const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

    /**
     * Register a new user.
     * @returns {{ success: boolean, error?: 'EMAIL_EXISTS' }}
     */
    const signup = (email, password, name) => {
        const users = getUsers();
        if (users[email.toLowerCase()]) {
            return { success: false, error: 'EMAIL_EXISTS' };
        }
        users[email.toLowerCase()] = { name, password, role: 'user' };
        saveUsers(users);
        // Auto-login after signup
        setUser({ name, email: email.toLowerCase(), role: 'user' });
        setIsAdminMode(false);
        return { success: true };
    };

    /**
     * Log in an existing user.
     * @returns {{ success: boolean, error?: 'USER_NOT_FOUND' | 'WRONG_PASSWORD' }}
     */
    const login = (email, password) => {
        // Hardcoded admin account
        if (email === 'admin@nexus.com' && password === 'admin') {
            setUser({ name: 'Admin User', email, role: 'admin' });
            setIsAdminMode(true);
            return { success: true };
        }

        const users = getUsers();
        const record = users[email.toLowerCase()];

        if (!record) {
            return { success: false, error: 'USER_NOT_FOUND' };
        }
        if (record.password !== password) {
            return { success: false, error: 'WRONG_PASSWORD' };
        }

        setUser({ name: record.name, email: email.toLowerCase(), role: record.role || 'user' });
        setIsAdminMode(false);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        setIsAdminMode(false);
    };

    return (
        <StoreContext.Provider value={{
            cart, wishlist, orders, products,
            isCartOpen, isWishlistOpen, isCheckoutOpen, isAdminMode, user,
            theme, toggleTheme,
            setProducts, addToCart, removeFromCart, updateQuantity,
            addToWishlist, removeFromWishlist, setIsCartOpen, setIsWishlistOpen,
            setIsCheckoutOpen, setIsAdminMode, cartTotal, cartCount, placeOrder,
            login, logout, signup, navigateToCategory
        }}>
            {children}
        </StoreContext.Provider>
    );
};
