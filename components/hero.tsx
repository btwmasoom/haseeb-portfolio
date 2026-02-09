"use client";


import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FloatingPaper } from "@/components/floating-paper";
import { RoboAnimation } from "@/components/robo-animation";
import { useSettings } from "@/context/settings-context";
import Image from "next/image";

export default function Hero() {
  const { primaryColor, accentColor } = useSettings();

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center pt-32 md:pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={10} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-10"
          >
            {/* Outer Neon Ring */}
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                border: `2px solid ${primaryColor}`,
                boxShadow: `0 0 20px ${primaryColor}, inset 0 0 20px ${primaryColor}`
              }}
            />
            {/* Inner Ring */}
            <div
              className="absolute inset-2 rounded-full border border-white/20"
            />

            {/* Image Container */}
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/10 group">
              <Image
                src="/profile-placeholder.png"
                alt="Haseeb Asif"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating particles/icons can be added here if desired */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Hey, I&apos;m
              <motion.span
                className="text-transparent bg-clip-text inline-block ml-2"
                style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
                animate={{
                  filter: [`drop-shadow(0 0 0px ${primaryColor}00)`, `drop-shadow(0 0 15px ${primaryColor}80)`, `drop-shadow(0 0 0px ${primaryColor}00)`],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Haseeb Asif.
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            <span className="whitespace-pre-wrap text-2xl">
              Full-stack developer dedicated to crafting seamless digital
              experiences with high performance that engage and inspire.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >


            <a
              href="https://www.linkedin.com/in/haseeb-asif-5b0a18370/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border text-white rounded-md text-sm font-medium transition-all duration-300"
              style={{
                borderColor: `${primaryColor}80`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                e.currentTarget.style.borderColor = primaryColor;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = `${primaryColor}80`;
              }}
            >
              <Sparkles className="mr-2 h-5 w-5" style={{ color: primaryColor }} />
              Connect
            </a>
          </motion.div>

          {/* Responsive RoboAnimation - Changes to block on mobile, absolute on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative md:absolute md:-bottom-20 md:-right-20 w-48 h-48 md:w-96 md:h-96 mx-auto md:mx-0 pointer-events-none"
          >
            <RoboAnimation />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
