
export interface VoicePin {
  id: string;
  audioUrl: string;
  duration: number;       
  createdAt: string;      
  lat: number;
  lng: number;
  emotion?: string;       
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
