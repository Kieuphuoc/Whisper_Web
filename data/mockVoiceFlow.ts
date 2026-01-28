import { VoicePin, VoiceReaction, VoiceComment } from "@/types/voicepin";

/* =======================
   VOICE PINS
======================= */

export const voicePins: VoicePin[] = [
  {
    id: "vp-001",
    lat: 10.762622,
    lng: 106.660172,

    audioUrl: "/audio/rainy-day.mp3",
    duration: 42,

    title: "Rainy Afternoon",
    imageUrl: "https://i.pinimg.com/736x/c9/8c/c4/c98cc4f40e85eb0107489c577ecb381d.jpg",
    location: "Ho Chi Minh City, VN",
    date: "Oct 14",
    emotion: "sad",

    createdAt: "2025-10-14T09:30:00Z",
    ownerId: "user-001",
    memoryId: "mem-001",
  },
  {
    id: "vp-002",
    lat: 10.776889,
    lng: 106.700806,

    audioUrl: "/audio/city-night.mp3",
    duration: 28,

    title: "City at Night",
    imageUrl: "https://i.pinimg.com/736x/2e/9f/6c/2e9f6c4a7d1e9d7c7a0d4c1f5b2f4c6e.jpg",
    location: "District 1, HCMC",
    date: "Nov 02",
    emotion: "wow",

    createdAt: "2025-11-02T18:45:00Z",
    ownerId: "user-002",
  },
  {
    id: "vp-003",
    lat: 10.748092,
    lng: 106.676392,

    audioUrl: "/audio/morning-walk.mp3",
    duration: 55,

    title: "Morning Walk",
    location: "District 7, HCMC",
    emotion: "love",

    createdAt: "2025-11-20T06:10:00Z",
    ownerId: "user-001",
  },
];


/* =======================
   REACTIONS
======================= */

export const voiceReactions: VoiceReaction[] = [
  {
    id: "react_001",
    voicePinId: "vp_001",
    type: "love",
    userId: "user_02",
    createdAt: "2025-01-20T17:00:00Z"
  },
  {
    id: "react_002",
    voicePinId: "vp_001",
    type: "wow",
    userId: "user_03",
    createdAt: "2025-01-20T18:12:00Z"
  },
  {
    id: "react_003",
    voicePinId: "vp_002",
    type: "sad",
    userId: "user_01",
    createdAt: "2025-01-21T10:00:00Z"
  }
];

/* =======================
   COMMENTS
======================= */

export const voiceComments: VoiceComment[] = [
  {
    id: "cmt_001",
    voicePinId: "vp_001",
    userId: "user_03",
    content: "Nghe mà thấy Sài Gòn chậm lại.",
    createdAt: "2025-01-20T18:30:00Z"
  },
  {
    id: "cmt_002",
    voicePinId: "vp_002",
    userId: "user_04",
    content: "Mưa chiều đúng chất luôn.",
    createdAt: "2025-01-21T11:10:00Z"
  }
];

/* =======================
   HELPERS (OPTIONAL)
======================= */

export const getReactionsByPin = (id: string) =>
  voiceReactions.filter(r => r.voicePinId === id);

export const getCommentsByPin = (id: string) =>
  voiceComments.filter(c => c.voicePinId === id);
