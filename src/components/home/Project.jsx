"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { projectData } from '@/data/projects';
import { X, ExternalLink, ArrowRight } from 'lucide-react';

const Projects = ({ showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const displayedProjects = showAll ? projectData : projectData.slice(0, 6);

  return (
    <section className="py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4 flex-1">
          {/* Changed text-white to text-foreground */}
          <h2 className="text-2xl text-foreground font-mono">
            <span className="text-accent">#</span>
            {showAll ? 'all-projects' : 'projects'}
          </h2>
          <div className="h-[1px] bg-accent w-full max-w-[300px]"></div>
        </div>
        
        {!showAll && (
          <Link 
            href="/projects" 
            className="hidden md:block text-sm text-foreground/60 hover:text-foreground transition-colors font-mono"
          >
            View all ~~{">"}
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProjects.map((project, index) => (
          <div key={index} className="border border-border bg-background flex flex-col hover:border-accent transition-all duration-300 group">
            <div className="h-48 overflow-hidden border-b border-border bg-card">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              {/* Changed text-white to text-foreground */}
              <h3 className="text-foreground text-lg font-medium mb-2">{project.title}</h3>
              <p className="text-sm text-foreground/60 mb-4 line-clamp-2 font-mono">
                {project.description}
              </p>
              <button 
                onClick={() => openModal(project)}
                className="mt-auto w-fit text-accent text-xs font-mono hover:underline cursor-pointer"
              >
                Read more ~~{">"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      {!showAll && projectData.length > 6 && (
        <div className="mt-10 flex justify-center">
          <Link href="/projects">
            {/* Changed text-white to text-foreground */}
            <button className="px-6 py-2 border border-accent text-foreground font-mono text-sm hover:bg-accent/10 transition-all flex items-center gap-2 group cursor-pointer">
              View More Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      )}

      {/* --- PROJECT POPUP (MODAL) --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          {/* Using text-foreground for all children inside modal */}
          <div className="relative w-full max-w-2xl bg-background border border-accent p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-foreground">
            <button onClick={closeModal} className="absolute top-4 right-4 text-foreground/50 hover:text-accent transition-colors cursor-pointer">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-semibold mb-2">{selectedProject.title}</h2>
            <p className="text-accent font-mono text-sm mb-6">{selectedProject.description}</p>
            
            <div className="space-y-4">
              <h4 className="font-mono text-sm border-b border-border pb-2 uppercase tracking-widest font-bold">Key Contributions</h4>
              <ul className="space-y-3">
                {selectedProject.details?.map((detail, i) => (
                  <li key={i} className="text-sm text-foreground/80 font-mono flex gap-3">
                    <span className="text-accent">▹</span> {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
              {selectedProject.link && selectedProject.link !== "#" ? (
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-accent text-foreground hover:bg-accent/10 transition-colors font-mono text-sm"
                >
                  View Project <ExternalLink size={14} />
                </a>
              ) : (
                <span className="text-foreground/30 text-xs font-mono italic">
                  Private Project / No Link
                </span>
              )}
              
              <button 
                onClick={closeModal} 
                className="text-foreground/40 hover:text-accent text-sm font-mono cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;