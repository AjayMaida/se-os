"use client";

import { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/useChat";

export default function ChatInterface() {
  const { messages, isStreaming, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background rounded-xl">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Bot className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">How can I help you learn today?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                I'm your AI Mentor. Ask me to explain concepts, review your code, or help you prepare for interviews.
              </p>
            </div>
            <SuggestedPrompts onSelect={sendMessage} />
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 bg-background border-t">
        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </div>
    </div>
  );
}
