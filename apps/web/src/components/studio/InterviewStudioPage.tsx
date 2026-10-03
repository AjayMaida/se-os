"use client";

import { useState, useRef } from "react";
import CodeEditor from "./CodeEditor";
import VideoRecorder, { VideoRecorderRef } from "./VideoRecorder";
import ProblemStatement from "./ProblemStatement";
import SessionTimer from "./SessionTimer";
import TestResults from "./TestResults";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { CodingProblem } from "@/types/practice";
import { Play, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const mockProblem: CodingProblem = {
  id: "1",
  title: "Two Sum",
  description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
  difficulty: "Easy",
  topic: "Arrays",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9"
  ],
  starter_code: {
    javascript: "function twoSum(nums, target) {\n  // Write your code here\n  \n}"
  }
};

export default function InterviewStudioPage() {
  const { 
    code, setCode, 
    language, setLanguage, 
    isRecording, startSession, 
    runCode, submitSession, 
    testResults, isRunning, isSubmitting 
  } = useInterviewSession();
  
  const videoRef = useRef<VideoRecorderRef>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);

  // Initialize code
  if (!code && mockProblem.starter_code[language]) {
    setCode(mockProblem.starter_code[language]);
  }

  const handleStart = () => {
    setHasStarted(true);
    startSession();
    videoRef.current?.startRecording();
    toast.success("Interview session started. Good luck!");
  };

  const handleRun = async () => {
    setShowTestResults(true);
    await runCode();
    toast.success("Tests completed");
  };

  const handleSubmit = async () => {
    videoRef.current?.stopRecording();
    await submitSession();
    toast.success("Session submitted for assessment!");
  };

  if (!hasStarted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <div className="max-w-md w-full bg-card border rounded-2xl p-8 text-center space-y-6 shadow-lg">
          <div>
            <h2 className="text-2xl font-bold mb-2">{mockProblem.title}</h2>
            <div className="flex justify-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">{mockProblem.difficulty}</span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-muted text-muted-foreground border">{mockProblem.topic}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              You will have 45 minutes to complete this problem. Your camera and microphone will be recorded for AI assessment.
            </p>
          </div>
          <button 
            onClick={handleStart}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
          >
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left Panel: Problem Statement & Test Results */}
      <div className="w-[40%] border-r bg-background flex flex-col min-w-[300px]">
        <div className="flex-1 overflow-hidden h-[60%]">
          <ProblemStatement problem={mockProblem} />
        </div>
        
        {/* Test Results Panel */}
        <div className="h-[40%] border-t bg-card overflow-hidden flex flex-col">
          <div className="p-2 border-b bg-muted/50 font-semibold text-sm flex justify-between items-center">
            <span>Test Results</span>
            {showTestResults && (
              <button onClick={() => setShowTestResults(false)} className="text-xs text-muted-foreground hover:text-foreground">Close</button>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            {showTestResults ? (
              isRunning ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  Running tests...
                </div>
              ) : (
                <TestResults results={testResults} />
              )
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
                Click "Run Code" to execute your solution against test cases.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right Panel: Editor & Controls */}
      <div className="flex-1 flex flex-col relative bg-zinc-950 min-w-0">
        {/* Controls Bar */}
        <div className="h-14 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-300 text-sm rounded-md px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <SessionTimer 
              durationMinutes={45} 
              onTimeUp={handleSubmit} 
              isRunning={hasStarted && !isSubmitting} 
            />
            <button 
              onClick={handleRun}
              disabled={isRunning || isSubmitting}
              className="px-4 py-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-sm font-medium rounded-md transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              Run Code
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Submit Session
            </button>
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 min-h-0 relative">
          <CodeEditor 
            value={code} 
            onChange={setCode} 
            language={language} 
            readOnly={isSubmitting}
          />
          
          {/* Picture-in-Picture Video Recorder */}
          <div className="absolute top-4 right-4 z-10 shadow-2xl">
            <VideoRecorder ref={videoRef} />
          </div>
        </div>
        
        {isSubmitting && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <div className="text-xl font-bold">Submitting Assessment...</div>
            <p className="text-zinc-400 max-w-sm text-center">Uploading video and analyzing your code. You will be redirected to the report shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
