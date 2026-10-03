from typing import TypedDict, List

class PlannerAgentState(TypedDict):
    user_context: dict
    current_milestone: str
    available_hours: float
    yesterday_completion_rate: float
    tasks: List[dict]
