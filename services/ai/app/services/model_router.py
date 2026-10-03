from enum import Enum

class TaskType(Enum):
    ROADMAP_GENERATION = "roadmap_generation"
    INTERVIEW_ASSESSMENT = "interview_assessment"
    DAILY_PLAN = "daily_plan"
    MENTOR_CHAT = "mentor_chat"
    RESOURCE_RECOMMENDATION = "resource_recommendation"
    SKILL_GAP_ANALYSIS = "skill_gap_analysis"

class ModelRouter:
    TASK_MODELS = {
        TaskType.ROADMAP_GENERATION: 'gpt-4o',
        TaskType.INTERVIEW_ASSESSMENT: 'gpt-4o',
        TaskType.DAILY_PLAN: 'gpt-4o-mini',
        TaskType.MENTOR_CHAT: 'gpt-4o-mini',
        TaskType.RESOURCE_RECOMMENDATION: 'gpt-4o-mini',
        TaskType.SKILL_GAP_ANALYSIS: 'gpt-4o',
    }
    
    def get_model(self, task: TaskType, user_tier: str = 'free') -> str:
        base_model = self.TASK_MODELS.get(task, 'gpt-4o-mini')
        if user_tier == 'premium' and 'mini' in base_model:
            return base_model.replace('-mini', '')
        return base_model

model_router = ModelRouter()
