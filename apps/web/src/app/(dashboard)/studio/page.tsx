import Link from "next/link";
import { Video, Clock, Calendar, Star, CheckCircle2, TrendingUp } from "lucide-react";

export default function StudioPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Studio</h1>
          <p className="text-muted-foreground mt-1">Practice real-world coding and system design interviews under pressure.</p>
        </div>
        <Link 
          href="/studio/new"
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-colors"
        >
          <Video className="w-4 h-4" />
          Start New Session
        </Link>
      </div>
      
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-1">Total Sessions</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-1">Average Score</div>
          <div className="text-2xl font-bold text-yellow-500">7.5<span className="text-sm text-muted-foreground ml-1">/10</span></div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-1">Best Score</div>
          <div className="text-2xl font-bold text-green-500">9.2<span className="text-sm text-muted-foreground ml-1">/10</span></div>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground mb-1">This Week</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            3 <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        </div>
      </div>
      
      {/* Filters & List */}
      <div>
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <button className="text-sm font-medium text-primary border-b-2 border-primary pb-4 -mb-4">All Sessions</button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-4 -mb-4">Pending Assessment</button>
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-4 -mb-4">Completed</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 1, title: 'Design a Rate Limiter', diff: 'Hard', type: 'System Design', score: 8.5, days: 1 },
            { id: 2, title: 'Merge K Sorted Lists', diff: 'Hard', type: 'Algorithms', score: 7.0, days: 3 },
            { id: 3, title: 'Two Sum', diff: 'Easy', type: 'Algorithms', score: 9.5, days: 5 },
          ].map(session => (
            <div key={session.id} className="border rounded-xl p-5 bg-card hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                <Video className="w-16 h-16" />
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex gap-2">
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded border ${
                    session.diff === 'Hard' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    session.diff === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    'bg-green-500/10 text-green-500 border-green-500/20'
                  }`}>
                    {session.diff}
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs font-bold uppercase px-2 py-1 rounded border">
                    {session.type}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2 relative z-10 truncate" title={session.title}>
                {session.title}
              </h3>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {session.days} days ago</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 45 min</span>
                </div>
                <div className="flex justify-between items-center mt-2 pt-4 border-t">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <CheckCircle2 className={`w-4 h-4 ${session.score >= 8 ? 'text-green-500' : 'text-yellow-500'}`} />
                    Score: {session.score}/10
                  </div>
                  <Link href={`/studio/session-${session.id}`} className="text-sm font-medium text-primary hover:underline">
                    View Report &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
