# SE-OS

> **An AI-powered Career Operating System** that transforms your career goals into structured daily execution plans — helping software engineers learn smarter, build consistently, and grow with confidence.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED.svg)](https://docker.com)

---

## 🎯 What is SE-OS?

SE-OS is not a learning platform. It is not a coding platform. It is not just a career tool.

It is the **operating system for a software engineer's entire career** — from day zero to dream job.

> **"Never wonder what to do next."**

---

## 🏗️ Project Structure

```
se-os/
├── apps/
│   ├── api/              ← FastAPI backend (Core Platform)
│   └── web/              ← Next.js 15 frontend
├── services/
│   ├── ai/               ← AI Platform (LangGraph agents)
│   ├── integrations/     ← GitHub, LeetCode connectors
│   └── notifications/    ← Email + push notification service
├── infra/
│   ├── docker/           ← Dockerfiles per service
│   ├── nginx/            ← Reverse proxy config
│   └── scripts/          ← Dev & deployment scripts
├── docs/                 ← All documentation
│   ├── architecture/
│   ├── product/
│   ├── development/
│   └── planning/
├── docker-compose.yml    ← Local development stack
├── docker-compose.prod.yml ← Production stack
└── .env.example          ← Environment variable template
```

---

## 🚀 Quick Start (Docker — Recommended)

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) 24+
- [Docker Compose](https://docs.docker.com/compose/) v2+

### 1. Clone the repository

```bash
git clone https://github.com/AjayMaida/se-os.git
cd se-os
git checkout develop
```

### 2. Set up environment variables

```bash
cp .env.example .env
# Edit .env and fill in required values (see docs/development/environment-variables.md)
```

### 3. Start the development stack

```bash
docker compose up --build
```

### 4. Access the services

| Service | URL |
|---|---|
| Frontend (Web) | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |
| AI Platform | http://localhost:8001 |
| Adminer (DB UI) | http://localhost:8080 |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Python 3.12, FastAPI, SQLAlchemy 2.x, Pydantic v2 |
| **AI Platform** | LangGraph, LangChain, LiteLLM, OpenAI |
| **Database** | PostgreSQL 16 + pgvector |
| **Cache** | Redis 7 |
| **Message Broker** | RabbitMQ 3 |
| **Object Storage** | MinIO (local) / S3 (production) |
| **Reverse Proxy** | Nginx |
| **Container** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |

---

## 📖 Documentation

| Document | Description |
|---|---|
| [Local Setup](docs/development/local-setup.md) | How to run SE-OS locally |
| [Environment Variables](docs/development/environment-variables.md) | All env var reference |
| [Git Workflow](docs/development/git-workflow.md) | Branching and PR strategy |
| [Coding Standards](docs/development/coding-standards.md) | Code style and conventions |
| [Testing Guide](docs/development/testing.md) | How to run and write tests |
| [Architecture Overview](docs/architecture/high-level-architecture.md) | System architecture |
| [Domain Model](docs/architecture/domain-model.md) | Business domains and events |
| [API Specification](docs/architecture/api-specification.md) | API design standards |
| [PRD](docs/product/prd.md) | Product Requirements Document |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, code review process, and development workflow.

---

## 📄 License

[MIT License](LICENSE) — Copyright © 2026 Ajay Maida
