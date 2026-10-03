import RoadmapTimeline from "@/components/roadmap/RoadmapTimeline";

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Your Career Roadmap</h1>
      </div>
      <p className="text-muted-foreground">
        A step-by-step path tailored to your goals. Complete milestones to unlock the next phase.
      </p>
      
      <div className="mt-8">
        <RoadmapTimeline />
      </div>
    </div>
  );
}
