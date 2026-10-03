from typing import TypedDict, List
from langgraph.graph.message import add_messages

class RoadmapAgentState(TypedDict):
    user_profile: dict
    skill_gaps: List[str]
    phases: List[dict]
    milestones: List[dict]
    roadmap_json: dict
    error: str | None
    step: str
