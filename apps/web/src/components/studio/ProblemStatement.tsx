import { CodingProblem } from "@/types/practice";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProblemStatement({ problem }: { problem: CodingProblem }) {
  const [tab, setTab] = useState<'desc' | 'examples' | 'constraints'>('desc');

  const diffColor = {
    Easy: "bg-green-500/10 text-green-500 border-green-500/20",
    Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Hard: "bg-red-500/10 text-red-500 border-red-500/20",
  }[problem.difficulty];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-2">{problem.title}</h2>
        <div className="flex gap-2">
          <span className={cn("px-2 py-0.5 rounded text-xs font-semibold border", diffColor)}>
            {problem.difficulty}
          </span>
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground border">
            {problem.topic}
          </span>
        </div>
      </div>

      <div className="flex border-b px-2">
        <button 
          onClick={() => setTab('desc')}
          className={cn("px-4 py-2 text-sm font-medium border-b-2", tab === 'desc' ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
        >
          Description
        </button>
        <button 
          onClick={() => setTab('examples')}
          className={cn("px-4 py-2 text-sm font-medium border-b-2", tab === 'examples' ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
        >
          Examples
        </button>
        <button 
          onClick={() => setTab('constraints')}
          className={cn("px-4 py-2 text-sm font-medium border-b-2", tab === 'constraints' ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
        >
          Constraints
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 prose prose-sm dark:prose-invert max-w-none">
        {tab === 'desc' && (
          <div dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
        )}

        {tab === 'examples' && (
          <div className="space-y-6">
            {problem.examples.map((ex, i) => (
              <div key={i}>
                <h3 className="font-bold text-sm mb-2">Example {i + 1}:</h3>
                <div className="bg-muted p-3 rounded-lg border font-mono text-xs space-y-1">
                  <div><span className="text-muted-foreground font-semibold">Input:</span> {ex.input}</div>
                  <div><span className="text-muted-foreground font-semibold">Output:</span> {ex.output}</div>
                  {ex.explanation && (
                    <div className="mt-2 text-muted-foreground">
                      <span className="font-semibold text-foreground">Explanation:</span> {ex.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'constraints' && (
          <ul className="list-disc pl-4 space-y-2 font-mono text-xs">
            {problem.constraints.map((c, i) => (
              <li key={i} className="bg-muted/50 inline-block px-2 py-1 rounded text-foreground">{c}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
