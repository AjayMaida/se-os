from app.agents.assessment_agent.state import AssessmentAgentState

async def assess_code(state: AssessmentAgentState) -> AssessmentAgentState:
    state['code_assessment'] = {"score": 9.0}
    return state

async def assess_communication(state: AssessmentAgentState) -> AssessmentAgentState:
    state['communication_assessment'] = {"score": 8.0}
    return state

async def assess_process(state: AssessmentAgentState) -> AssessmentAgentState:
    state['process_assessment'] = {"score": 8.5}
    return state

async def compile_report(state: AssessmentAgentState) -> AssessmentAgentState:
    state['final_report'] = {"overall_score": 8.5}
    return state
