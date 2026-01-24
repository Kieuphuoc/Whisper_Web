import { motion } from "framer-motion";

interface WhispererBadgeProps {
  name?: string;
  role?: string;
  initials?: string;
}

export function WhispererBadge({
  name = "Juno R.",
  role = "Whisperer",
  initials = "JR",
}: WhispererBadgeProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 rounded-full bg-white/80 px-2 py-1.5 shadow-sm backdrop-blur border border-white/60">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
        {initials}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
      </div>

      <div className="flex flex-col items-end leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">{role}</span>
        <span className="text-sm font-bold text-slate-700">{name}</span>
      </div>
    </motion.button>
  );
}
