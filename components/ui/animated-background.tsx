"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "@/context/settings-context";
import GridBackground from "./grid-background";
import WavesBackground from "./waves-background";
import MatrixBackground from "./matrix-background";
import StarfieldBackground from "./starfield-background";
import BokehBackground from "./bokeh-background";
import CircuitBackground from "./circuit-background";
import GradientFlowBackground from "./gradient-flow-background";
import ShapesBackground from "./shapes-background";

function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const { primaryColor } = useSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Particle Configuration
        // Optimized for performance: Reduced count and distance
        const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);
        const connectionDistance = 120;
        const mouseDistance = 200;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update(mouse: { x: number; y: number }) {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.6; // Push strength
                    const directionY = forceDirectionY * force * 0.6;

                    this.vx -= directionX;
                    this.vy -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = theme === "dark" || !theme ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
                ctx.fill();
            }
        }

        const mouse = { x: -1000, y: -1000 };

        function init() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            particles.forEach((particle) => {
                particle.update(mouse);
                particle.draw();
            });

            // Draw connections
            particles.forEach((a, index) => {
                for (let i = index + 1; i < particles.length; i++) {
                    const b = particles[i];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        // Use primary color for connections
                        ctx.strokeStyle = `${primaryColor}${Math.floor((1 - distance / connectionDistance) * 255).toString(16).padStart(2, '0')}`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme, primaryColor]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50"
        />
    );
}

export default function AnimatedBackground() {
    const { backgroundType, wallpaper } = useSettings();

    switch (backgroundType) {
        case "grid":
            return <GridBackground />;
        case "waves":
            return <WavesBackground />;
        case "matrix":
            return <MatrixBackground />;
        case "starfield":
            return <StarfieldBackground />;
        case "bokeh":
            return <BokehBackground />;
        case "circuit":
            return <CircuitBackground />;
        case "gradient-flow":
            return <GradientFlowBackground />;
        case "shapes":
            return <ShapesBackground />;
        case "wallpaper":
            // Check if wallpaper is an image path or a Tailwind class
            const isImagePath = wallpaper.startsWith('/');
            return (
                <div
                    className={`fixed inset-0 -z-10 ${!isImagePath ? wallpaper : ''}`}
                    style={isImagePath ? {
                        backgroundImage: `url(${wallpaper})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    } : {}}
                >
                    {/* Subtle overlay for better text readability */}
                    {isImagePath && <div className="absolute inset-0 bg-black/30" />}
                </div>
            );
        case "static":
            return <div className="fixed inset-0 -z-10 bg-black" />; // Static dark background
        case "particles":
        default:
            return <ParticleBackground />;
    }
}
