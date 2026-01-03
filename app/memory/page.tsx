"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, MapPin,
  Smile, Frown, CloudRain, Zap,
  Edit3, Save, Mic, Filter, Heart, Plus
} from "lucide-react";
import RecordNewCard from "@/components/layout/RecordNewCard";

// --- TYPES & MOCK DATA ---
type EmotionType = "joy" | "sadness" | "calm" | "excited";

interface MemoryItem {
  id: string;
  date: string;
  location: string;
  duration: string;
  emotion: EmotionType;
  audioUrl: string;
  note: string;
}

const MEMORY_DATA: MemoryItem[] = [
  {
    id: "1",
    date: "29 Aug, 10:30 AM",
    location: "Da Lat, Lam Dong",
    duration: "1:45",
    emotion: "calm",
    audioUrl: "#",
    note: "Sương sớm Đà Lạt thật đẹp, cảm thấy bình yên lạ thường...",
  },
  {
    id: "2",
    date: "01 Sep, 08:00 PM",
    location: "District 1, HCMC",
    duration: "0:30",
    emotion: "excited",
    audioUrl: "#",
    note: "Vừa nhận được offer công việc mới! Quá tuyệt vời!",
  },
  {
    id: "3",
    date: "05 Sep, 11:15 PM",
    location: "Home Sweet Home",
    duration: "2:10",
    emotion: "sadness",
    audioUrl: "#",
    note: "",
  },
];

// --- COMPONENTS ---

const EmotionBadge = ({ type }: { type: EmotionType }) => {
  const config = {
    joy: { icon: Smile, color: "text-amber-500", bg: "bg-amber-50", label: "Joyful" },
    sadness: { icon: CloudRain, color: "text-blue-500", bg: "bg-blue-50", label: "Melancholy" },
    calm: { icon: Frown, color: "text-emerald-500", bg: "bg-emerald-50", label: "Calm" },
    excited: { icon: Zap, color: "text-purple-500", bg: "bg-purple-50", label: "Excited" },
  };

  const { icon: Icon, color, bg, label } = config[type];

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${bg} ${color} border border-white/60 shadow-sm`}>
      <Icon size={12} strokeWidth={2.5} />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
};

// Visualizer: Nhịp điệu mạnh mẽ hơn (Bouncy Bars)
const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  return (
    <div className="flex items-end justify-center gap-[3px] h-10 w-full px-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-t-full bg-primary/80"
          animate={{
            height: isPlaying
              ? [`${10 + Math.random() * 20}%`, `${40 + Math.random() * 60}%`, `${10 + Math.random() * 20}%`]
              : "20%",
            backgroundColor: isPlaying ? "var(--primary)" : "rgba(var(--primary), 0.3)",
          }}
          transition={{
            duration: isPlaying ? 0.4 : 1,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.04,
            ease: "backInOut", // Hiệu ứng nảy
          }}
        />
      ))}
    </div>
  );
};



const VoiceMemoryCard = ({ item, index }: { item: MemoryItem; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(item.note);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <motion.div
      // Entrance Animation
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
      // Smoother Hover Effect: Lướt lên nhẹ nhàng thay vì lắc lư
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative flex flex-col gap-5 rounded-[2rem] bg-white p-6 shadow-sm border border-slate-100/80 hover:border-primary/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
    >
      {/* Decorative Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

      {/* HEADER */}
      <div className="flex items-start justify-between z-10">
        <div className="flex gap-4">
          {/* Date Block với nền Primary nhẹ */}
          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-primary/5 text-primary border border-primary/10">
            <span className="text-lg font-bold leading-none">{item.date.split(" ")[0]}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide opacity-70">{item.date.split(" ")[1]}</span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              <MapPin size={10} />
              <span>Location</span>
            </div>
            <span className="text-sm font-semibold text-slate-700 truncate max-w-[140px]">{item.location}</span>
          </div>
        </div>
        <EmotionBadge type={item.emotion} />
      </div>

      {/* PLAYER SECTION */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 group-hover:border-primary/20 transition-all z-10">
        <div className="flex items-center gap-3">
          {/* Play Button - Pulse Effect */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${isPlaying ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'bg-white text-primary border-2 border-primary/10 hover:border-primary'}`}
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
            )}
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </motion.button>

          {/* Visualizer Container */}
          <div className="flex-1 h-12 flex items-center justify-center overflow-hidden">
            <AudioVisualizer isPlaying={isPlaying} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 px-1 mt-2">
          <span className="text-[10px] font-medium text-slate-400">00:00</span>
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{ width: isPlaying ? "100%" : "0%" }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] font-medium text-slate-400">{item.duration}</span>
        </div>
      </div>

      {/* NOTE SECTION */}
      <div className="mt-auto z-10">
        <div className="flex items-center justify-between mb-2 px-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Mic size={10} className="text-primary" /> Memory Note
          </h4>
          <motion.button
            whileHover={{ rotate: 15, scale: 1.1 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`p-1.5 rounded-lg transition-colors ${isEditing ? 'bg-primary text-white shadow-md' : 'text-slate-300 hover:text-primary hover:bg-slate-50'}`}
          >
            {isEditing ? <Save size={14} /> : <Edit3 size={14} />}
          </motion.button>
        </div>

        <motion.div
          layout
          className={`relative rounded-xl transition-all duration-300 ${isEditing ? 'bg-white ring-2 ring-primary shadow-lg scale-105' : 'bg-slate-50/80 hover:bg-slate-100'}`}
        >
          {isEditing ? (
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full h-24 p-3 text-sm bg-transparent border-none outline-none resize-none text-slate-700 placeholder:text-slate-300"
              placeholder="Write your thoughts..."
              autoFocus
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="p-3 text-sm min-h-[50px] cursor-pointer rounded-xl"
            >
              <p className={`line-clamp-2 ${noteContent ? 'text-slate-600' : 'text-slate-400 italic font-light'}`}>
                {noteContent || "Empty note..."}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions (Appear on Hover) */}
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
        <button className="p-2 rounded-full bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 shadow-sm transition-colors"><Heart size={14} /></button>
      </div>
    </motion.div>
  );
};
// ... (Giữ nguyên các imports và code component con)

// --- PAGE LAYOUT ---
export default function MyMemoryPage() {
  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden">

      {/* 1. BACKGROUND CỐ ĐỊNH + BLUR */}
      {/* Thêm blur-[2px] và scale-105 để giấu viền bị nhòe */}
      <div
        className="fixed inset-0 z-0 blur-[2px] scale-110"
        // className="fixed inset-0 z-0 bg-cover bg-center filter blur-[2px] scale-110"

        style={{
          backgroundImage: "url('/assets/images/background.png')", // ← sửa ở đây
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. LỚP NỘI DUNG SCROLL ĐƯỢC */}
      <div className="relative z-10 p-6 md:p-12 min-h-screen">

        {/* Header Minimal */}
        <header className="mb-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
                My <span className="text-primary inline-block hover:scale-110 transition-transform cursor-default">Memory</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                Rewind time through your voice.
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-slate-100 text-sm font-bold text-slate-600 hover:border-primary hover:text-primary transition-colors shadow-sm"
              >
                <Filter size={16} />
                <span>Filter</span>
              </motion.button>
            </div>
          </motion.div>
        </header>

        {/* Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          <RecordNewCard />

          {MEMORY_DATA.map((item, index) => (
            <VoiceMemoryCard key={item.id} item={item} index={index} />
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="col-span-full flex justify-center py-8"
          >
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}