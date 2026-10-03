# ADR-0002: AI Kernel Platform & LangGraph Multi-Agent Architecture

## Status
**Accepted** (2026-10-02)

## Context
SE-OS requires sophisticated, context-aware AI capabilities including:
- Dynamic, DAG-structured career roadmap generation.
- Conversational AI mentoring with multi-turn memory and tool execution.
- Multi-dimensional technical interview evaluation with structured rubric parsing.
- Automated code reviews and learning plan adaptations.

Traditional stateless LLM prompt wrappers (e.g. basic completion calls) fail because they lack:
1. Cyclic graph workflows and checkpointing for long-running reasoning tasks.
2. Structured agent state passing between planner, router, executor, and evaluator nodes.
3. Separation of concern between the primary CRUD backend and compute-heavy AI tasks.

## Decision
We establish a dedicated **AI Platform service (`services/ai`)** powered by **LangGraph** and **LiteLLM**.

Key architectural choices:
1. **Dedicated Microservice:** The AI Platform runs as an independent FastAPI service on port 8001, isolated from the core API (port 8000). This isolates Python dependencies (LangChain, LangGraph, vector libraries) from core API web workers and allows independent scaling.
2. **LangGraph StateGraph:** Agents are defined as directed cyclic state graphs with typed state models (`AgentState`). Nodes represent discrete operations (plan, route, call tools, evaluate, reflect).
3. **LiteLLM Router:** Unified model routing with fallbacks across OpenAI (GPT-4o, GPT-4o-mini), Anthropic (Claude 3.5 Sonnet), and local or self-hosted models.
4. **Structured JSON Validation:** All agent outputs requiring downstream database persistence are strictly validated against Pydantic models before returning to clients.

## Consequences

### Positive
- **Fault Tolerance:** Agent workflows can pause, resume from checkpoints, and retry individual graph nodes without failing an entire HTTP transaction.
- **Provider Agnostic:** Switching or falling back between LLM providers requires zero application logic changes.
- **Decoupled Scaling:** Resource-intensive AI workloads can be horizontally scaled with GPU or high-memory instances independently from the REST API.

### Negative / Trade-offs
- **Operational Complexity:** Introduces an additional service container, inter-service network calls, and latency monitoring.
- **State Synchronization:** Requires maintaining session context across both core API (PostgreSQL) and AI platform memory stores (Redis/Postgres checkpointer).
