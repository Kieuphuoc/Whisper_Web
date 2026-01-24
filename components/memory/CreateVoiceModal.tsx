import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MapPin, Edit3, X, Check } from "lucide-react";

const CreateVoiceModal = ({ onClose }: { onClose: () => void }) => {
  const [pinLocation, setPinLocation] = useState<{ x: number; y: number } | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-500 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >

        {/* Header */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Mic size={16} />
            </span>
            New Voice Pin
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-2 space-y-6 overflow-y-auto">
          {/* Mini Map */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin size={12} /> Pin Location
            </label>

            <div
              className="relative w-full h-40 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden cursor-crosshair group hover:border-primary/40 transition-colors"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPinLocation({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4a56e2 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {!pinLocation && <span className="text-xs text-slate-400 font-medium">Click map to pin</span>}
              </div>

              {pinLocation && (
                <motion.div
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="absolute text-primary drop-shadow-md"
                  style={{ left: pinLocation.x - 12, top: pinLocation.y - 24 }}
                >
                  <MapPin size={24} fill="currentColor" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Recording */}
          <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
              <button className="relative w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                <Mic size={28} />
              </button>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">Tap to start recording</p>
          </div>

          {/* Note Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Edit3 size={12} /> Description
            </label>
            <textarea
              placeholder="What's on your mind?"
              className="w-full h-20 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button className="flex-1 py-3 rounded-xl font-bold text-white bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2">
            <Check size={18} /> Save Memory
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default CreateVoiceModal;