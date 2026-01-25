'use client';
import { Pin, Share2, Heart } from "lucide-react";

export default function PinPreview() {
  console.log("Rendering PinPreview component");

  return (
    <div className="flex items-center relative min-w-[550px]">
      <div className="relative z-30 w-70 h-70 -rotate-12 transition-all">
        <img
          src={"https://i.pinimg.com/736x/c9/8c/c4/c98cc4f40e85eb0107489c577ecb381d.jpg"}
          // alt={title}
          className="w-full h-full object-cover rounded-2xl shadow-lg"
        />
      </div>

      <div className="relative z-10 flex-1 bg-white p-4 pl-20 -ml-16 rounded-r-2xl shadow-xl min-h-[220px] flex flex-col justify-between">

        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">title</h3>
            <span className="text-[9px] bg-slate-100 px-1.5 rounded">date</span>
          </div>

          <p className="text-[11px] text-slate-500 mt-1">location</p>
        </div>

        <div className="border-t pt-2 flex justify-end gap-4">
          <ActionButton icon={Pin} />
          <ActionButton icon={Share2} />
          <ActionButton icon={Heart} />
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