import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface RecordButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

export function RecordButton({ isRecording, onClick }: RecordButtonProps) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500] flex items-center justify-center">
      <div className="relative flex items-center justify-center w-24 h-24">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={clsx(
              "absolute inset-0 rounded-full border",
              isRecording ? "border-red-500/50 bg-red-500/10" : "border-primary/30 bg-primary/5"
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.6, 2.2],
            }}
            transition={{
              repeat: Infinity,
              duration: isRecording ? 1.4 : 2.2,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            "relative z-10 flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-colors",
            isRecording ? "bg-red-500 text-white" : "bg-white text-primary"
          )}
        >
          <Mic size={28} strokeWidth={2.5} />
        </button>
        
      </div>
    </div>
  );
}
