# Contributing to SE-OS

Thank you for your interest in contributing to SE-OS! This document explains the development workflow, branching strategy, commit conventions, and code review process.

---

## Table of Contents

- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Code Review Standards](#code-review-standards)
- [Issue Labels](#issue-labels)

---

## Development Workflow

SE-OS follows a **GitHub Flow** adapted for a feature-driven development model.

### Branch Hierarchy

```
main          ← Production-ready, stable releases only
  └── develop ← Integration branch, all features merge here
        └── build ← Active development integration
              └── feat/issue-N-feature-name ← Individual feature branches
```

### Step-by-Step

1. **Pick an issue** from the GitHub Issues board
2. **Create a branch** from `build` using the naming convention below
3. **Implement the feature** with proper commits
4. **Open a PR** targeting `build`
5. **Request review** — at least 1 approval required
6. **Merge** using Squash and Merge for clean history
7. **Delete the feature branch** after merge

---

## Branch Naming Convention

```
<type>/issue-<number>-<short-description>
```

### Types

| Type | When to use |
|---|---|
| `feat/` | New feature or enhancement |
| `fix/` | Bug fix |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring, no behavior change |
| `test/` | Adding or fixing tests |
| `chore/` | Build, CI, config changes |
| `hotfix/` | Critical production fix |

### Examples

```bash
feat/issue-5-ai-roadmap-generator
fix/issue-12-auth-token-refresh
docs/issue-8-api-specification
refactor/issue-15-user-service-cleanup
```

---

## Commit Message Convention

SE-OS uses [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer: Closes #issue-number]
```

### Types

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring |
| `test` | Tests |
| `chore` | Build tools, dependencies |
| `perf` | Performance improvement |
| `ci` | CI/CD changes |

### Scopes

| Scope | Area |
|---|---|
| `api` | FastAPI backend |
| `web` | Next.js frontend |
| `ai` | AI Platform |
| `auth` | Authentication |
| `roadmap` | Roadmap feature |
| `planner` | Daily planner |
| `mentor` | AI mentor chat |
| `studio` | Interview Studio |
| `integrations` | External integrations |
| `infra` | Docker, CI/CD, infrastructure |
| `db` | Database models, migrations |

### Examples

```
feat(auth): add Google OAuth login flow

Implement OAuth2 flow with Google provider using NextAuth.js on
the frontend and JWT validation on the FastAPI backend.

Closes #3
```

```
fix(roadmap): handle empty skill list in generator

When a user skips the skill selection step, the roadmap generator
was throwing a KeyError. Added null-safe default handling.

Closes #17
```

```
chore(infra): add Docker health checks to all services
```

---

## Pull Request Process

### PR Title Format

Same as commit message format:
```
feat(scope): short description (#issue-number)
```

### PR Description Template

Every PR must include:

```markdown
## What does this PR do?
[Clear description of the change]

## Why is this needed?
[Context, motivation, problem being solved]

## How was it tested?
[What you tested and how]

## Checklist
- [ ] Tests pass locally (`docker compose run api pytest`)
- [ ] New tests added for new functionality
- [ ] Documentation updated if needed
- [ ] No secrets or credentials in the code
- [ ] Follows coding standards

## Related Issues
Closes #<issue-number>
```

### PR Rules

- Target branch: `build` (not `develop` or `main`)
- Minimum 1 approval required
- All CI checks must pass
- No merge conflicts
- Branch must be up to date with `build`

---

## Code Review Standards

### As an Author

- Keep PRs small and focused (< 400 lines of change where possible)
- Write a clear PR description
- Respond to review comments within 48 hours
- Do not force-push to a PR under review

### As a Reviewer

- Review within 24 hours when assigned
- Be constructive and specific
- Distinguish between blocking and non-blocking comments
  - `[BLOCKING]` — must be fixed before merge
  - `[SUGGESTION]` — optional improvement
  - `[QUESTION]` — clarification needed, not blocking
- Approve only when you're genuinely satisfied

---

## Issue Labels

| Label | Meaning |
|---|---|
| `feature` | New feature request |
| `bug` | Something isn't working |
| `enhancement` | Improvement to existing feature |
| `docs` | Documentation |
| `infra` | Infrastructure, DevOps |
| `ai` | AI / LLM related |
| `backend` | FastAPI, database |
| `frontend` | Next.js, UI |
| `priority: high` | Must be in next sprint |
| `priority: medium` | Should be in next sprint |
| `priority: low` | Nice to have |
| `good first issue` | Good for new contributors |

---

## Getting Help

- Open a discussion on GitHub Discussions
- Tag an issue with `question`
- Reach out to the maintainers via the issue tracker
