import React, { useState, createContext, useContext } from 'react';
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

    const navigate = useNavigate();

    const navigateToCategory = (categoryId) => {
        // Navigate to Products page with category filter pre-selected (if feasible) or just products page
        // For now, let's just navigate to /products. Ideally we'd pass a state or query param.
        // Since the requirement is just "navigateToCategory", let's make it go to /products
        // and maybe we can use url params later. For now, simple navigation.
        navigate('/products');
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

    const login = (email, password) => {
        // Mock login
        if (email === 'admin@nexus.com' && password === 'admin') {
            setUser({ name: 'Admin User', email, role: 'admin' });
            setIsAdminMode(true);
            return true;
        } else if (email && password) {
            setUser({ name: 'John Doe', email, role: 'user' });
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
            setProducts, addToCart, removeFromCart, updateQuantity,
            addToWishlist, removeFromWishlist, setIsCartOpen, setIsWishlistOpen,
            setIsCheckoutOpen, setIsAdminMode, cartTotal, cartCount, placeOrder,
            login, logout, navigateToCategory
        }}>
            {children}
        </StoreContext.Provider>
    );
};
