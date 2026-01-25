'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import VoiceMarker from "./VoiceMarker";
import { voicePins } from "@/data/mockVoiceFlow";

function FocusMyLocation({ loc }: { loc: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.flyTo(loc, 16, { animate: true, duration: 1.2 }); }, [loc, map]);
  return null;
}

export default function Map() {
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);

  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <div className="relative h-full w-full">
      <MapContainer center={[10.762622, 106.660172]} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution="&copy; CARTO" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        {userLoc && <FocusMyLocation loc={userLoc} />}
        {userLoc && <Marker position={userLoc}><Popup>Bạn đang ở đây</Popup></Marker>}
        {voicePins.map(p => <VoiceMarker key={p.id} data={p} />)}
      </MapContainer>

      <button
        className="absolute bottom-4 right-4 z-[1000] bg-white px-3 py-2 rounded shadow"
        onClick={() =>
          navigator.geolocation.getCurrentPosition(
            pos => setUserLoc([pos.coords.latitude, pos.coords.longitude]),
            err => console.error("Không lấy được vị trí", err)
          )
        }
      >
        📍 Vị trí của tôi
      </button>
    </div>
  );
}
