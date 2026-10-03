from langgraph.graph import StateGraph, END
from app.agents.assessment_agent.state import AssessmentAgentState
from app.agents.assessment_agent.nodes import assess_code, assess_communication, assess_process, compile_report

def create_assessment_graph():
    graph = StateGraph(AssessmentAgentState)
    graph.add_node('assess_code', assess_code)
    graph.add_node('assess_communication', assess_communication)
    graph.add_node('assess_process', assess_process)
    graph.add_node('compile_report', compile_report)
    
    graph.set_entry_point('assess_code')
    # Parallel execution natively via async nodes or wrapper logic in LangGraph, simulating sequential for simplicity here
    graph.add_edge('assess_code', 'assess_communication')
    graph.add_edge('assess_communication', 'assess_process')
    graph.add_edge('assess_process', 'compile_report')
    graph.add_edge('compile_report', END)
    
    return graph.compile()
