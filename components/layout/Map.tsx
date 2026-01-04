// components/Map.tsx
'use client';

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";
import L from "leaflet";
import { useEffect } from "react";
import VoiceClusterGroup from "../common/VoiceClusterGroup";

// === 1. SAMPLE DATA (Replace with API later) ===
const voicePins = [
  // === DISTRICT 1 - Walking Street & Ben Thanh Area ===
  {
    id: 1,
    coords: [10.7769, 106.7009] as [number, number],
    title: "Chill at Walking Street",
    location: "District 1, HCMC",
    date: "Oct 24",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 2,
    coords: [10.7775, 106.7015] as [number, number],
    title: "Coffee Corner",
    location: "District 1, HCMC",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 3,
    coords: [10.778, 106.702] as [number, number],
    title: "Street Music",
    location: "District 1, HCMC",
    date: "3h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 4,
    coords: [10.7785, 106.7025] as [number, number],
    title: "Night Vibes",
    location: "District 1, HCMC",
    date: "5h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 5,
    coords: [10.7723, 106.6989] as [number, number],
    title: "Ben Thanh Market Sounds",
    location: "Ben Thanh, District 1",
    date: "1h ago",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "lunar"
  },
  {
    id: 6,
    coords: [10.7731, 106.7001] as [number, number],
    title: "Tet Celebration",
    location: "Ben Thanh, District 1",
    date: "30m ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "lunar"
  },
  {
    id: 7,
    coords: [10.7756, 106.6995] as [number, number],
    title: "Rooftop Bar Chill",
    location: "District 1, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 8,
    coords: [10.7742, 106.7032] as [number, number],
    title: "Book Street Reading",
    location: "Nguyen Van Binh, D1",
    date: "4h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === DISTRICT 5 - Cho Lon Area ===
  {
    id: 9,
    coords: [10.762622, 106.660172] as [number, number],
    title: "Afternoon Rain",
    location: "District 5, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 10,
    coords: [10.7545, 106.6623] as [number, number],
    title: "Chinese New Year Parade",
    location: "Cho Lon, District 5",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "lunar"
  },
  {
    id: 11,
    coords: [10.7558, 106.6598] as [number, number],
    title: "Temple Bells",
    location: "Thien Hau Temple, D5",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "lunar"
  },
  {
    id: 12,
    coords: [10.7532, 106.6645] as [number, number],
    title: "Street Food Heaven",
    location: "District 5, HCMC",
    date: "3h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 13,
    coords: [10.7567, 106.6578] as [number, number],
    title: "Dim Sum Morning",
    location: "Cho Lon, District 5",
    date: "6h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "special"
  },

  // === GO VAP District ===
  {
    id: 14,
    coords: [10.8231, 106.6297] as [number, number],
    title: "Arito Solutions Hub",
    location: "Go Vap, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 15,
    coords: [10.8, 106.6297] as [number, number],
    title: "Pho Ba Brothers",
    location: "Pho Restaurant, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 16,
    coords: [10.8245, 106.6312] as [number, number],
    title: "Morning Jog",
    location: "Go Vap Park",
    date: "7h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 17,
    coords: [10.8198, 106.6278] as [number, number],
    title: "Cafe Sáng",
    location: "Go Vap, HCMC",
    date: "4h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 18,
    coords: [10.8178, 106.6325] as [number, number],
    title: "Kids Playing",
    location: "Go Vap Park",
    date: "1h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === DISTRICT 3 - Near Turtle Lake ===
  {
    id: 19,
    coords: [10.7825, 106.6912] as [number, number],
    title: "Turtle Lake Sunset",
    location: "District 3, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 20,
    coords: [10.7838, 106.6925] as [number, number],
    title: "Street Performer",
    location: "District 3, HCMC",
    date: "3h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 21,
    coords: [10.7812, 106.6898] as [number, number],
    title: "Boba Tea Time",
    location: "District 3, HCMC",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 22,
    coords: [10.7845, 106.6905] as [number, number],
    title: "Skateboard Practice",
    location: "District 3, HCMC",
    date: "5h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === DISTRICT 7 - Phu My Hung ===
  {
    id: 23,
    coords: [10.7295, 106.7215] as [number, number],
    title: "Crescent Mall Shopping",
    location: "Phu My Hung, D7",
    date: "1h ago",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 24,
    coords: [10.7312, 106.7198] as [number, number],
    title: "Starlight Bridge Night",
    location: "Phu My Hung, D7",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 25,
    coords: [10.7278, 106.7232] as [number, number],
    title: "Korean BBQ Night",
    location: "Phu My Hung, D7",
    date: "3h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 26,
    coords: [10.7325, 106.7245] as [number, number],
    title: "Riverside Walk",
    location: "Phu My Hung, D7",
    date: "4h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 27,
    coords: [10.7302, 106.7178] as [number, number],
    title: "SC Vivo City Fun",
    location: "District 7, HCMC",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === BINH THANH District ===
  {
    id: 28,
    coords: [10.8012, 106.7145] as [number, number],
    title: "Landmark 81 View",
    location: "Binh Thanh, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 29,
    coords: [10.8025, 106.7132] as [number, number],
    title: "Saigon Pearl Morning",
    location: "Binh Thanh, HCMC",
    date: "6h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 30,
    coords: [10.7998, 106.7158] as [number, number],
    title: "Coffee at Vincom",
    location: "Binh Thanh, HCMC",
    date: "1h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 31,
    coords: [10.8038, 106.7168] as [number, number],
    title: "River View Dinner",
    location: "Binh Thanh, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === THU DUC Area ===
  {
    id: 32,
    coords: [10.8456, 106.7789] as [number, number],
    title: "University Memories",
    location: "Thu Duc, HCMC",
    date: "3h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 33,
    coords: [10.8478, 106.7812] as [number, number],
    title: "Tech Park Innovation",
    location: "SHTP, Thu Duc",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 34,
    coords: [10.8445, 106.7765] as [number, number],
    title: "VNU Campus Life",
    location: "Thu Duc, HCMC",
    date: "5h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === TAN BINH - Near Airport ===
  {
    id: 35,
    coords: [10.8189, 106.6589] as [number, number],
    title: "Airport Farewell",
    location: "Tan Son Nhat, HCMC",
    date: "1h ago",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 36,
    coords: [10.8165, 106.6612] as [number, number],
    title: "Plane Spotting",
    location: "Tan Binh, HCMC",
    date: "4h ago",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === PHU NHUAN District ===
  {
    id: 37,
    coords: [10.7998, 106.6823] as [number, number],
    title: "Phu Nhuan Night Market",
    location: "Phu Nhuan, HCMC",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 38,
    coords: [10.8012, 106.6845] as [number, number],
    title: "Banh Mi Queen",
    location: "Phu Nhuan, HCMC",
    date: "30m ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "lunar"
  },
  {
    id: 39,
    coords: [10.7985, 106.6798] as [number, number],
    title: "Yoga at Sunrise",
    location: "Phu Nhuan, HCMC",
    date: "7h ago",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "regular"
  },

  // === DISTRICT 10 ===
  {
    id: 40,
    coords: [10.7723, 106.6678] as [number, number],
    title: "Hoa Lu Stadium",
    location: "District 10, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 41,
    coords: [10.7745, 106.6695] as [number, number],
    title: "Ba Thang Hai Street",
    location: "District 10, HCMC",
    date: "3h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 42,
    coords: [10.7698, 106.6712] as [number, number],
    title: "Vietnamese Opera",
    location: "District 10, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "special"
  },

  // === More clustered pins in D1 for big cluster demo ===
  {
    id: 43,
    coords: [10.7762, 106.6998] as [number, number],
    title: "Opera House Concert",
    location: "District 1, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 44,
    coords: [10.7758, 106.7012] as [number, number],
    title: "Nguyen Hue Flower Street",
    location: "District 1, HCMC",
    date: "Just now",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "lunar"
  },
  {
    id: 45,
    coords: [10.7765, 106.7005] as [number, number],
    title: "Bitexco Financial Tower",
    location: "District 1, HCMC",
    date: "1h ago",
    imageUrl: "https://i.pinimg.com/1200x/bd/ff/10/bdff104ffc5beb7e3eb34bfec2c449bf.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 46,
    coords: [10.7751, 106.7018] as [number, number],
    title: "Saigon River Cruise",
    location: "District 1, HCMC",
    date: "2h ago",
    imageUrl: "https://i.pinimg.com/736x/09/c8/e3/09c8e3334b165f68ab486f3a8cc31197.jpg",
    audioUrl: "#",
    type: "special"
  },
  {
    id: 47,
    coords: [10.7773, 106.6992] as [number, number],
    title: "Rex Hotel Rooftop",
    location: "District 1, HCMC",
    date: "4h ago",
    imageUrl: "https://i.pinimg.com/736x/0c/77/ba/0c77bab187b64f8a9de98a3c5d5ba488.jpg",
    audioUrl: "#",
    type: "regular"
  },
  {
    id: 48,
    coords: [10.7748, 106.7025] as [number, number],
    title: "Independence Palace",
    location: "District 1, HCMC",
    date: "Yesterday",
    imageUrl: "https://i.pinimg.com/1200x/a7/49/58/a749587d9ff8cefe6b24ddb574a251b7.jpg",
    audioUrl: "#",
    type: "regular"
  },
];

export default function Map() {

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
      {/* Render Voice Markers with Clustering */}
      <VoiceClusterGroup
        pins={voicePins}
        maxClusterRadius={80}
        disableClusteringAtZoom={17}
      />

    </MapContainer>
  );
}