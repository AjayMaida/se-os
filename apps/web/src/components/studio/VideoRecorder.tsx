"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { AlertCircle } from "lucide-react";

export interface VideoRecorderRef {
  startRecording: () => void;
  stopRecording: () => void;
}

interface VideoRecorderProps {
  onChunk?: (chunk: Blob) => void;
}

const VideoRecorder = forwardRef<VideoRecorderRef, VideoRecorderProps>(({ onChunk }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permission, setPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isRecording, setIsRecording] = useState(false);
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);

  useEffect(() => {
    async function setupMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true,
        });
        setStream(mediaStream);
        setPermission('granted');
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Failed to access camera/mic", err);
        setPermission('denied');
      }
    }
    
    setupMedia();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    startRecording: () => {
      if (!stream) return;
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9,opus' });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setVideoChunks((prev) => [...prev, event.data]);
          onChunk?.(event.data);
        }
      };
      
      mediaRecorder.start(1000); // 1s chunks
      setIsRecording(true);
    },
    stopRecording: () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  }));

  if (permission === 'denied') {
    return (
      <div className="w-[160px] h-[120px] bg-zinc-900 rounded-lg border border-red-500/30 flex flex-col items-center justify-center p-2 text-center shadow-lg">
        <AlertCircle className="w-5 h-5 text-red-500 mb-1" />
        <span className="text-xs text-muted-foreground">Camera access denied</span>
      </div>
    );
  }

  return (
    <div className="w-[160px] h-[120px] bg-black rounded-lg border border-zinc-800 shadow-2xl overflow-hidden relative">
      {permission === 'pending' ? (
        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground animate-pulse">
          Starting camera...
        </div>
      ) : (
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
      )}
      
      {isRecording && (
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[9px] uppercase font-bold text-white tracking-wider">REC</span>
        </div>
      )}
    </div>
  );
});

VideoRecorder.displayName = "VideoRecorder";
export default VideoRecorder;
