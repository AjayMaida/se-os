#!/bin/bash
set -e

# Copy .env.example to .env if not exists
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

# Run docker compose up --build -d
echo "Starting Docker containers..."
docker compose up --build -d

# Wait for postgres health
echo "Waiting for PostgreSQL to be ready..."
until docker compose exec db pg_isready -U postgres; do
    sleep 2
done

# Run alembic upgrade head
echo "Running database migrations..."
docker compose exec api uv run alembic upgrade head

# Print success URLs
echo "Development environment is ready!"
echo "Web (Next.js): http://localhost:3000"
echo "API (FastAPI): http://localhost:8000"
echo "AI Platform: http://localhost:8001"
