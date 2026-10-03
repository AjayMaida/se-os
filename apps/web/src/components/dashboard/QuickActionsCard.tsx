import { Code2, MessageSquare, Video, Briefcase } from "lucide-react";
import Link from "next/link";

export default function QuickActionsCard() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 h-full flex flex-col">
      <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        <Link href="/practice" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors text-center group">
          <div className="p-2 rounded-full bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">Practice Problem</span>
        </Link>
        <Link href="/mentor" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors text-center group">
          <div className="p-2 rounded-full bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">Chat Mentor</span>
        </Link>
        <Link href="/studio/new" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors text-center group">
          <div className="p-2 rounded-full bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
            <Video className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">Mock Interview</span>
        </Link>
        <Link href="/career/jobs" className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors text-center group">
          <div className="p-2 rounded-full bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">Log Job App</span>
        </Link>
      </div>
    </div>
  );
}
