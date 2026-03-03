"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tv,
  RefreshCcw,
  X,
  PlayCircle,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function TutorialVideo() {
  const [groupedContent, setGroupedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const fetchPlaylistWiseData = async () => {
      try {
        setLoading(true);
        // 1. Fetch all playlist from your internal API
        const playlistRes = await axios.get("/api/youtube/playlist");
        const playlistItems = playlistRes.data || [];

        // 2. Map through each playlist and fetch its specific videos
        const detailedContent = await Promise.all(
          playlistItems.map(async (playlist) => {
            const videoRes = await axios.get(
              `/api/youtube/playlist-items?playlistId=${playlist.id}`,
            );
            return {
              playlistTitle: playlist.snippet.title,
              playlistId: playlist.id,
              videos: videoRes.data || [],
            };
          }),
        );

        // 3. FILTER: Only keep playlists that contain at least one video
        const activeContent = detailedContent.filter(
          (group) => group.videos.length > 0,
        );

        setGroupedContent(activeContent);
      } catch (err) {
        console.error("Transmission_Failure:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistWiseData();
  }, []);

  const openVideo = (v) => {
    setSelectedVideo(v);
    setIsClosing(false);
  };
  const closeVideo = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedVideo(null);
      setIsClosing(false);
    }, 300);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-accent animate-pulse">
        // Syncing_Playlist_Nodes...
      </div>
    );

  return (
    <main className="min-h-screen pt-28 pb-12 px-4 md:px-12 font-mono bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* HUD Header */}
        <div className="mb-12 border-b border-accent/20 pb-6">
          <h1 className="text-3xl font-bold tracking-tighter flex items-center gap-3 text-foreground">
            <Tv className="text-accent" />{" "}
            <span className="text-accent">#</span>tutorials_by_playlist
          </h1>
          <p className="text-[10px] text-foreground/40 mt-2 tracking-widest">
            Authorized_Access_Only // Log_Source: YouTube_API
          </p>
        </div>

        {/* Playlist Sections: Will only render if groupedContent has items */}
        {groupedContent.length > 0 ? (
          groupedContent.map((group) => (
            <section key={group.playlistId} className="mb-16">
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <Layers size={20} className="text-accent" />
                <h2 className="text-xl font-bold group-hover:text-accent transition-colors text-foreground">
                  {group.playlistTitle}
                </h2>
                <ChevronRight
                  size={18}
                  className="text-accent/40 group-hover:translate-x-1 transition-transform"
                />
                <div className="flex-1 h-[1px] bg-accent/10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {group.videos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() => openVideo(video)}
                    className="group border border-border bg-card p-4 hover:border-accent transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-video mb-4 overflow-hidden border border-border">
                      <img
                        src={video.snippet?.thumbnails?.medium?.url}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt="thumbnail"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="text-accent w-10 h-10" />
                      </div>
                    </div>
                    <h4 className="text-xs font-medium line-clamp-2 leading-snug group-hover:text-accent transition-colors text-foreground">
                      {video.snippet.title}
                    </h4>
                    <div className="mt-3 text-[9px] tracking-tighter opacity-40 text-foreground">
                      ID: {video.snippet.resourceId?.videoId.substring(0, 8)}...
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          /* Empty State Node */
          <div className="text-center py-20 border border-dashed border-accent/20 bg-accent/5">
            <p className="text-accent tracking-[0.4em] text-xs font-bold animate-pulse">
              // ERROR: No_Active_Data_Packets_Found
            </p>
          </div>
        )}
      </div>

      {/* --- PREMIUM MODAL PLAYER --- */}
      {selectedVideo && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 ${isClosing ? "pointer-events-none" : ""}`}
        >
          <div
            className={`absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
            onClick={closeVideo}
          />
          <div
            className={`relative w-full max-w-5xl aspect-video bg-black border border-accent shadow-2xl z-10 will-change-transform ${isClosing ? "animate-scale-out" : "animate-scale-in"}`}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 md:-right-12 text-foreground/50 hover:text-accent transition-all hover:rotate-90 duration-300 p-2 cursor-pointer"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId?.videoId}?autoplay=1&rel=0`}
              title={selectedVideo.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Re-use your CSS keyframes here */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-out {
          animation: fadeOut 0.3s ease-in forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-out {
          animation: scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
        }
      `}</style>
    </main>
  );
}
