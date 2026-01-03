import React, { useState } from 'react';
import { Bell } from 'lucide-react';

// Định nghĩa CSS Animation trực tiếp trong file này để component có thể
// hoạt động ngay lập tức ("plug-and-play") mà không cần sửa tailwind.config.js
const customStyles = `
  @keyframes bell-ring {
    0%, 100% { transform: rotate(0deg); }
    10% { transform: rotate(10deg); }
    20% { transform: rotate(-10deg); }
    30% { transform: rotate(6deg); }
    40% { transform: rotate(-6deg); }
    50% { transform: rotate(3deg); }
    60% { transform: rotate(-3deg); }
    70% { transform: rotate(0deg); }
  }

  .animate-bell-ring {
    transform-origin: top center;
    animation: bell-ring 2.5s ease-in-out infinite;
  }
`;

interface NotificationBellProps {
  hasNotification?: boolean;
}

export default function NotificationBell({ hasNotification = false }: NotificationBellProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{customStyles}</style>

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative group
          p-3 rounded-full
          bg-white/70 border border-white/60 backdrop-blur-xl shadow-lg shadow-black/10
          /* Hiệu ứng Hover Container */
          hover:bg-white/90 hover:scale-105 hover:shadow-xl
          transition-all duration-300 ease-out
          active:scale-95
        `}
      >
        {/* Icon Chuông */}
        <Bell
          size={20}
          className={`
            transition-colors duration-300
            ${hasNotification ? 'text-orange-600 animate-bell-ring' : 'text-gray-600'}
            ${!hasNotification && 'group-hover:text-indigo-600'}
          `}
          /* Hiệu ứng fill nhẹ khi hover */
          fill={isHovered && !hasNotification ? "currentColor" : "none"}
        />

        {/* Chấm đỏ thông báo (Badge) */}
        {hasNotification && (
          <span className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </>
  );
}