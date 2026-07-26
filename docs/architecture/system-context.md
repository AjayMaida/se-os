# System Context

## Purpose

The System Context defines the boundary of the SE-OS platform and identifies the people, external systems, and third-party services that interact with it.

This document serves as the foundation for the C4 Level 1 System Context Diagram and provides a high-level understanding of how SE-OS fits into its surrounding ecosystem.

---

# System Boundary

SE-OS is an AI-powered career development platform that helps users achieve their career goals through personalized learning, roadmap generation, coding practice, portfolio projects, interview preparation, and AI-guided recommendations.

The platform owns all business logic related to user learning journeys, planning, career development, and progress tracking.

External services are accessed through dedicated integration mechanisms and are not considered part of the SE-OS system boundary.

---

# Primary Actors

## User

The primary user of SE-OS.

Responsibilities:

- Define career goals
- Complete learning activities
- Solve coding problems
- Build portfolio projects
- Prepare for interviews
- Track progress
- Receive AI guidance

---

## Administrator

Responsible for platform administration.

Responsibilities:

- Platform configuration
- Content management
- User support
- System monitoring
- Analytics
- Operational management

---

# External Systems

The following systems interact with SE-OS but remain outside the platform boundary.

## GitHub

Provides repository information and portfolio synchronization.

---

## LeetCode

Provides coding practice history and problem-solving statistics.

---

## GeeksforGeeks

Provides coding practice history and educational content integration.

---

## HackerRank

Provides coding assessment and challenge history.

---

## LinkedIn

Provides professional profile integration and career information.

---

## AI Model Providers

Large Language Models (LLMs) used to power AI capabilities.

Examples include:

- OpenAI
- Anthropic
- Google
- Local models (future)

The specific provider is abstracted through the AI Platform.

---

# Interaction Overview

Users interact with SE-OS through web and mobile applications.

SE-OS communicates with external platforms using secure APIs through an integration layer.

AI capabilities are provided through an internal AI Platform that abstracts interactions with multiple AI model providers.

External systems never access the internal business logic or databases of SE-OS directly.

---

# Design Principles

- SE-OS owns its business logic.
- External platforms remain independent.
- Integrations are loosely coupled.
- AI providers are replaceable.
- Business domains remain isolated from third-party implementation details.