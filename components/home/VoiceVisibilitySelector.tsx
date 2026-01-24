"use client";

import { VoiceVisibility } from "@/types/voicepin";
interface VoiceVisibilitySelectorProps {
  value: VoiceVisibility;
  onChange: (value: VoiceVisibility) => void;
  disabledModes?: VoiceVisibility[]; // optional, để scale sau
}

const MODES: { value: VoiceVisibility; label: string }[] = [
  { value: "private", label: "Private" },
  { value: "friends", label: "Friends" },
  { value: "public", label: "Public" },
];

export function VoiceVisibilitySelector({
  value,
  onChange,
  disabledModes = [],
}: VoiceVisibilitySelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
      {MODES.map((mode) => {
        const isActive = value === mode.value;
        const isDisabled = disabledModes.includes(mode.value);

        return (
          <button
            key={mode.value}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(mode.value)}
            className={`
              px-4 py-1.5 text-sm rounded-full transition
              ${
                isActive
                  ? "bg-white text-black shadow"
                  : "text-gray-500 hover:text-black"
              }
              ${
                isDisabled
                  ? "opacity-40 cursor-not-allowed hover:text-gray-500"
                  : ""
              }
            `}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
