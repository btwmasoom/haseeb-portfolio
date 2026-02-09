"use client";

import { useSettings } from "@/context/settings-context";

export default function GradientFlowBackground() {
    const { primaryColor, accentColor } = useSettings();

    // Dynamically create gradient style
    const gradientStyle = {
        background: `linear-gradient(-45deg, #000000, ${primaryColor}40, #000000, ${accentColor}40)`,
        backgroundSize: "400% 400%",
        animation: "gradientFlow 15s ease infinite",
    };

    return (
        <>
            <style jsx global>{`
                @keyframes gradientFlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
            <div
                className="fixed top-0 left-0 w-full h-full -z-10"
                style={gradientStyle}
            />
        </>
    );
}
