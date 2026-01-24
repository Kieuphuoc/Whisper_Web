import { useState } from "react";
import { VoicePin } from "@/types/voicepin";

export const useMemoryCard = (item: VoicePin) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
//   const [note, setNote] = useState(item.note ?? "");   //Sau này sẽ có note

  return {
    isPlaying, togglePlay: () => setIsPlaying(v => !v),
    isEditing, toggleEdit: () => setIsEditing(v => !v),
    // note, setNote
  };
};
