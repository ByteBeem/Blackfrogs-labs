"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative group"
      aria-label="Toggle theme"
    >
      {/* Button container with gradient border */}
      <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-[2px] hover:scale-110 transition-transform duration-300">
        {/* Inner background */}
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
          {/* Animated background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20 transition-opacity duration-500 ${
              isAnimating ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />
          
          {/* Icons container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Sun icon (light mode) */}
            <Sun
              className={`absolute text-amber-500 transition-all duration-500 ${
                theme === "light"
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-0 opacity-0"
              }`}
              size={24}
            />
            
            {/* Moon icon (dark mode) */}
            <Moon
              className={`absolute text-blue-400 transition-all duration-500 ${
                theme === "dark"
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
              size={24}
            />
          </div>

          {/* Ripple effect on click */}
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-2xl animate-ping" />
            </div>
          )}
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {theme === "dark" ? "Light mode" : "Dark mode"}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
      </div>
    </button>
  );
}

// Alternative compact version for mobile
export function ThemeToggleCompact() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute text-amber-500 transition-all duration-300 ${
            theme === "light" ? "rotate-0 scale-100" : "rotate-180 scale-0"
          }`}
          size={20}
        />
        <Moon
          className={`absolute text-blue-400 transition-all duration-300 ${
            theme === "dark" ? "rotate-0 scale-100" : "-rotate-180 scale-0"
          }`}
          size={20}
        />
      </div>
      <span className="text-sm font-medium text-slate-900 dark:text-white">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}

// Floating toggle button (can be placed anywhere)
export function ThemeToggleFloating() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-24 right-6 z-40 group"
      aria-label="Toggle theme"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg hover:shadow-emerald-500/50 dark:hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110">
        <div className="absolute inset-[2px] bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Sun
              className={`absolute text-amber-500 transition-all duration-500 ${
                theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
              }`}
              size={20}
            />
            <Moon
              className={`absolute text-blue-400 transition-all duration-500 ${
                theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
              }`}
              size={20}
            />
          </div>
        </div>
        
        {isAnimating && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full animate-ping" />
        )}
      </div>
    </button>
  );
}