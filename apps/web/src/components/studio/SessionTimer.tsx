"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionTimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
  isRunning?: boolean;
}

export default function SessionTimer({ durationMinutes, onTimeUp, isRunning = true }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  
  const isWarning = timeLeft <= 10 * 60 && timeLeft > 5 * 60; // < 10 mins
  const isDanger = timeLeft <= 5 * 60; // < 5 mins
  const isCritical = timeLeft <= 2 * 60; // < 2 mins

  return (
    <div className={cn(
      "flex items-center gap-2 font-mono text-lg font-medium px-3 py-1 rounded-md border",
      isDanger ? "bg-red-500/10 text-red-500 border-red-500/20" : 
      isWarning ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : 
      "bg-background text-foreground border-border",
      isCritical && "animate-pulse"
    )}>
      <Clock className="w-4 h-4" />
      {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
    </div>
  );
}
