export type PageMeta = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: string | null;
  meta?: PageMeta;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'user' | 'mentor' | 'admin';
};

export type Roadmap = {
  id: string;
  title: string;
  progress_percentage: number;
  current_phase: number;
};

export type PlanTask = {
  id: string;
  type: 'learn' | 'practice' | 'project' | 'review' | 'rest';
  title: string;
  duration_minutes: number;
  status: 'pending' | 'completed' | 'skipped';
};

export type DailyPlan = {
  id: string;
  date: string;
  tasks: PlanTask[];
  completion_rate: number;
};

export type InterviewSession = {
  id: string;
  problem_title: string;
  status: string;
  overall_score?: number;
};
