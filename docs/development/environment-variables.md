# Environment Variables Reference

This document provides a comprehensive reference for all configuration options and environment variables used across **SE-OS**.

---

## ⚙️ Core Application & Server

| Variable | Type | Default | Description |
|---|---|---|---|
| `APP_ENV` | string | `development` | Runtime environment (`development`, `staging`, `production`). |
| `DEBUG` | boolean | `true` | Enables FastAPI and framework debug modes and verbose stacktraces. |
| `LOG_LEVEL` | string | `INFO` | Logging threshold (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`). |
| `SECRET_KEY` | string | *None* | Cryptographic secret used for signing JWT access and refresh tokens. |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | integer | `30` | Lifespan of short-lived JWT access tokens in minutes. |
| `REFRESH_TOKEN_EXPIRE_DAYS` | integer | `7` | Lifespan of rotating refresh tokens in days. |
| `CORS_ORIGINS` | string / list | `http://localhost:3000` | Allowed origins for cross-origin resource sharing. |

---

## 🗄️ Database & Storage

| Variable | Type | Default | Description |
|---|---|---|---|
| `POSTGRES_DB` | string | `se_os` | PostgreSQL database name. |
| `POSTGRES_USER` | string | `seos_admin` | PostgreSQL database user. |
| `POSTGRES_PASSWORD` | string | *None* | PostgreSQL database password. |
| `DATABASE_URL` | string | *None* | Async SQLAlchemy URI (`postgresql+asyncpg://...`). |
| `REDIS_PASSWORD` | string | *None* | Password for Redis cache and Celery broker. |
| `REDIS_URL` | string | *None* | Full Redis connection URI (`redis://:...@redis:6379/0`). |
| `STORAGE_PROVIDER` | string | `minio` | Storage backend (`minio` or `s3`). |
| `MINIO_HOST` | string | `minio` | Hostname for local MinIO S3-compatible service. |
| `MINIO_PORT` | integer | `9000` | Port for local MinIO S3 API. |
| `MINIO_ROOT_USER` | string | `seos_minio` | MinIO admin user. |
| `MINIO_ROOT_PASSWORD` | string | *None* | MinIO admin password. |

---

## 📬 Message Broker & Background Tasks

| Variable | Type | Default | Description |
|---|---|---|---|
| `RABBITMQ_HOST` | string | `rabbitmq` | RabbitMQ server hostname. |
| `RABBITMQ_PORT` | integer | `5672` | AMQP port. |
| `RABBITMQ_USER` | string | `seos_rabbit` | RabbitMQ user. |
| `RABBITMQ_PASSWORD` | string | *None* | RabbitMQ user password. |
| `RABBITMQ_URL` | string | *None* | Full AMQP connection URI (`amqp://...`). |

---

## 🧠 AI Platform & LLM Providers

| Variable | Type | Default | Description |
|---|---|---|---|
| `AI_PLATFORM_URL` | string | `http://ai-platform:8001` | Internal URL for the AI Agent Platform service. |
| `OPENAI_API_KEY` | string | *None* | OpenAI API key for GPT-4o models and embeddings. |
| `ANTHROPIC_API_KEY` | string | *None* | Anthropic API key for Claude 3.5 Sonnet agent tasks. |
| `GOOGLE_API_KEY` | string | *None* | Google Gemini API key for multimodal analysis. |
| `AI_DEFAULT_MODEL` | string | `gpt-4o-mini` | Default fast LLM for low-latency interactions. |
| `AI_COMPLEX_MODEL` | string | `gpt-4o` | Frontier model for complex reasoning and roadmap planning. |
| `AI_EMBEDDING_MODEL` | string | `text-embedding-3-small` | Model for semantic similarity and vector retrieval. |

---

## 🔔 Notifications & External Integrations

| Variable | Type | Default | Description |
|---|---|---|---|
| `RESEND_API_KEY` | string | *None* | API key for Resend transactional email delivery. |
| `EMAIL_FROM` | string | `noreply@se-os.app` | Default sender email address. |
| `EMAIL_FROM_NAME` | string | `SE-OS` | Display name for outgoing system emails. |
| `VAPID_PUBLIC_KEY` | string | *None* | Web Push public key for browser notification subscriptions. |
| `VAPID_PRIVATE_KEY` | string | *None* | Web Push private key for signing push notifications. |
| `GITHUB_CLIENT_ID` | string | *None* | GitHub OAuth application client ID. |
| `GITHUB_CLIENT_SECRET` | string | *None* | GitHub OAuth application client secret. |
| `LEETCODE_API_URL` | string | `https://leetcode.com/graphql` | LeetCode GraphQL public endpoint. |
