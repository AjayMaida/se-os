# Stage 'base'
FROM python:3.12-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir uv

WORKDIR /app
ENV UV_PROJECT_ENVIRONMENT="/opt/venv"
ENV PATH="/opt/venv/bin:$PATH"

# Stage 'development'
FROM base AS development
COPY pyproject.toml .
RUN uv sync --no-install-project
COPY . .
CMD ["python", "-m", "app.main"]

# Stage 'production'
FROM base AS production
COPY pyproject.toml .
RUN uv sync --no-dev --no-install-project
COPY . .
RUN useradd -m appuser && chown -R appuser:appuser /app /opt/venv
USER appuser
CMD ["python", "-m", "app.main"]
