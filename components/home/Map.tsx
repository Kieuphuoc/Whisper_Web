'use client';
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import VoiceMarker from "./VoiceMarker";
import { VoicePin } from "@/types/voicepin";

export const voicePins: VoicePin[] = [
  {
    id: "vp_001",
    audioUrl: "/audio/chill-nguyen-hue.mp3",
    duration: 42,
    createdAt: "2024-10-24T18:30:00Z",
    lat: 10.7769,
    lng: 106.7009,
    emotion: "calm",
    ownerId: "user_001",
    memoryId: "mem_001",
  },
  {
    id: "vp_002",
    audioUrl: "/audio/mua-rao-buoi-chieu.mp3",
    duration: 58,
    createdAt: "2024-10-23T16:45:00Z",
    lat: 10.762622,
    lng: 106.660172,
    emotion: "sad",
    ownerId: "user_002",
    memoryId: "mem_002",
  },
  {
    id: "vp_003",
    audioUrl: "/audio/arito-hub.mp3",
    duration: 35,
    createdAt: "2024-10-24T19:10:00Z",
    lat: 10.8231,
    lng: 106.6297,
    emotion: "inspired",
    ownerId: "user_001",
  },
  {
    id: "vp_004",
    audioUrl: "/audio/quan-pho-ba-anh-em.mp3",
    duration: 47,
    createdAt: "2024-10-24T19:20:00Z",
    lat: 10.8,
    lng: 106.6297,
    emotion: "happy",
    ownerId: "user_003",
  },
];


export default function Map() {
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  if (typeof window === 'undefined') return null;
  return (
    <MapContainer
      center={[10.762622, 106.660172]} // Tọa độ trung tâm (TP.HCM)
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }} 
      className="z-0 outline-none">

      <TileLayer attribution="&copy; CARTO" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>
      {voicePins.map((pin) => (<VoiceMarker key={pin.id} data={pin} />))}

    </MapContainer>
  );
}