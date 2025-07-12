"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaticImageData } from "next/image";
import ai from "@/public/images/ai.png"; // You can add actual image
import travel from "@/public/images/travel.png";
import security from "@/public/images/security.png";
import movies from "@/public/images/movies.png";
import Car from "@/public/images/Car.jpg";
import Heena from "@/public/images/Henna.jpg";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  tags: string[];
}

function ProjectItem({ title, description, image, tags }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-white/5 rounded-xl shadow-lg">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="w-full object-cover"
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-violet-600 text-white"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectCard() {
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
}
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-black/80">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
            Featured Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
