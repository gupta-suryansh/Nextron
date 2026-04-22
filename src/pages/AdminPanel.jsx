import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const { products, setProducts, orders, user, isAdminMode } = useStore();
    const [activeTab, setActiveTab] = useState('products');
    const navigate = useNavigate();

    // Redirect if not admin
    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <button onClick={() => navigate('/login')} className="btn-primary px-6 py-2 rounded-full">Login as Admin</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-32">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-black mb-12">ADMIN <span className="text-[var(--accent)]">PORTAL</span></h2>
                <div className="flex gap-4 mb-8 border-b border-[var(--border)]">
                    <button onClick={() => setActiveTab('products')} className={`px-6 py-3 font-mono text-sm ${activeTab === 'products' ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]' : 'text-gray-500'}`}>PRODUCTS</button>
                    <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 font-mono text-sm ${activeTab === 'orders' ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]' : 'text-gray-500'}`}>ORDERS ({orders.length})</button>
                </div>

                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 min-h-[400px]">
                    {activeTab === 'products' ? (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Product Management</h3>
                                <button className="btn-primary px-4 py-2 rounded-lg text-xs font-mono">ADD NEW PRODUCT</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-gray-500 font-mono text-xs border-b border-[var(--border)]">
                                        <tr>
                                            <th className="py-3">PRODUCT</th>
                                            <th className="py-3">CATEGORY</th>
                                            <th className="py-3">PRICE</th>
                                            <th className="py-3">STOCK</th>
                                            <th className="py-3">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--border)]">
                                        {products.map(product => (
                                            <tr key={product.id} className="hover:bg-[var(--surface)] transition-colors">
                                                <td className="py-4 flex items-center gap-4">
                                                    <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                                                    {product.name}
                                                </td>
                                                <td className="py-4 text-gray-400 capitalize">{product.category}</td>
                                                <td className="py-4 font-mono text-[var(--accent)]">${product.price}</td>
                                                <td className="py-4">{product.stock}</td>
                                                <td className="py-4">
                                                    <button className="text-xs text-gray-400 hover:text-white mr-2">EDIT</button>
                                                    <button className="text-xs text-red-500 hover:text-red-400">DELETE</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold mb-6">Order History</h3>
                            {orders.length === 0 ? (
                                <p className="text-gray-500 font-mono">No orders found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="border border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)] transition-colors">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="font-mono text-xs text-[var(--accent)]">#{order.id}</div>
                                                    <div className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</div>
                                                </div>
                                                <div className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-xs font-bold">
                                                    {order.status}
                                                </div>
                                            </div>
                                            <div className="text-sm mb-2">
                                                <span className="text-gray-400">Customer:</span> {order.customerInfo.fullName}
                                            </div>
                                            <div className="text-sm mb-4">
                                                <span className="text-gray-400">Items:</span> {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                            </div>
                                            <div className="font-bold text-lg text-right">${order.total.toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
