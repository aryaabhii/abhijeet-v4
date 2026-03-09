"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, AlertTriangle, Cpu } from 'lucide-react';

export default function NotFound() {
  return (
    // Changed to min-h-screen and added overflow-hidden to prevent animation jitter scrollers
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 relative overflow-hidden font-mono">
      
      {/* --- ROBOTIC BACKGROUND SCANLINES --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(199,120,221,0.1)_50%,transparent_50%)] bg-[length:100%_4px] animate-[flicker_0.15s_infinite]"></div>
      
      {/* --- ERROR DISPLAY BOX --- */}
      {/* Added max-w-max to ensure the box doesn't stretch and stays perfectly centered */}
      <div className="relative p-10 md:p-16 border border-white/5 bg-card/20 backdrop-blur-sm group animate-[glitch-entry_0.6s_ease-out] z-10">
        
        {/* Animated Corner Brackets */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent animate-[pulse_2s_infinite]"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent animate-[pulse_2s_infinite]"></div>

        {/* Technical Header with Pulse */}
        <div className="flex items-center gap-2 text-accent text-[10px] uppercase tracking-[0.3em] mb-4">
          <AlertTriangle size={14} className="animate-bounce" /> 
          <span className="animate-pulse">fatal_system_error // unit_not_found</span>
        </div>

        {/* Main 404 Text with Glitch Effect */}
        <div className="relative">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-2 tracking-tighter relative z-10">
            4<span className="text-accent inline-block hover:scale-110 transition-transform">0</span>4
          </h1>
          {/* Glitch Layers - added pointer-events-none to prevent invisible box overflow */}
          <span className="absolute top-0 left-0 text-7xl md:text-9xl font-bold text-red-500 opacity-30 -translate-x-1 animate-[glitch_2s_infinite] z-0 pointer-events-none">404</span>
          <span className="absolute top-0 left-0 text-7xl md:text-9xl font-bold text-blue-500 opacity-30 translate-x-1 animate-[glitch_3s_infinite] z-0 pointer-events-none">404</span>
        </div>
        
        <p className="text-foreground/60 text-sm md:text-base max-w-xs mb-8 border-l-2 border-accent/30 pl-4">
          The requested coordinate does not exist in the current sector. Navigation sequence interrupted.
        </p>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <button className="flex items-center justify-center gap-2 px-6 py-2 border border-accent text-white hover:bg-accent hover:text-background transition-all duration-300 w-full sm:w-auto active:scale-95">
              <Home size={16} /> return_home()
            </button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-2 border border-border text-foreground/60 hover:text-white hover:border-foreground transition-all duration-300 w-full sm:w-auto active:scale-95"
          >
            <ArrowLeft size={16} /> go_back()
          </button>
        </div>

        {/* Bottom Technical Readout */}
        <div className="absolute -bottom-10 left-0 opacity-20 text-[9px] text-foreground flex gap-4 uppercase font-bold w-full">
           <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Core: Stable</span>
           <span>Memory: 0x404_ERR</span>
           <Cpu size={10} className="animate-spin-slow" />
        </div>

        {/* Vertical Scanning Laser */}
        <div className="absolute inset-0 w-full h-[2px] bg-accent/20 shadow-[0_0_15px_rgba(199,120,221,0.5)] animate-[scan_4s_linear_infinite] pointer-events-none"></div>
      </div>

      {/* Background Decorative Dots */}
      <div className="mt-16 opacity-10 grid grid-cols-6 gap-3 z-0">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>

      {/* --- INLINE ANIMATIONS --- */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flicker {
          0% { opacity: 0.05; }
          50% { opacity: 0.02; }
          100% { opacity: 0.05; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch-entry {
          0% { transform: scale(0.9); opacity: 0; filter: blur(10px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}