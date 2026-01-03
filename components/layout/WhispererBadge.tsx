import React from "react";
import { motion } from "framer-motion";

interface WhispererBadgeProps {
  name?: string;
  role?: string;
  initials?: string;
}

export const WhispererBadge = ({
  name = "Juno R.",
  role = "Whisperer",
  initials = "JR",
}: WhispererBadgeProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-3 rounded-full bg-white/70 px-1.5 py-1.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] ring-1 ring-white/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-indigo-500/10 hover:ring-white"
    > 
      {/* === AVATAR SECTION === */}
      <div className="relative">
        {/* Vòng tròn lan tỏa (Pulse Effect) */}
        <div className="absolute inset-0 -m-1 animate-ping rounded-full bg-indigo-500/20 opacity-0 group-hover:opacity-100 duration-1000" />
        
        {/* Avatar chính */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-inner ring-2 ring-white transition-transform duration-300 group-hover:rotate-12">
          {initials}
        </div>

        {/* Status Dot (Chấm xanh báo online) */}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
      </div>

      {/* === TEXT INFO === */}
      <div className="flex flex-col items-end text-right">
        {/* Role Label */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/80 transition-colors group-hover:text-indigo-500">
          {role}
        </p>
        
        {/* User Name với hiệu ứng Gradient Text khi hover */}
        <p className="text-sm font-bold text-slate-700 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600">
          {name}
        </p>
      </div>
      
      {/* Hiệu ứng Shine quét qua khi hover (Optional) */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-full opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
      </div>
    </motion.button>
  );
};