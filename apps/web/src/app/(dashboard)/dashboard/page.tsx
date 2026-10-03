import WelcomeCard from "@/components/dashboard/WelcomeCard";
import TodayPlanCard from "@/components/dashboard/TodayPlanCard";
import InterviewReadyScore from "@/components/dashboard/InterviewReadyScore";
import RoadmapProgressCard from "@/components/dashboard/RoadmapProgressCard";
import StreakCard from "@/components/dashboard/StreakCard";
import QuickActionsCard from "@/components/dashboard/QuickActionsCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WelcomeCard />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TodayPlanCard />
        </div>
        <div className="md:col-span-1">
          <InterviewReadyScore />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <RoadmapProgressCard />
        </div>
        <div className="md:col-span-1">
          <StreakCard />
        </div>
        <div className="md:col-span-1">
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
