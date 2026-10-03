# Testing Guide & Strategy

Testing is a core discipline of **SE-OS**. Our test suite provides confidence that refactoring, domain extensions, and AI platform updates do not introduce regressions.

---

## 🎯 Testing Pyramid

We adhere to the standard testing pyramid:

```
      /\
     /  \     End-to-End Tests (Smoke tests on deployed environments)
    /----\
   / Inte \   Integration Tests (FastAPI endpoints + Async PostgreSQL / Redis)
  /--------\
 /   Unit   \ Unit Tests (Domain services, entities, AI prompts, utilities)
/------------\
```

---

## 🐍 Backend Testing (Python / FastAPI)

Backend tests are written with **pytest** and **pytest-asyncio**, running inside the API container.

### 1. Test Categories

#### Unit Tests (`tests/unit/`)
- Test domain logic and service layers in total isolation from external systems.
- Dependencies such as database repositories, RabbitMQ publishers, and external APIs are mocked using `unittest.mock` or `pytest-mock`.
- Very fast execution (< 50ms per test).

```python
# ✅ Example Unit Test with Mocked Repository
import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from app.domains.roadmap.services import RoadmapService

@pytest.mark.asyncio
async def test_should_generate_roadmap_when_valid_target_role_provided():
    # Arrange
    mock_repo = AsyncMock()
    mock_repo.get_by_user_id.return_value = None
    mock_ai_client = AsyncMock()
    mock_ai_client.generate_roadmap.return_value = {"milestones": ["System Design"]}
    
    service = RoadmapService(repository=mock_repo, ai_client=mock_ai_client)
    user_id = uuid4()

    # Act
    result = await service.create_roadmap(user_id=user_id, target_role="Senior Backend Engineer")

    # Assert
    assert result is not None
    assert "System Design" in result["milestones"]
    mock_repo.save.assert_awaited_once()
```

#### Integration Tests (`tests/integration/`)
- Verify interaction between FastAPI endpoints, SQLAlchemy async queries, and test PostgreSQL database.
- Use an isolated test database with rolled-back transactions per test so tests remain deterministic and order-independent.

```python
# ✅ Example Integration Test with Async Test Client
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_should_return_200_when_healthcheck_endpoint_called(async_client: AsyncClient):
    response = await async_client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
```

### 2. Test Naming Convention

All test functions must follow the behavioral naming convention:

$$\text{test\_should\_[expected\_action]\_when\_[condition]}$$

**Examples:**
- `test_should_issue_jwt_token_when_valid_credentials_provided`
- `test_should_raise_401_when_expired_refresh_token_used`
- `test_should_calculate_correct_streak_when_activity_logged_consecutively`
- `test_should_retry_connection_when_rabbitmq_temporarily_unavailable`

### 3. What to Test

| Layer | Coverage Expectation | Focus Areas |
|---|---|---|
| **Domain Services** | 90%+ | Business rules, calculations (streaks, readiness scores), state transitions |
| **API Routers** | 80%+ | Request payload validation, status codes (200, 201, 400, 401, 403, 404), response schemas |
| **Domain Entities** | 95%+ | Entity validations, invariant checks, state mutation methods |
| **AI Workflows** | 80%+ | Structured output validation, schema parsers, fallback handling on LLM failure |
| **External Clients** | 85%+ | Error handling (rate limits, timeouts, bad tokens) |

---

## 🚀 Running Tests via Docker

All tests run directly inside the Docker stack:

### Run Entire Backend Suite

```bash
docker compose exec api pytest -v
```

### Run with Stop-on-First-Failure (`-x`)

```bash
docker compose exec api pytest -v -x
```

### Run Specific Test File or Expression

```bash
docker compose exec api pytest tests/domains/identity/test_auth.py -v
docker compose exec api pytest -k "test_should_issue_jwt"
```

### Measure and Report Test Coverage

Generate a terminal summary and detailed HTML coverage report:

```bash
docker compose exec api pytest --cov=app --cov-report=term-missing --cov-report=html
```

The HTML report will be generated inside `apps/api/htmlcov/index.html`.

### Run Notifications Service Tests

```bash
docker compose exec notifications pytest -v
```

---

## ⚛️ Frontend Testing (TypeScript / Next.js)

*(Planned for Phase 1 Sprint 2)*

- **Unit & Component Testing:** **Jest** + **React Testing Library** for verifying UI components, hooks, and render states.
- **End-to-End Testing:** **Playwright** for complete user journeys (login → view roadmap → complete task).

### Target Frontend Test Structure

```
apps/web/
├── tests/
│   ├── components/       # Component render and interaction tests
│   ├── hooks/            # Custom SWR and auth hook tests
│   └── e2e/              # Playwright browser tests
```
