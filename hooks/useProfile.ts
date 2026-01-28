'use client';

import { useState, useEffect } from 'react';
import { User, getMe, getFriendsList, VoicePinResponse, getFriendsVoicePins } from '@/lib/api';
import { useAuth } from './useAuth';

export interface ProfileData {
    user: User;
    stats: {
        voiceCount: number;
        followerCount: number;
        followingCount: number;
        totalListens: number;
    };
    relation: 'self' | 'friend' | 'none' | 'pending';
}

export function useProfile(profileId: string | null) {
    const { user: currentUser, token } = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!profileId) return;

        async function fetchProfile() {
            setLoading(true);
            try {
                // In a real app, we'd have a getProfileById endpoint. 
                // For now, if it's currentUser, use getMe, otherwise mock or placeholder.
                const isSelf = currentUser?.id.toString() === profileId;

                // Mocking stats for now as backend might not have it yet
                const stats = {
                    voiceCount: 12,
                    followerCount: 128,
                    followingCount: 64,
                    totalListens: 1024,
                };

                let userData: User;
                if (isSelf && currentUser) {
                    userData = currentUser;
                } else {
                    // Placeholder for other user fetch
                    userData = {
                        id: parseInt(profileId as string),
                        username: 'user_' + profileId,
                        email: '',
                        displayName: 'User ' + profileId,
                        avatar: null,
                        tagline: 'Ghi lại những khoảng lặng của tâm hồn.'
                    };
                }

                setProfileData({
                    user: userData,
                    stats,
                    relation: isSelf ? 'self' : 'none',
                });
            } catch (err: any) {
                setError(err.message || 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [profileId, currentUser]);

    return { profileData, loading, error };
}
