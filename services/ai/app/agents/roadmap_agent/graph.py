from langgraph.graph import StateGraph, END
from app.agents.roadmap_agent.state import RoadmapAgentState
from app.agents.roadmap_agent.nodes import (
    analyze_skill_gaps, generate_phases, generate_milestones, 
    validate_roadmap, compile_roadmap
)

def create_roadmap_graph() -> StateGraph:
    graph = StateGraph(RoadmapAgentState)
    graph.add_node('analyze_skill_gaps', analyze_skill_gaps)
    graph.add_node('generate_phases', generate_phases)
    graph.add_node('generate_milestones', generate_milestones)
    graph.add_node('validate_roadmap', validate_roadmap)
    graph.add_node('compile_roadmap', compile_roadmap)
    
    graph.set_entry_point('analyze_skill_gaps')
    graph.add_edge('analyze_skill_gaps', 'generate_phases')
    graph.add_edge('generate_phases', 'generate_milestones')
    graph.add_edge('generate_milestones', 'validate_roadmap')
    graph.add_edge('validate_roadmap', 'compile_roadmap')
    graph.add_edge('compile_roadmap', END)
    
    return graph.compile()
