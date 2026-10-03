"use client";

import { useState } from "react";
import { Clock, BookOpen, Code, Play } from "lucide-react";

type TaskStatus = 'today' | 'done' | 'skipped';

interface Task {
  id: string;
  title: string;
  type: string;
  duration: string;
  status: TaskStatus;
}

const initialTasks: Task[] = [
  { id: '1', title: "Review React Custom Hooks", type: "learn", duration: "45m", status: "today" },
  { id: '2', title: "Practice: Implement useDebounce", type: "practice", duration: "30m", status: "today" },
  { id: '3', title: "Project: Add search filter to task app", type: "project", duration: "60m", status: "today" },
  { id: '4', title: "System Design basics", type: "learn", duration: "45m", status: "today" },
];

export default function DailyPlanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const renderColumn = (title: string, status: TaskStatus) => {
    const columnTasks = tasks.filter(t => t.status === status);
    
    return (
      <div className="flex-1 flex flex-col min-w-[300px] max-w-[400px] bg-muted/30 rounded-xl p-4 border">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="bg-muted text-muted-foreground text-sm py-0.5 px-2 rounded-full font-medium">
            {columnTasks.length}
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 p-1">
          {columnTasks.map(task => (
            <div 
              key={task.id}
              className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("taskId", task.id);
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${
                    task.type === 'learn' ? 'bg-blue-500/10 text-blue-500' :
                    task.type === 'practice' ? 'bg-green-500/10 text-green-500' :
                    'bg-purple-500/10 text-purple-500'
                  }`}>
                    {task.type}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground text-xs font-medium">
                  <Clock className="w-3 h-3 mr-1" />
                  {task.duration}
                </div>
              </div>
              <p className="font-medium text-sm mt-2">{task.title}</p>
              
              <div className="flex gap-2 mt-4 pt-3 border-t">
                {status !== 'today' && (
                  <button onClick={() => moveTask(task.id, 'today')} className="text-xs text-muted-foreground hover:text-foreground">
                    To Today
                  </button>
                )}
                {status !== 'done' && (
                  <button onClick={() => moveTask(task.id, 'done')} className="text-xs text-green-500 hover:text-green-600">
                    Done
                  </button>
                )}
                {status !== 'skipped' && (
                  <button onClick={() => moveTask(task.id, 'skipped')} className="text-xs text-red-500 hover:text-red-600">
                    Skip
                  </button>
                )}
              </div>
            </div>
          ))}
          {columnTasks.length === 0 && (
            <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground text-sm">
              No tasks
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="flex gap-6 h-full overflow-x-auto pb-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        // Implement full drag and drop logic if needed, currently using buttons
      }}
    >
      {renderColumn("Today's Tasks", "today")}
      {renderColumn("Done", "done")}
      {renderColumn("Skipped", "skipped")}
    </div>
  );
}
