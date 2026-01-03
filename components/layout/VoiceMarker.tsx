// components/VoiceMarker.tsx
'use client';

import { Marker, Popup } from "react-leaflet";
import { Pin, Share2, Heart } from "lucide-react"; // Import icon từ lucide-react
import L from "leaflet";

// Định nghĩa kiểu dữ liệu cho props (nếu dùng TypeScript)
interface VoiceMarkerProps {
  data: {
    id: string | number;
    coords: [number, number]; // [lat, lng]
    title?: string;
    location?: string;
    date?: string;
    imageUrl?: string;
    audioUrl?: string;
  };
}

export default function VoiceMarker({ data }: VoiceMarkerProps) {
  // Fix lỗi icon mặc định leaflet nếu cần (tùy chọn)
  // const customIcon = ...

  return (
    <Marker position={data.coords}>
      <Popup
        maxWidth={500}
        closeButton={false}
        className="!bg-transparent !border-none !shadow-none custom-popup-reset"
      >
        {/* CONTAINER CHÍNH */}
        <div className="flex items-center relative mt-8 ml-2 font-sans text-left w-[550px] group/container">
          
          {/* PHẦN 1: HÌNH ẢNH (LAYER TRÊN CÙNG) */}
          <div className="relative z-30 shrink-0 w-70 h-70 transform -rotate-12 group-hover/container:rotate-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer perspective-1000 origin-center">
            <img
              src={data.imageUrl || "https://i.pinimg.com/736x/c9/8c/c4/c98cc4f40e85eb0107489c577ecb381d.jpg"}
              alt={data.title || "Memory Location"}
              className="w-full h-full object-cover aspect-square rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-white block"
            />
          </div>

          {/* PHẦN 2: NỘI DUNG (LAYER DƯỚI) */}
          <div className="relative z-10 flex-1 bg-white text-slate-700 p-4 pl-20 pr-4 rounded-r-2xl rounded-bl-[20px] shadow-xl -ml-16 min-h-[220px] flex flex-col justify-between border border-slate-100">
            
            {/* Header Info */}
            <div className="mb-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                  {data.title || "Rainy Day at Central Park"}
                </h3>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                  {data.date || "Oct 14"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-1">
                {/* Thay thế thẻ <i> bằng icon nếu muốn, hoặc giữ nguyên nếu đã import FontAwesome */}
                <i className="fa-solid fa-location-dot text-rose-500"></i>
                <span className="truncate max-w-[150px]">{data.location || "New York City, US"}</span>
              </div>
            </div>

            {/* Audio Player Tối giản */}
            <div className="bg-slate-50 rounded-full p-1 pl-1 pr-3 flex items-center gap-2 mb-3 border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center cursor-pointer hover:bg-black transition-colors shrink-0">
                <i className="fa-solid fa-play text-[8px] ml-0.5"></i>
              </div>
              {/* Waveform giả lập */}
              <div className="flex items-center gap-[2px] h-3 w-full opacity-50">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] bg-slate-800 rounded-full"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between border-t border-slate-100 pt-2 mt-auto">
              <p className="text-[10px] text-slate-400 italic font-medium w-1/2 leading-tight">
                "The sound of rain..."
              </p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <ActionButton icon={Pin} />
                  <ActionButton icon={Share2} />
                  <ActionButton icon={Heart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

// Component con cho nút bấm để code gọn hơn
const ActionButton = ({ icon: Icon }: { icon: any }) => (
  <button className="group/btn flex flex-col items-center gap-1 text-gray-300 hover:text-black transition-colors">
    <Icon strokeWidth={2.5} size={14} className="group-hover/btn:scale-110 transition-transform" />
  </button>
);