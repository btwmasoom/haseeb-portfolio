"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function CircuitBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { primaryColor } = useSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let animationFrameId: number;

        const nodes: { x: number; y: number }[] = [];
        const gridSize = 100;

        for (let x = 0; x < w; x += gridSize) {
            for (let y = 0; y < h; y += gridSize) {
                if (Math.random() > 0.5) {
                    nodes.push({ x: x + Math.random() * 20, y: y + Math.random() * 20 });
                }
            }
        }

        let pulse = 0;

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.2;

            nodes.forEach((node, i) => {
                // Connect to nearest neighbors
                nodes.slice(i + 1).forEach((other) => {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                });

                // Draw nodes
                ctx.fillStyle = primaryColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // Pulse effect locally
            pulse += 0.05;
            ctx.globalAlpha = 0.5 + Math.sin(pulse) * 0.2;

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
    }, [primaryColor]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black"
        />
    );
}
