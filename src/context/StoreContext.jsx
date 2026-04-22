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

    const login = (email, password, name) => {
        // Mock login
        if (email === 'admin@nexus.com' && password === 'admin') {
            setUser({ name: 'Admin User', email, role: 'admin' });
            setIsAdminMode(true);
            return true;
        } else if (email && password) {
            // If a name is provided (signup flow), persist it so login can recall it
            if (name) {
                const stored = JSON.parse(localStorage.getItem('nexus_users') || '{}');
                stored[email] = name;
                localStorage.setItem('nexus_users', JSON.stringify(stored));
            }
            // Look up the stored name for this email, fall back to email prefix
            const stored = JSON.parse(localStorage.getItem('nexus_users') || '{}');
            const resolvedName = name || stored[email] || email.split('@')[0];
            setUser({ name: resolvedName, email, role: 'user' });
            setIsAdminMode(false);
            return true;
        }
        return false;
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
            login, logout, navigateToCategory
        }}>
            {children}
        </StoreContext.Provider>
    );
};
