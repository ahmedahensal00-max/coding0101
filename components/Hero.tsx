'use client';

import { useEffect, useRef } from 'react';

const iconData = [
    { icon: '🌹', color: 'pink' },
    { icon: '🌸', color: 'white' },
    { icon: '🌿', color: 'darkgreen' },
    { icon: '🪵', color: 'saddlebrown' },
    { icon: '🍋', color: 'yellow' },
    { icon: '🍂', color: 'orange' },
];

class FragranceParticle {
    x: number;
    y: number;
    speed: number;
    size: number;
    icon: string;
    color: string;
    pCanvas: HTMLCanvasElement;
    pCtx: CanvasRenderingContext2D;

    constructor(pCanvas: HTMLCanvasElement, pCtx: CanvasRenderingContext2D) {
        this.pCanvas = pCanvas;
        this.pCtx = pCtx;
        this.x = Math.random() * pCanvas.width;
        this.y = pCanvas.height + Math.random() * 200;
        this.speed = 0.3 + Math.random() * 0.7; // بطيء
        this.size = 20 + Math.random() * 10;
        const data = iconData[Math.floor(Math.random() * iconData.length)];
        this.icon = data.icon;
        this.color = data.color;
    }

    update() {
        this.y -= this.speed;
        if (this.y < -30) {
            this.y = this.pCanvas.height + 20;
            this.x = Math.random() * this.pCanvas.width;
            const data = iconData[Math.floor(Math.random() * iconData.length)];
            this.icon = data.icon;
            this.color = data.color;
        }
    }

    draw() {
        this.pCtx.font = `${this.size}px serif`;
        this.pCtx.fillStyle = this.color;
        this.pCtx.fillText(this.icon, this.x, this.y);
    }
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // =========================
        // MATRIX MUSIC NOTES
        // =========================
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const notes = ['♪', '♫', '♩', '♬', '𝅘𝅥', '𝅘𝅥𝅮', '𝄞'];
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(0);

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00FFFF'; // سماوي نيون
            ctx.font = '22px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = notes[Math.floor(Math.random() * notes.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 0.2; // سرعة أبطأ بكثير
            }

            requestAnimationFrame(drawMatrix);
        };

        drawMatrix();

        // =========================
        // PARTICLES / FRAGRANCE ICONS
        // =========================
        const pCanvas = particlesRef.current!;
        const pCtx = pCanvas.getContext('2d')!;
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;

        const fragranceIcons: FragranceParticle[] = [];
        const iconCount = 40;





        for (let i = 0; i < iconCount; i++) {
            fragranceIcons.push(new FragranceParticle(pCanvas, pCtx));
        }

        const animateParticles = () => {
            pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
            fragranceIcons.forEach((p) => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        // =========================
        // Resize
        // =========================
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            pCanvas.width = window.innerWidth;
            pCanvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Matrix Notes */}
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>

            {/* Fragrance Particles */}
            <canvas ref={particlesRef} className="absolute top-0 left-0 w-full h-full"></canvas>

            {/* Vertical Scan Lines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="w-full h-full bg-[repeating-linear-gradient(to_bottom,_rgba(0,255,255,0.05)_0px,_rgba(0,255,255,0.05)_1px,_transparent_1px,_transparent_2px)]"></div>
            </div>

            {/* Center Text with Glitch & Flicker */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h1
                    className="text-6xl md:text-8xl font-bold mb-4"
                    style={{
                        color: '#BF00FF',
                        textShadow: '0 0 10px #BF00FF, 0 0 20px #BF00FF',
                        animation: 'glitch 1s infinite',
                    }}
                >
                    coding1010
                </h1>

                <p className="text-xl md:text-2xl text-gray-300">
                    The Art of Perfumery –{' '}
                    <span className="italic">Fragrance • Notes • Diffusion</span>
                </p>
            </div>

            {/* Glitch Animation Keyframes */}
            <style>
                {`
          @keyframes glitch {
            0% { text-shadow: 0 0 5px #BF00FF, 0 0 10px #BF00FF; }
            20% { text-shadow: -2px 0 5px #BF00FF, 2px 0 10px #BF00FF; }
            40% { text-shadow: 2px 0 5px #BF00FF, -2px 0 10px #BF00FF; }
            60% { text-shadow: -2px 0 5px #BF00FF, 2px 0 10px #BF00FF; }
            80% { text-shadow: 2px 0 5px #BF00FF, -2px 0 10px #BF00FF; }
            100% { text-shadow: 0 0 5px #BF00FF, 0 0 10px #BF00FF; }
          }
        `}
            </style>
        </div>
    );
}
