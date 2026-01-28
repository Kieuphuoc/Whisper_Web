'use client';

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { VoiceVisibilitySelector } from '@/components/home/VoiceVisibilitySelector';
import { RecordButton } from "@/components/home/RecordButton";
import { WhispererBadge } from "@/components/layout/WhispererBadge";
import VoiceCard from "@/components/home/VoiceCard";
import FriendsSidebar from "@/components/home/FriendsSidebar";
import { useRecord } from "@/hooks/useRecord";
import { useGeolocation } from "@/hooks/useGeolocation";
import { VoiceVisibility } from "@/types/voicepin";
import MapClient from "@/components/home/MapClient";
import { createVoicePin } from "@/lib/api";

export default function HomeWhisperClient() {
  // Core state
  const [visibility, setVisibility] = useState<VoiceVisibility>("public");
  const { isRecording, onRecordPress, mediaBlobUrl, audioBlob, clearBlobUrl } = useRecord();
  const { location } = useGeolocation();
  const [open, setOpen] = useState(false);

  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // Get token and userId from localStorage on mount
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      const savedUserId = localStorage.getItem('userId');
      if (savedUserId) setUserId(parseInt(savedUserId));
    }
  }, []);

  // VoiceCard state
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show VoiceCard when recording is done
  useEffect(() => {
    if (mediaBlobUrl) {
      setOpen(true);
    }
  }, [mediaBlobUrl]);

  // Handlers
  const handleUploadImage = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRetry = () => {
    // Reset all preview state and allow re-recording
    setOpen(false);
    clearBlobUrl();
    setTitle("");
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const handleClose = () => {
    setOpen(false);
    clearBlobUrl();
    setTitle("");
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const handleSubmitVoice = async () => {
    if (!audioBlob || !location) {
      alert("Vui lòng cho phép truy cập vị trí để lưu lời thì thầm!");
      return;
    }

    if (!token) {
      alert("Vui lòng đăng nhập để lưu lời thì thầm!");
      return;
    }

    setIsSubmitting(true);
    try {
      await createVoicePin({
        audioBlob,
        description: title || undefined,
        latitude: location.lat,
        longitude: location.lng,
        visibility: visibility.toUpperCase() as 'PUBLIC' | 'PRIVATE' | 'FRIENDS',
        imageFile: imageFile || undefined,
      }, token);

      // Success - reset and refresh
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to create voice pin:", error);
      alert("Không thể lưu lời thì thầm. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine recording button state
  const showRetryButton = !!mediaBlobUrl && open;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#dfe7ff] via-[#edf1ff] to-white">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="absolute top-6 right-6 flex items-center gap-4 z-[500]">
        <VoiceVisibilitySelector
          value={visibility}
          onChange={setVisibility}
          disabledModes={[]}
        />
        <Link href="/login"><WhispererBadge /></Link>
      </div>

      {/* Map - auto-focuses on user location */}
      <MapClient userLocation={location} />

      {/* Friends Sidebar (Hover Reveal) */}
      <FriendsSidebar userId={userId} token={token} />

      {/* Record/Retry Button */}
      <RecordButton
        isRecording={isRecording}
        onClick={onRecordPress}
        showRetry={showRetryButton}
        onRetry={handleRetry}
      />

      {/* VoiceCard Preview */}
      {mediaBlobUrl && open && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[500]">
          <VoiceCard
            mode="preview"
            data={{
              lat: location?.lat || 0,
              lng: location?.lng || 0,
              location: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : undefined,
            }}
            title={title}
            onTitleChange={setTitle}
            audioSrc={mediaBlobUrl}
            imagePreviewUrl={imagePreviewUrl || undefined}
            onClose={handleClose}
            onUploadImage={handleUploadImage}
            onSubmit={handleSubmitVoice}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </main>
  );
}




