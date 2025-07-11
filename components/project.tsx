"use client";

import Image from "next/image";
// import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import rentalog from "@/public/images/rentalog.png";
import secure from "@/public/images/Sercure.png";
import sntclub from "@/public/images/sntclub.png";
import skit from "@/public/images/skit.png";
import image from "@/public/images/image.png";
import wealthvisory from "@/public/images/wealthvisory.png";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

function ProjectItem({ title, description, image, tags, demoUrl, githubUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-white/5 rounded-xl shadow-lg">
      <Image src={image} alt={title} width={400} height={300} className="w-full object-cover" />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-violet-600 text-white">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {demoUrl && (
            <Button asChild variant="outline">
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button asChild variant="outline">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectCard() {
  const projects: ProjectCardProps[] = [
    {
      title: "WealthVisory",
      description: "Developed a web-based investment management platform enabling clients to track and analyze real-time stocks, mutual funds, and SIPs for informed, data-driven portfolio decisions.",
      image: wealthvisory,
      tags: ["Vite","ReactJs", "Tailwind CSS" ,"ExpressJs"],
      demoUrl: "https://www.wealthvisory.in/",
      githubUrl: "", //"https://github.com/sanidhya-Git/snt-club.vercel.app",
    },
    {
      title: "SNT-Club",
      description: "Interactive platform for students to connect, collaborate, and learn.",
      image: sntclub,
      tags: ["ReactJs", "Tailwind CSS"],
      demoUrl: "https://snt-club.vercel.app/",
      githubUrl: "", //"https://github.com/sanidhya-Git/snt-club.vercel.app",
    },
    {
      title: "Secure Wallet",
      description: "A web application for securely managing user's digital assets and transactions.",
      image: secure,
      tags: ["Nextjs", "clerk", "Tailwind CSS"],
      demoUrl: "",
      githubUrl: "",
   
    },
    {
      title: "SKIT-Faculty Portal",
      description: "Interactive platform for SKIT Faculty to manage their own records.",
      image: skit,
      tags: ["HTML", "CSS", "PHP", "JS"],
      demoUrl: "https://testing-server.kistechnosoftware.com/skit/",
      githubUrl: "",
    },
    {
      title: "Rent Management System",
      description: "A Full-Stack Rental Management System with various property management features.",
      image: rentalog,
      tags: ["ReactJs", "MongoDB", "Tailwind CSS"],
      demoUrl: "https://rentalog.vercel.app/#home",
      githubUrl: "", //"https://github.com/sanidhya-Git/rentalog",
    },
    {
      title: "Trak-Twin",
      description: "Interactive platform for tour and travel.",
      image: image,
      tags: ["HTML", "CSS", "PHP", "JS"],
      demoUrl: "https://traktwin.vercel.app/",
      githubUrl: "",
    },

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

        {/* <div className="text-center mt-12">
          <Button variant="outline" className="border-violet-600 text-violet-400 hover:bg-violet-950/50">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </section>
  );
}