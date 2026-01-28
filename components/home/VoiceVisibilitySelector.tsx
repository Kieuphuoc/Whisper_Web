"use client";

import { VoiceVisibility } from "@/types/voicepin";
import { Globe, Users, Lock } from "lucide-react";

interface VoiceVisibilitySelectorProps {
  value: VoiceVisibility;
  onChange: (value: VoiceVisibility) => void;
  disabledModes?: VoiceVisibility[];
}

const MODES: { value: VoiceVisibility; label: string; icon: any }[] = [
  { value: "public", label: "Cộng đồng", icon: Globe },
  { value: "friends", label: "Bạn bè", icon: Users },
  { value: "private", label: "Riêng tư", icon: Lock },
];

export function VoiceVisibilitySelector({
  value,
  onChange,
  disabledModes = [],
}: VoiceVisibilitySelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/80 p-1.5 shadow-sm border border-slate-100 backdrop-blur-md">
      {MODES.map((mode) => {
        const isActive = value === mode.value;
        const isDisabled = disabledModes.includes(mode.value);
        const Icon = mode.icon;

        return (
          <button
            key={mode.value}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(mode.value)}
            className={`
              flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all
              ${isActive
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }
              ${isDisabled
                ? "opacity-30 cursor-not-allowed"
                : ""
              }
            `}
          >
            <Icon size={14} />
            <span className="hidden md:inline">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}

