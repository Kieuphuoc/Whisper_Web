// components/Map.tsx
'use client';

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import VoiceMarker from "./VoiceMarker";

// === 1. DỮ LIỆU MẪU (BẠN SẼ THAY BẰNG API SAU NÀY) ===
const voicePins = [
  {
    id: 1,
    coords: [10.7769, 106.7009] as [number, number], // Phố đi bộ Nguyễn Huệ
    title: "Chill tại Phố đi bộ",
    location: "District 1, HCMC",
    date: "Oct 24",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#"
  },
  {
    id: 2,
    coords: [10.762622, 106.660172] as [number, number], // Khu vực Quận 5/10
    title: "Mưa rào buổi chiều",
    location: "District 5, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#"
  },
  {
    id: 3,
    coords: [10.8231, 106.6297] as [number, number], // Gò Vấp / Arito Hub
    title: "Arito Solutions Hub",
    location: "Go Vap, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#"
  },
  {
    id: 3,
    coords: [10.8, 106.6297] as [number, number], // Gò Vấp / Arito Hub
    title: "Arito Solutions Hub",
    location: "Quan Pho Ba anh em, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#"
  },
];

export default function Map() {

  // === 2. FIX LỖI ICON CỦA LEAFLET TRONG NEXT.JS ===
  useEffect(() => {
    // Xóa hàm getIconUrl mặc định bị lỗi
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;

    // Cấu hình lại đường dẫn icon đúng
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
      style={{ height: "100%", width: "100%" }} // Full chiều cao của cha
      className="z-0 outline-none"
    >
      {/* Layer bản đồ nền (OpenStreetMap - Free) */}
      {/* Bạn có thể đổi sang Mapbox hoặc Google Map Tiles nếu muốn đẹp hơn */}
      <TileLayer
        attribution="&copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {/* Render các Voice Markers */}
      {voicePins.map((pin) => (
        <VoiceMarker key={pin.id} data={pin} />
      ))}

    </MapContainer>
  );
}