# Repository Folder Structure

This document provides a comprehensive map of the **SE-OS** monorepo, outlining the purpose and responsibility of every directory and key file.

---

## 🌳 Monorepo Overview

```text
se-os/
├── .github/                 # GitHub Actions workflows and automation templates
├── apps/                    # Deployable user-facing applications
│   ├── api/                 # Core backend REST API (FastAPI + Python 3.12)
│   └── web/                 # Web client user interface (Next.js 14/15 + TypeScript)
├── services/                # Specialized autonomous microservices and workers
│   ├── ai/                  # AI agent platform & LangGraph orchestration service
│   ├── integrations/        # External API connectors (GitHub & LeetCode)
│   └── notifications/       # Background event consumer, email & push notification service
├── infra/                   # Infrastructure as code, container definitions & scripts
│   ├── docker/              # Multi-stage Dockerfiles for all deployable services
│   ├── nginx/               # Reverse proxy configuration for local development routing
│   └── scripts/             # Operational shell scripts for database and environment setup
├── docs/                    # Architecture, design, development, planning, and product docs
├── docker-compose.yml       # Local multi-container development orchestration configuration
├── .env.example             # Comprehensive environment variable template
├── CONTRIBUTING.md          # Contributor guide and pull request instructions
└── README.md                # Project introduction, high-level overview, and quickstart
```

---

## 📁 Root Configuration Files

| Path | Description |
|---|---|
| `docker-compose.yml` | Orchestrates all local containers (web, api, ai, notifications, db, redis, rabbitmq) |
| `.env.example` | Template containing all required and optional environment variables with default values |
| `.gitignore` | Defines files, directories, and build artifacts excluded from git tracking |
| `CONTRIBUTING.md` | Guidelines for code standards, PR workflow, and branch naming for contributors |
| `README.md` | Entry-point project documentation, quickstart commands, and feature overview |
| `LICENSE` | Open-source license terms governing use and contribution |

---

## 📦 `apps/` — Applications

### 🌐 `apps/web/` (Frontend Web Client)

| Path | Description |
|---|---|
| `apps/web/package.json` | Node.js dependencies, build scripts, and metadata for Next.js web application |
| `apps/web/next.config.ts` | Next.js runtime configuration, image domains, and compilation settings |
| `apps/web/tsconfig.json` | TypeScript compiler configuration for strict type safety and path aliases |
| `apps/web/tailwind.config.ts` | Tailwind CSS design system configuration, colors, and typography tokens |
| `apps/web/components.json` | Configuration for UI component primitives (shadcn/ui compatible) |
| `apps/web/src/` | Primary source directory for the frontend application |
| `apps/web/src/app/` | Next.js App Router containing route pages, layouts, and route handlers |
| `apps/web/src/components/` | Reusable UI design system components (buttons, modals, cards, badges) |
| `apps/web/src/lib/` | Frontend utility functions, API clients, and helper libraries |
| `apps/web/src/types/` | Shared TypeScript interfaces and type definitions for frontend domain entities |

### ⚙️ `apps/api/` (Backend Core Platform)

| Path | Description |
|---|---|
| `apps/api/pyproject.toml` | Python project metadata, dependencies (FastAPI, SQLAlchemy, Celery), and tools |
| `apps/api/pytest.ini` | Test configuration for pytest and pytest-asyncio execution |
| `apps/api/alembic.ini` | Alembic database migration configuration and database URL bindings |
| `apps/api/alembic/` | Database schema migration scripts and environment runner (`env.py`) |
| `apps/api/alembic/versions/`| Individual revision migration scripts for versioned PostgreSQL schema |
| `apps/api/app/main.py` | FastAPI application initialization, middleware registration, and router mounting |
| `apps/api/app/config.py` | Centralized Pydantic `BaseSettings` loading environment variables |
| `apps/api/app/domains/` | Domain-Driven Design business modules with isolated repositories and services |
| `apps/api/app/domains/identity/` | User authentication, JWT tokens, RBAC, and account management domain |
| `apps/api/app/domains/career/` | Career goals, target profiles, and skill assessment domain |
| `apps/api/app/domains/roadmap/` | Career milestones, personalized roadmap nodes, and progress tracking |
| `apps/api/app/domains/learning/` | Daily planner, micro-tasks, and study activity tracking domain |
| `apps/api/app/domains/practice/` | Coding practice problems, interview sessions, and submissions domain |
| `apps/api/app/domains/projects/` | Guided engineering projects, portfolio builder, and review domain |
| `apps/api/app/domains/analytics/`| Learner statistics, streak calculations, and readiness scores domain |
| `apps/api/app/shared/` | Cross-cutting shared modules (base models, security, domain events) |
| `apps/api/app/shared/events.py` | DomainEvent base classes and published domain event dataclasses |
| `apps/api/app/shared/security.py` | Password hashing (bcrypt) and JWT token generation/validation utilities |
| `apps/api/app/infrastructure/` | External infrastructure connectors (PostgreSQL session, RabbitMQ publisher) |
| `apps/api/app/workers/` | Celery background task worker definitions and scheduled Celery Beat jobs |
| `apps/api/tests/` | Automated test suite for backend APIs, domains, and health checks |

---

## 🤖 `services/` — Microservices

### 🧠 `services/ai/` (AI Platform)

| Path | Description |
|---|---|
| `services/ai/pyproject.toml` | AI Platform dependencies (LangGraph, LangChain, LiteLLM, FastAPI) |
| `services/ai/app/main.py` | AI service FastAPI entry point exposing agent execution endpoints |
| `services/ai/app/config.py` | LLM model selection, API keys, and temperature configuration settings |
| `services/ai/app/agents/` | Autonomous LangGraph stateful multi-agent definitions (Mentor, Evaluator) |
| `services/ai/app/routers/` | HTTP routers for AI chat, roadmap generation, and code evaluation |
| `services/ai/app/schemas/` | Pydantic validation schemas for AI input prompts and structured outputs |
| `services/ai/app/services/` | Business logic for LLM model routing, context windowing, and guardrails |

### 🔔 `services/notifications/` (Notifications Service)

| Path | Description |
|---|---|
| `services/notifications/pyproject.toml` | Dependencies for notifications worker (aio-pika, httpx, jinja2, pywebpush) |
| `services/notifications/Dockerfile` | Multi-stage Docker container definition for notifications worker |
| `services/notifications/app/main.py` | Asyncio entry point running the RabbitMQ consumer process forever |
| `services/notifications/app/config.py` | Settings for Resend API, VAPID Web Push keys, and RabbitMQ connection |
| `services/notifications/app/consumer.py` | RabbitMQ event listener subscribing to notifications topic exchange |
| `services/notifications/app/email.py` | Resend API client sending transactional HTML emails via HTTP |
| `services/notifications/app/push.py` | Web Push notification delivery service using VAPID keys |
| `services/notifications/app/templates/` | Branded HTML email templates for user alerts |
| `services/notifications/app/templates/welcome.html` | Welcome email for newly registered users |
| `services/notifications/app/templates/daily_reminder.html` | Morning reminder email with generated daily action plan |
| `services/notifications/app/templates/milestone.html` | Celebration email upon completing a roadmap milestone |
| `services/notifications/app/templates/streak_at_risk.html` | Alert email warning user that their active streak is expiring |
| `services/notifications/tests/` | Automated unit tests for template rendering and event dispatching |

### 🔌 `services/integrations/` (External API Integrations)

| Path | Description |
|---|---|
| `services/integrations/pyproject.toml` | Dependencies for external integrations (httpx, pydantic, structlog) |
| `services/integrations/__init__.py` | Package marker for external integrations |
| `services/integrations/app/__init__.py` | App module exporting GitHubClient and LeetCodeClient |
| `services/integrations/app/github.py` | GitHub REST & GraphQL client for profiles, repos, and contributions |
| `services/integrations/app/leetcode.py` | LeetCode GraphQL client for problem solving statistics and submissions |
| `services/integrations/tests/` | Automated mock tests for GitHub and LeetCode API clients |

---

## 🏗️ `infra/` — Infrastructure

| Path | Description |
|---|---|
| `infra/docker/api.Dockerfile` | Multi-stage build definition for FastAPI backend (dev + prod) |
| `infra/docker/web.Dockerfile` | Multi-stage build definition for Next.js web application (dev + prod) |
| `infra/docker/ai.Dockerfile` | Multi-stage build definition for AI agent platform service |
| `infra/docker/notifications.Dockerfile` | Multi-stage build definition for notification background worker |
| `infra/nginx/nginx.dev.conf` | Nginx reverse proxy configuration for unified local port routing |
| `infra/scripts/init-db.sql` | PostgreSQL initialization script enabling `uuid-ossp` and `vector` extensions |
| `infra/scripts/reset-db.sh` | Shell script to reset local database and reapply migrations |
| `infra/scripts/setup-dev.sh` | Local developer initialization script copying envs and validating Docker |

---

## 📚 `docs/` — Documentation

| Path | Description |
|---|---|
| `docs/README.md` | Master index of all technical and product documentation |
| `docs/product/` | Product requirements, vision, user personas, and feature specifications |
| `docs/architecture/` | Architecture blueprints, domain models, database designs, and system context |
| `docs/adr/` | Architectural Decision Records documenting key architectural decisions |
| `docs/development/` | Guides for local setup, Git workflow, coding standards, testing, and deployment |
| `docs/planning/` | Product roadmaps, release milestones, and sprint backlogs |
| `docs/design/` | UI/UX design specifications, colors, typography, and component guidelines |
| `docs/resources/` | Curated technical learning guides, reference architectures, and bibliography |
