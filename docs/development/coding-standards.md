# Coding Standards & Style Guide

This guide establishes the mandatory engineering standards for backend (Python) and frontend (TypeScript) code across **SE-OS**. All pull requests are evaluated against these rules.

---

## 🐍 Python / Backend Standards

The backend is built with **Python 3.12**, **FastAPI**, **SQLAlchemy 2.0 (async)**, and **Pydantic v2**.

### 1. Code Style & Tooling
- **PEP 8 Compliance:** All code must strictly conform to PEP 8, formatted and linted via **Ruff**.
- **Line Length:** Maximum line length is **120 characters**.
- **Formatting:** Use Ruff format before committing (`ruff format . && ruff check .`).

### 2. Type Hints
- Type annotations are **mandatory** on all function signatures, parameters, and return values.
- Avoid unconstrained `typing.Any`. When dynamic typing is required, use `typing.Union`, generic parameters, or explicit Pydantic models.

```python
# ❌ INCORRECT
async def get_user(user_id):
    return repo.find(user_id)

# ✅ CORRECT
from typing import Optional
from uuid import UUID

async def get_user_by_id(user_id: UUID) -> Optional[User]:
    return await user_repository.get_by_id(user_id)
```

### 3. Documentation & Docstrings
- All public modules, classes, and functions must have **Google-style docstrings**.
- Specify `Args:`, `Returns:`, and `Raises:` blocks clearly.

```python
# ✅ Google-Style Docstring Example
async def calculate_streak(user_id: UUID, current_date: date) -> int:
    """Calculates consecutive active learning days for a user.

    Args:
        user_id: Unique UUID of the learner.
        current_date: The anchor date for streak evaluation.

    Returns:
        The total count of consecutive active days.

    Raises:
        UserNotFoundError: If the user ID does not exist in the database.
    """
```

### 4. Exception Handling
- **Never use bare `except:` clauses** or generic `except Exception: pass`.
- Always catch specific exception classes and handle or re-raise with contextual information.

```python
# ❌ INCORRECT
try:
    data = fetch_external_stats()
except:
    pass

# ✅ CORRECT
try:
    data = await fetch_external_stats()
except httpx.HTTPStatusError as exc:
    logger.error("Failed to fetch external stats", status_code=exc.response.status_code)
    raise ExternalIntegrationError(f"Upstream provider error: {exc}") from exc
```

### 5. Logging: `structlog` Only
- **Never use `print()` statements.**
- Use **`structlog`** exclusively for structured, contextual, key-value logging.

```python
# ❌ INCORRECT
print(f"User {user_id} registered with email {email}")

# ✅ CORRECT
import structlog

logger = structlog.get_logger(__name__)
logger.info("User registered successfully", user_id=str(user_id), email=email)
```

### 6. Asynchronous Database Operations
- All database interactions must use async sessions (`AsyncSession`) and asynchronous queries.
- Blocking calls inside async route handlers are prohibited.

```python
# ✅ CORRECT (Async SQLAlchemy 2.0)
async def get_by_id(self, user_id: UUID) -> Optional[UserModel]:
    stmt = select(UserModel).where(UserModel.id == user_id)
    result = await self.db_session.execute(stmt)
    return result.scalar_one_or_none()
```

### 7. Architectural Pattern: Repository Pattern
- Direct SQLAlchemy ORM session access or raw queries inside FastAPI routers is **strictly forbidden**.
- Controllers/Routers interact solely with **Domain Services**, which in turn use **Repositories**.

```
Router (HTTP / Validation) ➔ Domain Service (Business Logic) ➔ Repository (Data Persistence)
```

### 8. Pydantic v2 Configuration
- Use modern Pydantic v2 syntax: `model_config = SettingsConfigDict(...)` or `model_config = ConfigDict(...)`.
- Avoid deprecated Pydantic v1 `class Config: ...`.

```python
# ✅ CORRECT (Pydantic v2)
from pydantic import BaseModel, ConfigDict

class UserResponse(BaseModel):
    id: UUID
    email: str
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
```

---

## ⚡ TypeScript / Frontend Standards

The frontend is built with **Next.js 14+ (App Router)**, **React 18/19**, **TypeScript**, and **Tailwind CSS**.

### 1. Strict Typing
- Do not use the `any` type. If a type cannot be immediately deduced, use `unknown` with type guards, or define an explicit interface.
- Enable and abide by TypeScript strict mode (`"strict": true`).

```typescript
// ❌ INCORRECT
export function formatData(data: any) {
  return data.title;
}

// ✅ CORRECT
interface RoadmapNode {
  id: string;
  title: string;
  completed: boolean;
}

export function formatNodeTitle(node: RoadmapNode): string {
  return node.title.trim();
}
```

### 2. Export Conventions
- Prefer **named exports** over default exports for components, hooks, and utilities. This improves IDE auto-imports and refactoring reliability.

```typescript
// ❌ INCORRECT
export default function UserCard() { ... }

// ✅ CORRECT
export function UserCard({ user }: UserCardProps) { ... }
```

### 3. Custom Hooks for Data Fetching
- Do not make inline `fetch()` or `axios` calls directly inside UI components.
- Wrap all API interactions in custom React hooks (using SWR or TanStack Query).

```typescript
// ✅ CORRECT: Custom Hook Pattern
export function useRoadmap(userId: string) {
  return useSWR(`/api/v1/roadmaps/${userId}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
}
```

### 4. Component Props Interfaces
- Every component taking props must explicitly declare a TypeScript interface named `<ComponentName>Props`.

```typescript
// ✅ CORRECT
interface MetricCardProps {
  label: string;
  value: number | string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ label, value, trend, className }: MetricCardProps) {
  return ( ... );
}
```

### 5. Styling: Tailwind CSS Exclusively
- **No inline styles** (`style={{ margin: 10 }}`) or arbitrary external CSS files.
- Use utility classes via Tailwind CSS. Combine dynamic class names using `clsx` or `tailwind-merge` (`cn()` utility).

```tsx
// ❌ INCORRECT
<div style={{ backgroundColor: "#1e293b", padding: "16px" }}>

// ✅ CORRECT
<div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
```

### 6. Client vs. Server Components
- Default to **React Server Components (RSC)** in the Next.js App Router.
- Only mark components with `'use client'` when they require:
  - React state (`useState`, `useReducer`)
  - Effects or lifecycle (`useEffect`)
  - Event listeners (`onClick`, `onChange`)
  - Browser-only APIs (`localStorage`, `window`)
- Keep client boundaries as deep and small in the component tree as possible.

### 7. Resiliency & Error Boundaries
- Wrap complex interactive feature sections (such as AI Interview Studio, Code Sandbox, Roadmap Canvas) in React Error Boundaries to prevent full-page crashes.
