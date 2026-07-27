# Technology Stack

## Purpose

This document defines the approved technology stack for the SE-OS platform. It serves as the single source of truth for technologies, frameworks, libraries, and tools used throughout the project.

---

# Design Principles

Technology selection is guided by the following principles:

- Simplicity over complexity
- Production readiness
- Strong community support
- Long-term maintainability
- High developer productivity
- Cloud-native compatibility
- AI ecosystem maturity

---

# Frontend

| Category | Technology |
|----------|------------|
| Framework | React |
| Language | TypeScript |
| Build Tool | Vite |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Routing | React Router |
| Forms | React Hook Form |
| Validation | Zod |

---

# Backend

| Category | Technology |
|----------|------------|
| Language | Python 3.13+ |
| Framework | FastAPI |
| ASGI Server | Uvicorn |
| Validation | Pydantic v2 |
| ORM | SQLAlchemy 2.x |
| Database Migrations | Alembic |
| Authentication | JWT + OAuth2 |
| Dependency Management | uv |
| Testing | Pytest |

---

# AI Platform

| Category | Technology |
|----------|------------|
| LLM Framework | LangChain |
| LLM Gateway | LiteLLM |
| Embeddings | OpenAI / Sentence Transformers |
| Vector Database | pgvector (initially) |
| Agent Framework | LangGraph (when required) |
| Prompt Management | Internal Prompt Manager |
| Evaluation | LangSmith (optional) |

---

# Data Layer

| Category | Technology |
|----------|------------|
| Relational Database | PostgreSQL |
| Cache | Redis (future) |
| Vector Storage | pgvector |
| Object Storage | S3 Compatible Storage (future) |

---

# Infrastructure

| Category | Technology |
|----------|------------|
| Containerization | Docker |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions |
| Hosting | Cloud Agnostic |
| Secrets | Environment Variables |

---

# Observability

| Category | Technology |
|----------|------------|
| Logging | structlog |
| Metrics | Prometheus (future) |
| Visualization | Grafana (future) |
| Tracing | OpenTelemetry (future) |

---

# Development Tools

| Category | Technology |
|----------|------------|
| IDE | VS Code |
| Version Control | Git |
| Repository | GitHub |
| API Testing | Bruno / Postman |
| Documentation | Markdown + Mermaid |

---

# Technology Decisions

The current architecture follows a **Modular Monolith**.

The selected technologies prioritize:

- Fast iteration
- Easy deployment
- Strong Python AI ecosystem
- Clean Architecture support
- Future scalability without premature complexity

---

# Future Considerations

The technology stack may evolve as the platform grows. Any significant technology change must be documented through an Architecture Decision Record (ADR).