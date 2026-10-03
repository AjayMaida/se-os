# Observability Architecture

This document describes the logging, metrics, distributed tracing, and alerting architecture for **SE-OS**.

---

## 🔭 The Observability Pillars

```
+-------------------------------------------------------------------------+
|                              OBSERVABILITY                              |
+-------------------+-------------------+---------------------------------+
|      LOGS         |      METRICS      |             TRACES              |
|   (structlog)     |   (Prometheus)    |       (OpenTelemetry & Sentry)  |
| Key-value context | Request rate, p99 | Distributed spans across API,   |
| JSON in prod      | latency, errors   | workers, and LLM calls          |
+-------------------+-------------------+---------------------------------+
```

---

## 📝 1. Structured Logging (`structlog`)

- All backend and microservice logging uses `structlog`.
- In development: Colored, human-readable terminal output.
- In production: Single-line JSON strings parsed by Datadog / CloudWatch / Grafana Loki.
- Standard mandatory context keys: `event`, `timestamp`, `service`, `environment`, `user_id`, `request_id`.

---

## 📊 2. Metrics & Key Performance Indicators (KPIs)

FastAPI endpoints and Celery workers emit Prometheus metrics:

- `http_requests_total{status, method, endpoint}`: Volume and error rates.
- `http_request_duration_seconds{endpoint}`: Request latency histogram (p50, p95, p99).
- `llm_token_usage_total{model, type}`: Real-time token consumption and cost metrics.
- `celery_queue_length{queue_name}`: Worker queue backlog and processing delays.

---

## 🔍 3. Error Tracking & Tracing (Sentry)

- Integrated into FastAPI via `sentry-sdk[fastapi]`.
- Unhandled HTTP exceptions and worker task failures trigger immediate alerts with stack traces and request parameters.
- Tracing sample rate configured via `SENTRY_TRACES_SAMPLE_RATE` (0.1 in dev, 0.05 in prod).
