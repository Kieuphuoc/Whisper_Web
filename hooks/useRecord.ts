"use client";
import { useEffect, useRef, useState } from "react";

export function useRecord() {
  const rec = useRef<MediaRecorder|null>(null), chunks = useRef<Blob[]>([]);
  const [mediaBlobUrl, setUrl] = useState<string|null>(null);
  const [status, setStatus] = useState<"idle"|"recording">("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      rec.current = new MediaRecorder(s);
      rec.current.ondataavailable = e => chunks.current.push(e.data);
      rec.current.onstop = () => {
        setUrl(URL.createObjectURL(new Blob(chunks.current,{type:"audio/webm"})));
        chunks.current = [];
      };
    });
  }, []);

  const onRecordPress = () => {
    if (!rec.current) return;
    status === "recording" ? (rec.current.stop(), setStatus("idle"))
                           : (rec.current.start(), setStatus("recording"));
  };

  const clearBlobUrl = () => setUrl(null);

  return {
    isRecording: status === "recording",
    status,
    mediaBlobUrl,
    clearBlobUrl,
    onRecordPress,
  };
}
