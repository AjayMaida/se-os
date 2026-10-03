"""GitHub API Client for SE-OS."""

from datetime import datetime, timezone, timedelta
from typing import Any, Dict, List, Optional
import httpx
import structlog

logger = structlog.get_logger(__name__)


class GitHubIntegrationError(Exception):
    """Base exception for GitHub integration errors."""

    def __init__(self, message: str, status_code: Optional[int] = None, details: Optional[Any] = None):
        super().__init__(message)
        self.status_code = status_code
        self.details = details


class GitHubAuthError(GitHubIntegrationError):
    """Raised when GitHub authentication fails."""
    pass


class GitHubRateLimitError(GitHubIntegrationError):
    """Raised when GitHub API rate limits are exceeded."""
    pass


class GitHubNotFoundError(GitHubIntegrationError):
    """Raised when a GitHub resource or user is not found."""
    pass


class GitHubClient:
    """Async client for interacting with the GitHub REST and GraphQL APIs."""

    BASE_URL: str = "https://api.github.com"
    GRAPHQL_URL: str = "https://api.github.com/graphql"

    def __init__(self, timeout: float = 15.0):
        self.timeout = timeout

    def _get_headers(self, access_token: Optional[str] = None) -> Dict[str, str]:
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "SE-OS-Platform/0.1.0",
        }
        if access_token:
            headers["Authorization"] = f"Bearer {access_token}"
        return headers

    def _handle_response_status(self, response: httpx.Response) -> None:
        """Translates HTTP error responses into specific exceptions."""
        if response.is_success:
            return

        status_code = response.status_code
        try:
            error_payload = response.json()
            message = error_payload.get("message", response.text)
        except Exception:
            error_payload = None
            message = response.text

        if status_code in (401, 403) and "Bad credentials" in message:
            raise GitHubAuthError(f"GitHub authentication failed: {message}", status_code, error_payload)
        elif status_code == 403 and (
            "rate limit" in message.lower()
            or response.headers.get("x-ratelimit-remaining") == "0"
        ):
            raise GitHubRateLimitError(f"GitHub rate limit exceeded: {message}", status_code, error_payload)
        elif status_code == 404:
            raise GitHubNotFoundError(f"GitHub resource not found: {message}", status_code, error_payload)
        else:
            raise GitHubIntegrationError(
                f"GitHub API error (HTTP {status_code}): {message}",
                status_code,
                error_payload,
            )

    async def get_user_profile(self, access_token: str) -> Dict[str, Any]:
        """Fetches the authenticated user's GitHub profile.

        Args:
            access_token: GitHub OAuth access token.

        Returns:
            Dict containing user profile data.
        """
        url = f"{self.BASE_URL}/user"
        headers = self._get_headers(access_token)

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(url, headers=headers)
                self._handle_response_status(response)
                data = response.json()
                logger.info("Fetched GitHub user profile", username=data.get("login"))
                return {
                    "id": data.get("id"),
                    "login": data.get("login"),
                    "name": data.get("name"),
                    "email": data.get("email"),
                    "avatar_url": data.get("avatar_url"),
                    "bio": data.get("bio"),
                    "company": data.get("company"),
                    "location": data.get("location"),
                    "blog": data.get("blog"),
                    "public_repos": data.get("public_repos", 0),
                    "public_gists": data.get("public_gists", 0),
                    "followers": data.get("followers", 0),
                    "following": data.get("following", 0),
                    "created_at": data.get("created_at"),
                    "updated_at": data.get("updated_at"),
                }
            except httpx.RequestError as exc:
                logger.error("Network error while fetching GitHub user profile", error=str(exc))
                raise GitHubIntegrationError(f"Network error connecting to GitHub: {exc}")

    async def get_repos(
        self,
        access_token: str,
        per_page: int = 100,
        sort: str = "updated",
    ) -> List[Dict[str, Any]]:
        """Fetches repositories belonging to the authenticated user.

        Args:
            access_token: GitHub OAuth access token.
            per_page: Number of repositories to fetch (max 100).
            sort: Sort order ('created', 'updated', 'pushed', 'full_name').

        Returns:
            List of repository details.
        """
        url = f"{self.BASE_URL}/user/repos"
        headers = self._get_headers(access_token)
        params = {
            "per_page": min(per_page, 100),
            "sort": sort,
            "visibility": "all",
            "affiliation": "owner,collaborator",
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(url, headers=headers, params=params)
                self._handle_response_status(response)
                raw_repos = response.json()
                logger.info("Fetched GitHub repositories", count=len(raw_repos))
                return [
                    {
                        "id": repo.get("id"),
                        "name": repo.get("name"),
                        "full_name": repo.get("full_name"),
                        "private": repo.get("private", False),
                        "html_url": repo.get("html_url"),
                        "description": repo.get("description"),
                        "fork": repo.get("fork", False),
                        "language": repo.get("language"),
                        "stargazers_count": repo.get("stargazers_count", 0),
                        "watchers_count": repo.get("watchers_count", 0),
                        "forks_count": repo.get("forks_count", 0),
                        "open_issues_count": repo.get("open_issues_count", 0),
                        "topics": repo.get("topics", []),
                        "created_at": repo.get("created_at"),
                        "updated_at": repo.get("updated_at"),
                        "pushed_at": repo.get("pushed_at"),
                    }
                    for repo in raw_repos
                ]
            except httpx.RequestError as exc:
                logger.error("Network error while fetching GitHub repos", error=str(exc))
                raise GitHubIntegrationError(f"Network error connecting to GitHub: {exc}")

    async def get_contribution_stats(self, username: str, access_token: str) -> Dict[str, Any]:
        """Fetches commit and contribution collection stats via GitHub GraphQL API.

        Args:
            username: GitHub username.
            access_token: GitHub OAuth access token.

        Returns:
            Dict containing contribution counts and summary.
        """
        query = """
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              totalCommitContributions
              totalIssueContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              restrictedContributionsCount
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
        """
        headers = self._get_headers(access_token)

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.post(
                    self.GRAPHQL_URL,
                    headers=headers,
                    json={"query": query, "variables": {"login": username}},
                )
                self._handle_response_status(response)
                result = response.json()

                if "errors" in result:
                    error_msg = result["errors"][0].get("message", "GraphQL query error")
                    logger.error("GitHub GraphQL query returned errors", errors=result["errors"])
                    raise GitHubIntegrationError(f"GitHub GraphQL error: {error_msg}")

                user_data = result.get("data", {}).get("user")
                if not user_data:
                    raise GitHubNotFoundError(f"User '{username}' not found in GitHub GraphQL")

                collection = user_data.get("contributionsCollection", {})
                calendar = collection.get("contributionCalendar", {})

                # Calculate current active streak from calendar days
                all_days = [
                    day
                    for week in calendar.get("weeks", [])
                    for day in week.get("contributionDays", [])
                ]
                
                streak = 0
                for day in reversed(all_days):
                    if day.get("contributionCount", 0) > 0:
                        streak += 1
                    elif streak > 0:
                        # streak broken
                        break

                stats = {
                    "username": username,
                    "total_contributions": calendar.get("totalContributions", 0),
                    "commit_contributions": collection.get("totalCommitContributions", 0),
                    "issue_contributions": collection.get("totalIssueContributions", 0),
                    "pull_request_contributions": collection.get("totalPullRequestContributions", 0),
                    "pull_request_review_contributions": collection.get("totalPullRequestReviewContributions", 0),
                    "current_streak_days": streak,
                    "recent_activity_days": len([d for d in all_days if d.get("contributionCount", 0) > 0]),
                }
                logger.info("Fetched GitHub contribution stats", username=username, total=stats["total_contributions"])
                return stats

            except httpx.RequestError as exc:
                logger.error("Network error while querying GitHub GraphQL", error=str(exc))
                raise GitHubIntegrationError(f"Network error connecting to GitHub: {exc}")

    async def get_recent_commits(
        self,
        username: str,
        days: int = 30,
        access_token: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        """Fetches commits made by the user within the last N days via Public Events API.

        Args:
            username: GitHub username.
            days: Lookback window in days (default 30).
            access_token: Optional OAuth token for authenticated rate limits.

        Returns:
            List of recent commit details.
        """
        url = f"{self.BASE_URL}/users/{username}/events"
        headers = self._get_headers(access_token)
        since_date = datetime.now(timezone.utc) - timedelta(days=days)

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.get(url, headers=headers, params={"per_page": 100})
                self._handle_response_status(response)
                events = response.json()

                recent_commits: List[Dict[str, Any]] = []
                for event in events:
                    if event.get("type") != "PushEvent":
                        continue

                    created_str = event.get("created_at")
                    if not created_str:
                        continue

                    created_at = datetime.fromisoformat(created_str.replace("Z", "+00:00"))
                    if created_at < since_date:
                        continue

                    repo_name = event.get("repo", {}).get("name", "")
                    payload = event.get("payload", {})
                    commits = payload.get("commits", [])

                    for commit in commits:
                        recent_commits.append({
                            "sha": commit.get("sha"),
                            "message": commit.get("message"),
                            "author_name": commit.get("author", {}).get("name"),
                            "repo_name": repo_name,
                            "timestamp": created_str,
                            "url": commit.get("url"),
                        })

                logger.info(
                    "Fetched recent GitHub commits",
                    username=username,
                    count=len(recent_commits),
                    days=days,
                )
                return recent_commits

            except httpx.RequestError as exc:
                logger.error("Network error while fetching recent commits", error=str(exc))
                raise GitHubIntegrationError(f"Network error connecting to GitHub: {exc}")
