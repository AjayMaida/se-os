from typing import TypedDict, List

class MentorAgentState(TypedDict):
    messages: List[dict]
    user_context: dict
    retrieved_memories: List[str]
