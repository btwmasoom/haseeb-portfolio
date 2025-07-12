"use client"

import { motion } from "framer-motion"
import { BriefcaseIcon } from "lucide-react"

export default function ExperienceTimeline() {
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
  technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "Tailwind CSS"],
},
    
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-violet-500 to-cyan-500" />

      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`relative mb-12 md:mb-24 ${
            index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"
          } w-full md:w-1/2 pl-10 md:pl-0`}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 md:left-auto md:right-0 top-0 w-8 h-8 rounded-full bg-black border-2 border-violet-500 flex items-center justify-center z-10">
            <BriefcaseIcon className="h-4 w-4 text-violet-400" />
          </div>

          {/* Content */}
          <div
            className={`bg-black/80 border border-violet-900/30 p-5 rounded-lg shadow-lg ${
              index % 2 === 0 ? "md:rounded-tr-none" : "md:rounded-tl-none"
            }`}
          >
            <div className="text-violet-400 font-medium">{exp.period}</div>
            <h3 className="text-xl font-bold mt-1">{exp.title}</h3>
            <div className="text-gray-400 mb-3">{exp.company}</div>
            <p className="text-gray-300 mb-4">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span key={tech} className="text-xs bg-violet-900/30 text-violet-300 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

