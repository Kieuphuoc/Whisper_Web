"use client";
import { useState } from "react";
import { useFriends } from "@/hooks/useFriends";
import { Users, User, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FriendsSidebarProps {
    userId: number | null;
    token: string | null;
}

export default function FriendsSidebar({ userId, token }: FriendsSidebarProps) {
    const { friends, loading, error } = useFriends(userId, token);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="fixed right-0 top-1/2 -translate-y-1/2 h-[70vh] z-[1000] flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Trigger area / tab */}
            <div className={`p-3 bg-white/80 backdrop-blur-md rounded-l-2xl shadow-[-5px_0_15px_rgba(0,0,0,0.05)] border-l border-y border-slate-200 cursor-pointer transition-all duration-300 ${isHovered ? 'opacity-0 translate-x-full' : 'opacity-100'}`}>
                <Users className="text-secondary" size={24} />
            </div>

            {/* Sidebar Content */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="w-72 h-full bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] border-l border-slate-100 flex flex-col overflow-hidden rounded-l-3xl"
                    >
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                                <Users size={20} className="text-secondary" />
                                Bạn bè
                            </h3>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                                {friends.length}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center h-40 gap-2 opacity-50">
                                    <Loader2 className="animate-spin text-secondary" size={24} />
                                    <p className="text-xs font-medium">Đang tải...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center p-4">
                                    <p className="text-xs text-rose-500">{error}</p>
                                </div>
                            ) : friends.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-40 text-center px-4">
                                    <Users size={40} strokeWidth={1} />
                                    <p className="text-xs font-medium">Chưa có bạn bè nào.<br />Hãy kết nối thêm nhé!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {friends.map((friend) => (
                                        <div
                                            key={friend.id}
                                            className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100"
                                        >
                                            <div className="relative">
                                                {friend.avatar ? (
                                                    <img
                                                        src={friend.avatar}
                                                        alt={friend.displayName}
                                                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 border-2 border-white shadow-sm">
                                                        <User size={20} />
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-800 truncate">
                                                    {friend.displayName}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-medium truncate italic">
                                                    @{friend.username}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-50">
                            <button className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold transition-all flex items-center justify-center gap-2">
                                Quản lý bạn bè
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
