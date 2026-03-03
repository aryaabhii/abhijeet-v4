"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Added for navigation
import { Tv, RefreshCcw, X, PlayCircle, ArrowRight } from "lucide-react";

const VideoGallery = () => {
  const router = useRouter(); // Initialize router
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // MODAL STATES
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Fetching initial 6 videos for the preview
        const { data } = await axios.get("/api/youtube/all?limit=6");
        setVideos(data?.items || []);
      } catch (err) {
        console.error("Transmission_Failure:", err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const openVideo = (video) => {
    setSelectedVideo(video);
    setIsClosing(false);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedVideo(null);
      setIsClosing(false);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 font-mono text-accent animate-pulse">
        <RefreshCcw size={40} className="mb-4 animate-spin" />
        <p className="tracking-[0.3em] uppercase text-[10px] font-bold">Syncing_Internal_Nodes...</p>
      </div>
    );
  }

  return (
    <section id="video-logs" className="py-12 px-4 font-mono">
      <div className="flex flex-col items-center mb-14 text-center">
        <div className="flex items-center gap-2 mb-2">
          <Tv size={18} className="text-accent" />
          <span className="text-[10px] text-accent uppercase tracking-widest font-bold">Media_Stream</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          <span className="text-accent">#</span>video-tutorials
        </h2>
        <div className="h-[1px] w-32 bg-accent/20 mt-4 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {videos.map((video, index) => (
          <div 
            key={`${video.id.videoId || video.id}-${index}`} 
            className="group border border-border bg-card p-4 hover:border-accent transition-all duration-300 cursor-pointer"
            onClick={() => openVideo(video)}
          >
            <div className="relative aspect-video overflow-hidden mb-4 border border-border group-hover:border-accent/40">
              <img 
                src={video.snippet?.thumbnails?.medium?.url} 
                alt={video.snippet?.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="text-accent w-12 h-12" />
              </div>
            </div>
            <h3 className="text-foreground text-sm line-clamp-2 font-medium mb-2">{video.snippet?.title}</h3>
            <div className="flex justify-between items-center opacity-60 text-[10px]">
              <span>{video.snippet?.publishedAt ? new Date(video.snippet.publishedAt).toLocaleDateString() : 'N/A'}</span>
              <span className="text-accent uppercase tracking-tighter">log_{index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- HUD NAVIGATION: REDIRECT TO TUTORIALS --- */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <button 
          onClick={() => router.push('/tutorials')} // Redirect to dedicated page
          className="group flex items-center gap-3 px-10 py-3 border border-accent text-accent hover:bg-accent/10 transition-all cursor-pointer group"
        >
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">
            Explore_All_Tutorials
          </span>
        </button>
        <p className="text-[9px] text-foreground/30 uppercase tracking-[0.2em]">
          Status: Access_Full_Node
        </p>
      </div>

      {/* --- MODAL PLAYER --- */}
      {selectedVideo && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 ${isClosing ? 'pointer-events-none' : ''}`}>
          <div 
            className={`absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
            onClick={closeVideo}
          />
          <div className={`relative w-full max-w-5xl aspect-video bg-black border border-accent shadow-2xl z-10 will-change-transform ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>
            <button 
              onClick={closeVideo} 
              className="absolute -top-12 right-0 md:-right-12 text-foreground/50 hover:text-accent transition-all hover:rotate-90 duration-300 p-2 cursor-pointer"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1&rel=0`}
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-fade-out { animation: fadeOut 0.3s ease-in forwards; }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-out { animation: scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes scaleOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95) translateY(10px); } }
      `}</style>
    </section>
  );
};

export default VideoGallery;