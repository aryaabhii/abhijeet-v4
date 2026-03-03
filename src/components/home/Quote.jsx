"use client"
import React from 'react';
import quoteData from '@/data/quote';

const Quote = () => (
  <section className="flex flex-col items-center py-14 relative overflow-hidden group">
    
    {/* MAIN QUOTE BOX */}
    <div className="relative border border-border bg-background p-8 md:p-12 max-w-4xl transition-all duration-500 hover:border-accent/50">
      
      {/* Top Left Decorative Quote Mark */}
      <div className="absolute -top-4 left-6 bg-background px-2">
        <span className="text-accent text-5xl font-serif leading-none transition-transform group-hover:scale-110 inline-block rotate-180">
          ”
        </span>
      </div>
      
      {/* ROBOTIC ELEMENT: Top Right Corner Node */}
      <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-accent opacity-40 group-hover:opacity-100 transition-opacity"></div>

      {/* Quote Text with Progressive Reveal */}
      <p className="text-lg md:text-xl text-foreground font-mono leading-relaxed typewriter-text text-justify md:text-justify italic">
        {quoteData.text}
      </p>

      {/* Bottom Right Decorative Quote Mark */}
      <div className="absolute -bottom-7 right-6 bg-background px-2">
        <span className="text-accent text-5xl font-serif leading-none transition-transform group-hover:scale-110 inline-block">
          ”
        </span>
      </div>
    </div>

    {/* AUTHOR / GOAL FOOTER - Offset Box */}
    <div className="border border-border border-t-0 p-4 self-center md:self-end md:mr-[10%] lg:mr-[15%] bg-background relative transition-all duration-500 hover:border-accent/40">
      <p className="text-foreground/60 font-mono text-sm md:text-base italic">
        - {quoteData.footer}
      </p>
      
      {/* ROBOTIC ELEMENT: Bottom connector accent */}
      <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-accent/40 group-hover:w-full transition-all duration-700"></div>
    </div>

  </section>
);

export default Quote;