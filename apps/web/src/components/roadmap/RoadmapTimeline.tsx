"use client";

import { useState } from "react";
import { CheckCircle2, Lock, ChevronDown, ChevronRight, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const phases = [
  {
    id: 1,
    title: "Phase 1: Frontend Fundamentals",
    status: "completed",
    progress: 100,
    milestones: [
      { id: 101, title: "HTML5 & Semantic Markup", type: "learn", completed: true },
      { id: 102, title: "Modern CSS & Flexbox/Grid", type: "learn", completed: true },
      { id: 103, title: "JavaScript ES6+", type: "learn", completed: true },
      { id: 104, title: "Build a Portfolio Site", type: "project", completed: true },
    ]
  },
  {
    id: 2,
    title: "Phase 2: React Ecosystem",
    status: "in-progress",
    progress: 45,
    milestones: [
      { id: 201, title: "React Fundamentals", type: "learn", completed: true },
      { id: 202, title: "Hooks & State Management", type: "learn", completed: false },
      { id: 203, title: "Routing with React Router", type: "learn", completed: false },
      { id: 204, title: "Build a Task Management App", type: "project", completed: false },
    ]
  },
  {
    id: 3,
    title: "Phase 3: Backend Basics",
    status: "locked",
    progress: 0,
    milestones: [
      { id: 301, title: "Node.js & Express", type: "learn", completed: false },
      { id: 302, title: "RESTful APIs", type: "learn", completed: false },
      { id: 303, title: "Database Design (SQL)", type: "learn", completed: false },
    ]
  }
];

export default function RoadmapTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(2);

  return (
    <div className="space-y-8 max-w-3xl">
      {phases.map((phase, index) => {
        const isExpanded = expandedPhase === phase.id;
        const isLocked = phase.status === "locked";
        const isCompleted = phase.status === "completed";
        const isInProgress = phase.status === "in-progress";

        return (
          <div key={phase.id} className="relative pl-8 md:pl-12">
            {/* Timeline Line */}
            {index !== phases.length - 1 && (
              <div 
                className={cn(
                  "absolute left-[15px] md:left-[23px] top-10 bottom-[-32px] w-0.5",
                  isCompleted ? "bg-primary" : "bg-border"
                )} 
              />
            )}
            
            {/* Timeline Dot */}
            <div 
              className={cn(
                "absolute left-0 md:left-[8px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-background",
                isCompleted ? "border-primary text-primary" : 
                isInProgress ? "border-primary ring-4 ring-primary/20 text-primary" : 
                "border-muted-foreground text-muted-foreground"
              )}
            >
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
               isLocked ? <Lock className="w-4 h-4" /> : 
               <span className="text-sm font-bold">{index + 1}</span>}
            </div>

            {/* Phase Card */}
            <div 
              className={cn(
                "rounded-xl border shadow-sm overflow-hidden transition-colors",
                isLocked ? "bg-muted/30 border-muted opacity-80" : "bg-card hover:border-primary/50"
              )}
            >
              {/* Card Header */}
              <button 
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                disabled={isLocked}
                className="w-full p-4 flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h3 className={cn("font-semibold text-lg text-left", isLocked && "text-muted-foreground")}>
                    {phase.title}
                  </h3>
                  {!isLocked && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{phase.progress}% Complete</span>
                    </div>
                  )}
                </div>
                {!isLocked && (
                  <div className="p-2 hover:bg-muted rounded-full">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                )}
              </button>

              {/* Progress Bar (if in progress) */}
              {isInProgress && (
                <div className="px-4 pb-0">
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${phase.progress}%` }} />
                  </div>
                </div>
              )}

              {/* Milestones Content */}
              {isExpanded && !isLocked && (
                <div className="p-4 pt-4 border-t bg-muted/10 space-y-3">
                  {phase.milestones.map(milestone => (
                    <div 
                      key={milestone.id} 
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border bg-background",
                        milestone.completed && "border-green-500/20 bg-green-500/5",
                        !milestone.completed && isInProgress && milestone.id === 202 && "border-primary shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {milestone.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <CircleIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className={cn("font-medium", milestone.completed && "text-muted-foreground line-through")}>
                            {milestone.title}
                          </p>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">{milestone.type}</span>
                        </div>
                      </div>
                      {!milestone.completed && isInProgress && milestone.id === 202 && (
                        <button className="flex items-center gap-1 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90">
                          <PlayCircle className="w-4 h-4" /> Start
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CircleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
