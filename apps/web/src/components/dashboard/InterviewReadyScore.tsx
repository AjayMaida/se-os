export default function InterviewReadyScore() {
  const score = 68; // yellow zone
  
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm h-full flex flex-col items-center justify-center p-6">
      <h3 className="font-semibold text-lg mb-6 w-full text-left">Interview Readiness</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="10" 
            className="text-muted"
          />
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="10" 
            strokeDasharray={`${(score / 100) * 283} 283`}
            className="text-yellow-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-bold">{score}</span>
          <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Score</span>
        </div>
      </div>
      
      <div className="w-full space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">DSA & Logic</span>
          <span className="font-medium text-yellow-500">65/100</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">System Design</span>
          <span className="font-medium text-red-500">40/100</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Communication</span>
          <span className="font-medium text-green-500">85/100</span>
        </div>
      </div>
      
      <button className="text-sm font-medium text-primary hover:underline mt-auto">
        What improves my score?
      </button>
    </div>
  );
}
