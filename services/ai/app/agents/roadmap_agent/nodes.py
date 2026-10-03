from app.agents.roadmap_agent.state import RoadmapAgentState

async def analyze_skill_gaps(state: RoadmapAgentState) -> RoadmapAgentState:
    state['skill_gaps'] = ["System Design", "Advanced SQL"]
    state['step'] = 'analyze_skill_gaps'
    return state

async def generate_phases(state: RoadmapAgentState) -> RoadmapAgentState:
    state['phases'] = [{"title": "Foundation", "duration": 4}]
    state['step'] = 'generate_phases'
    return state

async def generate_milestones(state: RoadmapAgentState) -> RoadmapAgentState:
    state['milestones'] = [{"title": "Learn Caching", "skills": ["Redis"]}]
    state['step'] = 'generate_milestones'
    return state

async def validate_roadmap(state: RoadmapAgentState) -> RoadmapAgentState:
    state['step'] = 'validate_roadmap'
    return state

async def compile_roadmap(state: RoadmapAgentState) -> RoadmapAgentState:
    state['roadmap_json'] = {"phases": state['phases'], "milestones": state['milestones']}
    state['step'] = 'compile_roadmap'
    return state
