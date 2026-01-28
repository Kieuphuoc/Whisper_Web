'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import Map from '@/components/home/Map';
import { VoiceVisibilitySelector } from '@/components/home/VoiceVisibilitySelector';
import { RecordButton } from "@/components/home/RecordButton";
import { WhispererBadge } from "@/components/layout/WhispererBadge";
import PinPreview from "@/components/home/PinPreview";
import { useRecord } from "@/hooks/useRecord";
import { VoiceVisibility } from "@/types/voicepin";
import MapClient from "@/components/home/MapClient";

export default function HomeWhisperClient() {
  const [visibility, setVisibility] = useState<VoiceVisibility>("public");
  const { isRecording, onRecordPress, mediaBlobUrl } = useRecord();

  useEffect(() => {
    if (mediaBlobUrl) {
      console.log("Voice URL:", mediaBlobUrl);
      console.log("PinPreview should now be visible!");
    }
  }, [mediaBlobUrl]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#dfe7ff] via-[#edf1ff] to-white">
      <div className="absolute top-6 right-6 flex items-center gap-4 z-[500]">
        <VoiceVisibilitySelector
          value={visibility}
          onChange={setVisibility}
          disabledModes={["public"]}
        />
        <Link href="/login"><WhispererBadge /></Link>
      </div>

      <MapClient />
      <RecordButton isRecording={isRecording} onClick={onRecordPress} />
      {mediaBlobUrl && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[500]">
          <PinPreview />
        </div>
      )}
    </main>
  );
}
