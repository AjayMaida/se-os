from app.agents.mentor_agent.state import MentorAgentState

async def retrieve_context(state: MentorAgentState) -> MentorAgentState:
    return state

async def retrieve_memories(state: MentorAgentState) -> MentorAgentState:
    return state

async def generate_response(state: MentorAgentState) -> MentorAgentState:
    state['messages'].append({"role": "assistant", "content": "Keep pushing, you're doing great."})
    return state
