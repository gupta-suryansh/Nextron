import React, { useState } from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Marquee from '../components/Marquee';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data';

const Home = () => {
    const { products } = useStore();
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    // Featured Products (limit to 4 for the "Featured" section)
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);

    // Filter Logic for the new section
    const filteredProducts = products
        .filter(p => filter === 'all' || p.category === filter)
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0;
        });

    return (
        <div>
            <Hero />

            {/* Categories Section */}
            <div className="px-6 py-20" id="shop">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black mb-4">
                            SHOP BY <span className="text-[var(--accent)]">CATEGORY</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Explore our carefully curated collection of premium electronics
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {CATEGORIES.map(category => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="px-6 py-20 bg-[#0F0F0F]" id="featured-products">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            FEATURED <span className="text-[var(--accent)]">DROPS</span>
                        </h2>
                        <p className="text-gray-400">Hand-picked for the tech connoisseur.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* NEW: Sort & Filter Section */}
            <div className="px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4">
                                EXPLORE <span className="text-[var(--accent)]">ALL</span>
                            </h2>
                            <p className="text-gray-400 max-w-xl">Find the perfect gear. Filter by category or sort by price.</p>
                        </div>

                        {/* Filter Controls */}
                        <div className="flex flex-wrap gap-4">
                            <div className="min-w-[200px]">
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
                            <div className="min-w-[200px]">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-mono">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>

            <Marquee />
        </div>
    );
};

export default Home;
