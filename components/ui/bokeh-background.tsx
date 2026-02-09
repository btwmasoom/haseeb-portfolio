"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function BokehBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { primaryColor, accentColor } = useSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let animationFrameId: number;

        const particles: { x: number; y: number; size: number; color: string; speedX: number; speedY: number }[] = [];
        const numParticles = 50;

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 50 + 20,
                color: Math.random() > 0.5 ? primaryColor : accentColor,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
            });
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = "screen"; // Blend mode for bokeh

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < -p.size) p.x = w + p.size;
                if (p.x > w + p.size) p.x = -p.size;
                if (p.y < -p.size) p.y = h + p.size;
                if (p.y > h + p.size) p.y = -p.size;

                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.3; // Transparency
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = "source-over"; // Reset blend mode

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [primaryColor, accentColor]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black"
        />
    );
}
