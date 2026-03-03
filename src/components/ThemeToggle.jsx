"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 border border-accent/30 text-accent rounded-2xl hover:bg-accent/10 transition-all duration-300 cursor-pointer flex items-center justify-center active:scale-90"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="transition-transform duration-500 rotate-0" />
      ) : (
        <Moon size={20} className="transition-transform duration-500 rotate-12" />
      )}
    </button>
  );
}