import { useState, useCallback } from "react";
import { InterviewSession, TestResults } from "@/types/practice";

export interface UseInterviewSessionReturn {
  session: InterviewSession | null;
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  isRecording: boolean;
  startSession: () => void;
  runCode: () => Promise<TestResults>;
  submitSession: (videoUrl?: string, transcript?: string) => Promise<void>;
  testResults: TestResults | null;
  isRunning: boolean;
  isSubmitting: boolean;
}

export function useInterviewSession(initialSessionId?: string): UseInterviewSessionReturn {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isRecording, setIsRecording] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const startSession = useCallback(() => {
    setIsRecording(true);
  }, []);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    // Mock run code
    return new Promise<TestResults>((resolve) => {
      setTimeout(() => {
        const results: TestResults = {
          passed: 2,
          total: 2,
          runtime_ms: 45,
          memory_mb: 32,
          results: [
            { id: "1", input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", actual: "[0,1]", passed: true },
            { id: "2", input: "nums = [3,2,4], target = 6", expected: "[1,2]", actual: "[1,2]", passed: true }
          ]
        };
        setTestResults(results);
        setIsRunning(false);
        resolve(results);
      }, 1500);
    });
  }, []);

  const submitSession = useCallback(async (videoUrl?: string, transcript?: string) => {
    setIsSubmitting(true);
    // Mock submit
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSubmitting(false);
        if (session) {
          setSession({ ...session, status: 'assessed' });
        }
        resolve();
      }, 2000);
    });
  }, [session]);

  return {
    session,
    code,
    setCode,
    language,
    setLanguage,
    isRecording,
    startSession,
    runCode,
    submitSession,
    testResults,
    isRunning,
    isSubmitting
  };
}
