// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { projectData } from '@/data/projects';
// import { X, ExternalLink, ArrowRight } from 'lucide-react';

// const Projects = ({ showAll = false }) => {
//   const [selectedProject, setSelectedProject] = useState(null);

//   const openModal = (project) => setSelectedProject(project);
//   const closeModal = () => setSelectedProject(null);

//   const displayedProjects = showAll ? projectData : projectData.slice(0, 6);

//   return (
//     <section className="py-10 px-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-10">
//         <div className="flex items-center gap-4 flex-1">
//           {/* Changed text-white to text-foreground */}
//           <h2 className="text-2xl text-foreground font-mono">
//             <span className="text-accent">#</span>
//             {showAll ? 'all-projects' : 'projects'}
//           </h2>
//           <div className="h-[1px] bg-accent w-full max-w-[300px]"></div>
//         </div>

//         {!showAll && (
//           <Link 
//             href="/projects" 
//             className="hidden md:block text-sm text-foreground/60 hover:text-foreground transition-colors font-mono"
//           >
//             View all ~~{">"}
//           </Link>
//         )}
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {displayedProjects.map((project, index) => (
//           <div key={index} className="border border-border bg-background flex flex-col hover:border-accent transition-all duration-300 group">
//             <div className="h-48 overflow-hidden border-b border-border bg-card">
//               <img 
//                 src={project.imageUrl} 
//                 alt={project.title}
//                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
//               />
//             </div>
//             <div className="p-4 flex-1 flex flex-col">
//               {/* Changed text-white to text-foreground */}
//               <h3 className="text-foreground text-lg font-medium mb-2">{project.title}</h3>
//               <p className="text-sm text-foreground/60 mb-4 line-clamp-2 font-mono">
//                 {project.description}
//               </p>
//               <button 
//                 onClick={() => openModal(project)}
//                 className="mt-auto w-fit text-accent text-xs font-mono hover:underline cursor-pointer"
//               >
//                 Read more ~~{">"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Button */}
//       {!showAll && projectData.length > 6 && (
//         <div className="mt-10 flex justify-center">
//           <Link href="/projects">
//             {/* Changed text-white to text-foreground */}
//             <button className="px-6 py-2 border border-accent text-foreground font-mono text-sm hover:bg-accent/10 transition-all flex items-center gap-2 group cursor-pointer">
//               View More Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//           </Link>
//         </div>
//       )}

//       {/* --- PROJECT POPUP (MODAL) --- */}
//       {selectedProject && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
//           {/* Using text-foreground for all children inside modal */}
//           <div className="relative w-full max-w-2xl bg-background border border-accent p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl text-foreground">
//             <button onClick={closeModal} className="absolute top-4 right-4 text-foreground/50 hover:text-accent transition-colors cursor-pointer">
//               <X size={24} />
//             </button>

//             <h2 className="text-2xl font-semibold mb-2">{selectedProject.title}</h2>
//             <p className="text-accent font-mono text-sm mb-6">{selectedProject.description}</p>

//             <div className="space-y-4">
//               <h4 className="font-mono text-sm border-b border-border pb-2 uppercase tracking-widest font-bold">Key Contributions</h4>
//               <ul className="space-y-3">
//                 {selectedProject.details?.map((detail, i) => (
//                   <li key={i} className="text-sm text-foreground/80 font-mono flex gap-3">
//                     <span className="text-accent">▹</span> {detail}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
//               {selectedProject.link && selectedProject.link !== "#" ? (
//                 <a 
//                   href={selectedProject.link} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 px-4 py-2 border border-accent text-foreground hover:bg-accent/10 transition-colors font-mono text-sm"
//                 >
//                   View Project <ExternalLink size={14} />
//                 </a>
//               ) : (
//                 <span className="text-foreground/30 text-xs font-mono italic">
//                   Private Project / No Link
//                 </span>
//               )}

//               <button 
//                 onClick={closeModal} 
//                 className="text-foreground/40 hover:text-accent text-sm font-mono cursor-pointer"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Projects;


//  new code
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { projectData } from '@/data/projects';
import { X, ExternalLink, ArrowRight } from 'lucide-react';

const Projects = ({ showAll = false }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle Mounting/Unmounting for smooth animations
  useEffect(() => {
    if (selectedProject) {
      setShouldRender(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    }
  }, [selectedProject]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShouldRender(false);
      setSelectedProject(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  const displayedProjects = showAll ? projectData : projectData.slice(0, 6);

  return (
    <section className="py-10 px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-xl md:text-2xl text-foreground font-mono whitespace-nowrap">
            <span className="text-accent">#</span>
            {showAll ? 'all-projects' : 'projects'}
          </h2>
          <div className="h-[1px] bg-accent w-full max-w-[100px] md:max-w-[300px]"></div>
        </div>

        {!showAll && (
          <Link
            href="/projects"
            className="text-sm text-foreground/60 hover:text-foreground transition-colors font-mono whitespace-nowrap"
          >
            View all ~~{">"}
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedProjects.map((project, index) => (
          <div key={index} className="border border-border bg-background flex flex-col hover:border-accent transition-all duration-300 group">
            <div className="h-48 overflow-hidden border-b border-border bg-card">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-foreground text-lg font-medium mb-2">{project.title}</h3>
              <p className="text-sm text-foreground/60 mb-4 line-clamp-2 font-mono">
                {project.description}
              </p>
              <button
                onClick={() => setSelectedProject(project)}
                className="mt-auto w-fit text-accent text-xs font-mono hover:underline cursor-pointer"
              >
                Read more ~~{">"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {!showAll && projectData.length > 6 && (
        <div className="mt-10 flex justify-center">
          <Link href="/projects" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-2 border border-accent text-foreground font-mono text-sm hover:bg-accent/10 transition-all flex items-center justify-center gap-2 group cursor-pointer">
              View More Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      )}

      {/* --- RESPONSIVE MODAL --- */}
      {shouldRender && (
        <div
          className={`fixed inset-0 z-[100] flex justify-center overflow-y-auto p-4 py-8 sm:items-center ${isClosing ? 'pointer-events-none' : ''}`}
        >
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div
            className={`relative w-full max-w-2xl bg-background border border-accent p-6 md:p-8 h-fit shadow-2xl text-foreground z-10 
            ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HUD Header for Projects */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-1 pr-8">{selectedProject.title}</h2>
                <div className="h-[2px] bg-accent w-12"></div>
              </div>
              <button
                onClick={closeModal}
                className="text-foreground/50 hover:text-accent transition-colors cursor-pointer p-1"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-accent font-mono text-sm mb-6 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-mono text-sm border-b border-border pb-2 uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-accent"></span> Key_Contributions
              </h4>
              <ul className="space-y-3">
                {selectedProject.details?.map((detail, i) => (
                  <li key={i} className="text-sm text-foreground/80 font-mono flex gap-3 leading-relaxed">
                    <span className="text-accent shrink-0">▹</span> {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
              {selectedProject.link && selectedProject.link !== "#" ? (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center flex items-center justify-center gap-2 px-6 py-2 border border-accent text-foreground hover:bg-accent/10 transition-colors font-mono text-sm group"
                >
                  View Live Project <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ) : (
                <span className="text-foreground/30 text-xs font-mono italic">
                  &gt; REPOSITORY_PRIVATE
                </span>
              )}

              <button
                onClick={closeModal}
                className="text-foreground/40 hover:text-accent text-sm font-mono cursor-pointer flex items-center gap-2"
              >
                [ Close ]
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-out { animation: scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { 
          from { opacity: 0; transform: scale(0.9) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        @keyframes scaleOut { 
          from { opacity: 1; transform: scale(1); } 
          to { opacity: 0; transform: scale(0.95) translateY(20px); } 
        }
      `}</style>
    </section>
  );
};

export default Projects;