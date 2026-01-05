import { useState } from "react";
import { Globe, Users, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function RadarFilterSimple() {
  const [activeTab, setActiveTab] = useState("Public");

  const tabs = [
    { id: "Public", icon: Globe, label: "Public" },
    { id: "Friend", icon: Users, label: "Friends" },
    { id: "Private", icon: Lock, label: "Private" },
  ];

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
      {/* Container nền trắng mờ */}
      <div className="flex p-1 bg-white/90 backdrop-blur border border-slate-200 shadow-lg rounded-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "relative flex items-center gap-2 px-4 py-2 text-b font-medium rounded-full transition-colors duration-200 z-10",
                isActive ? "text-white" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {/* Background trượt (Sliding Pill) - Dùng layoutId để trượt */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                  // Dùng 'easeOut' thay vì 'spring' để không bị nảy
                  transition={{ type: "tween", ease: "circOut", duration: 0.25 }}
                />
              )}

              <Icon size={16} strokeWidth={2.5} />
              
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}