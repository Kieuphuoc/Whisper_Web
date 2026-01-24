"use client";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { MemoryCard } from "@/components/memory/MemoryCard";
import { voicePins } from "@/data/mockVoiceFlow";
import RecordNewCard from "@/components/memory/RecordNewCard";

export default function MyMemoryPage() {
  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden">

      {/* Background */}
      <div
        className="fixed inset-0 z-0 blur-[2px] scale-110"
        style={{
          backgroundImage: "url('/assets/images/background.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 min-h-screen">

        {/* Header */}
        <header className="mb-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, type: "spring", bounce: .4 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
                My <span className="text-primary inline-block hover:scale-110 transition-transform">Memory</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                Rewind time through your voice.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-slate-100 text-sm font-bold text-slate-600 hover:border-primary hover:text-primary transition shadow-sm"
            >
              <Filter size={16} />
              Filter
            </motion.button>
          </motion.div>
        </header>

        {/* Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">

          {/* Create new */}
          <RecordNewCard />

          {/* Voice memories */}
          {voicePins.map((item, index) => (
            <MemoryCard key={item.id} item={item} index={index + 1} />
          ))}

          {/* Loading hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="col-span-full flex justify-center py-8"
          >
            <div className="flex gap-2">
              {[0, .2, .4].map(d => (
                <span
                  key={d}
                  className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
                  style={{ animationDelay: `${d}s` }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
