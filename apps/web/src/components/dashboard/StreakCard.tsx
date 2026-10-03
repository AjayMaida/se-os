"use client";

import { Flame } from "lucide-react";

export default function StreakCard() {
  // Generate a mock heatmap (last 30 days)
  const heatmap = Array.from({ length: 30 }, () => Math.random() > 0.3);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 h-full flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
          <Flame className="w-8 h-8 text-orange-500" />
        </div>
        <div>
          <div className="text-3xl font-bold flex items-end gap-1">
            12 <span className="text-sm text-muted-foreground font-normal mb-1">Days</span>
          </div>
          <div className="text-sm font-medium text-orange-500">Current Streak</div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Last 30 Days</span>
          <span>{heatmap.filter(Boolean).length} Active</span>
        </div>
        <div className="grid grid-cols-10 gap-1.5">
          {heatmap.map((active, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-sm ${active ? 'bg-orange-500' : 'bg-muted'} opacity-${active ? '100' : '50'}`}
              title={active ? 'Active' : 'Inactive'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
