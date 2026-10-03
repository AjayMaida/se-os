# Stage 'base'
FROM python:3.12-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential \
    && rm -rf /var/lib/apt/lists/*

# Stage 'development'
FROM base AS development
RUN pip install uv
WORKDIR /app
COPY pyproject.toml .
RUN uv sync
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# Stage 'production'
FROM base AS production
RUN pip install uv
WORKDIR /app
COPY pyproject.toml .
RUN uv sync --no-dev
COPY . .
# Create non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
