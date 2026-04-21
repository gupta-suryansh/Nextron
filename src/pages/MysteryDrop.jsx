import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const MysteryDrop = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // 3 days from now

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to('.blur-reveal', { filter: 'blur(30px)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent-2)_0%,_transparent_40%)] opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="inline-block px-4 py-1 rounded-full border border-[var(--accent)] text-[var(--accent)] text-xs font-mono mb-8 animate-pulse">
                    INCOMING DROP
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">
                    PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">ZENITH</span>
                </h1>

                <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
                    The next generation of auditory perception.
                    Redefining silence. Amplifying reality.
                </p>

                {/* Mystery Product Silhouette */}
                <div className="relative w-80 h-80 mx-auto mb-16">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-2)] rounded-full blur-[100px] opacity-20"></div>
                    <div className="w-full h-full bg-[#111] rounded-3xl border border-[var(--border)] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80')] bg-cover bg-center opacity-50 blur-xl blur-reveal transition-all duration-1000 group-hover:blur-lg scale-110"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl text-white font-black opacity-20">?</span>
                        </div>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="bg-[#111] border border-[var(--border)] rounded-2xl p-4 md:p-6">
                            <div className="text-3xl md:text-5xl font-mono font-bold text-white mb-2">
                                {value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest">{unit}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <button className="btn-primary px-8 py-4 rounded-full font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,255,209,0.3)] transition-all">
                        NOTIFY ME
                    </button>
                    <p className="text-xs text-gray-500 mt-4 font-mono">
                        Be the first to know when it drops.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MysteryDrop;
