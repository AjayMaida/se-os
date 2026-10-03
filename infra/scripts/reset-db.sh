#!/bin/bash
set -e

echo "Dropping and recreating the database..."
docker compose exec -T db psql -U postgres -c "DROP SCHEMA public CASCADE;"
docker compose exec -T db psql -U postgres -c "CREATE SCHEMA public;"
docker compose exec -T db psql -U postgres -c "GRANT ALL ON SCHEMA public TO postgres;"
docker compose exec -T db psql -U postgres -c "GRANT ALL ON SCHEMA public TO public;"

echo "Running migrations..."
docker compose exec -T api uv run alembic upgrade head

echo "Database reset complete!"
