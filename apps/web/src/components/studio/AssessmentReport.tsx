import { AssessmentReport as AssessmentReportType } from "@/types/practice";
import { ChevronDown, ChevronUp, Play, CheckCircle2, Code, MessageSquare, Workflow } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockReport: AssessmentReportType = {
  overall_score: 8,
  code_score: 9,
  communication_score: 7,
  process_score: 8,
  quality_score: 8,
  code_feedback: {
    correctness: "The solution passes all edge cases and correctly uses a hash map.",
    complexity: "Time: O(N) which is optimal. Space: O(N) which is acceptable.",
    quality: "Clean code with meaningful variable names.",
    edge_cases: "Correctly handled empty arrays and negative numbers."
  },
  communication_feedback: {
    explanation: "Good initial explanation of the brute force vs optimal approach.",
    trade_offs: "Could have discussed the space-time tradeoff more explicitly.",
    clarity: "Clear thought process, but went quiet during coding."
  },
  process_feedback: {
    planning: "Solid plan laid out before writing code.",
    recovery: "Caught a minor syntax error quickly.",
    testing: "Did a manual dry run, which is excellent."
  },
  actionable_items: [
    "Vocalize your thoughts while typing code to avoid awkward silences.",
    "Explicitly mention space/time complexities before implementing.",
    "Practice more hash map problems to improve speed."
  ]
};

function ScoreCircle({ score, label, size = 'sm' }: { score: number, label: string, size?: 'sm' | 'lg' }) {
  const color = score >= 8 ? 'text-green-500' : score >= 6 ? 'text-yellow-500' : 'text-red-500';
  
  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={`${(score / 10) * 283} 283`} className={cn("transition-all duration-1000 ease-out", color)} />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{score}/10</span>
          </div>
        </div>
        <span className="font-semibold text-lg">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 border rounded-xl bg-card">
      <div className="relative w-16 h-16 flex items-center justify-center mb-2">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-muted" />
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="10" strokeDasharray={`${(score / 10) * 283} 283`} className={cn("transition-all duration-1000 ease-out", color)} />
        </svg>
        <span className="absolute text-lg font-bold">{score}</span>
      </div>
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

export default function AssessmentReport({ report = mockReport }: { report?: AssessmentReportType }) {
  const [expanded, setExpanded] = useState<string | null>('code');

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Interview Assessment</h1>
        <p className="text-muted-foreground">AI-generated feedback based on your code and video recording.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8 items-center bg-muted/30 p-8 rounded-2xl border">
        <div className="md:col-span-1 flex justify-center">
          <ScoreCircle score={report.overall_score} label="Overall Score" size="lg" />
        </div>
        <div className="md:col-span-3 grid grid-cols-3 gap-4">
          <ScoreCircle score={report.code_score} label="Code Quality" />
          <ScoreCircle score={report.communication_score} label="Communication" />
          <ScoreCircle score={report.process_score} label="Process" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Detailed Feedback</h2>
          
          <div className="border rounded-xl overflow-hidden bg-card">
            <button onClick={() => setExpanded(e => e === 'code' ? null : 'code')} className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Code className="w-5 h-5" /></div>
                <span className="font-semibold text-lg">Code Assessment</span>
              </div>
              {expanded === 'code' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expanded === 'code' && (
              <div className="p-4 pt-0 border-t bg-muted/10 space-y-4">
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Correctness</h4><p className="text-sm">{report.code_feedback.correctness}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Complexity</h4><p className="text-sm">{report.code_feedback.complexity}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Quality</h4><p className="text-sm">{report.code_feedback.quality}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Edge Cases</h4><p className="text-sm">{report.code_feedback.edge_cases}</p></div>
              </div>
            )}
          </div>

          <div className="border rounded-xl overflow-hidden bg-card">
            <button onClick={() => setExpanded(e => e === 'comm' ? null : 'comm')} className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg"><MessageSquare className="w-5 h-5" /></div>
                <span className="font-semibold text-lg">Communication</span>
              </div>
              {expanded === 'comm' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expanded === 'comm' && (
              <div className="p-4 pt-0 border-t bg-muted/10 space-y-4">
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Explanation</h4><p className="text-sm">{report.communication_feedback.explanation}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Trade-offs</h4><p className="text-sm">{report.communication_feedback.trade_offs}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Clarity</h4><p className="text-sm">{report.communication_feedback.clarity}</p></div>
              </div>
            )}
          </div>

          <div className="border rounded-xl overflow-hidden bg-card">
            <button onClick={() => setExpanded(e => e === 'process' ? null : 'process')} className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><Workflow className="w-5 h-5" /></div>
                <span className="font-semibold text-lg">Problem-Solving Process</span>
              </div>
              {expanded === 'process' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expanded === 'process' && (
              <div className="p-4 pt-0 border-t bg-muted/10 space-y-4">
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Planning</h4><p className="text-sm">{report.process_feedback.planning}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Recovery</h4><p className="text-sm">{report.process_feedback.recovery}</p></div>
                <div><h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Testing</h4><p className="text-sm">{report.process_feedback.testing}</p></div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Actionable Items
            </h3>
            <ul className="space-y-4">
              {report.actionable_items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs">{i + 1}</span>
                  <span className="mt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="p-4 border-b font-semibold bg-muted/30">Session Replay</div>
            <div className="aspect-video bg-black relative flex items-center justify-center group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Session thumbnail" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-1" />
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Practice Similar Problems
          </button>
        </div>
      </div>
    </div>
  );
}
