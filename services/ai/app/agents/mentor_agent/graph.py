from langgraph.graph import StateGraph, END
from app.agents.mentor_agent.state import MentorAgentState
from app.agents.mentor_agent.nodes import retrieve_context, retrieve_memories, generate_response

def create_mentor_graph():
    graph = StateGraph(MentorAgentState)
    graph.add_node('retrieve_context', retrieve_context)
    graph.add_node('retrieve_memories', retrieve_memories)
    graph.add_node('generate_response', generate_response)
    
    graph.set_entry_point('retrieve_context')
    graph.add_edge('retrieve_context', 'retrieve_memories')
    graph.add_edge('retrieve_memories', 'generate_response')
    graph.add_edge('generate_response', END)
    
    return graph.compile()
