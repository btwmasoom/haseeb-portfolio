"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaticImageData } from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

import ai from "@/public/images/ai.png";
import travel from "@/public/images/travel.png";
import security from "@/public/images/security.png";
import movies from "@/public/images/movies.png";
import Car from "@/public/images/Car.jpg";
import Heena from "@/public/images/Henna.jpg";

import { useSettings } from "@/context/settings-context";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  tags: string[];
}

function ProjectItem({ title, description, image, tags }: ProjectCardProps) {
  const { primaryColor, accentColor } = useSettings();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-50, 50], [5, -5]);
  const rotateY = useTransform(mouseX, [-50, 50], [-5, 5]);

  return (
    <motion.div
      style={{ perspective: 1000, rotateX, rotateY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="h-full"
    >
      <Card
        className="h-full overflow-hidden border-white/10 rounded-xl shadow-lg transition-all duration-300 group"
        style={{
          backgroundColor: `rgba(var(--glass-rgb), var(--glass-opacity))`,
          backdropFilter: `blur(var(--glass-blur))`,
          WebkitBackdropFilter: `blur(var(--glass-blur))`,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = `${primaryColor}4d`;
          e.currentTarget.style.boxShadow = `0 0 20px ${primaryColor}20`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        }}
      >
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-6 relative">
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5"
            style={{ background: `linear-gradient(to bottom right, ${primaryColor}, ${accentColor})` }}
          />
          <h3
            className="text-xl font-bold mb-2 text-white transition-colors"
            style={{ color: 'white' }}
            onMouseOver={(e) => (e.currentTarget.style.color = primaryColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = 'white')}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="hover:bg-opacity-40 transition-colors"
                style={{
                  backgroundColor: `${primaryColor}33`,
                  color: primaryColor,
                  border: `1px solid ${primaryColor}40`
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProjectCard() {
  const { primaryColor, accentColor } = useSettings();
  const projects: ProjectCardProps[] = [
    {
      title: "AI Talking Bot",
      description:
        "Voice-based AI assistant built using Python that interacts through speech. Integrated with OpenAI and built a GUI using Tkinter and PyQt5.",
      image: ai,
      tags: ["Python", "Tkinter", "PyQt5", "OpenAI API", "SpeechRecognition"],
    },
    {
      title: "AI-Based Travel Agent",
      description:
        "A smart AI agent that suggests destinations, calculates routes, and advises travel decisions using geolocation and AI-based logic.",
      image: travel,
      tags: ["Python", "NLP", "Geopy", "Tkinter", "PyQt5"],
    },
    {
      title: "Security App",
      description:
        "A security Agent that checks your system on its own an after anlysis shows protection techniques you need and automaticaly fixes all vulnerabilities like firewall e.t.c ",
      image: security,
      tags: ["Python", "NLP", "Geopy", "Tkinter", "PyQt5"],
    },
    {
      title: "Movies site (Bluster Box )",
      description:
        "is a full-stack, Netflix-style movie streaming platform designed for seamless, high-quality entertainment. The platform allows users to explore and stream a vast collection of movies across various genres using external storage links (Wasabi, Google Drive, etc.). With a sleek UI and secure token-based streaming system, the site ensures smooth playback and optimal user experience across devices. ",
      image: movies,
      tags: ["MERN Stack", "React", "Node.js", "MongoDB", "Express", "JWT"],
    },
    {
      title: "AutoHub Showroom",
      description:
        "A fully responsive car showroom web application built with the MERN stack. Features include vehicle listings, detailed car pages, admin inventory management, customer inquiries, and secure login functionality.",
      image: Car,
      tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT"],
    },
    {
      title: "Pak Henna - Mehndi Art Studio",
      description:
        "A beautifully designed web platform for showcasing traditional and modern Mehndi designs. Includes online booking, service catalog, customer reviews, and gallery with elegant UI focused on aesthetics and accessibility.",
      image: Heena,
      tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 relative z-10">
      <div className="container max-w-6xl mx-auto">
        <ScrollReveal width="100%">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
            >
              Featured Projects
            </span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <ProjectItem {...project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
