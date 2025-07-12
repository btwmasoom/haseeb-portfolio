import Hero from "@/components/hero";
import Contact from "@/components/contact";
import ExperienceTimeline from "@/components/experience";
import ProjectCard from "@/components/project";
import { Linkedin, Github, Mail } from "lucide-react";
import { Client } from "@/components/client";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectCard />
      <Client />

      <section id="experience" className="py-20 px-4 bg-black/80">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
              Work Experience
            </span>
          </h2>

          <ExperienceTimeline />
        </div>
      </section>

      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-b from-black to-violet-950/30"
      >
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">
              Get In Touch
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-violet-400" />
                  <a
                    href="mailto:haseebasif.edu@gmail.com"
                    className="text-white hover:underline"
                  >
                    haseebasif.edu@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-violet-400" />
                  <a
                    href="https://github.com/btwmasoom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    btwmasoom-git
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-violet-400" />
                  <a
                    href="https://www.linkedin.com/in/haseeb-asif-5b0a18370"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
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
