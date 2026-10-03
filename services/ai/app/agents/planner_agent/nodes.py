from app.agents.planner_agent.state import PlannerAgentState

async def generate_plan(state: PlannerAgentState) -> PlannerAgentState:
    state['tasks'] = [{"title": "Review System Design", "duration": 60}]
    return state
