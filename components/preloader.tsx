"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Terminal, Cpu, Database, Shield, Zap } from "lucide-react";
import { useSettings } from "@/context/settings-context";

const LOADING_STEPS = [
    { icon: Terminal, text: "Initializing core modules..." },
    { icon: Cpu, text: "Allocating neural resources..." },
    { icon: Database, text: "Connecting to data streams..." },
    { icon: Shield, text: "Securing identity protocols..." },
    { icon: Zap, text: "Synchronizing workspace..." },
];

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const { primaryColor } = useSettings();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000); // 4 seconds loading for maximum "wow" effect

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 1;
            });
        }, 30);

        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
        }, 700);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[999999] bg-[#050508] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Futuristic Hex Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, ${primaryColor}44 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    {/* Animated Scanning Beam */}
                    <motion.div
                        animate={{
                            top: ["-10%", "110%"],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-40 blur-3xl pointer-events-none z-10"
                        style={{
                            background: `linear-gradient(to bottom, transparent, ${primaryColor}20, transparent)`
                        }}
                    />

                    <div className="relative z-20 flex flex-col items-center">
                        {/* Logo/Icon Container */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative mb-12"
                        >
                            <div
                                className="w-24 h-24 rounded-2xl flex items-center justify-center rotate-12 transition-all duration-1000"
                                style={{
                                    background: `${primaryColor}10`,
                                    border: `2px solid ${primaryColor}30`,
                                    boxShadow: `0 0 50px ${primaryColor}30`
                                }}
                            >
                                <Terminal className="w-12 h-12" style={{ color: primaryColor }} />
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-[-10px] rounded-full border border-dashed"
                                style={{ borderColor: `${primaryColor}44` }}
                            />
                        </motion.div>

                        {/* Progress Bar Container */}
                        <div className="w-64 md:w-80 space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-2 overflow-hidden h-6">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentStep}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            {(() => {
                                                const StepIcon = LOADING_STEPS[currentStep].icon;
                                                return <StepIcon className="w-4 h-4" style={{ color: primaryColor }} />;
                                            })()}
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                                                {LOADING_STEPS[currentStep].text}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <span className="text-[10px] font-black" style={{ color: primaryColor }}>{progress}%</span>
                            </div>

                            {/* The Actual Bar */}
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full rounded-full"
                                    style={{
                                        background: `linear-gradient(90deg, ${primaryColor}44, ${primaryColor})`,
                                        boxShadow: `0 0 15px ${primaryColor}`
                                    }}
                                />
                            </div>

                            {/* Status Indicators */}
                            <div className="flex justify-center gap-4 mt-6">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            opacity: progress > (i + 1) * 20 ? 1 : 0.2,
                                            scale: progress > (i + 1) * 20 ? [1, 1.2, 1] : 1
                                        }}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: primaryColor }}
                                    />
                                ))}
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5] }}
                            transition={{ delay: 0.5, duration: 2 }}
                            className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/30"
                        >
                            Establishing Secure Connection
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
