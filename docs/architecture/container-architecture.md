# Container Architecture

## Purpose

This document describes the major deployable containers of the SE-OS platform using the C4 Model (Level 2). It explains the responsibilities of each container, the technologies used, and how containers communicate with each other.

The architecture follows a **Modular Monolith First** approach, allowing the platform to evolve into microservices as business and scalability requirements grow.

---

# Architecture Principles

- Modular Monolith as the initial deployment model.
- Clear separation of business and infrastructure concerns.
- AI capabilities isolated from core business logic.
- External integrations centralized through a dedicated Integration Platform.
- Event-driven communication for asynchronous workflows.
- Independent scalability of infrastructure components.
- Loose coupling between containers.

---

# Containers

## Web Application

### Responsibilities

- User Interface
- Dashboard
- Authentication UI
- Learning Experience
- Project Management
- Career Dashboard
- AI Chat Interface

### Technology

- React
- Next.js
- TypeScript

---

## API Gateway

### Responsibilities

- Authentication
- Authorization
- Request Routing
- Rate Limiting
- API Versioning
- Logging

### Technology

- Nginx / Kong / Traefik (Final selection later)

---

## Core Platform

### Responsibilities

Contains all business domains:

- Identity & User
- Learning Management
- Roadmap & Planning
- Practice
- Projects
- Career Development
- Guidance & Recommendations

### Technology

- Python
- FastAPI

---

## AI Platform

### Responsibilities

- Intelligent Planner
- Agent Orchestrator
- Prompt Manager
- Memory Management
- Context Builder
- Validation
- Evaluation
- Model Routing

### Technology

- Python
- FastAPI
- LangGraph
- LangChain

---

## Integration Platform

### Responsibilities

- GitHub Integration
- LeetCode Integration
- GeeksforGeeks Integration
- HackerRank Integration
- LinkedIn Integration
- Future Connectors

### Technology

- FastAPI

---

## Notification Platform

### Responsibilities

- Email
- Push Notifications
- Reminder Scheduling
- Weekly Reports
- Achievement Notifications

### Technology

- Background Workers

---

## PostgreSQL

Primary transactional database.

---

## Redis

Used for:

- Cache
- Sessions
- Rate Limiting
- AI Response Cache

---

## Message Broker

Used for asynchronous communication.

Examples:

- RabbitMQ
- Kafka

Technology selection will be finalized later.

---

# Communication Principles

- REST APIs for synchronous communication.
- Domain Events for asynchronous communication.
- No shared database access between logical domains.
- AI Platform communicates through APIs rather than directly accessing business databases.
- External systems are accessed only through the Integration Platform.