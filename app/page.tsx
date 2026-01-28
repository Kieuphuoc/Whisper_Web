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
import { useAuth } from "@/hooks/useAuth";
import { useAppInit } from "@/hooks/useAppInit";
import { VoiceVisibility } from "@/types/voicepin";
import MapClient from "@/components/home/MapClient";
import { createVoicePin } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Fingerprint } from "lucide-react";

export default function HomeWhisperClient() {
  const { user, token, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isReady, isPreloading } = useAppInit();

  // Core state
  const [visibility, setVisibility] = useState<VoiceVisibility>("public");
  const { isRecording, onRecordPress, mediaBlobUrl, audioBlob, clearBlobUrl } = useRecord();
  const { location } = useGeolocation();
  const [open, setOpen] = useState(false);

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

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Failed to create voice pin:", error);
      alert("Không thể lưu lời thì thầm. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If auth is loading or preloading is not finished, show splash screen
  if (isAuthLoading || !isReady) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary relative">
            <Fingerprint size={40} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-3xl"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">Whisper</h2>
            <p className="text-sm text-slate-400 font-medium">Đang khởi tạo tâm hồn...</p>
          </div>
        </motion.div>
      </div>
    );
  }

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
        <Link href={`/profile/${user?.id}`}><WhispererBadge /></Link>
      </div>

      {/* Map - auto-focuses on user location */}
      <MapClient userLocation={location} />

      {/* Friends Sidebar (Hover Reveal) */}
      <FriendsSidebar userId={user?.id || null} token={token} />

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





