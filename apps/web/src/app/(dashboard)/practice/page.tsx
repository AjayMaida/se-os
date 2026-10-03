import { Search, Filter, BookOpen, Code, PlayCircle, CheckCircle2 } from "lucide-react";

export default function PracticePage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problem Bank</h1>
          <p className="text-muted-foreground mt-1">Master data structures and algorithms with curated problems.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar: Filters */}
        <div className="w-full md:w-64 space-y-6 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search problems..." 
              className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="bg-card border rounded-xl p-4 space-y-4 shadow-sm">
            <h3 className="font-semibold flex items-center gap-2 border-b pb-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Difficulty</h4>
              {['Easy', 'Medium', 'Hard'].map(diff => (
                <label key={diff} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" className="rounded border-input text-primary focus:ring-primary accent-primary" />
                  {diff}
                </label>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t">
              <h4 className="text-sm font-medium text-muted-foreground">Topics</h4>
              {['Arrays', 'Strings', 'Hash Table', 'Dynamic Programming', 'Trees', 'Graphs'].map(topic => (
                <label key={topic} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" className="rounded border-input text-primary focus:ring-primary accent-primary" />
                  {topic}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Problem List */}
        <div className="flex-1 space-y-4">
          <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                <tr>
                  <th className="px-4 py-3 w-10">Status</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Difficulty</th>
                  <th className="px-4 py-3">Topic</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: 1, title: "Two Sum", diff: "Easy", topic: "Arrays", status: "solved" },
                  { id: 2, title: "Longest Substring Without Repeating Characters", diff: "Medium", topic: "Strings", status: "todo" },
                  { id: 3, title: "Merge K Sorted Lists", diff: "Hard", topic: "Linked Lists", status: "todo" },
                  { id: 4, title: "Valid Parentheses", diff: "Easy", topic: "Stacks", status: "solved" },
                  { id: 5, title: "LRU Cache", diff: "Medium", topic: "Design", status: "todo" },
                ].map((problem) => (
                  <tr key={problem.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      {problem.status === 'solved' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </td>
                    <td className="px-4 py-4 font-medium text-foreground hover:text-primary cursor-pointer transition-colors">
                      {problem.title}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded border ${
                        problem.diff === 'Hard' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
                        problem.diff === 'Medium' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
                        'text-green-500 bg-green-500/10 border-green-500/20'
                      }`}>
                        {problem.diff}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded">
                        {problem.topic}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Practice">
                          <Code className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-purple-500 hover:bg-purple-500/10 rounded-md transition-colors" title="Start Mock Interview">
                          <PlayCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground pt-4">
            <span>Showing 1 to 5 of 150 problems</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border rounded hover:bg-muted disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 border rounded bg-primary text-primary-foreground">1</button>
              <button className="px-3 py-1 border rounded hover:bg-muted">2</button>
              <button className="px-3 py-1 border rounded hover:bg-muted">3</button>
              <button className="px-3 py-1 border rounded hover:bg-muted">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
