'use client';
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
    src: string | null;
    compact?: boolean;
}

export default function AudioPlayer({ src, compact = false }: AudioPlayerProps) {
    const { isPlaying, currentTime, duration, isLoaded, toggle, seek, formatTime } = useAudioPlayer(src);

    if (!src) return null;

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (compact) {
        return (
            <div className="bg-slate-50 rounded-full p-1 pl-1 pr-3 flex items-center gap-2 border border-slate-100">
                <button
                    onClick={toggle}
                    className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center 
                     cursor-pointer hover:bg-black transition-colors shrink-0"
                >
                    {isPlaying ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                </button>

                <div className="flex-1 flex items-center gap-2">
                    <div
                        className="flex-1 h-1 bg-slate-200 rounded-full cursor-pointer overflow-hidden"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            seek(percent * duration);
                        }}
                    >
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono w-8">
                        {formatTime(currentTime)}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-3 shadow-md border border-slate-100">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggle}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary 
                     text-white flex items-center justify-center cursor-pointer 
                     hover:opacity-90 transition-all shadow-md shrink-0"
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <div className="flex-1 flex flex-col gap-1">
                    <div
                        className="h-2 bg-slate-100 rounded-full cursor-pointer overflow-hidden"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            seek(percent * duration);
                        }}
                    >
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{isLoaded ? formatTime(duration) : "--:--"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
