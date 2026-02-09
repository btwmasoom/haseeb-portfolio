"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Settings, FileText, Terminal } from "lucide-react";
import { useSettings } from "@/context/settings-context";

const SETTINGS_NOTIFICATIONS = [
  "✨ Customize your experience!",
  "🎨 Try different themes & backgrounds!",
  "💎 Personalize the UI to your liking!",
  "🚀 Check out customization options!",
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showSettingsNotif, setShowSettingsNotif] = React.useState(false);
  const [settingsNotifText, setSettingsNotifText] = React.useState(SETTINGS_NOTIFICATIONS[0]);
  const { scrollY } = useScroll();
  const { isSettingsOpen, setIsSettingsOpen, primaryColor, accentColor } = useSettings();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Periodic settings notification
  React.useEffect(() => {
    const showNotif = () => {
      if (!isSettingsOpen) {
        const randomMessage = SETTINGS_NOTIFICATIONS[Math.floor(Math.random() * SETTINGS_NOTIFICATIONS.length)];
        setSettingsNotifText(randomMessage);
        setShowSettingsNotif(true);
        setTimeout(() => setShowSettingsNotif(false), 5000);
      }
    };

    const initialTimeout = setTimeout(showNotif, 100);
    const interval = setInterval(showNotif, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isSettingsOpen]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-4 flex justify-center pointer-events-none group/header">
      <div className="relative w-full max-w-6xl pointer-events-auto">
        {/* Background Aura Glow */}
        <div
          className="absolute -inset-4 blur-[40px] opacity-0 group-hover/header:opacity-20 transition-opacity duration-1000 rounded-full"
          style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
        />

        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative flex items-center justify-between px-6 md:px-10 py-5 rounded-full transition-all duration-500",
            "bg-black/60 backdrop-blur-2xl border",
            scrolled || isOpen
              ? "shadow-[0_15px_50px_-10px_rgba(0,0,0,0.8)]"
              : "shadow-2xl"
          )}
          style={{
            borderColor: `${primaryColor}33`,
            boxShadow: scrolled ? `0 10px 40px -10px ${primaryColor}20` : 'none'
          }}
        >
          {/* Scanning Light Effect - Clipped Container */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 w-[200%] h-full pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                background: `linear-gradient(90deg, transparent, ${primaryColor}05, ${primaryColor}10, ${primaryColor}05, transparent)`
              }}
            />
          </div>

          {/* Cyber Pips (Corner Ornaments) */}
          <div className="absolute top-2 left-10 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
          <div className="absolute top-2 right-10 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
          <div className="absolute bottom-2 left-10 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
          <div className="absolute bottom-2 right-10 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />

          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter transition-all z-50 text-white flex items-center gap-2 group/logo"
          >
            <div
              className="p-1.5 rounded-lg transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-3"
              style={{ background: `${primaryColor}15`, border: `1px solid ${primaryColor}30` }}
            >
              <Terminal className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div className="flex items-center gap-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              <span>Haseeb</span>
              <span className="transition-colors duration-300" style={{ color: primaryColor }}>.dev</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 relative z-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-white/60 hover:text-white transition-all duration-300 relative group/link py-1"
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover/link:w-full"
                  style={{
                    background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`,
                    boxShadow: `0 0 10px ${primaryColor}`
                  }}
                />
              </Link>
            ))}

            <div className="flex items-center gap-6 border-l border-white/5 pl-8">
              {/* Resume Button - Double Layered */}
              <a
                href="/files/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group/resume"
              >
                <div
                  className="absolute -inset-[1px] rounded-full blur-[2px] opacity-30 group-hover/resume:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
                />
                <div
                  className="relative flex items-center gap-2 px-7 py-3 rounded-full text-sm font-black text-white transition-all duration-300 bg-black/40 border border-white/10 group-hover/resume:bg-black/20 group-hover/resume:scale-[1.02]"
                >
                  <FileText className="w-4 h-4 transition-transform group-hover/resume:-translate-y-0.5" style={{ color: primaryColor }} />
                  RESUME
                </div>
              </a>

              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group/btn relative overflow-hidden"
                  title="Customization"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <Settings className="w-5 h-5 text-white group-hover/btn:rotate-180 transition-transform duration-1000 relative z-10" />
                </button>

                {/* Premium Settings Notification Toast */}
                <AnimatePresence>
                  {showSettingsNotif && !isSettingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, x: 30, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, x: 30, scale: 0.8 }}
                      className="absolute top-24 right-0 px-6 py-4 rounded-[2rem] whitespace-nowrap cursor-pointer group/toast overflow-hidden min-w-[240px] border-2 z-[200]"
                      style={{
                        background: 'rgba(10, 10, 18, 0.95)',
                        backdropFilter: 'blur(30px)',
                        borderColor: `${primaryColor}44`,
                        boxShadow: `0 20px 50px -10px ${primaryColor}66`,
                      }}
                      onClick={() => {
                        setIsSettingsOpen(true);
                        setShowSettingsNotif(false);
                      }}
                    >
                      <div
                        className="absolute -inset-2 blur-[20px] opacity-0 group-hover/toast:opacity-30 transition duration-700"
                        style={{ background: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
                      />

                      <div className="flex items-center gap-4 relative z-10">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-2xl ring-2 shadow-2xl transition-transform group-hover/toast:scale-110"
                          style={{
                            backgroundColor: `${primaryColor}22`,
                            color: primaryColor,
                            borderColor: `${primaryColor}44`,
                            boxShadow: `0 0 20px ${primaryColor}33`
                          }}
                        >
                          <Settings className="w-5 h-5 animate-[spin_6s_linear_infinite]" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: primaryColor }}>System Config</p>
                          <p className="text-sm font-bold text-white tracking-wide">
                            {settingsNotifText} <span className="inline-block animate-bounce ml-1 text-lg">💎</span>
                          </p>
                        </div>
                      </div>

                      {/* Animated border progress at bottom */}
                      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5">
                        <motion.div
                          className="h-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          style={{ background: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button + Settings */}
          <div className="flex items-center gap-4 md:hidden relative z-50">
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-3 text-white bg-white/5 rounded-full ring-1 ring-white/10 hover:bg-white/10 active:scale-90 transition-all"
              >
                <Settings className="h-5 w-5" />
              </button>

              {/* Mobile Settings Notification */}
              <AnimatePresence>
                {showSettingsNotif && !isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.9 }}
                    className="absolute top-20 right-0 px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] whitespace-nowrap cursor-pointer z-[100] min-w-[200px] border"
                    style={{
                      background: 'rgba(5, 5, 10, 0.98)',
                      backdropFilter: 'blur(20px)',
                      borderColor: `${primaryColor}66`,
                      boxShadow: `0 0 20px ${primaryColor}22`
                    }}
                    onClick={() => {
                      setIsSettingsOpen(true);
                      setShowSettingsNotif(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ backgroundColor: primaryColor }} />
                      <p className="text-xs font-bold text-white tracking-tight">
                        {settingsNotifText} 😉
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              className="relative p-3 rounded-full transition-all active:scale-95 ring-1 ring-white/10 group/menu overflow-hidden"
              onClick={() => setIsOpen(!isOpen)}
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br transition-opacity opacity-0 group-hover/menu:opacity-100"
                style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}44, transparent)` }}
              />
              <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5 z-10">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 rounded-full transition-colors"
                  style={{ backgroundColor: isOpen ? primaryColor : 'white' }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="w-full h-0.5 rounded-full bg-white transition-opacity"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 rounded-full transition-colors"
                  style={{ backgroundColor: isOpen ? primaryColor : 'white' }}
                />
              </div>
              <div
                className="absolute inset-0 blur-lg opacity-20"
                style={{ backgroundColor: primaryColor }}
              />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                className="absolute top-[calc(100%+1.5rem)] right-1 left-1 bg-black/95 backdrop-blur-3xl border-2 rounded-[3rem] p-10 flex flex-col gap-6 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden"
                style={{ borderColor: `${primaryColor}22` }}
              >
                {/* Decorative gradients in mobile menu */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-30 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${primaryColor}, transparent)` }}
                />
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 blur-[80px] opacity-30 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
                />

                {links.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-2xl font-black text-white/70 hover:text-white transition-all text-center block py-5 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/5"
                      onClick={() => setIsOpen(false)}
                      style={{ color: scrolled ? 'white' : 'inherit' }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <hr className="border-white/10 mx-10" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href="/files/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-4 text-2xl font-black p-6 rounded-[2rem] transition-all shadow-2xl active:scale-95"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      border: `2px solid ${primaryColor}40`,
                      boxShadow: `0 10px 30px ${primaryColor}15`
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="w-7 h-7" />
                    DOWNLOAD RESUME
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
}
