"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useSettings } from "@/context/settings-context";

const categories = ["All", "Frontend", "Backend", "AI & Automation", "Tools"] as const;
type Category = (typeof categories)[number];

const skills = [
    // Frontend
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB", category: "Frontend" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#FFFFFF", category: "Frontend" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6", category: "Frontend" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E", category: "Frontend" },
    { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4", category: "Frontend" },
    { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", color: "#7952B3", category: "Frontend" },
    { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", color: "#764ABC", category: "Frontend" },
    { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", color: "#FFFFFF", category: "Frontend" },
    { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg", color: "#FF0055", category: "Frontend" },

    // Backend & DB
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933", category: "Backend" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB", category: "Backend" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248", category: "Backend" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#4169E1", category: "Backend" },
    { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", color: "#3ECF8E", category: "Backend" },
    { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", color: "#E10098", category: "Backend" },

    // AI & Automation
    { name: "n8n", logo: "https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png", color: "#FF6D5A", category: "AI & Automation" },
    { name: "Zapier", logo: "https://cdn.worldvectorlogo.com/logos/zapier.svg", color: "#FF4A00", category: "AI & Automation" },
    { name: "Vapi", logo: "/vapi-logo.svg", color: "#8B5CF6", category: "AI & Automation" },
    { name: "Twilio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twilio/twilio-original.svg", color: "#F22F46", category: "AI & Automation" },
    { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo.svg", color: "#FFD21E", category: "AI & Automation" },

    // Tools
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032", category: "Tools" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ED", category: "Tools" },
];

export default function Skills() {
    const { primaryColor, accentColor } = useSettings();
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "All" || skill.category === activeCategory
    );

    return (
        <section id="arsenal" className="py-24 px-4 relative z-10 transition-all duration-500">
            {/* Background Decorative Glows */}
            <div
                className="absolute top-0 left-1/4 w-96 h-96 blur-[120px] opacity-20 pointer-events-none rounded-full"
                style={{ background: primaryColor }}
            />
            <div
                className="absolute bottom-0 right-1/4 w-96 h-96 blur-[120px] opacity-20 pointer-events-none rounded-full"
                style={{ background: accentColor }}
            />

            <div className="container max-w-6xl mx-auto relative z-10">
                <ScrollReveal width="100%">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                                My Tech
                            </span>
                            {" "}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
                            >
                                Arsenal
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                            Harnessing the power of modern frameworks and AI tools to build scalable, high-impact digital solutions.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md relative overflow-hidden group",
                                activeCategory === cat
                                    ? "text-white border-transparent"
                                    : "text-white/50 border-white/10 hover:border-white/20 hover:text-white"
                            )}
                            style={activeCategory === cat ? {
                                background: primaryColor,
                                boxShadow: `0 0 20px ${primaryColor}40`
                            } : {}}
                        >
                            <span className="relative z-10">{cat}</span>
                            {activeCategory !== cat && (
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                layout
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                className="group"
                            >
                                <div
                                    className="relative flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 overflow-hidden h-full aspect-square"
                                    style={{
                                        boxShadow: `0 0 0 0px ${skill.color}00`,
                                    }}
                                >
                                    {/* Hover Glow */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at center, ${skill.color}15, transparent 70%)`
                                        }}
                                    />

                                    {/* Animated Ring */}
                                    <div
                                        className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100 border-2"
                                        style={{ borderColor: `${skill.color}30`, boxShadow: `inset 0 0 20px ${skill.color}20` }}
                                    />

                                    {/* Logo Container */}
                                    <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4">
                                        <div
                                            className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                            style={{ background: skill.color }}
                                        />
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                                        />
                                    </div>

                                    {/* Skill Name */}
                                    <div className="text-center relative z-10">
                                        <h3 className="text-base md:text-lg font-bold text-white transition-colors duration-300">
                                            {skill.name}
                                        </h3>
                                        <div
                                            className="h-1 w-0 group-hover:w-full transition-all duration-500 mx-auto rounded-full mt-2"
                                            style={{ background: skill.color }}
                                        />
                                    </div>

                                    {/* Category Label (Subtle) */}
                                    <span className="absolute bottom-4 text-[10px] uppercase tracking-widest text-white/20 font-bold group-hover:text-white/40 transition-colors">
                                        {skill.category}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
