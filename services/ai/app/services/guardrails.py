from typing import TypedDict

class GuardrailResult(TypedDict):
    is_valid: bool
    reason: str | None

class Guardrails:
    async def validate_input(self, user_message: str, user_id: str) -> GuardrailResult:
        if len(user_message) > 5000:
            return {"is_valid": False, "reason": "Message too long."}
        if "ignore all previous instructions" in user_message.lower():
            return {"is_valid": False, "reason": "Potential prompt injection detected."}
        return {"is_valid": True, "reason": None}
    
    async def validate_output(self, ai_response: str) -> GuardrailResult:
        if not ai_response.strip():
            return {"is_valid": False, "reason": "Empty response from AI."}
        return {"is_valid": True, "reason": None}

guardrails = Guardrails()
