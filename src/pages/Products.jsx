import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data';

const Products = () => {
    const { products } = useStore();
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    const filteredProducts = products
        .filter(p => filter === 'all' || p.category === filter)
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            return 0;
        });

    return (
        <div className="min-h-screen px-6 py-32">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-5xl md:text-6xl font-black mb-4">
                        ALL <span className="text-[var(--accent)]">PRODUCTS</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl">
                        Browse our complete collection of premium electronics
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-12">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block font-mono text-xs text-gray-500 mb-2">CATEGORY</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full bg-[#111] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                        >
                            <option value="all">ALL CATEGORIES</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block font-mono text-xs text-gray-500 mb-2">SORT BY</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-[#111] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                        >
                            <option value="featured">FEATURED</option>
                            <option value="price-low">PRICE: LOW TO HIGH</option>
                            <option value="price-high">PRICE: HIGH TO LOW</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 font-mono">
                        No products found using selected filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
