"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Cloud } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const ThemeToggle = ({ isDarkMode, setIsDarkMode }: ThemeToggleProps) => {
  return (
    <div className="absolute top-6 right-6 z-50">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative w-20 h-10 rounded-full p-1 transition-colors duration-500 shadow-inner overflow-hidden border
          ${isDarkMode ? "bg-slate-900 border-slate-700" : "bg-sky-200 border-sky-300"}`}
      >
        {/* Background Elements (Clouds & Stars) */}
        <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
          {/* Stars for Dark Mode */}
          <motion.div
            initial={false}
            animate={{ opacity: isDarkMode ? 1 : 0, y: isDarkMode ? 0 : 10 }}
            className="flex gap-1"
          >
            <Star size={8} className="text-white fill-white" />
            <Star size={5} className="text-slate-400 fill-slate-400 mt-2" />
          </motion.div>

          {/* Clouds for Light Mode */}
          <motion.div
            initial={false}
            animate={{ opacity: isDarkMode ? 0 : 1, y: isDarkMode ? -10 : 0 }}
            className="flex gap-1 ml-auto"
          >
            <Cloud size={10} className="text-white fill-white mt-1" />
            <Cloud size={12} className="text-white/80 fill-white/80" />
          </motion.div>
        </div>

        {/* Sliding Thumb */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={`relative w-8 h-8 rounded-full shadow-md z-10 flex items-center justify-center
            ${isDarkMode ? "bg-slate-800 ml-auto" : "bg-white ml-0"}`}
        >
          <AnimatePresence mode="wait">
            {isDarkMode ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                className="relative w-full h-full rounded-full bg-slate-200 overflow-hidden"
              >
                {/* Craters */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-slate-300/80 rounded-full" />
                <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-slate-300/80 rounded-full" />
                <div className="absolute top-4 left-1 w-1 h-1 bg-slate-300/80 rounded-full" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                className="w-5 h-5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;
