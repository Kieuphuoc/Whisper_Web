"use client";
import Link from "next/link";
import { VoiceVisibilitySelector } from '@/components/home/VoiceVisibilitySelector';
import Map from '@/components/home/Map';
import { useEffect, useState } from 'react';
import { VoiceVisibility } from "@/types/voicepin";
import { useRecord } from "@/hooks/useRecord";
import { RecordButton } from "@/components/home/RecordButton";
import { WhispererBadge } from "@/components/layout/WhispererBadge";

export default function HomeWhisper() {
  const [visibility, setVisibility] = useState<VoiceVisibility>("public");
  const { isRecording, onRecordPress, mediaBlobUrl } = useRecord();
  useEffect(() => {
  if (mediaBlobUrl) {
    console.log("Voice URL:", mediaBlobUrl);
  }
}, [mediaBlobUrl]);
console.log("Re-render HomeWhisper component");

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#dfe7ff] via-[#edf1ff] to-white">
      <div className="absolute top-6 right-6 flex items-center gap-4 z-[500]">
        <VoiceVisibilitySelector
          value={visibility}
          onChange={setVisibility}
          disabledModes={["public"]} //LƯU Ý
        />
        <Link href="/login"><WhispererBadge /></Link>
      </div>
      <Map />
      <RecordButton isRecording={isRecording} onClick={onRecordPress} />
    </main >
  );
}

