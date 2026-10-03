import Link from "next/link";
import { FileText, Briefcase, Video } from "lucide-react";

export default function CareerPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your job search, resume, and interview preparation.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/career/resume" className="group p-6 bg-card border rounded-xl hover:shadow-md transition-all flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Resume Builder</h2>
            <p className="text-muted-foreground text-sm mt-1">Create and optimize your software engineering resume.</p>
          </div>
        </Link>
        <Link href="/career/jobs" className="group p-6 bg-card border rounded-xl hover:shadow-md transition-all flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Job Tracker</h2>
            <p className="text-muted-foreground text-sm mt-1">Manage your job applications in a Kanban board.</p>
          </div>
        </Link>
        <Link href="/studio" className="group p-6 bg-card border rounded-xl hover:shadow-md transition-all flex flex-col gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Interview Prep</h2>
            <p className="text-muted-foreground text-sm mt-1">Practice mock interviews in the Interview Studio.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
