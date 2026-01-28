'use client';

import React, { useState } from 'react';
import { useMemory, SortOrder } from '@/hooks/useMemory';
import MemoryItem from '@/components/memory/MemoryItem';
import { WhispererBadge } from '@/components/layout/WhispererBadge';
import VoiceCard from '@/components/home/VoiceCard';
import { Search, Filter, SortAsc, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoicePinResponse } from '@/lib/api';

export default function MemoryPage() {
  const { pins, loading, sortOrder, setSortOrder, filter, setFilter } = useMemory();
  const [selectedPin, setSelectedPin] = useState<VoicePinResponse | null>(null);

  const sortOptions: { label: string; value: SortOrder }[] = [
    { label: 'Mới nhất', value: 'newest' },
    { label: 'Cũ nhất', value: 'oldest' },
    { label: 'Nghe nhiều', value: 'most-listened' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <BookOpen size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Ký ức của tôi</h1>
          </div>

          <WhispererBadge />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortOrder(opt.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap
                  ${sortOrder === opt.value ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-64 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Tìm ký ức..."
                className="w-full bg-white border border-slate-200 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <button className="w-10 h-10 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-slate-400 font-medium">Đang tìm lại ký ức...</p>
          </div>
        ) : pins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300">
              <Search size={48} strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Không tìm thấy ký ức nào</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto mt-1">Hãy bắt đầu tạo những lời thì thầm đầu tiên trên bản đồ nhé!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {pins.map((pin) => (
                <MemoryItem
                  key={pin.id}
                  pin={pin}
                  onClick={() => setSelectedPin(pin)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPin && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPin(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setSelectedPin(null)}
                  className="w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

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
