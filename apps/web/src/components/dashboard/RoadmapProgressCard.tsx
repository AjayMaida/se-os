import { Map, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RoadmapProgressCard() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Map className="w-5 h-5 text-primary" /> Roadmap Progress
        </h3>
        <Link href="/roadmap" className="text-sm font-medium text-primary hover:underline">View All</Link>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 border mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Phase 2: React Ecosystem</span>
          <span className="text-primary font-bold">45%</span>
        </div>
        <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[45%]" />
        </div>
      </div>
      
      <div className="mt-auto">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Up Next</h4>
        <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium">Hooks & State Management</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
