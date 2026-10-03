# AI Guardrails & Input/Output Security

Protects users and the platform against adversarial inputs, data exfiltration, and toxic generations.

## Controls
- **Prompt Injection Defense:** Regex and semantic similarity checks against jailbreaks.
- **PII Redaction:** Automated masking of emails, phone numbers, and secrets prior to LLM forwarding.
- **Output Schema Enforcement:** Pydantic JSON parsing with automatic retry on malformed outputs.
