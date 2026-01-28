'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { useMemory } from '@/hooks/useMemory';
import MemoryItem from '@/components/memory/MemoryItem';
import VoiceCard from '@/components/home/VoiceCard';
import { WhispererBadge } from '@/components/layout/WhispererBadge';
import {
    MapPin,
    Link as LinkIcon,
    Calendar,
    MessageSquare,
    UserPlus,
    UserCheck,
    Settings,
    Grid,
    Heart,
    Music,
    ChevronLeft,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoicePinResponse } from '@/lib/api';

export default function ProfilePage() {
    const params = useParams();
    const router = useRouter();
    const profileId = params.id as string;
    const { profileData, loading: profileLoading } = useProfile(profileId);
    const { pins, loading: pinsLoading } = useMemory(); // Filtered by user in real scenario

    const [activeTab, setActiveTab] = useState<'voices' | 'liked'>('voices');
    const [selectedPin, setSelectedPin] = useState<VoicePinResponse | null>(null);

    if (profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (!profileData) return null;

    const { user, stats, relation } = profileData;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm"
                    >
                        <ChevronLeft size={20} />
                        Quay lại
                    </button>
                    <WhispererBadge />
                </div>
            </nav>

            {/* Profile Header Section */}
            <section className="bg-white border-b border-slate-200/60 pt-10 pb-6">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-10 items-start md:items-center mb-10">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-tr from-primary to-secondary p-1 shadow-2xl shadow-primary/20 overflow-hidden">
                                <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
                                    <img
                                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                                        alt={user.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                        </div>

                        {/* User Info & Actions */}
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                <h2 className="text-3xl font-black text-slate-900">{user.displayName}</h2>
                                <div className="flex items-center gap-2">
                                    {relation === 'self' ? (
                                        <button className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center gap-2">
                                            <Settings size={16} /> Thiết lập
                                        </button>
                                    ) : (
                                        <>
                                            <button className="px-6 py-2 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                                                <UserPlus size={16} /> Kết bạn
                                            </button>
                                            <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-primary transition-all">
                                                <MessageSquare size={18} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <p className="text-slate-500 font-medium mb-6 max-w-xl">
                                {user.tagline || "Chưa có lời tựa nào cho tâm hồn này."}
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-400">
                                <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Việt Nam</span>
                                <span className="flex items-center gap-2"><LinkIcon size={16} className="text-primary" /> whisper.me/{user.username}</span>
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> Tham gia cuối 2023</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex md:flex-col gap-6 md:gap-4 md:items-end w-full md:w-auto">
                            <div className="flex-1 md:text-right">
                                <span className="block text-2xl font-black text-slate-900">{stats.totalListens}</span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Lượt nghe</span>
                            </div>
                            <div className="flex-1 md:text-right">
                                <span className="block text-2xl font-black text-slate-900">{stats.voiceCount}</span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Thì thầm</span>
                            </div>
                            <div className="flex-1 md:text-right">
                                <span className="block text-2xl font-black text-slate-900">{stats.followerCount}</span>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Bạn bè</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-8 border-t border-slate-100 mt-6">
                        <button
                            onClick={() => setActiveTab('voices')}
                            className={`flex items-center gap-2 py-4 text-sm font-bold transition-all relative
                ${activeTab === 'voices' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Music size={18} /> Lời thì thầm
                            {activeTab === 'voices' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('liked')}
                            className={`flex items-center gap-2 py-4 text-sm font-bold transition-all relative
                ${activeTab === 'liked' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Heart size={18} /> Yêu thích
                            {activeTab === 'liked' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                        </button>
                    </div>
                </div>
            </section>

            {/* Profile Content List */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 gap-6">
                    {pinsLoading ? (
                        <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
                    ) : pins.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                            <p className="text-slate-400 font-medium">Bạn chưa đăng tải lời thì thầm nào.</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {pins.map((pin) => (
                                <MemoryItem
                                    key={pin.id}
                                    pin={pin}
                                    onClick={() => setSelectedPin(pin)}
                                />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </main>

            {/* Detail Modal (Same as Memory) */}
            <AnimatePresence>
                {selectedPin && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPin(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <VoiceCard
                                mode="complete"
                                data={{
                                    id: selectedPin.id.toString(),
                                    lat: selectedPin.latitude,
                                    lng: selectedPin.longitude,
                                    audioUrl: selectedPin.audioUrl,
                                    title: selectedPin.description,
                                    imageUrl: selectedPin.images?.[0]?.url,
                                    date: new Date(selectedPin.createdAt).toLocaleDateString('vi-VN'),
                                    ownerId: selectedPin.userId.toString(),
                                    duration: 0
                                }}
                                onClose={() => setSelectedPin(null)}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
