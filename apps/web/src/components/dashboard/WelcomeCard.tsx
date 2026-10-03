import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export default function WelcomeCard() {
  const today = format(new Date(), "EEEE, MMMM d");

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg className="w-32 h-32 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div className="p-6 relative z-10">
        <h2 className="text-3xl font-bold mb-2">Good morning, Ajay!</h2>
        <p className="text-muted-foreground mb-6">Here&apos;s your plan for {today}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-between bg-muted/50 p-4 rounded-lg border">
          <div className="mb-4 sm:mb-0">
            <h3 className="font-semibold text-lg">Full Stack Developer Roadmap</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[35%]" />
              </div>
              <span className="text-sm font-medium">35%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Current: Week 4 - React Hooks & State Management</p>
          </div>
          
          <Link 
            href="/planner" 
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Start Today&apos;s Plan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
