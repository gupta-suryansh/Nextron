import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import gsap from 'gsap';

const Hero = () => {
    const { navigateToCategory } = useStore();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
            gsap.from('.hero-subtitle', { y: 50, opacity: 0, duration: 1, delay: 0.7, ease: 'power3.out' });
            gsap.from('.hero-cta', { y: 30, opacity: 0, duration: 1, delay: 0.9, ease: 'power3.out' });
            gsap.from('.hero-image', { scale: 0.8, opacity: 0, duration: 1.2, delay: 0.6, ease: 'power3.out' });
        });
        return () => ctx.revert();
    }, []);

    const scrollToProducts = () => {
        const productsSection = document.getElementById('featured-products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px]"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-2)] rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                    <div className="inline-block mb-6 px-4 py-2 border border-[var(--accent)] rounded-full">
                        <span className="font-mono text-xs text-[var(--accent)]">NEW COLLECTION 2025</span>
                    </div>
                    <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6">
                        FUTURE OF<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">TECH</span>
                    </h1>
                    <p className="hero-subtitle text-xl text-gray-400 mb-8 max-w-lg">
                        Experience cutting-edge electronics designed for tomorrow. Premium quality, unmatched performance.
                    </p>
                    <div className="hero-cta flex flex-wrap gap-4">
                        <a href="#shop" className="btn-primary px-8 py-4 rounded-full font-mono text-sm inline-block text-center pt-4">
                            SHOP NOW
                        </a>
                        <button onClick={scrollToProducts} className="btn-outline px-8 py-4 rounded-full font-mono text-sm">
                            EXPLORE
                        </button>
                    </div>
                    <div className="mt-12 flex items-center space-x-8 font-mono text-sm">
                        <div><div className="text-3xl font-bold text-[var(--accent)]">12+</div><div className="text-gray-500">PRODUCTS</div></div>
                        <div><div className="text-3xl font-bold text-[var(--accent)]">50K+</div><div className="text-gray-500">CUSTOMERS</div></div>
                        <div><div className="text-3xl font-bold text-[var(--accent)]">4.9★</div><div className="text-gray-500">RATING</div></div>
                    </div>
                </div>
                <div className="relative hero-image">
                    <div className="aspect-square rounded-3xl overflow-hidden floating">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" alt="Featured" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
