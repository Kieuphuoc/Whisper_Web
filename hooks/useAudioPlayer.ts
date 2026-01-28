"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface AudioPlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    isLoaded: boolean;
}

export function useAudioPlayer(src: string | null) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [state, setState] = useState<AudioPlayerState>({
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        isLoaded: false,
    });

    // Create/update audio element when src changes
    useEffect(() => {
        if (!src) {
            audioRef.current = null;
            setState({ isPlaying: false, currentTime: 0, duration: 0, isLoaded: false });
            return;
        }

        const audio = new Audio(src);
        audioRef.current = audio;

        const handleLoadedMetadata = () => {
            setState(prev => ({
                ...prev,
                duration: audio.duration,
                isLoaded: true,
            }));
        };

        const handleTimeUpdate = () => {
            setState(prev => ({ ...prev, currentTime: audio.currentTime }));
        };

        const handleEnded = () => {
            setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        };

        const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
        const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.pause();
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, [src]);

    const play = useCallback(() => {
        audioRef.current?.play();
    }, []);

    const pause = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const toggle = useCallback(() => {
        if (state.isPlaying) {
            pause();
        } else {
            play();
        }
    }, [state.isPlaying, play, pause]);

    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setState(prev => ({ ...prev, currentTime: time }));
        }
    }, []);

    const formatTime = useCallback((seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }, []);

    return {
        ...state,
        play,
        pause,
        toggle,
        seek,
        formatTime,
    };
}
