import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import CreateVoiceModal from "./CreateVoiceModal";

const RecordNewCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(var(--primary-rgb, 74, 86, 226), 0.02)",
          borderColor: "rgba(var(--primary-rgb, 74, 86, 226), 0.5)",
        }}
        whileTap={{ scale: 0.98 }}
        className="group flex flex-col items-center justify-center gap-4 rounded-[2rem] 
                   border-2 border-dashed border-slate-300 bg-white/50 p-6 transition-all 
                   duration-300 h-full min-h-[300px]"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm 
                        ring-1 ring-slate-100 transition-all duration-300 group-hover:scale-110 
                        group-hover:shadow-md group-hover:ring-primary/20">
          <Plus
            size={32}
            className="text-slate-400 transition-colors duration-300 group-hover:text-primary"
          />
        </div>

        <div className="text-center">
          <span className="block text-sm font-bold uppercase tracking-wider text-slate-400 
                           transition-colors duration-300 group-hover:text-primary">
            Create Memory
          </span>
          <span className="text-xs font-medium text-slate-300 group-hover:text-slate-400 
                           transition-colors">
            Tap to record voice
          </span>
        </div>
      </motion.button>

      {/* Modal */}
      {open && <CreateVoiceModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default RecordNewCard;