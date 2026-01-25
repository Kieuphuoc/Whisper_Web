'use client';
import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export function useRecord() {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({ audio: true });

  useEffect(() => { // Xin quyền truy cập mic
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then(() => { console.log("Microphone permission granted");})
      .catch(() => { console.log("Microphone permission denied");});
  }, []);

  const isRecording = status === "recording";
  useEffect(() => {
    console.log("status:", status);
  }, [status]);

  const onRecordPress = () =>
    isRecording ? stopRecording() : startRecording();

  return { isRecording, status, mediaBlobUrl, clearBlobUrl, onRecordPress };
}

