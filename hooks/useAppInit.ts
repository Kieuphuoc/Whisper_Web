'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getFriendsList } from '@/lib/api';

export function useAppInit() {
    const { user, token, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const [isPreloading, setIsPreloading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // If auth is still loading, wait
        if (isAuthLoading) return;

        // If not authenticated, we are "ready" to show login, but no preloading needed
        if (!isAuthenticated) {
            setIsReady(true);
            return;
        }

        // Preload data for authenticated user
        async function preloadData() {
            setIsPreloading(true);
            try {
                if (!user || !token) return;

                // Fetch essential data in parallel
                await Promise.all([
                    getFriendsList(user.id, token),
                    // Add other essential home preloads here
                ]);

                setIsReady(true);
            } catch (err: any) {
                console.error('App preloading failed:', err);
                setError('Failed to load application data');
                setIsReady(true); // Proceed anyway, but with error state
            } finally {
                setIsPreloading(false);
            }
        }

        preloadData();
    }, [isAuthenticated, isAuthLoading, user, token]);

    return { isReady: isReady && !isAuthLoading, isPreloading, error };
}
