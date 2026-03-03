"use client";
import React, { useState } from "react";
import heroData from "@/data/hero";
import { Terminal } from "lucide-react";
import ContactModal from "../common/ContactModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative pt-12 md:pt-20 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
      
      <div className="flex-1 z-10 text-center md:text-left">
        <div className="inline-block">
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground leading-tight typewriter">
             {heroData.title.split("Abhijeet")[0]} 
             <span className="text-accent underline decoration-accent/20 underline-offset-8">Abhijeet</span>
          </h1>
        </div>
        
        <h2 className="text-xl md:text-2xl mt-4 text-accent italic opacity-80">
          {heroData.subtitle}
        </h2>

        <p className="mt-6 text-foreground/60 max-w-lg mx-auto md:mx-0 leading-relaxed text-sm md:text-base border-l-2 border-accent/10 pl-4 text-justify">
          {heroData.description}
        </p>

        {/* Triggering the Modal here */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-10 px-8 py-3 border border-accent text-accent hover:bg-accent/10 transition-all duration-300 tracking-widest text-sm flex items-center gap-2 mx-auto md:mx-0 cursor-pointer group active:scale-95 font-mono"
        >
          {heroData.buttonText} <Terminal size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* --- IMAGE SECTION --- */}
      <div className="relative group overflow-visible">
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-accent/40 group-hover:scale-110 transition-transform duration-500 z-30"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-accent/40 group-hover:scale-110 transition-transform duration-500 z-30"></div>

        <div className="relative z-10 border-b-4 border-accent shadow-2xl">
          <div className="w-64 h-72 md:w-80 md:h-96 bg-card grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden relative border border-border">
            <img 
              src={heroData.imagePaths.profile} 
              alt="Abhijeet Kumar" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 w-full h-[2px] bg-accent/40 shadow-[0_0_15px_var(--accent)] animate-[scan_4s_linear_infinite] z-20 pointer-events-none"></div>
            
            <div className="absolute bottom-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="bg-accent text-background text-[10px] px-2 py-0.5 font-bold tracking-tighter uppercase font-mono">
               {heroData.title.replace("I'm ", "")}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-0 border border-border border-t-0 p-3 text-[11px] flex items-center gap-3 bg-background/50 backdrop-blur-sm relative z-20 font-mono">
          <div className="w-2 h-2 bg-accent animate-pulse rounded-full"></div>
          <div className="flex gap-1 items-center">
            <span className="text-foreground/50">System_Status:</span> 
            <span className="text-foreground font-bold uppercase tracking-widest">
              {heroData.statusBadgeText || "Compiling_Identity"}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

    </section>
  );
};

export default Hero;