"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const columns = [
  { id: "saved", title: "Saved", color: "bg-slate-500" },
  { id: "applied", title: "Applied", color: "bg-blue-500" },
  { id: "phone", title: "Phone Screen", color: "bg-purple-500" },
  { id: "technical", title: "Technical", color: "bg-orange-500" },
  { id: "onsite", title: "Onsite", color: "bg-pink-500" },
  { id: "offer", title: "Offer", color: "bg-green-500" },
  { id: "rejected", title: "Rejected", color: "bg-red-500" }
];

const mockJobs = [
  { id: 1, company: "Google", role: "Software Engineer", status: "technical", date: "2d ago" },
  { id: 2, company: "Meta", role: "Frontend Engineer", status: "phone", date: "4d ago" },
  { id: 3, company: "Stripe", role: "Full Stack Engineer", status: "applied", date: "1w ago" },
  { id: 4, company: "Netflix", role: "UI Engineer", status: "saved", date: "Just now" },
];

export default function JobsBoardPage() {
  const [jobs, setJobs] = useState(mockJobs);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col pb-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground mt-1">Track your job search progress.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Job
        </button>
      </div>

      <div className="flex gap-4 h-full overflow-x-auto pb-4 snap-x">
        {columns.map(col => {
          const colJobs = jobs.filter(j => j.status === col.id);
          return (
            <div key={col.id} className="min-w-[280px] w-[280px] flex flex-col bg-muted/40 rounded-xl border snap-start">
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", col.color)} />
                  <h3 className="font-semibold text-sm">{col.title}</h3>
                </div>
                <span className="text-xs font-medium bg-background px-2 py-0.5 rounded-full border">{colJobs.length}</span>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {colJobs.map(job => (
                  <div key={job.id} className="bg-card border rounded-lg p-3 shadow-sm hover:shadow transition-shadow cursor-grab">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-sm">{job.company}</h4>
                      <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.role}</p>
                    <div className="text-xs text-muted-foreground">Updated {job.date}</div>
                  </div>
                ))}
                {colJobs.length === 0 && (
                  <div className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                    No jobs here
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
