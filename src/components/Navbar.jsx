import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
    const {
        cartCount, wishlist, setIsCartOpen, setIsWishlistOpen,
        user, logout, isAdminMode, setIsAdminMode
    } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                        <Link to="/" className="text-2xl font-black tracking-tighter cursor-pointer glitch">
                            NEXUS<span className="text-[var(--accent)]">.</span>
                        </Link>
                        <div className="hidden md:flex space-x-8 font-mono text-sm">
                            <Link to="/" className="hover:text-[var(--accent)] transition-colors">HOME</Link>
                            <Link to="/products" className="hover:text-[var(--accent)] transition-colors">ALL PRODUCTS</Link>
                            <Link to="/new-arrivals" className="hover:text-[var(--accent)] transition-colors">NEW ARRIVALS</Link>
                            <Link to="/about" className="hover:text-[var(--accent)] transition-colors">ABOUT</Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-mono text-gray-400">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={logout} className="text-xs font-mono border border-[var(--border)] px-3 py-1 hover:border-[var(--accent)] rounded transition-colors">
                                    LOGOUT
                                </button>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-xs font-mono border border-[var(--accent)] text-[var(--accent)] px-3 py-1 rounded transition-colors">
                                        ADMIN
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-sm font-mono hover:text-[var(--accent)] transition-colors">LOGIN</Link>
                                <Link to="/signup" className="text-sm font-mono btn-primary px-4 py-2 rounded-full text-[var(--primary)]">SIGNUP</Link>
                            </div>
                        )}

                        <button onClick={() => setIsWishlistOpen(true)} className="relative hover:text-[var(--accent)] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent-2)] text-[var(--primary)] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>
                            )}
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="relative hover:text-[var(--accent)] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-[var(--primary)] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold badge-pulse">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
