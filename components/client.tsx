"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

export const companies = [
  {
    id: 1,
    name: "JavaScript",
    img: "/image 224.png",
  },

    {
    id: 2,
    name: "Tailwind CSS",
    img: "/Tailwind CSS.svg",
  },
  {
    id: 3,
    name: "MongoDB",
    img: "/mongo.png",
  },
  {
    id: 4,
    name: "Node.js",
    img: "/nodejs.png",
  },
  {
    id: 5,
    name: "React",
    img: "/react.png",
  },
    {
    id: 6,
    name: "Git",
    img: "/git.png",
  },
      {
    id: 7,
    name: "python",
    img: "/python.svg",
  },
] as const;

const TitleHeader = ({ title, sub }: { title: string; sub: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">{title}</h2>
    <p className="text-lg text-gray-400">{sub}</p>
  </div>
);

export const Client = () => {
  // Animate the company cards with GSAP
  useGSAP(() => {
    gsap.fromTo(
      ".company-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        delay: 0.5, // Simple delay instead of scroll trigger
      }
    );
  });

  return (
    <>
      <style jsx>{`
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .section-padding {
          padding: 80px 0;
        }

        .card-border {
          position: relative;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .card-border:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
        }

        .tech-card-animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .group:hover .tech-card-animated-bg {
          opacity: 1;
        }

        .tech-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem;
          height: 100%;
          min-height: 200px;
        }

        .tech-icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
          flex: 1;
        }

        .company-icon {
          width: 64px;
          height: 64px;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
        }

        .group:hover .company-icon {
          transform: scale(1.1) rotateY(15deg);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
        }

        .padding-x {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .company-name {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          text-align: center;
          margin: 0;
          transition: color 0.3s ease;
        }

        .group:hover .company-name {
          color: #60a5fa;
        }

        @media (max-width: 1280px) {
          .xl\\:rounded-full {
            border-radius: 0.5rem;
          }
        }

        @media (min-width: 1280px) {
          .xl\\:rounded-full {
            border-radius: 9999px;
          }
        }

        .rounded-lg {
          border-radius: 0.5rem;
        }
      `}</style>

      <section id="testimonials" className="py-20">
        <div className="flex flex-col items-center max-lg:mt-10">
          <TitleHeader
            title="Technologies & Platforms I Work With"
            sub=""
          />
          
          <div className="flex flex-wrap items-center justify-center gap-8 max-lg:mt-10 md:gap-16">
            {companies.map((company) => (
              <div
                key={company.id}
                className="card-border company-card overflow-hidden group xl:rounded-full rounded-lg flex max-w-32 gap-2 md:max-w-60"
              >
                <div className="tech-card-animated-bg" />
                <div className="tech-card-content">
                  <div className="tech-icon-wrapper">
                    <Image
                      height={64}
                      width={64}
                      src={company.img}
                      alt={`${company.name} logo`}
                      className="company-icon"
                    />
                  </div>
                  <div className="padding-x w-full">
                    <p className="company-name">{company.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};