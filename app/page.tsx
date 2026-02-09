"use client";

import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import ExperienceTimeline from "@/components/experience";
import ProjectCard from "@/components/project";
import { Linkedin, Github, Mail } from "lucide-react";
import AnimatedBackground from "@/components/ui/animated-background";
import { useSettings } from "@/context/settings-context";

export default function Home() {
  const { primaryColor, accentColor } = useSettings();

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Hero />
      <Skills />
      <ProjectCard />

      <section id="experience" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
            >
              Work Experience
            </span>
          </h2>

          <ExperienceTimeline />
        </div>
      </section>

      <section
        id="contact"
        className="py-20 px-4"
      >
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
            >
              Get In Touch
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <Mail
                    className="h-5 w-5 transition-colors duration-300"
                    style={{ color: primaryColor }}
                  />
                  <a
                    href="mailto:haseebasif.edu@gmail.com"
                    className="text-white hover:underline decoration-2"
                    style={{ textDecorationColor: primaryColor }}
                  >
                    haseebasif.edu@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <Github
                    className="h-5 w-5 transition-colors duration-300"
                    style={{ color: primaryColor }}
                  />
                  <a
                    href="https://github.com/btwmasoom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline decoration-2"
                    style={{ textDecorationColor: primaryColor }}
                  >
                    btwmasoom-git
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <Linkedin
                    className="h-5 w-5 transition-colors duration-300"
                    style={{ color: primaryColor }}
                  />
                  <a
                    href="https://www.linkedin.com/in/haseeb-asif-5b0a18370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline decoration-2"
                    style={{ textDecorationColor: primaryColor }}
                  >
                    Haseeb Asif
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Location</h3>
              <p>Multan , Punjab , Pakistan</p>
              <p className="text-gray-400 mt-2">
                Available for remote work worldwide
              </p>
            </div>

            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
}
