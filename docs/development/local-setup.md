# Local Development Setup Guide

This guide walks you through setting up the complete **SE-OS** development environment locally in under 30 minutes.

---

## 📋 Prerequisites

SE-OS runs entirely containerized via Docker. You do **not** need local installations of Python, Node.js, uv, or PostgreSQL on your host machine.

| Tool | Minimum Version | Verification Command | Notes |
|---|---|---|---|
| **Git** | 2.38+ | `git --version` | Source control |
| **Docker Engine** | 24.0+ | `docker --version` | Container runtime |
| **Docker Compose** | v2.20+ | `docker compose version` | Multi-container orchestration |
| **Memory** | 8 GB+ RAM allocated | Docker Desktop Settings | Recommended 12 GB+ for AI platform |
| **Disk Space** | 20 GB free | `df -h` | Base images and volumes |

> [!IMPORTANT]
> Ensure Docker Desktop or Colima is allocated at least **4 CPU cores** and **8 GB RAM** (12 GB recommended) in system resources. Running PostgreSQL, Redis, RabbitMQ, FastAPI, Next.js, and the AI agent platform concurrently requires adequate memory headroom.

---

## 🚀 Step-by-Step Setup

### 1. Clone the Repository

Clone the project and checkout the primary development branch:

```bash
git clone https://github.com/ajaymaida/se-os.git
cd se-os
git checkout develop
```

### 2. Configure Environment Variables

Create your local `.env` configuration file from the provided template:

```bash
cp .env.example .env
```

Open `.env` in your editor and configure the necessary parameters.

#### Required vs. Optional Variables

| Variable | Classification | Default / Development Value | Description |
|---|---|---|---|
| `APP_ENV` | **Required** | `development` | Runtime environment |
| `SECRET_KEY` | **Required** | `dev_super_secret_key_change_in_prod_123` | JWT signing secret |
| `POSTGRES_DB` | **Required** | `se_os` | Database name |
| `POSTGRES_USER` | **Required** | `seos_admin` | PostgreSQL admin username |
| `POSTGRES_PASSWORD` | **Required** | `postgres_dev_password` | PostgreSQL admin password |
| `DATABASE_URL` | **Required** | `postgresql+asyncpg://seos_admin:postgres_dev_password@postgres:5432/se_os` | Async SQLAlchemy connection |
| `REDIS_PASSWORD` | **Required** | `redis_dev_password` | Redis authentication password |
| `REDIS_URL` | **Required** | `redis://:redis_dev_password@redis:6379/0` | Redis client URI |
| `RABBITMQ_USER` | **Required** | `seos_rabbit` | RabbitMQ user |
| `RABBITMQ_PASSWORD` | **Required** | `rabbit_dev_password` | RabbitMQ password |
| `RABBITMQ_URL` | **Required** | `amqp://seos_rabbit:rabbit_dev_password@rabbitmq:5672/` | AMQP broker URI |
| `OPENAI_API_KEY` | **Semi-Optional** | `sk-...` | Required to exercise AI features live |
| `ANTHROPIC_API_KEY` | *Optional* | `sk-ant-...` | Fallback LLM provider |
| `RESEND_API_KEY` | *Optional* | `re_CHANGE_ME` | Defaults to simulated delivery in dev |
| `VAPID_PUBLIC_KEY` | *Optional* | `CHANGE_ME` | Web Push VAPID key pair |
| `VAPID_PRIVATE_KEY`| *Optional* | `CHANGE_ME` | Web Push private signing key |
| `GITHUB_CLIENT_ID` | *Optional* | `CHANGE_ME` | GitHub OAuth integration |
| `GITHUB_CLIENT_SECRET` | *Optional* | `CHANGE_ME` | GitHub OAuth client secret |

> [!TIP]
> If you do not have an `OPENAI_API_KEY`, the core API, frontend, worker, and database services will run normally. Mock responses will be used where external AI calls are stubbed.

### 3. Build and Start All Services

Start the entire application stack using Docker Compose:

```bash
docker compose up --build
```

To run all containers in the background as detached daemons:

```bash
docker compose up -d --build
```

You can view aggregated logs at any time:

```bash
docker compose logs -f
```

Or tail logs for a specific service:

```bash
docker compose logs -f api
docker compose logs -f ai-platform
docker compose logs -f notifications
```

---

## 🌐 Service Access URLs

Once all containers report healthy, access the platform components at the following local URLs:

| Service | Port | Local URL | Credentials / Notes |
|---|---|---|---|
| **Web Frontend (Next.js)** | `3000` | [http://localhost:3000](http://localhost:3000) | Main application UI |
| **Backend API (FastAPI)** | `8000` | [http://localhost:8000](http://localhost:8000) | Core REST API |
| **API Documentation (Swagger UI)** | `8000` | [http://localhost:8000/docs](http://localhost:8000/docs) | Interactive API exploration |
| **API ReDoc** | `8000` | [http://localhost:8000/redoc](http://localhost:8000/redoc) | Alternative API reference |
| **AI Platform Service** | `8001` | [http://localhost:8001](http://localhost:8001) | LangGraph agent runtime |
| **AI Platform Swagger UI** | `8001` | [http://localhost:8001/docs](http://localhost:8001/docs) | Agent endpoints & health |
| **RabbitMQ Management Dashboard** | `15672` | [http://localhost:15672](http://localhost:15672) | Username & Password from `.env` |
| **MinIO Object Storage Console** | `9001` | [http://localhost:9001](http://localhost:9001) | S3 local storage GUI |
| **PostgreSQL Database** | `5432` | `localhost:5432` | Direct SQL client access |
| **Redis Cache** | `6379` | `localhost:6379` | Cache & task broker |

---

## 🗄️ Database Migrations

Database schema revisions are managed using **Alembic**.

### Apply Migrations to Latest (Head)

Execute migration upgrades inside the running API container:

```bash
docker compose exec api alembic upgrade head
```

### Create a New Migration Revision

When modifying SQLAlchemy models under `apps/api/app/domains/`:

```bash
docker compose exec api alembic revision --autogenerate -m "add_user_profile_fields"
```

Review the newly generated file under `apps/api/alembic/versions/` and then apply:

```bash
docker compose exec api alembic upgrade head
```

### Roll Back Migrations

To revert the most recent migration:

```bash
docker compose exec api alembic downgrade -1
```

---

## 🧪 Running Automated Tests

Run backend tests directly inside the Docker environment without local virtual environments:

### Run Backend API Test Suite

```bash
docker compose exec api pytest
```

### Run with Verbose Output and Fail Fast

```bash
docker compose exec api pytest -v -x
```

### Run with Test Coverage Report

```bash
docker compose exec api pytest --cov=app --cov-report=term-missing --cov-report=html
```

### Run Notifications Service Tests

```bash
docker compose exec notifications pytest -v
```

---

## 🛠️ Common Issues & Troubleshooting

### 1. Port Already in Use (`bind: address already in use`)

**Cause:** A local instance of PostgreSQL, Redis, or Node.js is already running on port 5432, 6379, 3000, or 8000.

**Solution:** Identify and stop the occupying host processes:

```bash
# Check what is occupying port 5432 or 8000
lsof -i :5432
lsof -i :8000

# Stop local services if installed via Homebrew (macOS)
brew services stop postgresql
brew services stop redis
```

Alternatively, rebind the host port in `docker-compose.yml` (e.g., `"8002:8000"`).

### 2. Docker Out of Memory / Container Killed (`Exit Code 137`)

**Cause:** The Docker daemon exceeded allocated memory when compiling TypeScript or loading AI dependencies.

**Solution:**
1. Open Docker Desktop → **Settings** → **Resources**.
2. Increase RAM allocation to at least **8 GB** (12 GB recommended).
3. Increase Swap space to **2 GB**.
4. Restart Docker Desktop.

### 3. Database Connection Refused or Timeout During Startup

**Cause:** The API container attempted to connect before PostgreSQL finished initializing its database files.

**Solution:**
Docker Compose includes `healthcheck` conditions (`service_healthy`) for `postgres`. If an initial run fails during cold cache:

```bash
# Restart the dependent services once postgres is healthy
docker compose restart api worker scheduler
```

### 4. Resetting the Local Environment from Scratch

If you encounter corrupted state or wish to perform a fresh start:

```bash
# Stop all containers and remove persistent volumes
docker compose down -v

# Rebuild containers from scratch
docker compose up --build -d

# Run database migrations
docker compose exec api alembic upgrade head
```
