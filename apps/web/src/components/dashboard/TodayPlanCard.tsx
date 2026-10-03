"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Clock, BookOpen, Code, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  { id: 1, title: "Review React Custom Hooks", type: "learn", duration: "45m", completed: true },
  { id: 2, title: "Practice: Implement useDebounce", type: "practice", duration: "30m", completed: false },
  { id: 3, title: "Project: Add search filter to task app", type: "project", duration: "60m", completed: false },
  { id: 4, title: "System Design basics", type: "learn", duration: "45m", completed: false },
];

export default function TodayPlanCard() {
  const [localTasks, setLocalTasks] = useState(tasks);
  
  const completedCount = localTasks.filter(t => t.completed).length;
  const progress = (completedCount / localTasks.length) * 100;

  const toggleTask = (id: number) => {
    setLocalTasks(localTasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'learn': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'practice': return <Code className="w-4 h-4 text-green-500" />;
      case 'project': return <Play className="w-4 h-4 text-purple-500" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm h-full flex flex-col">
      <div className="p-6 flex-row flex items-center justify-between pb-2">
        <h3 className="font-semibold text-lg leading-none tracking-tight">Today&apos;s Plan</h3>
        <span className="text-sm font-medium text-muted-foreground">{completedCount}/{localTasks.length} Done</span>
      </div>
      <div className="p-6 pt-0 flex-1 flex flex-col">
        <div className="space-y-4 flex-1 mt-4">
          {localTasks.map(task => (
            <div 
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50",
                task.completed ? "bg-muted/30 opacity-70" : "bg-background"
              )}
              onClick={() => toggleTask(task.id)}
            >
              <button className="text-primary hover:text-primary/80 transition-colors">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", task.completed && "line-through text-muted-foreground")}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {getIcon(task.type)}
                  <span className="text-xs text-muted-foreground capitalize">{task.type}</span>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground font-medium gap-1">
                <Clock className="w-3 h-3" />
                {task.duration}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-xs mb-1">
            <span>Daily Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
