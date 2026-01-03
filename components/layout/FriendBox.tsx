"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Mic, Clock, Plus } from "lucide-react";
// import EmotionBadge from "./EmotionBadge"; // Giả sử bạn có component này

// --- TYPE DEFINITIONS ---
export interface Friend {
  id: string | number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "recording";
  lastTrack?: string;
  timeAgo?: string;
  emotion?: string; // tùy vào EmotionBadge
}

interface FriendBoxProps {
  friends: Friend[];
}

const FriendBox: React.FC<FriendBoxProps> = ({ friends }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, y: 10 },
    visible: { opacity: 1, x: 0, y: 0 }
  };

  return (
    <motion.div
    //   variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute right-6 top-1/2 -translate-y-1/2 z-4000 hidden xl:flex flex-col gap-4"
    >
      <div className="relative p-5 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.15)] w-[260px] overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-white/40 to-white/10" />
        <div className="absolute -z-10 -top-20 -right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pl-2 relative z-10">
          <div className="flex items-center gap-2 relative">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute" />
             <div className="w-2 h-2 rounded-full bg-green-400 relative" />
             <h3 className="text-sm font-bold text-slate-700 tracking-wider">
               FRIENDS
             </h3>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-white/50 border border-white/50 text-[10px] font-bold text-slate-500 shadow-sm backdrop-blur-sm">
            {friends.length} Active
          </div>
        </div>

        {/* Friend List */}
        <div className="flex flex-col gap-4 relative z-10">
          {friends.map((friend) => (
            <motion.div
              key={friend.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, x: 5 }}
              className="group relative flex items-center gap-3.5 p-2.5 rounded-2xl bg-white/30 border border-white/40 hover:bg-white/60 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer"
            >
              {/* Avatar Container */}
              <div className="relative flex-shrink-0">
                <div className={`w-11 h-11 rounded-full p-[2px] ${
                   friend.status === 'recording' ? 'bg-gradient-to-tr from-red-400 to-orange-400 animate-[spin_3s_linear_infinite]' : 
                   friend.status === 'online' ? 'bg-gradient-to-tr from-green-300 to-emerald-300' :
                   'bg-slate-200'
                }`}>
                   <div className="w-full h-full rounded-full bg-white p-[2px]">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                   </div>
                </div>
                
                {/* Status Indicator */}
                {friend.status === 'recording' && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center">
                      <Mic size={8} className="text-white" />
                    </span>
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-800">{friend.name}</span>
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock size={8} /> {friend.timeAgo}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate max-w-[90px] ${friend.status === 'recording' ? 'text-red-500 font-medium' : 'text-slate-500 group-hover:text-primary transition-colors'}`}>
                    {friend.status === 'recording' ? 'Recording...' : friend.lastTrack}
                  </p>
                    {/* {friend.emotion && <EmotionBadge type={friend.emotion} mini />} */}
                </div>
              </div>
              
              {/* Hover Effect: Play Overlay */}
              {friend.status !== 'recording' && (
                 <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                     <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary scale-0 group-hover:scale-100 transition-transform duration-300">
                        <Play size={12} fill="currentColor" />
                     </div>
                 </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative */}
        <div className="mt-6 pt-2 border-t border-white/40 flex justify-center">
           <motion.button 
             whileHover={{ scale: 1.1, rotate: 90 }}
             whileTap={{ scale: 0.9 }}
             className="w-8 h-8 rounded-full bg-white/60 hover:bg-white text-slate-400 hover:text-primary shadow-sm flex items-center justify-center transition-all"
           >
             <Plus size={16} />
           </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default FriendBox;
