"use client";

import { useState } from "react";
import { Pin, Share2, Heart, X } from "lucide-react";

export default function VoicePinPreview({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState(data?.title || "");

  const handlePickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
      >
        <X size={20} />
      </button>

      <div className="bg-slate-100 rounded-2xl shadow-2xl p-6">

        {/* CONTAINER CHÍNH */}
        <div className="flex items-center relative font-sans text-left w-[550px] group/container">

          {/* IMAGE */}
          <div className="relative z-30 shrink-0 w-70 h-70 -rotate-12 group-hover/container:rotate-0 transition-all cursor-pointer">
            <input
              id="image-input"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePickImage}
            />

            {image ? (
              <img
                src={image}
                className="w-full h-full object-cover rounded-2xl shadow-xl border"
              />
            ) : (
              <label
                htmlFor="image-input"
                className="w-full h-full rounded-2xl shadow-xl border border-dashed bg-slate-300 flex items-center justify-center text-slate-700 text-sm"
              >
                Tap to take / choose photo
              </label>
            )}
          </div>

          {/* CARD */}
          <div className="relative z-10 flex-1 bg-white p-4 pl-20 pr-4 rounded-r-2xl rounded-bl-[20px] shadow-xl -ml-16 min-h-[220px] flex flex-col justify-between border">

            {/* HEADER */}
            <div className="mb-2">
              <div className="flex justify-between items-start">

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your memory title..."
                  className="text-lg font-bold outline-none w-3/4 bg-transparent"
                />

                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border">
                  {data?.date || "Today"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <i className="fa-solid fa-location-dot text-rose-500"></i>
                <span className="truncate max-w-[150px]">
                  {data?.location || "Unknown location"}
                </span>
              </div>
            </div>

            {/* AUDIO FAKE */}
            <div className="bg-slate-50 rounded-full p-1 pl-1 pr-3 flex items-center gap-2 mb-3 border">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center">
                <i className="fa-solid fa-play text-[8px] ml-0.5"></i>
              </div>

              <div className="flex items-center gap-[2px] h-3 w-full opacity-50">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] bg-slate-800 rounded-full"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                  />
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-end justify-between border-t pt-2 mt-auto">
              <p className="text-[10px] text-slate-400 italic w-1/2 leading-tight">
                {data?.snippet || `"The sound of rain..."`}
              </p>

              <div className="flex items-center gap-4">
                <button className="text-gray-300 hover:text-black">
                  <Pin size={14} />
                </button>
                <button className="text-gray-300 hover:text-black">
                  <Share2 size={14} />
                </button>
                <button className="text-gray-300 hover:text-black">
                  <Heart size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
