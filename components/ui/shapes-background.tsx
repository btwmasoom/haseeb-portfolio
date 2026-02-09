"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/context/settings-context";

export default function ShapesBackground() {
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

        const shapes: {
            x: number;
            y: number;
            size: number;
            rotation: number;
            speedRotation: number;
            type: "square" | "triangle" | "circle";
            color: string;
            vx: number;
            vy: number;
        }[] = [];

        const numShapes = 20;

        for (let i = 0; i < numShapes; i++) {
            shapes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 50 + 20,
                rotation: Math.random() * Math.PI * 2,
                speedRotation: (Math.random() - 0.5) * 0.02,
                type: Math.random() > 0.6 ? "square" : Math.random() > 0.3 ? "triangle" : "circle",
                color: Math.random() > 0.5 ? primaryColor : accentColor,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            });
        }

        function drawShape(ctx: CanvasRenderingContext2D, shape: typeof shapes[0]) {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.fillStyle = "transparent";
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.3;

            ctx.beginPath();
            if (shape.type === "square") {
                ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            } else if (shape.type === "triangle") {
                ctx.moveTo(0, -shape.size / 2);
                ctx.lineTo(shape.size / 2, shape.size / 2);
                ctx.lineTo(-shape.size / 2, shape.size / 2);
                ctx.closePath();
            } else {
                ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            }
            ctx.stroke();
            ctx.restore();
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);

            shapes.forEach((shape) => {
                shape.x += shape.vx;
                shape.y += shape.vy;
                shape.rotation += shape.speedRotation;

                if (shape.x < -100) shape.x = w + 100;
                if (shape.x > w + 100) shape.x = -100;
                if (shape.y < -100) shape.y = h + 100;
                if (shape.y > h + 100) shape.y = -100;

                drawShape(ctx, shape);
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
    }, [primaryColor, accentColor]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black"
        />
    );
}
