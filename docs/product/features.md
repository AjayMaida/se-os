# Feature Catalog & Specifications

This document defines the comprehensive feature catalog for **SE-OS**, organized by functional domain and release phase.

---

## 🎯 Feature Matrix Overview

| Feature Code | Feature Name | Domain | Release Phase | Priority |
|---|---|---|---|---|
| `AUTH-01` | Multi-Provider Authentication | Identity | Phase 1 (MVP) | P0 |
| `ONBD-01` | Career Goal & Skill Assessment | Career | Phase 1 (MVP) | P0 |
| `ROAD-01` | Dynamic AI Roadmap Generation | Roadmap | Phase 1 (MVP) | P0 |
| `PLAN-01` | Daily Action Task Scheduler | Learning | Phase 1 (MVP) | P0 |
| `MENT-01` | Conversational AI Mentor | AI / Learning | Phase 1 (MVP) | P0 |
| `DASH-01` | Centralized Engineer Dashboard | Analytics | Phase 1 (MVP) | P0 |
| `INTEG-01`| GitHub Portfolio & Commit Sync | Integrations | Phase 1 (MVP) | P1 |
| `INTEG-02`| LeetCode Stats & Activity Sync | Integrations | Phase 1 (MVP) | P1 |
| `NOTIF-01`| Multi-Channel Event Notifications | Notifications | Phase 1 (MVP) | P1 |
| `INTV-01` | Sandboxed Code Execution | Practice | Phase 2 | P0 |
| `INTV-02` | Curated Engineering Problem Bank | Practice | Phase 2 | P0 |
| `INTV-03` | Audio/Video Mock Interview Studio | Practice | Phase 2 | P0 |
| `EVAL-01` | Multi-Dimensional AI Assessment | AI / Practice | Phase 2 | P0 |
| `ROAD-02` | Autonomous Living Roadmap | Roadmap | Phase 3 | P1 |
| `RADAR-01`| Visual Competency Skill Radar | Analytics | Phase 3 | P1 |
| `COMP-01` | Company Mode (Targeted Curricula) | Career | Phase 3 | P1 |
| `REVW-01` | Automated AI Code Reviewer | Practice | Phase 3 | P2 |
| `COMM-01` | Peer Mock Interview Exchange | Community | Phase 3 | P2 |

---

## 🔍 Detailed Feature Specifications (Phase 1 MVP)

### `AUTH-01`: Multi-Provider Authentication
- **Description:** Secure user authentication supporting standard email/password registration alongside Google and GitHub OAuth 2.0 flows.
- **Security:** Argon2/bcrypt password hashing, stateless RS256/HS256 JWT access tokens (30 min lifetime) with rotating refresh tokens stored in HTTP-only cookies.
- **Acceptance Criteria:** Users can sign up, log in, refresh expired sessions, and securely log out across devices.

### `ONBD-01`: Career Goal & Skill Assessment
- **Description:** Guided 4-step onboarding flow collecting:
  1. Target role: Backend, Frontend, Full-Stack, Platform/DevOps, AI Engineer.
  2. Target tier: Early-Stage Startup, Mid-Market Unicorn, FAANG / Tier 1.
  3. Current skills self-rating across core language, frameworks, and CS fundamentals.
  4. Weekly time budget (5 to 30 hours).
- **Output:** Stored profile aggregate triggering initial roadmap generation event.

### `ROAD-01`: Dynamic AI Roadmap Generation
- **Description:** Generates a directed acyclic graph (DAG) of learning nodes and milestones using LangGraph agent orchestration.
- **Node Attributes:** ID, title, description, estimated hours, prerequisite nodes, curated external resources (docs, articles, courses), and validation criteria.
- **UI Interaction:** Interactive visual roadmap canvas allowing node completion marking, status filtering, and resource link access.

### `PLAN-01`: Daily Action Task Scheduler
- **Description:** Automated morning job that evaluates the user's active roadmap node and queues 1 to 3 micro-actions for the day.
- **Streak Logic:** Completing at least one task per calendar day increments the user's streak counter. Missing a day without an active freeze resets streak to 0.

### `MENT-01`: Conversational AI Mentor
- **Description:** Streaming LLM chat interface equipped with context-injection tools providing access to the user's profile, active roadmap, and past mistakes.
- **Guardrails:** Grounded strictly in software engineering concepts; rejects out-of-domain conversational queries gracefully.

### `INTEG-01` & `INTEG-02`: Developer Integrations
- **GitHub:** Ingests public repositories, commit activity over 30 days, and contribution streak.
- **LeetCode:** Ingests solved problem count by difficulty (Easy, Medium, Hard), current ranking, and recent submissions.

### `NOTIF-01`: Multi-Channel Notifications
- **Email:** Transactional emails delivered via Resend for onboarding welcome, daily plans, milestone unlock, and streak warnings.
- **Web Push:** Browser push notifications via standard VAPID Web Push protocol for morning plans and evening streak reminders.
