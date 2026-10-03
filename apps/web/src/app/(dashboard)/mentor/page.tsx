import ChatInterface from "@/components/mentor/ChatInterface";

export default function MentorPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Mentor</h1>
        <p className="text-muted-foreground">Ask questions, get code reviews, and clarify concepts.</p>
      </div>
      
      <div className="flex-1 min-h-0 bg-card border rounded-xl shadow-sm overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
