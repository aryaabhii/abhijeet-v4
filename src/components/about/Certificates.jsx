"use client";
import React, { useState } from 'react';
import { ExternalLink, Award, FileCheck, X, ZoomIn } from 'lucide-react';
import { certificateDate } from '@/data/certificates';

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (item) => {
    setSelectedCert(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-xl text-foreground font-mono">
          <span className="text-accent">#</span>certifications_archive
        </h2>
        <div className="h-[1px] bg-accent/20 flex-grow max-w-[200px]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificateDate.map((item, index) => (
          <div 
            key={index} 
            className="group relative border border-border bg-card/5 hover:border-accent/40 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden bg-background/50 border-b border-border">
              <img 
                src={item.image || item.images[0]} 
                alt={item.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
              />
              <button 
                onClick={() => openModal(item)}
                className="absolute inset-0 z-30 flex items-center justify-center bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <ZoomIn size={20} className="text-accent bg-background/80 p-1.5 rounded-full" />
              </button>
            </div>

            <div className="p-4 flex-grow flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-md font-mono text-foreground font-bold group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <Award size={16} className="text-accent/40 shrink-0" />
              </div>
              <p className="text-xs font-mono text-foreground/50 leading-relaxed mb-4 italic line-clamp-2">
                {item.description}
              </p>
              <button 
                onClick={() => openModal(item)}
                className="mt-auto flex items-center gap-2 text-[10px] font-mono text-accent tracking-widest border border-accent/20 px-3 py-1.5 hover:bg-accent hover:text-background transition-all cursor-pointer"
              >
                <FileCheck size={12} />
                view()
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- PURE CSS ROBOTIC POPUP --- */}
      {selectedCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop with Fade-In Animation */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-in" 
            onClick={closeModal}
          ></div>

          {/* Compact Modal Content with Scale-In Animation */}
          <div className="relative w-full max-w-xl bg-card border border-accent/30 shadow-2xl overflow-hidden z-10 animate-scale-in">
            {/* HUD Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/50">
              <span className="font-mono text-[10px] tracking-tighter text-accent flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent animate-pulse"></span>
                SYSTEM_VIEWER_V1.0
              </span>
              <button onClick={closeModal} className="text-foreground/40 hover:text-accent cursor-pointer transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Viewport */}
            <div className="p-4 md:p-6 flex flex-col items-center bg-[radial-gradient(var(--accent)_0.5px,transparent_0.5px)] [background-size:10px_10px] bg-opacity-5">
              <div className="relative group/modal overflow-hidden border border-border bg-background shadow-inner">
                <img 
                  src={selectedCert.image || selectedCert.images[0]} 
                  alt={selectedCert.title}
                  className="max-h-[45vh] w-auto object-contain"
                />
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/40"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/40"></div>
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-mono text-foreground mb-1">{selectedCert.title}</h3>
                <p className="text-[10px] text-foreground/50 font-mono italic mb-4 max-w-sm mx-auto leading-relaxed">
                  {selectedCert.description}
                </p>
                
                <a 
                  href={selectedCert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-background font-mono text-[10px] tracking-widest hover:translate-y-[-2px] transition-all"
                >
                  <ExternalLink size={14} />
                  verify_link
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Keyframe Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Certificates;