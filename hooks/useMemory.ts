'use client';

import { useState, useEffect, useMemo } from 'react';
import { getPublicVoicePins, getFriendsVoicePins, VoicePinResponse } from '@/lib/api';
import { useAuth } from './useAuth';

export type SortOrder = 'newest' | 'oldest' | 'most-listened';

export function useMemory() {
    const { token, isAuthenticated } = useAuth();
    const [pins, setPins] = useState<VoicePinResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [filter, setFilter] = useState<'all' | 'public' | 'friends'>('all');

    useEffect(() => {
        async function fetchPins() {
            setLoading(true);
            try {
                let publicPins: VoicePinResponse[] = [];
                let friendsPins: VoicePinResponse[] = [];

                // Fetch public pins (available to all)
                publicPins = await getPublicVoicePins();

                // Fetch friends pins only if authenticated
                if (isAuthenticated && token) {
                    friendsPins = await getFriendsVoicePins(token);
                }

                // Merge and remove duplicates if any (by ID)
                const merged = [...publicPins, ...friendsPins];
                const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());

                setPins(unique);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch memories');
            } finally {
                setLoading(false);
            }
        }

        fetchPins();
    }, [token, isAuthenticated]);

    const sortedPins = useMemo(() => {
        let filtered = pins;
        if (filter === 'public') filtered = pins.filter(p => p.visibility === 'PUBLIC');
        if (filter === 'friends') filtered = pins.filter(p => p.visibility === 'FRIENDS');

        return [...filtered].sort((a, b) => {
            if (sortOrder === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortOrder === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortOrder === 'most-listened') return b.listens - a.listens;
            return 0;
        });
    }, [pins, sortOrder, filter]);

    return { pins: sortedPins, loading, error, sortOrder, setSortOrder, filter, setFilter };
}
