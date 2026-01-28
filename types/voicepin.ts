export interface VoicePin {
  id: string;

  // map
  lat: number;
  lng: number;

  // audio
  audioUrl: string;
  duration: number;

  // UI
  title?: string;
  imageUrl?: string;
  location?: string;
  date?: string;
  emotion?: string;

  // system
  createdAt: string;
  ownerId: string;
  memoryId?: string;
}

export interface VoiceReaction {
  id: string;
  voicePinId: string;
  type: 'love' | 'sad' | 'wow' | 'angry';
  userId: string;
  createdAt: string;
}

export interface VoiceComment {
  id: string;
  voicePinId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export type VoiceVisibility = "private" | "friends" | "public";
