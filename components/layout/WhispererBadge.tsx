'use client';

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export function WhispererBadge() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm text-xs font-bold text-slate-400"
      >
        Guest
      </motion.div>
    );
  }

  const initials = user.displayName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || user.username.slice(0, 2).toUpperCase();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 rounded-2xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md border border-white/60 cursor-pointer"
    >
      <div className="flex flex-col items-end leading-none gap-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">Whisperer</span>
        <span className="text-sm font-black text-slate-800 tracking-tight">{user.displayName}</span>
      </div>

      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-xs font-black text-white shadow-lg shadow-primary/20">
        {user.avatar ? (
          <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-xl" />
        ) : (
          initials
        )}
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 shadow-sm" />
      </div>
    </motion.div>
  );
}
