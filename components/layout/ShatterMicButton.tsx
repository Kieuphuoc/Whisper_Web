import { useState } from "react";
import { Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export default function ShatterMicButton() {
  const [isExploding, setIsExploding] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    // Kích hoạt hiệu ứng nổ
    setIsExploding(true);

    // Sau khi nổ xong (khoảng 500ms), chuyển trạng thái
    setTimeout(() => {
      setIsExploding(false);
      setIsRecording(!isRecording);
    }, 600);
  };

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500] flex items-center justify-center">
      
      {/* Container chính */}
      <div className="relative flex items-center justify-center w-24 h-24">
        
        {/* === PHẦN 1: HIỆU ỨNG SÓNG (SONAR) === */}
        {/* Chỉ hiện khi không nổ. Khi đang record thì sóng mạnh hơn */}
        {!isExploding && (
            <>
            {[...Array(3)].map((_, i) => (
                <motion.div
                key={i}
                className={clsx(
                    "absolute inset-0 rounded-full border",
                    isRecording 
                        ? "border-red-500/50 bg-red-500/10" // Màu đỏ khi đang ghi âm
                        : "border-primary/30 bg-primary/5"  // Màu primary khi chờ
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.5, 2], // Sóng lan rộng ra
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: i * 0.6, // Delay để tạo cảm giác sóng liên tục
                    ease: "easeOut",
                }}
                />
            ))}
            </>
        )}

        {/* === PHẦN 2: CÁC MẢNH VỠ (PARTICLES) === */}
        {/* Chỉ render khi state nổ được kích hoạt */}
        {isExploding && <ExplosionParticles color={isRecording ? "bg-red-500" : "bg-primary"} />}

        {/* === PHẦN 3: NÚT MIC CHÍNH === */}
        <motion.button
          onClick={handleClick}
          className={clsx(
            "relative z-10 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-colors duration-300 outline-none",
            isRecording ? "bg-red-500 text-white" : "bg-white text-primary"
          )}
          // Hiệu ứng "Co lại" lấy đà trước khi nổ
          animate={
            isExploding
              ? { scale: 0, opacity: 0 } // Biến mất khi nổ
              : { scale: 1, opacity: 1 } // Hiện lại bình thường
          }
          transition={{ duration: 0.1 }} // Biến mất cực nhanh
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mic size={28} strokeWidth={2.5} />
        </motion.button>

      </div>
    </div>
  );
}

// === COMPONENT CON: TẠO MẢNH VỠ ===
const ExplosionParticles = ({ color = "bg-primary" }) => {
  // Tạo 12 mảnh vỡ ngẫu nhiên
  const particles = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((_, i) => {
        // Tính toán góc bay ngẫu nhiên cho từng mảnh
        const angle = (i / particles.length) * 360; 
        const randomSpread = Math.random() * 20 - 10; // Random lệch một chút
        const finalAngle = angle + randomSpread;
        
        // Chuyển độ sang radian để tính tọa độ X, Y
        const radian = (finalAngle * Math.PI) / 180;
        const distance = 80 + Math.random() * 40; // Bay xa từ 80px đến 120px
        
        const x = Math.cos(radian) * distance;
        const y = Math.sin(radian) * distance;

        return (
          <motion.div
            key={i}
            className={clsx("absolute w-3 h-3 rounded-sm", color)}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotation: 0 }}
            animate={{
              x: x,
              y: y,
              scale: 0, // Nhỏ dần
              opacity: 0, // Mờ dần
              rotate: Math.random() * 720, // Xoay vòng vòng
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};