"use client";
import { useState, useEffect, useCallback } from "react";
import { getFriendsList, Friend } from "@/lib/api";

export function useFriends(userId: number | null, token: string | null) {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFriends = useCallback(async () => {
        if (!userId || !token) return;

        setLoading(true);
        try {
            const data = await getFriendsList(userId, token);
            setFriends(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch friends");
        } finally {
            setLoading(false);
        }
    }, [userId, token]);

    useEffect(() => {
        fetchFriends();
    }, [fetchFriends]);

    return { friends, loading, error, refreshFriends: fetchFriends };
}
