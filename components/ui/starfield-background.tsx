"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function StarfieldBackground() {
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

        const stars: { x: number; y: number; z: number }[] = [];
        const numStars = 800;
        const speed = 2; // Speed of stars

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * w - w / 2,
                y: Math.random() * h - h / 2,
                z: Math.random() * w,
            });
        }

        function animate() {
            if (!ctx) return;

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = "white"; // Star color

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];
                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * w - w / 2;
                    star.y = Math.random() * h - h / 2;
                    star.z = w;
                }

                const x = (star.x / star.z) * (w / 2) + w / 2;
                const y = (star.y / star.z) * (h / 2) + h / 2;
                const size = (1 - star.z / w) * 2;

                if (x >= 0 && x < w && y >= 0 && y < h) {
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

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
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}
