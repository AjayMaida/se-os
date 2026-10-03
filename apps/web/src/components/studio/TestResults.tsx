import { TestResults as TestResultsType } from "@/types/practice";
import { CheckCircle2, XCircle, AlertTriangle, Clock, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestResults({ results }: { results: TestResultsType | null }) {
  if (!results) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground p-4">
        Run your code to see test results here.
      </div>
    );
  }

  if (results.error) {
    return (
      <div className="h-full p-4 overflow-y-auto">
        <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4 text-red-500 font-mono text-sm whitespace-pre-wrap">
          <div className="flex items-center gap-2 mb-2 font-bold">
            <AlertTriangle className="w-4 h-4" />
            Execution Error
          </div>
          {results.error}
        </div>
      </div>
    );
  }

  const allPassed = results.passed === results.total;

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-3 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-2 font-medium text-sm">
          {allPassed ? (
            <span className="text-green-500 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> Accepted</span>
          ) : (
            <span className="text-red-500 flex items-center gap-1.5"><XCircle className="w-4 h-4"/> Rejected</span>
          )}
          <span className="text-muted-foreground ml-2">({results.passed}/{results.total} passed)</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {results.runtime_ms && <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {results.runtime_ms}ms</span>}
          {results.memory_mb && <span className="flex items-center gap-1"><HardDrive className="w-3 h-3"/> {results.memory_mb}MB</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {results.results.map((test, i) => (
          <div key={test.id} className="border rounded-md overflow-hidden">
            <div className={cn(
              "px-3 py-2 text-sm font-medium border-b flex items-center gap-2",
              test.passed ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
            )}>
              {test.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              Test Case {i + 1}
            </div>
            <div className="p-3 font-mono text-xs space-y-2 bg-background">
              <div>
                <span className="text-muted-foreground">Input:</span>
                <div className="mt-1 bg-muted p-2 rounded">{test.input}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Expected:</span>
                <div className="mt-1 bg-muted p-2 rounded">{test.expected}</div>
              </div>
              {!test.passed && test.actual && (
                <div>
                  <span className="text-red-500">Actual Output:</span>
                  <div className="mt-1 bg-red-500/10 text-red-500 p-2 rounded border border-red-500/20">{test.actual}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
