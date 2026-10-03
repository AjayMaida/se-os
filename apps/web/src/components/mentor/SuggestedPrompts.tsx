import { Code2, Sparkles, BookOpen, Bug } from "lucide-react";

export default function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  const suggestions = [
    { icon: Code2, text: "Review my React code" },
    { icon: Sparkles, text: "Explain System Design basics" },
    { icon: BookOpen, text: "Generate practice problems" },
    { icon: Bug, text: "Help me debug this error" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {suggestions.map((suggestion, i) => (
        <button
          key={i}
          onClick={() => onSelect(suggestion.text)}
          className="flex flex-col items-center p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors gap-3 group"
        >
          <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <suggestion.icon className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-center">{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
}
