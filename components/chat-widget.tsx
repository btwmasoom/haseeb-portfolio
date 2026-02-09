"use client";

import { useChat, Message } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles, Settings, ArrowLeft } from "lucide-react";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const NOTIFICATION_MESSAGES = [
    "💬 Chat with us to know our services!",
    "✨ Have questions? We're here to help!",
    "🚀 Contact us now for expert solutions!",
    "💡 Let's discuss your next project!",
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState(NOTIFICATION_MESSAGES[0]);

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        onError: (error) => {
            console.error("Chat Error:", error);
            toast.error(error.message || "Failed to send message");
        }
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {
        glassBlur,
        primaryColor,
        chatBubbleStyle,
        setChatBubbleStyle,
        chatUserColor,
        setChatUserColor,
        chatBotColor,
        setChatBotColor,
        chatHeaderColor,
        setChatHeaderColor,
        isSettingsOpen
    } = useSettings();

    // Auto-scroll to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Periodic notification toast
    useEffect(() => {
        const showNotif = () => {
            if (!isOpen) {
                const randomMessage = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
                setNotificationText(randomMessage);
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 5000);
            }
        };

        // Show first notification after 1 second
        const initialTimeout = setTimeout(showNotif, 1000);

        // Then show every 20 seconds
        const interval = setInterval(showNotif, 20000);

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, [isOpen]);

    return (
        <>
            {/* Floating Chat Button */}
            <div className={`fixed bottom-24 right-6 pointer-events-auto transition-all duration-300 ${isSettingsOpen ? 'z-[9998]' : 'z-[99999]'}`}>
                <motion.button
                    className="relative p-4 rounded-full shadow-2xl transition-all duration-300 group overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}40)`,
                        backdropFilter: 'blur(20px)',
                        border: `2px solid ${primaryColor}60`,
                        boxShadow: `0 0 30px ${primaryColor}40, inset 0 0 20px ${primaryColor}20`
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setShowNotification(false);
                    }}
                >
                    {/* Animated gradient background */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(circle at center, ${primaryColor}60, transparent)`,
                        }}
                    />

                    <MessageCircle className="w-6 h-6 text-white relative z-10" />

                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ borderColor: primaryColor, borderWidth: '2px' }}></span>

                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: primaryColor }}></span>
                        <span className="relative inline-flex rounded-full h-4 w-4" style={{ backgroundColor: primaryColor }}></span>
                    </span>
                </motion.button>

                {/* Notification Toast */}
                <AnimatePresence>
                    {showNotification && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            className="absolute bottom-0 right-20 px-4 py-3 rounded-xl shadow-2xl whitespace-nowrap cursor-pointer"
                            style={{
                                background: `linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.85))`,
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${primaryColor}40`,
                                boxShadow: `0 0 20px ${primaryColor}30`
                            }}
                            onClick={() => {
                                setIsOpen(true);
                                setShowNotification(false);
                            }}
                        >
                            <p className="text-sm font-medium text-white">{notificationText}</p>
                            <div
                                className="absolute bottom-0 left-0 h-1 rounded-full animate-pulse"
                                style={{
                                    width: '100%',
                                    background: `linear-gradient(90deg, ${primaryColor}, transparent)`,
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed bottom-40 right-6 w-80 md:w-96 h-[500px] rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${isSettingsOpen ? 'z-[9998]' : 'z-[99999]'}`}
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.85))',
                            backdropFilter: `blur(${glassBlur * 2}px)`,
                            WebkitBackdropFilter: `blur(${glassBlur * 2}px)`,
                            border: `1px solid ${primaryColor}30`,
                            boxShadow: `0 0 40px ${primaryColor}20, inset 0 0 40px rgba(0,0,0,0.5)`
                        }}
                    >
                        {/* Header */}
                        <div
                            className="p-4 flex justify-between items-center border-b relative overflow-hidden"
                            style={{
                                borderColor: `${primaryColor}20`,
                                background: `linear-gradient(135deg, ${chatHeaderColor}30, ${chatHeaderColor}10)`
                            }}
                        >
                            {/* Animated background effect */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    background: `radial-gradient(circle at 0% 0%, ${primaryColor}40, transparent 70%)`
                                }}
                            />

                            <div className="flex items-center gap-2 relative z-10">
                                {showSettings ? (
                                    <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                                        <ArrowLeft className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                                )}
                                <h3 className="font-bold text-white text-lg">{showSettings ? "Chat Settings" : "AI Assistant"}</h3>
                            </div>
                            <div className="flex items-center gap-1 relative z-10">
                                {!showSettings && (
                                    <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                                        <Settings className="w-4 h-4" />
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Area / Settings Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {showSettings ? (
                                <div className="space-y-6 text-white pb-6">
                                    {/* Bubble Style */}
                                    <section className="space-y-3">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bubble Style</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["rounded", "sharp", "glass", "neon"].map((style) => (
                                                <button
                                                    key={style}
                                                    onClick={() => setChatBubbleStyle(style as any)}
                                                    className={`px-3 py-2 text-xs rounded-lg border transition-all ${chatBubbleStyle === style
                                                        ? "border-2 text-white"
                                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                                        }`}
                                                    style={chatBubbleStyle === style ? {
                                                        backgroundColor: `${primaryColor}20`,
                                                        borderColor: primaryColor,
                                                        boxShadow: `0 0 10px ${primaryColor}40`
                                                    } : {}}
                                                >
                                                    {style.charAt(0).toUpperCase() + style.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Colors */}
                                    <section className="space-y-3">
                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Colors</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">User Bubble</span>
                                                <input
                                                    type="color"
                                                    value={chatUserColor}
                                                    onChange={(e) => setChatUserColor(e.target.value)}
                                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Bot Bubble</span>
                                                <input
                                                    type="color"
                                                    value={chatBotColor}
                                                    onChange={(e) => setChatBotColor(e.target.value)}
                                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Header</span>
                                                <input
                                                    type="color"
                                                    value={chatHeaderColor}
                                                    onChange={(e) => setChatHeaderColor(e.target.value)}
                                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <div className="p-4 rounded-xl border" style={{
                                        background: `${primaryColor}10`,
                                        borderColor: `${primaryColor}30`
                                    }}>
                                        <p className="text-[10px] text-white/70 leading-relaxed italic">
                                            "Design is not just what it looks like and feels like. Design is how it works."
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.length === 0 && (
                                        <div className="text-center text-gray-400 mt-10">
                                            <p className="mb-2 text-lg">👋 Hi! I&apos;m Haseeb&apos;s AI Assistant.</p>
                                            <p className="text-sm">Ask me about his skills, projects, or how to contact him!</p>
                                        </div>
                                    )}

                                    {messages.map((m: Message) => {
                                        const isUser = m.role === "user";
                                        const isNeon = chatBubbleStyle === 'neon';
                                        const isGlass = chatBubbleStyle === 'glass';

                                        const bubbleBaseClass = ({
                                            rounded: "rounded-2xl",
                                            sharp: "rounded-none",
                                            glass: "rounded-2xl backdrop-blur-md border border-white/20",
                                            neon: "rounded-2xl border-2"
                                        } as const)[chatBubbleStyle as "rounded" | "sharp" | "glass" | "neon"];

                                        const color = isUser ? chatUserColor : chatBotColor;

                                        const bubbleStyle = {
                                            backgroundColor: isNeon ? 'rgba(0,0,0,0.4)' : isGlass ? `${color}30` : color,
                                            borderColor: isNeon ? color : isGlass ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            boxShadow: isNeon ? `0 0 15px ${color}60` : 'none',
                                            color: isNeon || isGlass ? '#fff' : undefined
                                        };

                                        return (
                                            <div
                                                key={m.id}
                                                className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? "bg-white/10" : "bg-primary/20"}`}>
                                                    {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-primary" />}
                                                </div>
                                                <div
                                                    className={`${bubbleBaseClass} px-4 py-2 text-sm max-w-[80%] transition-all duration-300 font-medium`}
                                                    style={bubbleStyle}
                                                >
                                                    {m.content}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {isLoading && (
                                        <div className="flex items-center gap-2 text-gray-400 text-sm ml-10">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 border-t" style={{
                            borderColor: `${primaryColor}20`,
                            background: 'rgba(0,0,0,0.4)'
                        }}>
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask anything..."
                                    className="bg-white/5 border-white/10 text-white focus-visible:ring-1 h-11 rounded-xl"
                                    style={{
                                        borderColor: `${primaryColor}20`
                                    }}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading}
                                    className="h-11 w-11 shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl"
                                    style={{
                                        backgroundColor: primaryColor,
                                        boxShadow: `0 0 20px ${primaryColor}60`,
                                        color: '#fff'
                                    }}
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold opacity-50">AI Assistant</span>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
