"use client";
import React from 'react';
import { allSkills } from '@/data/skills';

const Skills = () => {
  return (
    <section className="py-20">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-2xl text-foreground font-mono">
          <span className="text-accent">#</span>skills
        </h2>
        <div className="h-[1px] bg-accent/30 w-1/4"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer">
        {allSkills.map((skill) => (
          <div 
            key={skill.name} 
            className="border border-border p-6 flex flex-col items-center justify-center gap-4 hover:border-accent/50 transition-all duration-500 bg-card/5 backdrop-blur-sm group relative overflow-hidden"
          >
            {/* Robotic Hover Effect - Decorative corner node */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Dynamic Icon with themed glow on hover */}
            <div 
              className="transition-all duration-500 group-hover:scale-140 group-hover:-translate-y-1"
              style={{ color: skill.color }}
            >
              {skill.icon}
            </div>
            
            <div className="text-center w-full">
              <span className="text-[15px] tracking-widest font-mono text-foreground/60 group-hover:text-foreground transition-colors block mb-3">
                {skill.name}
              </span>
              
              {/* Robotic Progress Bar */}
              <div className="flex items-center gap-2">
                <div className="h-[2px] flex-1 bg-border/20 relative">
                  <div 
                    className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000 ease-out" 
                    style={{ width: `${skill.percent}%` }}
                  ></div>
                </div>
                <span className="text-[9px] font-mono text-accent min-w-[25px]">
                  {skill.percent}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;