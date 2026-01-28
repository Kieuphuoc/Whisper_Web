"use client";
import { useEffect, useState, useCallback } from "react";

interface GeolocationState {
    location: { lat: number; lng: number } | null;
    error: string | null;
    loading: boolean;
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        location: null,
        error: null,
        loading: true,
    });

    const requestLocation = useCallback(() => {
        if (typeof window === "undefined" || !navigator.geolocation) {
            setState(prev => ({ ...prev, error: "Geolocation not supported", loading: false }));
            return;
        }

        setState(prev => ({ ...prev, loading: true }));

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setState({
                    location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                    error: null,
                    loading: false,
                });
            },
            (err) => {
                setState({
                    location: null,
                    error: err.message,
                    loading: false,
                });
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    // Auto-request on mount
    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    return {
        ...state,
        requestLocation,
    };
}
