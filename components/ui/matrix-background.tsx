"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function MatrixBackground() {
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

        const cols = Math.floor(w / 20) + 1;
        const ypos = Array(cols).fill(0);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        function animate() {
            if (!ctx) return;

            // Fade out
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = primaryColor;
            ctx.font = "15pt monospace";

            ypos.forEach((y, ind) => {
                const text = String.fromCharCode(Math.random() * 128);
                const x = ind * 20;
                ctx.fillText(text, x, y);

                if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
                else ypos[ind] = y + 20;
            });

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
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
        />
    );
}
