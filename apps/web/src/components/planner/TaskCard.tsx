import { Clock, CheckCircle2, Circle, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    type: 'learn' | 'practice' | 'project' | 'review';
    duration: string;
    status: 'today' | 'done' | 'skipped';
  };
  onMove: (id: string, status: 'today' | 'done' | 'skipped') => void;
}

export default function TaskCard({ task, onMove }: TaskCardProps) {
  const typeStyles = {
    learn: 'bg-blue-500/10 text-blue-500',
    practice: 'bg-green-500/10 text-green-500',
    project: 'bg-purple-500/10 text-purple-500',
    review: 'bg-orange-500/10 text-orange-500'
  };

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between mb-2">
        <span className={cn("text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full", typeStyles[task.type])}>
          {task.type}
        </span>
        <div className="flex items-center text-muted-foreground text-xs font-medium">
          <Clock className="w-3 h-3 mr-1" />
          {task.duration}
        </div>
      </div>
      <p className={cn("font-medium text-sm mt-2", task.status === 'done' && "line-through text-muted-foreground")}>
        {task.title}
      </p>
      
      <div className="flex gap-2 mt-4 pt-3 border-t">
        {task.status !== 'today' && (
          <button onClick={() => onMove(task.id, 'today')} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <Circle className="w-3 h-3" /> To Today
          </button>
        )}
        {task.status !== 'done' && (
          <button onClick={() => onMove(task.id, 'done')} className="text-xs text-green-500 hover:text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Done
          </button>
        )}
        {task.status !== 'skipped' && (
          <button onClick={() => onMove(task.id, 'skipped')} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
            <SkipForward className="w-3 h-3" /> Skip
          </button>
        )}
      </div>
    </div>
  );
}
