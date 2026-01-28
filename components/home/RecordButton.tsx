'use client';
import { Mic, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface RecordButtonProps {
  isRecording: boolean;
  onClick: () => void;
  showRetry?: boolean;
  onRetry?: () => void;
}

export function RecordButton({ isRecording, onClick, showRetry = false, onRetry }: RecordButtonProps) {
  const handleClick = () => {
    if (showRetry && onRetry) {
      onRetry();
    } else {
      onClick();
    }
  };

  const isRetryMode = showRetry && !isRecording;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500] flex items-center justify-center">
      <div className="relative flex items-center justify-center w-24 h-24">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={clsx(
              "absolute inset-0 rounded-full border",
              isRecording ? "border-destructive/50 bg-destructive/10"
                : isRetryMode ? "border-amber-500/30 bg-amber-500/5"
                  : "border-primary/30 bg-primary/5"
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
          onClick={handleClick}
          className={clsx(
            "relative z-10 flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-colors",
            isRecording ? "bg-destructive text-white"
              : isRetryMode ? "bg-amber-500 text-white"
                : "bg-white text-primary"
          )}
        >
          {isRetryMode ? (
            <RotateCcw size={28} strokeWidth={2.5} />
          ) : (
            <Mic size={28} strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
}

