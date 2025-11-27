"use client";
import ShapeBlur from '../components/ShapeBlur';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Bell,
  Mic,
  Search,
  User,
  TrendingUp,
  MapPin,
  Zap,
  MessageCircle,
  Compass,
  Sparkles,
  Plus,
  Lock,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";
import ModeSwitcher from '@/components/layout/ModeSwitcher';

// Fix icon mặc định của Leaflet
const DefaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

const center: [number, number] = [10.762622, 106.660172];

const voicePins = [
  {
    id: "v1",
    user: "Ava",
    snippet: "Windy rooftop confession about growing up between two cities.",
    mode: "Public" as const,
    location: "Nguyen Hue Walking Street",
    coords: [10.772622, 106.70417] as [number, number],
    listens: 1200,
    ago: "3m",
    reactions: { heart: 72, fire: 45, wow: 11 },
  },
  {
    id: "v2",
    user: "Kai",
    snippet: "Secret cafe playlist drop. Track 05 is for the night riders.",
    mode: "Friend" as const,
    location: "Thao Dien hidden loft",
    coords: [10.8095, 106.7305] as [number, number],
    listens: 845,
    ago: "12m",
    reactions: { heart: 32, fire: 88, wow: 4 },
  },
  {
    id: "v3",
    user: "Nova",
    snippet: "Half-whisper poem at the riverside. Leave a reply if you felt it.",
    mode: "Private" as const,
    location: "Saigon River bend",
    coords: [10.775, 106.703] as [number, number],
    listens: 32,
    ago: "28m",
    reactions: { heart: 5, fire: 2, wow: 1 },
  },
];

const randomVoices = [
  {
    id: "rv-1",
    title: "Library Rooftop",
    listens: "1.2K",
    replies: 48,
    posted: "2m ago",
  },
  {
    id: "rv-2",
    title: "Canal Echo",
    listens: "978",
    replies: 13,
    posted: "11m ago",
  },
  {
    id: "rv-3",
    title: "Skybridge Pulse",
    listens: "2.1K",
    replies: 103,
    posted: "32m ago",
  },
];

export default function HomeWhisper() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#dfe7ff] via-[#edf1ff] to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(114,130,255,0.15),_transparent_60%)]" />

      {/* ===================== TOP RIGHT ===================== */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-[500]">
        <div className="p-3 bg-white/70 border border-white/60 backdrop-blur-xl rounded-full shadow-lg shadow-black/10">
          <Bell size={18} className="text-gray-700" />
        </div>
        <Link href="/login">
          <div className="flex items-center gap-3 bg-white/80 border border-white rounded-full px-3 py-1 shadow-lg shadow-black/10">
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Whisperer
              </p>
              <p className="text-sm font-semibold text-gray-700">Juno R.</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#4a56e2] to-[#8893ff] rounded-full shadow-inner flex items-center justify-center font-semibold text-white text-xs">
              JR
            </div>
          </div>
        </Link>
      </div>

      {/* ==================== TOP TOGGLE ==================== */}
      {/* <div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-[500]
        bg-white/80 border border-white/70 backdrop-blur-xl shadow-xl rounded-full px-3 py-2 flex gap-2"
      >
        {[
          { label: "Public", icon: <Globe size={18} /> },
          { label: "Friend", icon: <Users size={18} /> },
          { label: "Private", icon: <Lock size={18} /> },
        ].map((mode, idx) => {
          const active = idx === 0;
          return (
            <button
              key={mode.label}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-full transition ${active
                ? "bg-[#4a56e2] text-white shadow-lg shadow-[#4a56e2]/30"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          );
        })}
      </div> */}

      {/* ==================== LEFT SIDEBAR ==================== */}
<ModeSwitcher />
      {/* ==================== LEFT ICON SIDEBAR ==================== */}
      <aside
        className="absolute top-1/2 -translate-y-1/2 left-6 z-[500]
        w-20 bg-white/80 border border-white/70 backdrop-blur-2xl shadow-[0_15px_45px_rgba(110,121,182,0.25)]
        rounded-[40px] py-5 flex flex-col items-center "
      >
        {[
          { icon: <Search size={22} className="gold" fill="gold" />, active: false },
          { icon: <TrendingUp size={22} />, active: true },
          { icon: <User size={22} />, active: false },
          { icon: <Bell size={22} />, active: false },
        ].map((item, idx) => (
          <div key={idx} className="w-full px-3">
            <SidebarIcon active={item.active}>{item.icon}</SidebarIcon>
            {idx < 3 && (
              <div className="mt-4 border-t border-white/70" aria-hidden />
            )}
          </div>
        ))}
      </aside>




      {/* ================= RIGHT TRENDING / RANDOM ================= */}
      <section
        className="absolute top-24 right-6 w-80 z-[500]
        bg-white/85 border border-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_20px_60px_rgba(80,89,152,0.28)]"
      >
        <header className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Explore
            </p>
            <h2 className="text-xl font-semibold text-gray-800">
              Random Voice
            </h2>
          </div>
          <button className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
            <Sparkles size={14} />
            Shuffle
          </button>
        </header>

        <div className="space-y-4">
          {randomVoices.map((voice, idx) => (
            <article
              key={voice.id}
              className="p-4 rounded-2xl bg-white/60 border border-white shadow-inner shadow-white/30"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  #{idx + 1} {voice.title}
                </p>
                <span className="text-xs text-gray-500">{voice.posted}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1 text-gray-700 font-semibold">
                  <Zap size={14} className="text-yellow-500" />
                  {voice.listens} listens
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} /> {voice.replies} replies
                </span>
              </div>
            </article>
          ))}
        </div>

        <button className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-[#4a56e2] to-[#8893ff] text-white font-semibold shadow-[0_15px_30px_rgba(74,86,226,0.35)] flex items-center justify-center gap-2">
          <Compass size={18} />
          Listen Nearby
        </button>
      </section>

      {/* ================= LEFT VOICE PIN STACK ================= */}
      {/* <section
        className="absolute top-24 left-28 max-w-sm z-[500]
        space-y-5"
      >
        <article className="rounded-3xl bg-white/85 border border-white shadow-[0_20px_70px_rgba(69,78,146,0.3)] backdrop-blur-2xl p-6">
          <header className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
                Drop
              </p>
              <h2 className="text-xl font-semibold text-gray-800">
                Voice pin
              </h2>
            </div>
            <button className="p-2 rounded-2xl bg-gray-100 text-gray-600">
              <Plus size={18} />
            </button>
          </header>

          <div className="rounded-2xl border border-dashed border-[#4a56e2]/40 bg-[#f5f6ff] p-4 mb-4">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Mic size={16} className="text-[#4a56e2]" />
              Hold to start recording
            </p>
            <h3 className="mt-3 text-lg font-semibold text-gray-800">
              Tag a location
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Map pin will be dropped at your current location. Drag to adjust.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["Public", "Friend", "Private"].map((mode, idx) => {
              const active = idx === 0;
              return (
                <button
                  key={mode}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold border ${active
                    ? "border-transparent bg-gradient-to-r from-[#4a56e2] to-[#8893ff] text-white shadow-lg"
                    : "border-gray-200 text-gray-500 bg-white"
                    }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>

          <button className="mt-4 w-full py-3 rounded-2xl bg-[#0f172a] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0f172a]/30">
            <MapPin size={18} />
            Drop voice pin
          </button>
        </article>

        <article className="rounded-3xl bg-white/80 border border-white shadow-[0_15px_60px_rgba(68,77,148,0.3)] backdrop-blur-xl p-5 space-y-4">
          <header className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Live reacts</h3>
            <span className="text-xs text-gray-400">Realtime</span>
          </header>

          <div className="flex items-center gap-4">
            {["🔥", "💜", "🤯", "😂", "🌊"].map((emoji, idx) => (
              <button
                key={idx}
                className="w-12 h-12 rounded-2xl bg-white border border-white shadow flex items-center justify-center text-xl hover:-translate-y-1 transition-transform"
              >
                {emoji}
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-[#f7f8ff] border border-white p-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Replies
            </p>
            <div className="space-y-2">
              <CommentBubble
                name="Milo"
                text="Left a harmonica loop at the old train depot. Stitch it?"
              />
              <CommentBubble
                name="Sora"
                text="Need more night-drive entries like this. City feels alive."
              />
            </div>
          </div>
        </article>
      </section> */}

      {/* ======================= MAP ======================= */}
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-[100]"
      >
        <TileLayer
          attribution="&copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {voicePins.map((pin) => (
          <Marker key={pin.id} position={pin.coords}>
            <Popup>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{pin.snippet}</p>
                <p className="text-xs text-gray-500">{pin.location}</p>
                <p className="text-xs text-gray-400">
                  {pin.listens} listens · {pin.ago}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* =================== VOICE PIN OVERLAY ================ */}
      {/* <section className="pointer-events-none absolute inset-0 z-[400] flex items-center justify-center">
        <div className="grid grid-cols-3 gap-6 w-4/5 max-w-5xl">
          {voicePins.map((pin) => (
            <VoiceCard key={pin.id} pin={pin} />
          ))}
        </div>
      </section> */}

      {/* ================== BOTTOM RECORD BAR ================== */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-3">
        <div className='absolute left-1/2 -translate-x-1/2 bottom-6' ><Mic size={32} /></div>
      </div>
    </main >
  );
}

function SidebarIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className="
        w-full h-12 flex items-center justify-center
        rounded-2xl border transition
        bg-white/60
        hover:bg-white
        border-white
      "
      style={{
        color: active ? "#4a56e2" : "#475569",
        boxShadow: active
          ? "inset 0 0 0 1px rgba(74,86,226,0.4)"
          : "none",
      }}
    >
      {children}
    </button>
  );
}

function VoiceCard({
  pin,
}: {
  pin: (typeof voicePins)[number];
}) {
  const modeColor =
    pin.mode === "Public"
      ? "text-[#10b981]"
      : pin.mode === "Friend"
        ? "text-[#3b82f6]"
        : "text-[#f97316]";

  return (
    <article className="pointer-events-auto rounded-3xl border border-white/70 bg-white/80 backdrop-blur-2xl shadow-[0_20px_70px_rgba(81,90,166,0.3)] p-5 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
            {pin.location}
          </p>
          <h3 className="text-lg font-semibold text-gray-800">{pin.user}</h3>
        </div>
        <span className={`text-xs font-semibold ${modeColor}`}>{pin.mode}</span>
      </header>

      <p className="text-sm text-gray-600 leading-relaxed">{pin.snippet}</p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{pin.listens} listens</span>
        <span>{pin.ago} ago</span>
      </div>

      <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
        <ReactionPill icon="💜" value={pin.reactions.heart} />
        <ReactionPill icon="🔥" value={pin.reactions.fire} />
        <ReactionPill icon="🤯" value={pin.reactions.wow} />
      </div>

      <button className="mt-auto w-full py-3 rounded-2xl bg-gradient-to-r from-[#4a56e2] to-[#8893ff] text-white font-semibold flex items-center justify-center gap-2">
        <Mic size={16} />
        Listen drop
      </button>
    </article>
  );
}

function ReactionPill({ icon, value }: { icon: string; value: number }) {
  return (
    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 border border-white text-gray-700">
      {icon} {value}
    </span>
  );
}

function CommentBubble({ name, text }: { name: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-3 border border-white/70 shadow-sm">
      <p className="text-xs font-semibold text-gray-700">{name}</p>
      <p className="text-xs text-gray-500 mt-1">{text}</p>
    </div>
  );
}