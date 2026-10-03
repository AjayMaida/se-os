"use client";

import InterviewStudioPage from "@/components/studio/InterviewStudioPage";
import AssessmentReport from "@/components/studio/AssessmentReport";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SessionPage({ params }: { params: { sessionId: string } }) {
  const { session } = useInterviewSession(params.sessionId);

  if (session?.status === 'assessed') {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-4">
          <Link href="/studio" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Assessment Report</h1>
            <p className="text-muted-foreground text-sm">Session ID: {params.sessionId}</p>
          </div>
        </div>
        <AssessmentReport />
      </div>
    );
  }

  // Active session
  return (
    <div className="h-[calc(100vh-6rem)] -m-6 flex flex-col">
      <InterviewStudioPage />
    </div>
  );
}
