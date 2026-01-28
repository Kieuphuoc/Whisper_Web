const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
  avatar: string | null;
  tagline?: string;
}

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
 * Auth APIs
 */
export async function login(credentials: any): Promise<{ user: User; token: string }> {
  // Map 'email' to 'username' for backend compatibility
  const payload = {
    username: credentials.email,
    password: credentials.password,
  };
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  const json = await res.json();
  return json;
}

export async function register(userData: any): Promise<{ user: User; token: string }> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  const json = await res.json();
  return json.data;
}

export async function getMe(token: string): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user profile');
  }
  const json = await res.json();
  return json.data;
}

/**
 * Voice Pin APIs
 */
export async function getPublicVoicePins(): Promise<VoicePinResponse[]> {
  const res = await fetch(`${API_BASE_URL}/voice/public`);
  if (!res.ok) {
    throw new Error('Failed to fetch public voice pins');
  }
  const json = await res.json();
  return json.data || [];
}

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
 * Friend APIs
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
 * Voice Creation
 */
export async function createVoicePin(data: CreateVoicePinData, token: string): Promise<VoicePinResponse> {
  const formData = new FormData();
  formData.append('file', data.audioBlob, 'recording.webm');
  formData.append('description', data.description || '');
  formData.append('latitude', data.latitude.toString());
  formData.append('longitude', data.longitude.toString());
  formData.append('visibility', data.visibility || 'PUBLIC');
  formData.append('images', JSON.stringify([]));

  const res = await fetch(`${API_BASE_URL}/voice`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create voice pin');
  }

  const json = await res.json();
  return json.data;
}


