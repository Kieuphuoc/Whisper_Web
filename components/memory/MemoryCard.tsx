import { motion } from "framer-motion";
import { Play, Pause, MapPin, Mic, Edit3, Save, Heart } from "lucide-react";
import { VoicePin } from "@/types/voicepin";
import { useMemoryCard } from "@/hooks/useMemoryCard";

export const MemoryCard = ({ item, index }: { item: VoicePin; index: number }) => {
  const { isPlaying, togglePlay, isEditing, toggleEdit} = useMemoryCard(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: .4 }}
      whileHover={{ y: -6 }} className="group relative flex flex-col gap-4 rounded-[2rem] bg-white p-6 border border-slate-100 shadow-sm hover:shadow-xl transition"
    >
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex flex-col items-center justify-center">
            <span className="font-bold leading-none">{item.createdAt.slice(8,10)}</span>
            <span className="text-[9px] uppercase opacity-70">{item.createdAt.slice(5,7)}</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-[10px] uppercase text-slate-400 font-bold">
              <MapPin size={10}/> Location
            </div>
            <p className="text-sm font-semibold text-slate-700 truncate max-w-[140px]">
              {item.lat.toFixed(3)}, {item.lng.toFixed(3)}
            </p>
          </div>
        </div>
        {item.emotion && <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{item.emotion}</span>}
      </div>

      {/* Player */}
      <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition
              ${isPlaying ? "bg-primary text-white shadow-primary/40" : "bg-white text-primary border"}`}
          >
            {isPlaying ? <Pause size={18}/> : <Play size={18} className="ml-0.5"/>}
          </button>
          <div className="flex-1 h-10 bg-slate-200/50 rounded-xl" />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>00:00</span><span>{item.duration}s</span>
        </div>
      </div>

      {/* Note */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-1">
            <Mic size={10}/> Memory
          </h4>
          <button onClick={toggleEdit} className="text-slate-400 hover:text-primary">
            {isEditing ? <Save size={14}/> : <Edit3 size={14}/>}
          </button>
        </div>

        {isEditing ? (
          <textarea
            // value={note} onChange={e => setNote(e.target.value)}
            className="w-full h-20 rounded-xl p-3 text-sm bg-white border outline-none"
            placeholder="Write something..."
          />
        ) : (
          <p onClick={toggleEdit}
             className="min-h-[40px] p-3 rounded-xl bg-slate-50 text-sm cursor-pointer text-slate-600 line-clamp-2">
            {/* {note || <span className="italic text-slate-400">Empty note…</span>} */}
          </p>
        )}
      </div>

      {/* Quick action */}
      <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
        <Heart size={14} className="text-slate-400 hover:text-rose-500"/>
      </button>
    </motion.div>
  );
};
