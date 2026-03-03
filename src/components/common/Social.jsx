"use client";
import React from "react";
import socialData from "@/data/social";

const Social = () => {
  return (
    <div className="hidden lg:flex flex-col items-center gap-6 fixed left-8 top-1/2 -translate-y-1/2 z-50">
      {/* Top Connector Line */}
      <div className="w-[1px] h-20 bg-accent/30 animate-[pulse_3s_infinite] mt-10"></div>
      
      {socialData && socialData.map((social) => (
        <a 
          key={social.name}
          href={social.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-foreground/40 hover:text-accent transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:-translate-y-1 hover:scale-110 relative group"
        >
          {social.icon}
          {/* Robotic Tooltip */}
          <span className="absolute left-10 scale-0 group-hover:scale-100 transition-transform origin-left bg-accent text-background text-[10px] px-2 py-1 font-mono tracking-tighter whitespace-nowrap z-50 border border-accent shadow-[0_0_10px_rgba(199,120,221,0.3)]">
            {social.name}
          </span>
        </a>
      ))}

      {/* Bottom Connector Line */}
      <div className="w-[1px] h-20 bg-accent/30 animate-[pulse_3s_infinite]"></div>
    </div>
  );
};

export default Social;