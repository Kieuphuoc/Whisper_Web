'use client';
import { Marker, Popup, useMap } from "react-leaflet";
import { X } from "lucide-react";
import { VoicePin } from "@/types/voicepin";
import VoiceCard from "./VoiceCard";

export default function VoiceMarker({ data }: { data: VoicePin }) {
  return (
    <Marker position={[data.lat, data.lng]}>
      <Popup maxWidth={600} closeButton={false} className="!bg-transparent !border-none !shadow-none custom-popup-reset">
        <div className="mt-8 ml-2">
          <VoiceCardWithMapClose data={data} />
        </div>
      </Popup>
    </Marker>
  );
}

function VoiceCardWithMapClose({ data }: { data: VoicePin }) {
  const map = useMap();

  return (
    <VoiceCard
      mode="complete"
      data={data}
      onClose={() => map.closePopup()}
    />
  );
}
