import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "@/hooks/useChat";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn("flex gap-4 max-w-4xl mx-auto w-full", isUser ? "flex-row-reverse" : "flex-row")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted border text-foreground"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={cn(
        "px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed prose prose-sm dark:prose-invert",
        isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm border border-border/50"
      )}>
        {message.content ? (
          <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br/>') }} />
        ) : (
          <div className="flex gap-1 h-5 items-center">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>
    </div>
  );
}
