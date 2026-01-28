'use client';
import { useEffect, useRef } from "react";
import { Pin, Share2, Heart, X, Upload, Send, Loader2, MapPin } from "lucide-react";
import { VoicePin } from "@/types/voicepin";
import AudioPlayer from "./AudioPlayer";

interface VoiceCardProps {
    mode: 'preview' | 'complete';
    data?: Partial<VoicePin>;
    onClose?: () => void;
    onUploadImage?: () => void;
    onSubmit?: () => void;
    onTitleChange?: (title: string) => void;
    imagePreviewUrl?: string;
    isSubmitting?: boolean;
    audioSrc?: string | null;
    title?: string;
}

export default function VoiceCard({
    mode,
    data,
    onClose,
    onUploadImage,
    onSubmit,
    onTitleChange,
    imagePreviewUrl,
    isSubmitting = false,
    audioSrc,
    title: inputTitle,
}: VoiceCardProps) {
    const isPreview = mode === 'preview';
    const cardRef = useRef<HTMLDivElement>(null);

    // ESC key listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Click outside listener
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node) && onClose) {
                onClose();
            }
        };
        // Delay to avoid immediate trigger
        const timer = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 100);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Display values
    const displayTitle = inputTitle ?? data?.title ?? (isPreview ? "" : "Untitled Memory");
    const date = data?.date || (isPreview ? new Date().toLocaleDateString('vi-VN') : "Unknown");
    const location = data?.location || (isPreview ? "Đang xác định..." : "Unknown location");
    const displayImageUrl = imagePreviewUrl || data?.imageUrl;
    const displayAudioSrc = audioSrc ?? data?.audioUrl ?? null;

    return (
        <div ref={cardRef} className="flex items-center relative min-w-[550px] group/container font-sans text-left">
            {/* PHẦN 1: HÌNH ẢNH HOẶC UPLOAD ICON */}
            <div className="relative z-30 shrink-0 w-70 h-70 transform -rotate-12 group-hover/container:rotate-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer perspective-1000 origin-center">
                {displayImageUrl ? (
                    <div className="relative w-full h-full">
                        <img
                            src={displayImageUrl}
                            alt={displayTitle || "Voice memory"}
                            className="w-full h-full object-cover aspect-square rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] border-white block"
                        />
                        {isPreview && (
                            <button
                                onClick={onUploadImage}
                                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur
                                           flex items-center justify-center shadow hover:bg-white transition"
                            >
                                <Upload size={14} className="text-slate-600" />
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        onClick={onUploadImage}
                        className="w-full h-full aspect-square rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] 
                       bg-gradient-to-br from-slate-100 to-slate-200 
                       border-2 border-dashed border-slate-300
                       flex flex-col items-center justify-center gap-2
                       hover:from-slate-200 hover:to-slate-300 hover:border-slate-400
                       transition-all cursor-pointer"
                    >
                        <Upload size={32} className="text-slate-400" strokeWidth={1.5} />
                        <span className="text-xs text-slate-500 font-medium">Tải ảnh lên</span>
                    </div>
                )}
            </div>

            {/* PHẦN 2: NỘI DUNG */}
            <div className="relative z-10 flex-1 bg-white text-slate-700 p-4 pl-20 pr-4 rounded-r-2xl rounded-bl-[20px] shadow-xl -ml-16 min-h-[220px] flex flex-col justify-between border border-slate-100">
                {/* Close button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 z-40 w-7 h-7 rounded-full
                       bg-white/90 backdrop-blur
                       flex items-center justify-center
                       shadow hover:bg-black hover:text-white
                       transition"
                    >
                        <X size={14} strokeWidth={2.5} />
                    </button>
                )}

                {/* Header Info */}
                <div className="mb-2">
                    <div className="flex justify-between items-start gap-2">
                        {isPreview && onTitleChange ? (
                            <input
                                type="text"
                                value={inputTitle || ""}
                                onChange={(e) => onTitleChange(e.target.value)}
                                placeholder="Nhập tiêu đề..."
                                className="flex-1 text-lg font-bold text-slate-800 leading-tight 
                                           bg-transparent border-b border-dashed border-slate-200
                                           focus:border-indigo-400 focus:outline-none
                                           placeholder:text-slate-300 transition-colors"
                            />
                        ) : (
                            <h3 className="text-lg font-bold text-slate-800 leading-tight flex-1">
                                {displayTitle || "Untitled Memory"}
                            </h3>
                        )}
                        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                            {date}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-1">
                        <MapPin size={10} className="text-rose-500" />
                        <span className={`truncate max-w-[200px] ${isPreview && !data?.location ? 'italic text-slate-400' : ''}`}>
                            {location}
                        </span>
                    </div>
                </div>

                {/* Audio Player */}
                <div className="mb-3">
                    <AudioPlayer src={displayAudioSrc} compact />
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between border-t border-slate-100 pt-2 mt-auto">
                    <p className={`text-[10px] italic font-medium w-1/2 leading-tight ${isPreview ? 'text-slate-300' : 'text-slate-400'}`}>
                        {isPreview ? "Lời thì thầm của bạn..." : (data?.title ? `"${data.title}"` : "A whispered memory...")}
                    </p>

                    <div className="flex items-center gap-3">
                        {isPreview && onSubmit ? (
                            <button
                                onClick={onSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full
                                           bg-gradient-to-r from-primary to-secondary
                                           text-white text-xs font-medium
                                           hover:opacity-90
                                           disabled:opacity-50 disabled:cursor-not-allowed
                                           transition-all shadow-md hover:shadow-lg"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        Đang lưu...
                                    </>
                                ) : (
                                    <>
                                        <Send size={14} />
                                        Lưu lời thì thầm
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="flex items-center gap-4">
                                <ActionButton icon={Pin} />
                                <ActionButton icon={Share2} />
                                <ActionButton icon={Heart} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ActionButton = ({ icon: Icon }: { icon: any }) => (
    <button className="group/btn flex flex-col items-center gap-1 text-gray-300 hover:text-black transition-colors">
        <Icon strokeWidth={2.5} size={14} className="group-hover/btn:scale-110 transition-transform" />
    </button>
);


