"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatInput({ 
  onSend, 
  disabled 
}: { 
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSend(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full relative">
      <div className="bg-muted border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-shadow flex items-end">
        <button className="p-3 text-muted-foreground hover:text-foreground shrink-0 mb-0.5">
          <ImageIcon className="w-5 h-5" />
        </button>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Mentor... (Shift+Enter for newline)"
          className="w-full py-3 bg-transparent border-none resize-none focus:outline-none focus:ring-0 min-h-[48px] max-h-[150px]"
          rows={1}
          disabled={disabled}
        />
        <button
          onClick={() => {
            if (input.trim() && !disabled) {
              onSend(input.trim());
              setInput("");
            }
          }}
          disabled={!input.trim() || disabled}
          className="p-3 m-1 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground transition-colors shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <div className="text-xs text-muted-foreground text-center mt-2">
        AI Mentor can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
