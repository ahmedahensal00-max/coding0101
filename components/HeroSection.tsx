'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { language } = useShop();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix-style falling musical notes
        const notes = ['♪', '♫', '♬', '♩', '♭', '♮', '♯'];
        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = Array(columns).fill(0);

        function drawMatrix() {
            if (!ctx || !canvas) return;

            // Semi-transparent black background for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#FFD700'; // Gold color
            ctx.font = '16px monospace';

            for (let i = 0; i < drops.length; i++) {
                const note = notes[Math.floor(Math.random() * notes.length)];
                const x = i * 20;
                const y = drops[i] * 20;

                ctx.fillText(note, x, y);

                // Reset drop to top randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i] += 0.3; // Slow falling speed
            }
        }

        const interval = setInterval(drawMatrix, 50);

        // Floating perfume scent icons
        const scentIcons = ['🌸', '🌹', '🌺', '🍋', '🌿', '🪵', '🍊', '🌼'];
        const floatingElements: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            icon: string;
            size: number;
        }> = [];

        // Create floating icons
        for (let i = 0; i < 15; i++) {
            floatingElements.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                icon: scentIcons[Math.floor(Math.random() * scentIcons.length)],
                size: 20 + Math.random() * 20,
            });
        }

        function drawFloatingIcons() {
            if (!ctx || !canvas) return;

            floatingElements.forEach((element) => {
                ctx.font = `${element.size}px Arial`;
                ctx.fillText(element.icon, element.x, element.y);

                // Update position
                element.x += element.vx;
                element.y += element.vy;

                // Bounce off edges
                if (element.x < 0 || element.x > canvas.width) element.vx *= -1;
                if (element.y < 0 || element.y > canvas.height) element.vy *= -1;
            });
        }

        const floatingInterval = setInterval(drawFloatingIcons, 30);

        return () => {
            clearInterval(interval);
            clearInterval(floatingInterval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="space-y-6 bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5"
                >
                    {/* Brand Name */}
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
                        <span className="inline-block bg-gradient-to-r from-white via-gold-300 to-white bg-clip-text text-transparent animate-shimmer">
                            coding1010
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-3xl text-gold-400 font-light italic">
                        {t('hero.tagline', language)}
                    </p>

                    {/* CTA Button */}
                    <motion.a
                        href="/products"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-2xl hover:shadow-gold-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                        {t('hero.explore', language)}
                    </motion.a>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        </div>
    );
}
