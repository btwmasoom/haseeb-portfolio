"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function WavesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { primaryColor, accentColor } = useSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let t = 0;

        const drawWaves = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trails
            ctx.fillRect(0, 0, w, h);

            const amplitude = 50;
            const frequency = 0.01;

            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, h / 2);

                for (let x = 0; x < w; x++) {
                    const y = h / 2 + Math.sin(x * frequency + t + i) * amplitude * (i + 1) * 0.5;
                    ctx.lineTo(x, y);
                }

                ctx.strokeStyle = i % 2 === 0 ? primaryColor : accentColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            t += 0.02;
            requestAnimationFrame(drawWaves);
        };

        const animId = requestAnimationFrame(drawWaves);

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
