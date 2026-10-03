import { useState, useCallback } from "react";

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setIsStreaming(true);

    // Mock SSE response
    const aiMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: "" }]);

    const responseText = "Here is an explanation of the topic you asked about. It uses markdown for **bold** text and code blocks like `console.log('hello')`. \n\nLet me know if you need more details!";
    
    let currentContent = "";
    const words = responseText.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 50));
      currentContent += (i > 0 ? " " : "") + words[i];
      setMessages(prev => 
        prev.map(msg => msg.id === aiMsgId ? { ...msg, content: currentContent } : msg)
      );
    }
    
    setIsStreaming(false);
  }, []);

  return { messages, isStreaming, sendMessage };
}
