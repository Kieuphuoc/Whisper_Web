import { useState, useEffect } from "react";
import { Globe, Users, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function RadarFilterMode() {
  const [activeTab, setActiveTab] = useState("Public");
  
  // Giả lập số liệu Pin tìm thấy (Trong thực tế bạn sẽ lấy từ API/State của map)
  const [counts, setCounts] = useState({ Public: 42, Friend: 8, Private: 3 });

  const tabs = [
    { id: "Public", icon: Globe, label: "Public" },
    { id: "Friend", icon: Users, label: "Friends" },
    { id: "Private", icon: Lock, label: "Private" },
  ];

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[500]">
      {/* Container chính */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "relative flex items-center justify-center py-2.5 text-sm font-medium rounded-full transition-all duration-500 outline-none z-10",
                // Active: rộng ra để hiện số liệu. Inactive: chỉ hiện icon
                isActive ? "px-6 text-white" : "w-11 text-slate-400 hover:text-slate-600 hover:bg-white/40"
              )}
            >
              {/* === BACKGROUND ANIMATION === */}
              {isActive && (
                <>
                  {/* Lớp nền chính */}
                  <motion.div
                    layoutId="radar-pill"
                    className="absolute inset-0 bg-[#4a56e2] rounded-full shadow-lg shadow-[#4a56e2]/40"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                  
                  {/* Hiệu ứng Radar Pulse (Sóng lan tỏa) */}
                  <motion.div
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      ease: "easeOut",
                      delay: 0.2
                    }}
                    className="absolute inset-0 rounded-full border border-[#4a56e2]"
                  />
                </>
              )}

              {/* === CONTENT (ICON + TEXT + COUNT) === */}
              <motion.div 
                className="relative z-10 flex items-center gap-2 overflow-hidden whitespace-nowrap"
                layout
              >
                {/* Icon */}
                <Icon 
                  size={18} 
                  strokeWidth={isActive ? 2.5 : 2} // Đậm hơn khi active
                  className={clsx("transition-transform", isActive ? "scale-110" : "scale-100")} 
                />
                
                {/* Text & Count chỉ hiện khi Active */}
                {/* <AnimatePresence mode="sync" initial={false}> */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                      exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1.5"
                    >
                      <span>{tab.label}</span>
                      
                      {/* Badge số lượng nhỏ xinh */}
                      <span className="flex items-center justify-center bg-white/20 px-1.5 h-5 min-w-[20px] rounded-full text-[10px] font-bold">
                        {counts[tab.id]}
                      </span>
                    </motion.div>
                  )}
                {/* </AnimatePresence> */}
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}