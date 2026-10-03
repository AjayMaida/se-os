from typing import TypedDict, Dict

class AssessmentAgentState(TypedDict):
    session_data: dict
    code_assessment: Dict
    communication_assessment: Dict
    process_assessment: Dict
    final_report: Dict
