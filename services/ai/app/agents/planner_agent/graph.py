from langgraph.graph import StateGraph, END
from app.agents.planner_agent.state import PlannerAgentState
from app.agents.planner_agent.nodes import generate_plan

def create_planner_graph():
    graph = StateGraph(PlannerAgentState)
    graph.add_node('generate_plan', generate_plan)
    graph.set_entry_point('generate_plan')
    graph.add_edge('generate_plan', END)
    return graph.compile()
