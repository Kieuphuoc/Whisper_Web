'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import VoiceMarker from "./VoiceMarker";
import { getPublicVoicePins, VoicePinResponse } from "@/lib/api";
import { VoicePin } from "@/types/voicepin";

interface MapProps {
  userLocation?: { lat: number; lng: number } | null;
}

function FocusOnLocation({ loc }: { loc: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (!loc) return;
    map.flyTo(loc, 16, {
      animate: true,
      duration: 1.2,
    });
  }, [loc, map]);

  return null;
}

// Transform API response to VoicePin type
function transformToVoicePin(pin: VoicePinResponse): VoicePin {
  return {
    id: pin.id.toString(),
    lat: pin.latitude,
    lng: pin.longitude,
    audioUrl: pin.audioUrl,
    duration: 0,
    title: pin.description || 'Untitled',
    imageUrl: pin.images?.[0]?.url,
    location: '',
    date: new Date(pin.createdAt).toLocaleDateString('vi-VN'),
    createdAt: pin.createdAt,
    ownerId: pin.userId.toString(),
  };
}

export default function Map({ userLocation }: MapProps) {
  const [voicePins, setVoicePins] = useState<VoicePin[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialFocused, setInitialFocused] = useState(false);

  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Fetch VoicePins from API
  useEffect(() => {
    async function fetchVoicePins() {
      try {
        const data = await getPublicVoicePins();
        setVoicePins(data.map(transformToVoicePin));
      } catch (error) {
        console.error('Failed to fetch voice pins:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVoicePins();
  }, []);

  if (typeof window === "undefined") return null;

  const userLoc: [number, number] | null = userLocation
    ? [userLocation.lat, userLocation.lng]
    : null;

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={userLoc || [10.762622, 106.660172]}
        zoom={userLoc ? 16 : 13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer attribution="&copy; CARTO" url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {/* Auto-focus when user location becomes available */}
        {userLoc && !initialFocused && (
          <AutoFocus loc={userLoc} onFocused={() => setInitialFocused(true)} />
        )}

        {/* User marker */}
        {userLoc && (
          <Marker position={userLoc}>
            <Popup>📍 Bạn đang ở đây</Popup>
          </Marker>
        )}

        {/* VoicePins */}
        {voicePins.map(p => <VoiceMarker key={p.id} data={p} />)}
      </MapContainer>
    </div>
  );
}

function AutoFocus({ loc, onFocused }: { loc: [number, number]; onFocused: () => void }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(loc, 16, { animate: true, duration: 1.5 });
    onFocused();
  }, [loc, map, onFocused]);

  return null;
}


