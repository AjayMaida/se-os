# Sprint Tracking & Release Cycles

This document outlines the agile sprint cadence, current sprint backlog, and active release deliverables for the **SE-OS** engineering team.

---

## 🏃 Sprint Framework

- **Sprint Duration:** 2 weeks (10 business days)
- **Ceremonies:**
  - **Sprint Planning:** Alternate Mondays at 10:00 AM UTC
  - **Daily Async Standup:** Slack `#se-os-dev` daily by 11:00 AM UTC
  - **Sprint Review & Demo:** Alternate Fridays at 4:00 PM UTC
  - **Retrospective:** Alternate Fridays following the demo

---

## 📅 Active Sprint: Sprint 1 (Foundation & Core Infrastructure)

**Sprint Goal:** Complete monorepo architecture scaffolding, database foundations, background workers, external API clients, and end-to-end local Docker environment.

| Issue ID | Domain / Component | Task Description | Assignee | Status |
|---|---|---|---|---|
| `#1` | Foundation | Monorepo scaffolding, docker-compose, and dev setup | Core Team | **Done** |
| `#2` | Identity | FastAPI JWT authentication, password hashing, and user models | Backend | **Done** |
| `#3` | Infrastructure | RabbitMQ event publisher and aio-pika async pipeline | Backend | **Done** |
| `#4` | Notifications | Notifications worker service, Resend email client, and templates | Backend | **Done** |
| `#5` | Integrations | GitHub REST/GraphQL and LeetCode GraphQL client integrations | Backend | **Done** |
| `#6` | Documentation | Local setup, Git workflow, coding standards, testing, and architecture docs | Team | **Done** |
| `#7` | Frontend | Next.js 14 layout, dark mode theme tokens, and dashboard skeleton | Frontend | In Progress |

---

## 🔮 Upcoming Sprint: Sprint 2 (Onboarding & AI Roadmap MVP)

**Sprint Goal:** Deliver full user onboarding questionnaire, integrate LangGraph roadmap generation, and enable interactive roadmap viewing in the web client.

| Issue ID | Domain / Component | Task Description | Priority | Target Milestone |
|---|---|---|---|---|
| `#8` | Onboarding | Multi-step career goal survey with Pydantic validation | P0 | M2 |
| `#9` | AI Platform | LangGraph roadmap generation agent with structured JSON output | P0 | M2 |
| `#10` | Roadmap | Roadmap DAG entity model, node repository, and REST endpoints | P0 | M2 |
| `#11` | Frontend | Interactive visual roadmap canvas with node completion toggles | P0 | M2 |
| `#12` | Worker | Celery Beat morning scheduled task for daily plan generation | P1 | M2 |
| `#13` | Integrations | Celery worker task to periodically sync LeetCode and GitHub stats | P1 | M2 |

---

## 📋 Sprint 3: Sprint Preview (AI Mentor & Habit Engine)

**Sprint Goal:** Launch the conversational AI Mentor with memory persistence and deploy daily task habit tracking.

- AI Mentor WebSocket / SSE streaming endpoint with token budgeting.
- Chat UI with markdown formatting, syntax highlighting, and history drawer.
- Daily action planner UI with check-off actions and celebratory animations.
- Streak calculation engine with freeze allowances and event triggers.
