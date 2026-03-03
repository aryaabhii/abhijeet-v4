"use client";
import React from "react";
import { educationData, experienceData } from "@/data/journey";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";

const Journey = () => {
  const TimelineItem = ({ title, institution, company, date }) => (
    <div className="relative pl-8 pb-12 group">
      {/* Vertical Timeline Line */}
      <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-accent/20 group-last:bg-gradient-to-b group-last:from-accent/20 group-last:to-transparent"></div>

      {/* Pulse Node - Added group-hover effect to the node itself */}
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-accent bg-background z-10 transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent">
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"></div>
      </div>

      {/* Content Container - Fixed Transition Syntax */}
      <div className="flex flex-col gap-1 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-3">
        {/* Title */}
        <h3 className="text-foreground text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>

        {/* Institution/Company */}
        <p className="text-foreground/60 text-sm transition-colors duration-300 group-hover:text-foreground">
          @ {institution || company}
        </p>

        {/* Date Badge - Added a slight lift on hover */}
        <div className="flex items-center gap-2 text-accent text-xs mt-2 bg-accent/5 w-fit px-2 py-1 border border-accent/10 transition-all duration-300 group-hover:bg-accent/10 group-hover:border-accent/30">
          <Calendar size={12} />
          {date}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4 relative">
      {/* SECTION HEADER - Fixed Typo */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl text-foreground text-center">
          <span className="text-accent">#</span>journey
        </h2>
        <div className="h-[1px] bg-accent w-1/4"></div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
        {/* EDUCATION COLUMN */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <GraduationCap className="text-accent" size={28} />
            <h2 className="text-2xl text-foreground tracking-tight">
              Education
            </h2>
            <div className="h-[1px] bg-accent/30 flex-grow"></div>
          </div>

          <div className="mt-8">
            {educationData.map((edu, index) => (
              <TimelineItem key={index} {...edu} />
            ))}
          </div>
        </div>

        {/* EXPERIENCE COLUMN */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <Briefcase className="text-accent" size={28} />
            <h2 className="text-2xl text-foreground tracking-tight">
              Experience
            </h2>
            <div className="h-[1px] bg-accent/30 flex-grow"></div>
          </div>

          <div className="mt-8">
            {experienceData.map((exp, index) => (
              <TimelineItem key={index} {...exp} />
            ))}
          </div>
        </div>

        {/* Robotic HUD Decorative Element */}
        <div className="absolute top-0 right-0 opacity-10 hidden lg:block pointer-events-none">
          <div className="border-t border-r border-accent w-24 h-24"></div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
