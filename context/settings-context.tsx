"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type BackgroundType = "particles" | "grid" | "waves" | "wallpaper" | "static" | "matrix" | "starfield" | "bokeh" | "circuit" | "gradient-flow" | "shapes";
export type ChatBubbleStyle = "rounded" | "sharp" | "glass" | "neon";

interface SettingsContextType {
    glassOpacity: number;
    setGlassOpacity: (value: number) => void;
    glassBlur: number;
    setGlassBlur: (value: number) => void;
    primaryColor: string;
    setPrimaryColor: (value: string) => void;
    accentColor: string;
    setAccentColor: (value: string) => void;
    glassColor: string;
    setGlassColor: (value: string) => void;
    backgroundType: BackgroundType;
    setBackgroundType: (type: BackgroundType) => void;
    wallpaper: string;
    setWallpaper: (value: string) => void;
    resetSettings: () => void;

    // UI State for Panel
    isSettingsOpen: boolean;
    setIsSettingsOpen: (val: boolean) => void;

    // Chatbot Settings
    chatBubbleStyle: ChatBubbleStyle;
    setChatBubbleStyle: (style: ChatBubbleStyle) => void;
    chatUserColor: string;
    setChatUserColor: (color: string) => void;
    chatBotColor: string;
    setChatBotColor: (color: string) => void;
    chatHeaderColor: string;
    setChatHeaderColor: (color: string) => void;
}

const defaultSettings = {
    glassOpacity: 0.05,
    glassBlur: 5,
    primaryColor: "#8b5cf6", // violet-500
    accentColor: "#06b6d4", // cyan-500
    glassColor: "#ffffff", // white
    backgroundType: "particles" as BackgroundType,
    wallpaper: "bg-black",
    chatBubbleStyle: "rounded" as "rounded" | "sharp" | "glass" | "neon",
    chatUserColor: "#8b5cf6", // Default to primary
    chatBotColor: "#1f2937", // Default to gray-800
    chatHeaderColor: "#8b5cf6", // Default to primary
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [glassOpacity, setGlassOpacity] = useState(defaultSettings.glassOpacity);
    const [glassBlur, setGlassBlur] = useState(defaultSettings.glassBlur);
    const [primaryColor, setPrimaryColor] = useState(defaultSettings.primaryColor);
    const [accentColor, setAccentColor] = useState(defaultSettings.accentColor);
    const [glassColor, setGlassColor] = useState(defaultSettings.glassColor);
    const [backgroundType, setBackgroundType] = useState<BackgroundType>(
        defaultSettings.backgroundType
    );
    const [wallpaper, setWallpaper] = useState(defaultSettings.wallpaper);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [chatBubbleStyle, setChatBubbleStyle] = useState<ChatBubbleStyle>(defaultSettings.chatBubbleStyle);
    const [chatUserColor, setChatUserColor] = useState(defaultSettings.chatUserColor);
    const [chatBotColor, setChatBotColor] = useState(defaultSettings.chatBotColor);
    const [chatHeaderColor, setChatHeaderColor] = useState(defaultSettings.chatHeaderColor);

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem("portfolio-settings");
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                if (parsed.glassOpacity !== undefined) setGlassOpacity(parsed.glassOpacity);
                if (parsed.glassBlur !== undefined) setGlassBlur(parsed.glassBlur);
                if (parsed.primaryColor) setPrimaryColor(parsed.primaryColor);
                if (parsed.accentColor) setAccentColor(parsed.accentColor);
                if (parsed.glassColor) setGlassColor(parsed.glassColor);
                if (parsed.backgroundType) setBackgroundType(parsed.backgroundType);
                if (parsed.wallpaper) setWallpaper(parsed.wallpaper);
                if (parsed.chatBubbleStyle) setChatBubbleStyle(parsed.chatBubbleStyle);
                if (parsed.chatUserColor) setChatUserColor(parsed.chatUserColor);
                if (parsed.chatBotColor) setChatBotColor(parsed.chatBotColor);
                if (parsed.chatHeaderColor) setChatHeaderColor(parsed.chatHeaderColor);
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
    }, []);

    // Save settings to localStorage whenever they change
    useEffect(() => {
        const settingsToSave = {
            glassOpacity,
            glassBlur,
            primaryColor,
            accentColor,
            glassColor,
            backgroundType,
            wallpaper,
            chatBubbleStyle,
            chatUserColor,
            chatBotColor,
            chatHeaderColor,
        };
        localStorage.setItem("portfolio-settings", JSON.stringify(settingsToSave));
    }, [glassOpacity, glassBlur, primaryColor, accentColor, glassColor, backgroundType, wallpaper, chatBubbleStyle, chatUserColor, chatBotColor, chatHeaderColor]);

    // Apply CSS variables to root
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--glass-opacity", glassOpacity.toString());
        root.style.setProperty("--glass-blur", `${glassBlur}px`);
        root.style.setProperty("--primary-color", primaryColor);
        root.style.setProperty("--accent-color", accentColor);

        // Convert hex to rgb for rgba usage
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "255, 255, 255";
        }

        root.style.setProperty("--glass-rgb", hexToRgb(glassColor));

    }, [glassOpacity, glassBlur, primaryColor, accentColor, glassColor]);

    const resetSettings = () => {
        setGlassOpacity(defaultSettings.glassOpacity);
        setGlassBlur(defaultSettings.glassBlur);
        setPrimaryColor(defaultSettings.primaryColor);
        setAccentColor(defaultSettings.accentColor);
        setGlassColor(defaultSettings.glassColor);
        setBackgroundType(defaultSettings.backgroundType);
        setWallpaper(defaultSettings.wallpaper);
        setChatBubbleStyle(defaultSettings.chatBubbleStyle);
        setChatUserColor(defaultSettings.chatUserColor);
        setChatBotColor(defaultSettings.chatBotColor);
        setChatHeaderColor(defaultSettings.chatHeaderColor);
    };

    return (
        <SettingsContext.Provider
            value={{
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
                wallpaper,
                setWallpaper,
                resetSettings,
                isSettingsOpen,
                setIsSettingsOpen,
                chatBubbleStyle,
                setChatBubbleStyle,
                chatUserColor,
                setChatUserColor,
                chatBotColor,
                setChatBotColor,
                chatHeaderColor,
                setChatHeaderColor,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
