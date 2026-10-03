export type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type CodingProblem = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  examples: Example[];
  constraints: string[];
  starter_code: Record<string, string>;
};

export type InterviewSession = {
  id: string;
  problem: CodingProblem;
  status: 'in_progress' | 'submitted' | 'assessed';
  started_at: string;
  ended_at?: string;
  video_url?: string;
};

export type CodeFeedback = {
  correctness: string;
  complexity: string;
  quality: string;
  edge_cases: string;
};

export type CommFeedback = {
  explanation: string;
  trade_offs: string;
  clarity: string;
};

export type ProcessFeedback = {
  planning: string;
  recovery: string;
  testing: string;
};

export type AssessmentReport = {
  overall_score: number;
  code_score: number;
  communication_score: number;
  process_score: number;
  quality_score: number;
  code_feedback: CodeFeedback;
  communication_feedback: CommFeedback;
  process_feedback: ProcessFeedback;
  actionable_items: string[];
};

export type TestCase = {
  id: string;
  input: string;
  expected: string;
  actual?: string;
  passed: boolean;
  error?: string;
};

export type TestResults = {
  passed: number;
  total: number;
  results: TestCase[];
  runtime_ms?: number;
  memory_mb?: number;
  error?: string;
};
