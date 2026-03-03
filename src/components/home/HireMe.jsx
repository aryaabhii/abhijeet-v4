"use client";
import React from "react";
import { Mail, Linkedin, Terminal } from "lucide-react";
import { hireMe } from "@/data/hireMe";
import socialData from "@/data/social";

const HireMe = () => (
  <section className="py-14 relative overflow-hidden">
    {/* Header with Robotic Prefix */}
    <h2 className="text-2xl text-foreground mb-12 font-mono">
      <span className="text-accent">#</span>
      {hireMe.title.toLowerCase()}
    </h2>

    <div className="flex flex-col lg:flex-row justify-between gap-12 items-start">
      {/* HIRE ME TEXT CONTENT */}
      <div className="flex-1 max-w-3xl space-y-6">
        <div className="relative border-l-2 border-accent/20 pl-6 space-y-4">
          <p className="text-foreground/80 font-mono text-sm md:text-base leading-relaxed text-justify italic">
            {hireMe.paragraph}
          </p>

          <p className="text-foreground/60 font-mono text-sm italic">
            // Seeking freelance opportunities and complex system architecture
            challenges.
          </p>
        </div>
      </div>

      {/* TERMINAL CONTACT MODULE */}
      <div className="border border-border p-6 bg-card/10 backdrop-blur-sm relative group w-full md:w-auto min-w-[320px] transition-all duration-500 hover:border-accent/40">
        {/* Robotic Corner Node */}
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-accent group-hover:scale-110 transition-transform"></div>

        <div className="flex items-center gap-2 mb-6 border-b border-border pb-3">
          <Terminal size={16} className="text-accent" />
          <p className="text-foreground font-mono text-sm font-bold tracking-[0.2em]">
            Establish_Contact
          </p>
        </div>

        <div className="space-y-4 font-mono">
        {/* EMAIL PROTOCOL */}
        <a
          href={socialData[6].link} 
          className="flex items-center gap-4 text-xs text-foreground/60 hover:text-accent transition-all group/link"
        >
          <div className="p-2 bg-accent/5 rounded-sm group-hover/link:bg-accent/10 transition-colors">
            <Mail size={16} className="text-accent" />
          </div>
          <span className="break-all">
            {socialData[6].link.replace("mailto:", "")}
          </span>
        </a>

        {/* LINKEDIN PROTOCOL - Fixed to index 1 */}
        <a
          href={socialData[1].link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 text-xs text-foreground/60 hover:text-accent transition-all group/link"
        >
          <div className="p-2 bg-accent/5 rounded-sm group-hover/link:bg-accent/10 transition-colors">
            <Linkedin size={16} className="text-accent" />
          </div>
          <span className="break-all">
            {socialData[1].name.toLowerCase()}_profile // abhijeet-kumar
          </span>
        </a>

      </div>

        {/* System Status Decoration */}
        <div className="mt-8 flex items-center justify-between opacity-30 group-hover:opacity-60 transition-opacity">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-accent animate-[pulse_1.5s_infinite]"></div>
            <div className="w-1 h-3 bg-accent animate-[pulse_1.5s_infinite_0.2s]"></div>
            <div className="w-1 h-3 bg-accent animate-[pulse_1.5s_infinite_0.4s]"></div>
          </div>
          <span className="text-[8px] font-mono tracking-widest text-accent">
            Ready_To_Deploy
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default HireMe;
