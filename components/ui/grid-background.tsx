"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function GridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { primaryColor, accentColor } = useSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let offset = 0;

        const drawGrid = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            const gridSize = 50;
            const perspective = 300; // Lower is more extreme perspective

            ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
            ctx.fillRect(0, 0, w, h);

            // Horizontal lines (moving)
            for (let i = 0; i < h; i += gridSize) {
                const y = (i + offset) % (h / 2) + h / 2; // Keep in bottom half for retro feel
                // Simple perspective simulation
                const alpha = (y - h / 2) / (h / 2); // Fade out near horizon

                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.strokeStyle = `${primaryColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
                ctx.stroke();
            }

            // Vertical lines (perspective)
            const centerX = w / 2;
            for (let x = -w; x < w * 2; x += gridSize * 2) {
                ctx.beginPath();
                ctx.moveTo(centerX, h / 2); // Vanishing point
                ctx.lineTo(x, h);
                ctx.strokeStyle = `${accentColor}33`; // Low opacity
                ctx.stroke();
            }

            offset += 0.5;
            requestAnimationFrame(drawGrid);
        };

        const animId = requestAnimationFrame(drawGrid);

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, [primaryColor, accentColor]);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-10 bg-black" />;
}
