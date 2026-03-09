"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import about from "@/data/about";
import { Download, MapPin } from "lucide-react";

const About = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about-me";

  // If not on About page, show only first 2 paragraphs
  const displayDescription = isAboutPage
    ? about.description
    : about.description.slice(0, 2);

  return (
    <section className="py-20 flex flex-col md:flex-row gap-10 items-center">
      <div className="flex-1">
        <h2 className="text-2xl text-foreground mb-8 font-mono">
          <span className="text-accent">#</span>about-me
        </h2>

        <div className="space-y-4 text-foreground/70 leading-relaxed font-mono text-sm md:text-base border-l-2 border-accent/20 pl-6">
          <p className="text-foreground font-bold">Hello, I'm {about.name}!</p>

          {/* Location Tag */}
          <div className="flex items-center gap-2 text-accent text-xs mb-2">
            <MapPin size={14} />
            <span>BASED_IN: {about.from.toUpperCase()}</span>
          </div>

          {/* Dynamic Description Mapping */}
          {displayDescription.map((text, index) => (
            <p key={index} className="text-justify">{text}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          {!isAboutPage && (
            <Link href="/about-me">
              <button className="px-6 py-2 border border-accent text-foreground hover:bg-accent/10 transition-all font-mono text-sm group cursor-pointer">
                Read more{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  ~~{">"}
                </span>
              </button>
            </Link>
          )}

          <a href={about.cvLink} download>
            <button className="px-6 py-2 border border-border text-foreground/60 hover:text-accent hover:border-accent transition-all font-mono text-sm flex items-center gap-2 group cursor-pointer">
              <Download size={16} className="group-hover:animate-bounce" />
              download_cv()
            </button>
          </a>
        </div>
      </div>

      {/* ROBOTIC IMAGE CONTAINER */}
      <div className="relative group px-4 pb-4">
        <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/60 transition-colors duration-500"></div>
        <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-[radial-gradient(var(--accent)_1px,transparent_1px)] [background-size:10px_10px] opacity-10 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

        <div className="relative w-64 h-80 border border-border/20 bg-background overflow-hidden z-10 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_1.5px,transparent_1.5px)] [background-size:15px_15px] opacity-20"></div>

          <img
            src={about.imageSrc}
            alt={about.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 scale-105 group-hover:scale-100 cursor-pointer"
          />

          <div className="absolute inset-0 w-full h-[2px] bg-accent/40 shadow-[0_0_15px_var(--accent)] animate-[scan_4s_linear_infinite] pointer-events-none z-20"></div>
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-accent/40 group-hover:scale-110 transition-transform"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-accent/40 group-hover:scale-110 transition-transform"></div>

          <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-accent text-background text-[10px] px-2 py-0.5 font-bold font-mono">
              Age: {about.age.split(" ")[0]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;