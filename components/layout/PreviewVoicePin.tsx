import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Send, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- STYLES: Primary Color & Keyframes ---
// Định nghĩa biến màu và keyframes cho animation đặc biệt
const customStyles = `
  :root {
    --primary: 99 102 241; /* RGB của Indigo-500 */
  }
  .bg-primary { background-color: rgb(var(--primary)); }
  .text-primary { color: rgb(var(--primary)); }
  .border-primary { border-color: rgb(var(--primary)); }
  .shadow-primary-glow { box-shadow: 0 10px 40px -10px rgba(var(--primary), 0.5); }
  .ring-primary { --tw-ring-color: rgb(var(--primary)); }

  /* Keyframe cho hiệu ứng quét sáng nút Post */
  @keyframes shine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
  .animate-shine {
    animation: shine 1.5s ease-in-out infinite;
  }
`;

interface PreviewVoicePinProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (description: string) => void;
  audioDuration?: string; // Ví dụ: "0:45"
}

export default function PreviewVoicePin({
  isOpen,
  onClose,
  onPost,
  audioDuration = "0:45",
}: PreviewVoicePinProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  // Giả lập chạy progress bar khi play
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>{customStyles}</style>
          
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            {/* MAIN CARD */}
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/50"
            >
              
              {/* === HEADER: WAVEFORM PLAYER === */}
              <div className="relative p-6 bg-gradient-to-b from-gray-50/50 to-white">
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors text-gray-400 hover:text-gray-600 outline-none"
                >
                  <X size={20} />
                </button>

                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                    <Mic size={14} />
                  </span>
                  Preview Voice Pin
                </h2>

                {/* Player Container */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-primary-glow hover:brightness-110 transition-all outline-none"
                  >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </motion.button>

                  {/* Waveform Visualization */}
                  <div className="flex-1 flex flex-col justify-center gap-2">
                    {/* Dummy Waveform Bars */}
                    <div className="flex items-center gap-[3px] h-8">
                       {Array.from({ length: 20 }).map((_, i) => (
                         <WaveBar key={i} isPlaying={isPlaying} index={i} />
                       ))}
                    </div>
                    
                    {/* Time & Progress */}
                    <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                      <span>0:{Math.floor((progress / 100) * 45).toString().padStart(2, '0')}</span>
                      
                      {/* Custom Progress Bar */}
                      <div className="relative flex-1 mx-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute inset-y-0 left-0 bg-primary rounded-full"
                          layoutId="progress"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <span>{audioDuration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* === BODY: INPUT DESCRIPTION === */}
              <div className="p-6 pt-2">
                <div className="space-y-4">
                  <div className="group relative">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                      Description
                    </label>
                    <div className="relative">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Chia sẻ câu chuyện của bạn..."
                            maxLength={200}
                            className="w-full h-28 p-4 bg-gray-50/50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300 text-gray-700 placeholder:text-gray-400"
                        />
                        {/* Character Count */}
                        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm border border-gray-100">
                            <span className={description.length > 180 ? "text-red-500" : "text-primary"}>
                                {description.length}
                            </span>
                            /200
                        </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="flex-1 py-3.5 rounded-xl font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors outline-none"
                    >
                      Hủy
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onPost(description)}
                      className="flex-[2] py-3.5 rounded-xl font-bold text-white bg-primary shadow-primary-glow flex items-center justify-center gap-2 relative overflow-hidden group outline-none"
                    >
                      {/* Hiệu ứng Shine quét qua nút (đã được fix keyframe) */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shine_1s_ease-in-out]" />
                      
                      <span className="relative z-10">Post Voice Pin</span>
                      <Send size={18} className="relative z-10" />
                    </motion.button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// === SUB-COMPONENT: WAVE BAR ===
interface WaveBarProps {
  isPlaying: boolean;
  index: number;
}

const WaveBar: React.FC<WaveBarProps> = ({ isPlaying, index }) => {
  // Random height nhưng cố định theo index để không bị flicker khi re-render
  // Sử dụng useMemo hoặc fix cứng nếu cần. Ở đây để đơn giản ta dùng random trong animate
  
  return (
    <motion.div
      className="w-1.5 bg-primary/40 rounded-full origin-bottom"
      animate={{
        // Khi play: Chiều cao random từ 20% đến 100%. Khi pause: Về 20%
        height: isPlaying ? ["20%", `${Math.max(30, Math.random() * 100)}%`, "20%"] : "20%",
        backgroundColor: isPlaying ? "rgb(var(--primary))" : "rgba(var(--primary), 0.3)",
      }}
      transition={{
        duration: 0.4 + Math.random() * 0.2, // Random duration để sóng không đều nhau
        repeat: Infinity,
        repeatType: "reverse",
        delay: index * 0.05,
        ease: "easeInOut"
      }}
      style={{ height: "20%" }} 
    />
  );
};