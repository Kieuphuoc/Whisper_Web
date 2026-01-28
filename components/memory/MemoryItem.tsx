'use client';

import React, { useState } from 'react';
import { VoicePinResponse } from '@/lib/api';
import AudioPlayer from '@/components/home/AudioPlayer';
import { Calendar, Play, Clock, MoreVertical, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface MemoryItemProps {
    pin: VoicePinResponse;
    onClick: () => void;
}

export default function MemoryItem({ pin, onClick }: MemoryItemProps) {
    const [showPlayer, setShowPlayer] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-3xl p-5 border border-slate-100 hover:border-primary/20 
                 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer relative overflow-hidden"
            onClick={onClick}
        >
            <div className="flex gap-5">
                {/* Cover Image / Placeholder */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 relative">
                    {pin.images?.[0]?.url ? (
                        <img
                            src={pin.images[0].url}
                            alt={pin.description}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                            <Play size={32} strokeWidth={1.5} />
                        </div>
                    )}

                    {/* Play Overlay */}
                    {!showPlayer && (
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg">
                                <Play size={20} fill="currentColor" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col pt-1">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-800 truncate pr-6 group-hover:text-primary transition-colors">
                            {pin.description || "Untitled Whisper"}
                        </h3>
                        <button className="p-1 text-slate-300 hover:text-slate-500 transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium mb-3">
                        <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(pin.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {pin.listens} lượt nghe
                        </span>
                        {pin.visibility !== 'PUBLIC' && (
                            <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded-md uppercase tracking-tighter scale-90">
                                {pin.visibility}
                            </span>
                        )}
                    </div>

                    {/* Audio Player Integration */}
                    <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
                        {showPlayer ? (
                            <AudioPlayer src={pin.audioUrl} compact />
                        ) : (
                            <div
                                onClick={() => setShowPlayer(true)}
                                className="h-10 border border-slate-50 rounded-2xl bg-slate-50/50 flex items-center px-4 gap-3
                           hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <Play size={14} className="text-primary" />
                                <div className="flex-1 h-1 bg-slate-200 rounded-full" />
                                <span className="text-[10px] text-slate-400 font-mono">Click to play</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <button className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 transition-all">
                    <Heart size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all">
                    <Share2 size={14} />
                </button>
            </div>
        </motion.div>
    );
}
