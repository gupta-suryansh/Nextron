import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Profile = () => {
    const { user, logout, orders, wishlist, cart } = useStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    if (!user) {
        navigate('/login');
        return null;
    }

    const initials = user.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const tabs = [
        { id: 'overview', label: 'OVERVIEW' },
        { id: 'orders', label: 'ORDERS' },
        { id: 'wishlist', label: 'WISHLIST' },
    ];

    return (
        <div className="min-h-screen px-6 py-32">
            <div className="max-w-5xl mx-auto">

                {/* Header Card */}
                <div className="relative rounded-3xl overflow-hidden mb-8 border border-[var(--border)] bg-[#111]">
                    {/* Glow background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-1/3 w-96 h-40 bg-[var(--accent)] rounded-full blur-[80px]" />
                        <div className="absolute bottom-0 right-1/4 w-72 h-32 bg-[var(--accent-2)] rounded-full blur-[80px]" />
                    </div>

                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-[var(--accent)]/30">
                                {initials}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <p className="font-mono text-xs text-gray-500 mb-1 uppercase tracking-widest">
                                {user.role === 'admin' ? '⚡ Admin Account' : '✦ Member'}
                            </p>
                            <h1 className="text-4xl md:text-5xl font-black mb-2">{user.name}</h1>
                            <p className="text-gray-400 font-mono text-sm">{user.email}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                                <div className="text-center">
                                    <p className="text-3xl font-black text-[var(--accent)]">{orders.length}</p>
                                    <p className="text-xs font-mono text-gray-500 mt-1">ORDERS</p>
                                </div>
                                <div className="w-px bg-[var(--border)] hidden md:block" />
                                <div className="text-center">
                                    <p className="text-3xl font-black text-[var(--accent)]">{wishlist.length}</p>
                                    <p className="text-xs font-mono text-gray-500 mt-1">WISHLIST</p>
                                </div>
                                <div className="w-px bg-[var(--border)] hidden md:block" />
                                <div className="text-center">
                                    <p className="text-3xl font-black text-[var(--accent)]">{cart.length}</p>
                                    <p className="text-xs font-mono text-gray-500 mt-1">IN CART</p>
                                </div>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex-shrink-0 border border-red-500/40 text-red-400 hover:bg-red-500/10 font-mono text-xs px-5 py-2 rounded-full transition-all duration-200"
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-[#111] border border-[var(--border)] rounded-2xl p-1 w-fit">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`font-mono text-xs px-6 py-2.5 rounded-xl transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-[var(--accent)] text-[var(--primary)] font-bold'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Details */}
                        <div className="bg-[#111] border border-[var(--border)] rounded-3xl p-8">
                            <h2 className="font-mono text-xs text-gray-500 mb-6 tracking-widest">ACCOUNT DETAILS</h2>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-xs text-gray-500 font-mono mb-1">FULL NAME</p>
                                    <p className="text-lg font-bold">{user.name}</p>
                                </div>
                                <div className="h-px bg-[var(--border)]" />
                                <div>
                                    <p className="text-xs text-gray-500 font-mono mb-1">EMAIL</p>
                                    <p className="text-lg font-bold">{user.email}</p>
                                </div>
                                <div className="h-px bg-[var(--border)]" />
                                <div>
                                    <p className="text-xs text-gray-500 font-mono mb-1">ACCOUNT TYPE</p>
                                    <p className={`text-lg font-bold capitalize ${user.role === 'admin' ? 'text-[var(--accent)]' : ''}`}>
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-[#111] border border-[var(--border)] rounded-3xl p-8">
                            <h2 className="font-mono text-xs text-gray-500 mb-6 tracking-widest">QUICK ACTIONS</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/products')}
                                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 group"
                                >
                                    <span className="font-mono text-sm">BROWSE PRODUCTS</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 group"
                                >
                                    <span className="font-mono text-sm">VIEW ORDERS</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setActiveTab('wishlist')}
                                    className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 group"
                                >
                                    <span className="font-mono text-sm">MY WISHLIST</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                {user.role === 'admin' && (
                                    <button
                                        onClick={() => navigate('/admin')}
                                        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-[var(--accent)]/40 hover:border-[var(--accent)] text-[var(--accent)] transition-all duration-200 group"
                                    >
                                        <span className="font-mono text-sm">ADMIN PANEL</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-[#111] border border-[var(--border)] rounded-3xl p-8">
                        <h2 className="font-mono text-xs text-gray-500 mb-6 tracking-widest">ORDER HISTORY</h2>
                        {orders.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📦</div>
                                <p className="text-gray-500 font-mono text-sm">No orders yet.</p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="mt-6 btn-primary px-8 py-3 rounded-full font-bold text-sm"
                                >
                                    SHOP NOW
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id} className="border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)]/40 transition-colors">
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                            <div>
                                                <p className="font-mono text-xs text-gray-500 mb-1">ORDER ID</p>
                                                <p className="font-bold text-sm">#{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="font-mono text-xs text-gray-500 mb-1">DATE</p>
                                                <p className="font-bold text-sm">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="font-mono text-xs text-gray-500 mb-1">TOTAL</p>
                                                <p className="font-bold text-sm text-[var(--accent)]">${order.total.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <span className="bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs px-3 py-1 rounded-full">
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {order.items.map(item => (
                                                <div key={item.id} className="flex items-center justify-between text-sm text-gray-400">
                                                    <span>{item.name} × {item.quantity}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'wishlist' && (
                    <div className="bg-[#111] border border-[var(--border)] rounded-3xl p-8">
                        <h2 className="font-mono text-xs text-gray-500 mb-6 tracking-widest">MY WISHLIST</h2>
                        {wishlist.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🤍</div>
                                <p className="text-gray-500 font-mono text-sm">Your wishlist is empty.</p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="mt-6 btn-primary px-8 py-3 rounded-full font-bold text-sm"
                                >
                                    EXPLORE PRODUCTS
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlist.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        className="border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/60 transition-all duration-200 cursor-pointer group"
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <p className="font-bold truncate">{item.name}</p>
                                            <p className="text-[var(--accent)] font-mono font-bold mt-1">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
