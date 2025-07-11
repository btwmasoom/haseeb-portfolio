"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, AtomIcon, Database, Triangle } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

export function FloatingPaper({ count = 10 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 900 });
  const mounted = useMounted();


  useEffect(() => {
    
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
if(!mounted) return null

  return (
    <div className="relative w-full h-full">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              
              
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
            {i % 4 === 1 ? (
              <AtomIcon className="w-8 h-8 text-green-500/60" />
            ) : i % 4 === 2 ? (
              <Database className="w-8 h-8 text-green-500/60" />
            ) : i % 4 === 3 ? (
              <FileText className="w-8 h-8 text-green-500/60" />
            ) : (
              <Triangle className="w-8 h-8 text-green-500/60" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
