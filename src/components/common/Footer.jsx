"use client";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  
  // Custom technical details for your "Robotic" theme
  const websiteVersion = "4.1.0";
  const buildStatus = "stable";

  return (
    <footer className="mt-20 py-10 border-t border-accent/20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
        
        {/* Version & Build Info */}
        <div className="order-2 md:order-1 flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-accent/5 border border-accent/20 rounded-sm">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            <span className="text-[10px] font-mono text-accent uppercase tracking-tighter">
              v{websiteVersion}-{buildStatus}
            </span>
          </div>
          <p className="text-[11px] font-mono text-foreground/40 hidden sm:block">
            // system_rendered: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Copyright Section */}
        <div className="order-1 md:order-2 text-center md:text-right">
          <p className="text-sm font-mono text-foreground/60">
            © {year} | Designed & Built by 
            <span className="text-accent ml-2 font-bold hover:underline cursor-default transition-all">
              Abhijeet_Kumar
            </span>
          </p>
        </div>
        
      </div>

      {/* Subtle bottom decorative line */}
      <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-transparent via-accent/10 to-transparent"></div>
    </footer>
  );
};

export default Footer;