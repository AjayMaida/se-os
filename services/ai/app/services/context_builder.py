from typing import TypedDict, Optional, List

class UserCareerContext(TypedDict):
    user_id: str
    career_goal: str
    target_role: str
    current_milestone: str
    roadmap_progress_pct: float
    recent_weak_areas: List[str]
    github_active: bool
    leetcode_streak: int
    last_interview_score: Optional[float]
    days_since_last_activity: int

class ContextBuilder:
    async def get_context(self, user_id: str) -> UserCareerContext:
        # Mocking redis/db fetch
        return {
            "user_id": user_id,
            "career_goal": "Senior Backend Engineer",
            "target_role": "Backend Engineer",
            "current_milestone": "Master System Design",
            "roadmap_progress_pct": 45.5,
            "recent_weak_areas": ["Caching", "Database Sharding"],
            "github_active": True,
            "leetcode_streak": 5,
            "last_interview_score": 7.2,
            "days_since_last_activity": 1
        }
    
    async def refresh_context(self, user_id: str) -> UserCareerContext:
        # Force refresh logic
        return await self.get_context(user_id)

context_builder = ContextBuilder()
