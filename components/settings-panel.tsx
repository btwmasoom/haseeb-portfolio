"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectPortal,
} from "@/components/ui/select";

export default function SettingsPanel() {
    const {
        glassOpacity,
        setGlassOpacity,
        glassBlur,
        setGlassBlur,
        primaryColor,
        setPrimaryColor,
        accentColor,
        setAccentColor,
        glassColor,
        setGlassColor,
        backgroundType,
        setBackgroundType,
        setWallpaper,
        resetSettings,
        isSettingsOpen,
        setIsSettingsOpen,
    } = useSettings();

    return (
        <AnimatePresence>
            {isSettingsOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSettingsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-sm"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 z-[10000] p-6 shadow-2xl overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-white uppercase tracking-wider">Customization</h2>
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Background Selector */}
                            <div className="space-y-3">
                                <Label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Background Effect</Label>
                                <Select
                                    value={backgroundType}
                                    onValueChange={(val: any) => setBackgroundType(val)}
                                >
                                    <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                                        <SelectValue placeholder="Select background" />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectContent className="bg-black/90 border-white/10 text-white z-[100000]">
                                            <SelectItem value="particles">Particles</SelectItem>
                                            <SelectItem value="grid">Cyber Grid</SelectItem>
                                            <SelectItem value="waves">Neon Waves</SelectItem>
                                            <SelectItem value="matrix">Matrix Rain</SelectItem>
                                            <SelectItem value="starfield">Deep Space</SelectItem>
                                            <SelectItem value="bokeh">Bokeh Lights</SelectItem>
                                            <SelectItem value="circuit">Circuit Board</SelectItem>
                                            <SelectItem value="gradient-flow">Gradient Flow</SelectItem>
                                            <SelectItem value="shapes">Geometric Shapes</SelectItem>
                                            <SelectItem value="wallpaper">Wallpaper</SelectItem>
                                            <SelectItem value="static">Static</SelectItem>
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                            </div>

                            {/* Wallpaper Selector */}
                            {backgroundType === "wallpaper" && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
                                    <Label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Select Wallpaper</Label>
                                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
                                        {[
                                            { name: "wp1.jpeg", path: "/wallpapers/wp1.jpeg" },
                                            { name: "wp2.jpeg", path: "/wallpapers/wp2.jpeg" },
                                            { name: "wp3.jpeg", path: "/wallpapers/wp3.jpeg" },
                                            { name: "wp4.jpeg", path: "/wallpapers/wp4.jpeg" },
                                            { name: "wp5.jpeg", path: "/wallpapers/wp5.jpeg" },
                                            { name: "wp6.jpeg", path: "/wallpapers/wp6.jpeg" },
                                            { name: "wp7.jpeg", path: "/wallpapers/wp7.jpeg" },
                                            { name: "wp8.jpeg", path: "/wallpapers/wp8.jpeg" },
                                            { name: "wp9.jpeg", path: "/wallpapers/wp9.jpeg" },
                                            { name: "wp10", path: "/wallpapers/wp10" },
                                            { name: "wp11.jpeg", path: "/wallpapers/wp11.jpeg" },
                                        ].map((wp, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setWallpaper(wp.path);
                                                }}
                                                className="relative h-16 rounded-lg border-2 transition-all overflow-hidden group border-white/10 hover:border-white/50 hover:scale-105"
                                                style={{
                                                    backgroundImage: `url(${wp.path})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {/* Overlay effect */}
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                                                {/* Wallpaper number label */}
                                                <div className="absolute bottom-0.5 right-0.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] text-white/80">
                                                    {i + 1}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Glass Effect Controls */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <Label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Glassmorphism</Label>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm text-gray-300 flex justify-between">Tint</Label>
                                        <input
                                            type="color"
                                            value={glassColor}
                                            onChange={(e) => setGlassColor(e.target.value)}
                                            className="w-full h-8 bg-transparent rounded cursor-pointer border border-white/10"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm text-gray-300 flex justify-between">
                                            Opacity <span>{Math.round(glassOpacity * 100)}%</span>
                                        </Label>
                                        <Slider
                                            value={[glassOpacity]}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onValueChange={([val]) => setGlassOpacity(val)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm text-gray-300 flex justify-between">
                                            Blur <span>{glassBlur}px</span>
                                        </Label>
                                        <Slider
                                            value={[glassBlur]}
                                            min={0}
                                            max={40}
                                            step={1}
                                            onValueChange={([val]) => setGlassBlur(val)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Color Pickers */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                                <Label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Theme Colors</Label>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm text-gray-300">Primary</Label>
                                        <input
                                            type="color"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="w-full h-10 bg-transparent rounded-lg cursor-pointer border border-white/10"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm text-gray-300">Accent</Label>
                                        <input
                                            type="color"
                                            value={accentColor}
                                            onChange={(e) => setAccentColor(e.target.value)}
                                            className="w-full h-10 bg-transparent rounded-lg cursor-pointer border border-white/10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <Button
                                    variant="outline"
                                    onClick={resetSettings}
                                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 transition-all"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset to Default
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
