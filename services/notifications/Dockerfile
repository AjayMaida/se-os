# Stage 'base'
FROM python:3.12-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install uv
WORKDIR /app
COPY pyproject.toml .

# Stage 'development'
FROM base AS development
RUN uv sync
COPY . .
CMD ["python", "-m", "app.main"]

# Stage 'production'
FROM base AS production
RUN uv sync --no-dev
COPY . .
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
CMD ["python", "-m", "app.main"]
