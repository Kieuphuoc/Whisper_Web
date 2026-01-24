import { VoicePin, VoiceReaction, VoiceComment } from "@/types/voicepin";

/* =======================
   VOICE PINS
======================= */

export const voicePins: VoicePin[] = [
  {
    id: "vp_001",
    audioUrl: "/mock/audio/rainy-walk.mp3",
    duration: 42,
    createdAt: "2025-01-20T16:30:00Z",
    lat: 10.7769,
    lng: 106.7009,
    emotion: "calm",
    ownerId: "user_01",
    memoryId: "mem_001"
  },
  {
    id: "vp_002",
    audioUrl: "/mock/audio/afternoon-rain.mp3",
    duration: 58,
    createdAt: "2025-01-21T09:15:00Z",
    lat: 10.762622,
    lng: 106.660172,
    emotion: "sad",
    ownerId: "user_02",
    memoryId: "mem_002"
  },
  {
    id: "vp_003",
    audioUrl: "/mock/audio/quiet-hub.mp3",
    duration: 33,
    createdAt: "2025-01-22T14:05:00Z",
    lat: 10.8231,
    lng: 106.6297,
    ownerId: "user_01"
  }
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
