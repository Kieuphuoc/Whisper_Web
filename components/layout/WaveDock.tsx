import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { 
  Home, Terminal, Scan, Triangle, 
  Repeat2, X, Github, 
  LucideIcon 
} from "lucide-react";

// --- DATA CẤU HÌNH ICON ---
const NAV_ITEMS = [
  { id: 1, icon: Home, label: "Home" },
  { id: 2, icon: Terminal, label: "Console" },
  { id: 3, icon: Scan, label: "Components" }, // Icon hình vuông nét đứt
  { id: 4, icon: Triangle, label: "Aceternity" }, // Giả lập logo A
  { id: 5, icon: Repeat2, label: "Changelog" },
  { id: 6, icon: X, label: "Twitter" },
  { id: 7, icon: Github, label: "GitHub" },
];

export const WaveDock = () => {
  // Biến theo dõi vị trí chuột theo trục dọc (Y)
  let mouseY = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className="mx-auto flex w-16 flex-col items-center gap-4 rounded-full bg-slate-50 px-2 py-4 shadow-inner ring-1 ring-slate-200"
    >
      {NAV_ITEMS.map((item) => (
        <DockIcon key={item.id} mouseY={mouseY} icon={item.icon} />
      ))}
    </motion.div>
  );
};

function DockIcon({
  mouseY,
  icon: Icon,
}: {
  mouseY: MotionValue;
  icon: LucideIcon;
}) {
  let ref = useRef<HTMLDivElement>(null);

  // 1. TÍNH TOÁN KHOẢNG CÁCH
  // Tính khoảng cách từ chuột đến tâm của icon này theo trục Y
  let distance = useTransform(mouseY, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // 2. BIẾN ĐỔI KÍCH THƯỚC (WAVE EFFECT)
  // -150px đến 150px là vùng ảnh hưởng.
  // Ở tâm (0px) -> size là 60px. Ở xa -> size là 40px.
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 65, 40]);
  
  // 3. THÊM VẬT LÝ (SPRING)
  // Giúp chuyển động nảy và mượt mà hơn
  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }} // Hình tròn nên Width = Height
      className="group relative flex aspect-square items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-emerald-500 hover:text-white transition-colors"
    >
      {/* Icon bên trong cũng scale nhẹ theo nút cha */}
      <Icon className="h-2/5 w-2/5" strokeWidth={2} />
      
      {/* Tooltip (Optional) */}
      <div className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
        Label
      </div>
    </motion.div>
  );
}
