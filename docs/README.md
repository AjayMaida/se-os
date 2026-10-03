# SE-OS Documentation Index

Welcome to the **SE-OS** documentation. This page serves as the master navigation index for all architectural, design, engineering, and product documentation across the platform.

---

## 📦 Product

| Document | Description |
|---|---|
| [Vision](product/vision.md) | Product vision, guiding principles, target audience, and core mission statement |
| [PRD](product/prd.md) | Complete Product Requirements Document detailing features, user stories, and acceptance criteria |
| [Features](product/features.md) | Granular breakdown of feature capabilities categorized across development phases |
| [User Personas](product/user-personas.md) | Detailed user archetypes, pain points, motivations, and user journeys |

---

## 🏗️ Architecture

| Document | Description |
|---|---|
| [High-Level Architecture](architecture/high-level-architecture.md) | System overview and architectural style (Modular Monolith + Domain-Driven Design) |
| [System Design](architecture/system-design.md) | Detailed system design, quality attributes, and architectural principles |
| [Domain Model](architecture/domain-model.md) | Bounded contexts, domain entities, aggregates, and domain event definitions |
| [Tech Stack](architecture/tech-stack.md) | Approved technologies, frameworks, libraries, and runtime engines per layer |
| [Folder Structure](architecture/folder-structure.md) | Complete monorepo folder structure with line-by-line directory explanations |
| [Container Architecture](architecture/container-architecture.md) | C4 Level 2 container diagram and service interaction boundaries |
| [Database Design](architecture/database-design.md) | PostgreSQL 16 schema design, pgvector indexing, and relational data models |
| [API Specification](architecture/api-specification.md) | REST API design standards, error envelope conventions, and versioning rules |
| [AI Architecture](architecture/ai-architecture.md) | AI Platform design covering LangGraph agents, memory, routing, and guardrails |
| [Security Architecture](architecture/security-architecture.md) | Authentication (JWT), RBAC authorization, encryption, and AI prompt security |
| [Deployment Architecture](architecture/deployment-architecture.md) | Production Docker deployment topology, AWS VPC networking, and cloud services |
| [Quality Attributes](architecture/quality-attributes.md) | Non-functional requirements, latency thresholds, and availability targets |
| [Architecture Drivers](architecture/architecture-drivers.md) | Key business and technical drivers governing platform architectural decisions |
| [System Context](architecture/system-context.md) | C4 Level 1 system context diagram identifying external actors and integrations |
| [Integration Architecture](architecture/integration-architecture.md) | External API integrations architecture for GitHub, LeetCode, and OAuth |
| [Scalability](architecture/scalability.md) | Scaling blueprint from initial MVP to 1,000,000 active concurrent engineers |
| [Observability](architecture/observability.md) | Centralized logging (structlog), Prometheus metrics, OpenTelemetry, and Sentry |
| [Architecture Backlog](architecture/architecture-backlog.md) | Backlog of technical debt, architectural spikes, and planned refactors |

---

## 📐 Architecture Decision Records (ADRs)

| Document | Description |
|---|---|
| [ADR Index](adr/README.md) | Index and overview of all Architecture Decision Records |
| [ADR-0001 Domain-Driven Design](adr/ADR-0001-domain-driven-design.md) | Rationale for choosing Modular Monolith with Domain-Driven Design boundaries |
| [ADR-0002 AI Kernel Platform](architecture/adr/ADR-0002-ai-kernel-platform.md) | Architectural justification for the LangGraph autonomous multi-agent platform |

---

## 🛠️ Development & Engineering

| Document | Description |
|---|---|
| [Local Setup Guide](development/local-setup.md) | Complete step-by-step instructions to run SE-OS locally via Docker in under 30 minutes |
| [Environment Variables](development/environment-variables.md) | Exhaustive reference of all required and optional environment variables |
| [Git Workflow](development/git-workflow.md) | Branch hierarchy, Conventional Commits, PR lifecycle, and merge strategies |
| [Coding Standards](development/coding-standards.md) | PEP 8, Ruff, async Python guidelines, and TypeScript/Tailwind strict conventions |
| [Testing Guide](development/testing.md) | Unit, integration, and E2E testing strategies using pytest and Docker |
| [Deployment Guide](development/deployment.md) | Multi-stage production deployment, database migrations, health checks, and rollbacks |

---

## 📅 Planning & Roadmap

| Document | Description |
|---|---|
| [Product Roadmap](planning/roadmap.md) | Three-phase product roadmap (Phase 1: MVP, Phase 2: Interview Studio, Phase 3: Scale) |
| [Milestones](planning/milestones.md) | Release milestones, deliverable packages, acceptance criteria, and KPIs |
| [Sprints](planning/sprints.md) | Sprint cadence, active sprint deliverables, and team backlog tracking |

---

## 🎨 Design System

| Document | Description |
|---|---|
| [Colors](design/colors.md) | Color palette, dark-mode color tokens, semantic status fills, and accents |
| [Typography](design/typography.md) | Font hierarchies, type scales, and responsive font sizing specifications |
| [Components](design/components.md) | Design system component primitives, interaction states, and accessibility standards |
| [Wireframes](design/wireframes.md) | Screen layouts and wireframes for Dashboard, Roadmap Canvas, and Interview Studio |

---

## 📚 Resources & Learning

| Document | Description |
|---|---|
| [Learning Resources](resources/learning.md) | Curated reading list, engineering blogs, and system design courses for contributors |
| [References](resources/references.md) | External technical specifications, RFCs, research papers, and inspirations |
