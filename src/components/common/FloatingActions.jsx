"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import socialData from '@/data/social';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamically find WhatsApp link from your socialData
  const whatsappLink = socialData.find(social => social.name === "WhatsApp")?.link || "#";

  useEffect(() => {
    const handleScroll = () => {
      // Toggle "Scroll to Top" visibility after 300px
      setShowScrollTop(window.scrollY > 300);

      // Calculate real-time scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end font-mono">
      
      {/* WHATSAPP BUTTON */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-3 bg-background border border-accent text-accent hover:bg-accent hover:text-background transition-all duration-300 shadow-[0_0_15px_rgba(199,120,221,0.2)]"
        aria-label="Contact on WhatsApp"
      >
        {/* Pulsing corner node */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent animate-pulse"></div>
        
        <MessageCircle size={24} />
        
        {/* Robotic Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-accent text-background text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap border border-accent">
          connect_whatsapp()
        </span>
      </a>

      {/* SCROLL TO TOP */}
      <div className={`transition-all duration-500 transform ${showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-75 pointer-events-none'}`}>
        <button
          onClick={scrollToTop}
          className="relative p-3 bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
        >
          {/* SVG Progress Circle - Fixed calculation */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress}
              pathLength="100"
              className="text-accent opacity-40 transition-all duration-200"
            />
          </svg>

          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          
          {/* Technical readout on hover */}
          <div className="absolute -bottom-6 right-0 text-[8px] text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold whitespace-nowrap">
              sector_pos:{Math.round(scrollProgress)}%
          </div>
        </button>
      </div>

      {/* Static Robotic Decoration */}
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-accent/40 pointer-events-none"></div>

      <style jsx>{`
        @keyframes glitch-entry {
          0% { transform: translateY(20px); opacity: 0; filter: hue-rotate(90deg); }
          100% { transform: translateY(0); opacity: 1; filter: hue-rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default FloatingActions;