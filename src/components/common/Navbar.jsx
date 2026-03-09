"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import ContactModal from "./ContactModal";
import navData from "@/data/nav";
import socialData from "@/data/social";
import { Menu, X, Terminal } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fix for mobile sticky: Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* 1. Changed to 'fixed' instead of 'sticky' for better mobile reliability.
          2. Added 'left-0' and 'right-0' to ensure width is consistent.
      */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-background/80 backdrop-blur-md border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-5 gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="font-bold flex items-center gap-1 text-foreground text-lg group"
            >
              <span className="text-accent group-hover:rotate-12 transition-transform">
                @
              </span>
              <span className="tracking-tight">
                Abhi<span className="text-accent">jeet</span>
              </span>
            </Link>

            <div className="flex items-center gap-4 md:gap-8">
              {/* Desktop Menu */}
              <ul className="hidden md:flex gap-6 md:gap-10 text-sm font-mono items-center">
                {navData.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <li key={item.name}>
                      {item.name === "contact-me" ? (
                        <button
                          onClick={() => setIsContactOpen(true)}
                          className="relative px-4 py-1.5 border border-accent/40 text-accent font-mono text-xs uppercase tracking-tighter overflow-hidden group transition-all duration-300 hover:border-accent hover:bg-accent/5 active:scale-95 cursor-pointer"
                        >
                          <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>

                          <div className="flex items-center gap-1.5">
                            <span className="text-accent group-hover:animate-pulse">[</span>
                            <span className="relative">
                              {item.name}
                              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300"></span>
                            </span>
                            <span className="text-accent group-hover:animate-pulse">]</span>
                          </div>
                        </button>
                      ) : (
                        <Link
                          href={item.path}
                          className={`transition-colors group flex items-center gap-0.5 ${isActive
                              ? "text-foreground font-bold underline decoration-accent decoration-2 underline-offset-4"
                              : "text-foreground/60 hover:text-accent"
                            }`}
                        >
                          <span
                            className={`text-accent transition-opacity ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}
                          >
                            #
                          </span>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <ThemeToggle />

              {/* Mobile Toggle */}
              <button
                className="md:hidden text-accent p-1 border border-accent/20 cursor-pointer z-[110]"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* --- MOBILE MENU DRAWER --- */}
        <div
          className={`fixed inset-0 top-0 z-[105] w-full h-screen bg-background md:hidden transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full p-8 pt-24 font-mono">
            <p className="text-accent/30 text-xs mb-8 uppercase tracking-[0.3em]">
              System_Navigation
            </p>

            <ul className="flex flex-col gap-6 text-lg">
              {navData.map((item) => (
                <li key={item.name}>
                  {item.name === "contact-me" ? (
                    <button
                      onClick={() => {
                        setIsContactOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-foreground/60 hover:text-accent flex items-center gap-2"
                    >
                      <span className="text-accent">#</span>
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-2 transition-transform ${pathname === item.path ? "text-accent translate-x-2" : "text-foreground/60"
                        }`}
                    >
                      <span className="text-accent">#</span>
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="mb-8">
                <p className="text-[10px] text-accent/30 uppercase tracking-widest mb-6">
                  // External_Nodes
                </p>
                <div className="flex flex-wrap gap-5">
                  {socialData.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/40 hover:text-accent transition-all hover:-translate-y-1 active:scale-90"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-accent/10 w-full flex items-center gap-2 text-accent/40 text-xs italic">
                <Terminal size={14} className="animate-pulse" />
                <span>root@abhijeet:~$ standing_by</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-[73px] w-full md:h-[80px]"></div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};

export default Navbar;