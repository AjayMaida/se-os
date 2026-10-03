import DailyPlanBoard from "@/components/planner/DailyPlanBoard";

export default function PlannerPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Planner</h1>
          <p className="text-muted-foreground">Manage your daily tasks and study sessions.</p>
        </div>
        <button className="px-4 py-2 border rounded-md hover:bg-muted text-sm font-medium">
          Adjust Today&apos;s Time
        </button>
      </div>
      
      <div className="flex-1 min-h-0">
        <DailyPlanBoard />
      </div>
    </div>
  );
}
