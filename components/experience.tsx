"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BriefcaseIcon } from "lucide-react";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useSettings } from "@/context/settings-context";

export default function ExperienceTimeline() {
  const { primaryColor, accentColor } = useSettings();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experiences = [
    {
      title: "MERN Stack Developer Intern",
      company: "We Tech (Vehari)",
      period: "3 Months",
      description:
        "Contributed to multiple full-stack projects using the MERN stack, focusing on real-world applications and rapid feature delivery in a fast-paced startup environment. Strengthened core development skills and agile practices by building scalable modules and dynamic UIs.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    },
    {
      title: "Freelance AI Developer",
      company: "Lavender Software House (Remote)",
      period: "6 Months",
      description:
        "Built custom AI-powered desktop applications using Python, including intelligent talking bots and travel assistant agents with GUI interfaces developed in Tkinter and PyQt5. Delivered complete offline solutions tailored to client requirements, ensuring smooth user interaction and responsive design.",
      technologies: ["Python", "Tkinter", "PyQt5", "AI Logic", "GitHub"],
    },

    {
      title: "Final Year Project - Social Media App",
      company: "COMSATS University (Vehari Campus)",
      period: "2024",
      description:
        "Led the development of 'COMSATS Hub' — a dedicated social media platform tailored for COMSATS students to connect, share resources, form study groups, and stay updated with campus events. Integrated secure authentication, real-time chat, and post sharing features in a modern, scalable design.",
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "JWT",
        "Tailwind CSS",
      ],
    },
  ];

  return (
    <div ref={ref} className="relative py-20">
      {/* Animated Timeline line */}
      <motion.div
        style={{ scaleY, transformOrigin: "top", backgroundImage: `linear-gradient(to bottom, ${primaryColor}, ${accentColor})` }}
        className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 z-0 origin-top"
      />

      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`relative mb-12 md:mb-24 ${index % 2 === 0
            ? "md:pr-12 md:text-right md:ml-0 md:mr-auto"
            : "md:pl-12 md:ml-auto md:mr-0"
            } w-full md:w-1/2 pl-12 md:pl-0 z-10`}
        >
          {/* Timeline dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 rounded-full bg-black border-2 flex items-center justify-center z-10 md:transform md:translate-x-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            style={{
              borderColor: primaryColor,
              boxShadow: `0 0 10px ${primaryColor}40`,
              ...(index % 2 !== 0 ? { right: "auto", left: 0 } : { right: 0 })
            }}
          >
            <BriefcaseIcon className="h-4 w-4" style={{ color: primaryColor }} />
          </motion.div>

          {/* Content */}
          <ScrollReveal
            width="100%"
            className={index % 2 !== 0 ? "md:ml-0" : ""}
          >
            <div
              className={`border p-6 rounded-2xl shadow-xl transition-all duration-300 ${index % 2 === 0 ? "md:rounded-tr-none" : "md:rounded-tl-none"
                }`}
              style={{
                backgroundColor: `rgba(var(--glass-rgb), var(--glass-opacity))`,
                backdropFilter: `blur(var(--glass-blur))`,
                WebkitBackdropFilter: `blur(var(--glass-blur))`,
                borderColor: `${primaryColor}20`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = `${primaryColor}40`;
                e.currentTarget.style.boxShadow = `0 0 20px ${primaryColor}10`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = `${primaryColor}20`;
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1)';
              }}
            >
              <div
                className="font-mono text-sm mb-1 tracking-wider"
                style={{ color: primaryColor }}
              >
                {exp.period}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mt-1 text-white">
                {exp.title}
              </h3>
              <div className="text-gray-400 mb-4 font-medium">
                {exp.company}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {exp.description}
              </p>
              <div
                className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
              >
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      borderColor: `${primaryColor}30`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      ))}
    </div>
  );
}
