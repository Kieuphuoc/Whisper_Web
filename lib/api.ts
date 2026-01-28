const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface VoicePinResponse {
  id: number;
  audioUrl: string;
  description: string;
  latitude: number;
  longitude: number;
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  createdAt: string;
  listens: number;
  userId: number;
  user?: {
    username: string;
    displayName: string;
    avatar: string | null;
  };
  images?: { id: number; url: string }[];
}

export interface CreateVoicePinData {
  audioBlob: Blob;
  description?: string;
  latitude: number;
  longitude: number;
  visibility?: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
  imageFile?: File;
}

export interface Friend {
  id: number;
  username: string;
  displayName: string;
  avatar: string | null;
}

/**
 * Lấy danh sách VoicePin public
 */
export async function getPublicVoicePins(): Promise<VoicePinResponse[]> {
  const res = await fetch(`${API_BASE_URL}/voice/public`);
  if (!res.ok) {
    throw new Error('Failed to fetch public voice pins');
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Lấy VoicePin của bạn bè (friends visibility)
 */
export async function getFriendsVoicePins(token: string): Promise<VoicePinResponse[]> {
  const res = await fetch(`${API_BASE_URL}/voice/friends`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch friends voice pins');
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Lấy danh sách bạn bè
 */
export async function getFriendsList(userId: number, token: string): Promise<Friend[]> {
  const res = await fetch(`${API_BASE_URL}/friend/list/${userId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch friends list');
  }
  const json = await res.json();
  return json.data || [];
}

/**
 * Tạo VoicePin mới
 */
export async function createVoicePin(data: CreateVoicePinData, token: string): Promise<VoicePinResponse> {
  const formData = new FormData();

  // Audio file (required)
  formData.append('file', data.audioBlob, 'recording.webm');

  // Other fields
  formData.append('description', data.description || '');
  formData.append('latitude', data.latitude.toString());
  formData.append('longitude', data.longitude.toString());
  formData.append('visibility', data.visibility || 'PUBLIC');
  formData.append('images', JSON.stringify([]));

  const res = await fetch(`${API_BASE_URL}/voice`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create voice pin');
  }

  const json = await res.json();
  return json.data;
}

