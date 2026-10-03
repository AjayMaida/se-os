"""LeetCode GraphQL API Client for SE-OS."""

from typing import Any, Dict, List, Optional
import httpx
import structlog

logger = structlog.get_logger(__name__)


class LeetCodeError(Exception):
    """Base exception for LeetCode integration errors."""

    def __init__(self, message: str, status_code: Optional[int] = None, details: Optional[Any] = None):
        super().__init__(message)
        self.status_code = status_code
        self.details = details


class LeetCodeUserNotFoundError(LeetCodeError):
    """Raised when a specified LeetCode user profile does not exist."""
    pass


class LeetCodeClient:
    """Async client for querying LeetCode's GraphQL API."""

    GRAPHQL_URL: str = "https://leetcode.com/graphql"

    def __init__(self, timeout: float = 15.0):
        self.timeout = timeout
        self.headers = {
            "Content-Type": "application/json",
            "Referer": "https://leetcode.com",
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0.0.0 Safari/537.36 SE-OS/0.1.0"
            ),
        }

    async def _post_graphql(self, query: str, variables: Dict[str, Any]) -> Dict[str, Any]:
        """Executes a GraphQL POST request to LeetCode."""
        payload = {"query": query, "variables": variables}

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.post(self.GRAPHQL_URL, headers=self.headers, json=payload)
                if response.status_code != 200:
                    raise LeetCodeError(
                        f"LeetCode GraphQL query failed with HTTP {response.status_code}: {response.text}",
                        status_code=response.status_code,
                    )
                data = response.json()

                if "errors" in data and data["errors"]:
                    error_msg = data["errors"][0].get("message", "Unknown GraphQL error")
                    logger.warning("LeetCode GraphQL error returned", error=error_msg)
                    raise LeetCodeError(f"LeetCode error: {error_msg}", details=data["errors"])

                return data.get("data", {})

            except httpx.RequestError as exc:
                logger.error("Network error connecting to LeetCode", error=str(exc))
                raise LeetCodeError(f"Network error connecting to LeetCode: {exc}")

    async def get_user_stats(self, username: str) -> Dict[str, Any]:
        """Fetches problem submission counts and activity calendar for a LeetCode user.

        Args:
            username: LeetCode profile handle.

        Returns:
            Dict containing easy/medium/hard solved counts, total, ranking, and streak.
        """
        query = """
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
              starRating
            }
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            userCalendar {
              streak
              totalActiveDays
            }
          }
        }
        """
        data = await self._post_graphql(query, {"username": username})
        matched_user = data.get("matchedUser")

        if not matched_user:
            logger.warning("LeetCode user not found", username=username)
            raise LeetCodeUserNotFoundError(f"LeetCode user '{username}' was not found")

        # Extract submit stats
        submit_stats = matched_user.get("submitStatsGlobal", {}).get("acSubmissionNum", [])
        counts: Dict[str, int] = {
            "All": 0,
            "Easy": 0,
            "Medium": 0,
            "Hard": 0,
        }
        submissions_dict: Dict[str, int] = {}

        for item in submit_stats:
            diff = item.get("difficulty")
            cnt = item.get("count", 0)
            subs = item.get("submissions", 0)
            if diff in counts:
                counts[diff] = cnt
                submissions_dict[diff.lower()] = subs

        # Extract calendar and profile
        calendar = matched_user.get("userCalendar") or {}
        profile = matched_user.get("profile") or {}

        result = {
            "username": username,
            "ranking": profile.get("ranking"),
            "reputation": profile.get("reputation", 0),
            "total_solved": counts.get("All", 0),
            "easy_solved": counts.get("Easy", 0),
            "medium_solved": counts.get("Medium", 0),
            "hard_solved": counts.get("Hard", 0),
            "streak": calendar.get("streak", 0),
            "total_active_days": calendar.get("totalActiveDays", 0),
            "submissions": submissions_dict,
        }

        logger.info(
            "Fetched LeetCode user stats",
            username=username,
            total_solved=result["total_solved"],
            streak=result["streak"],
        )
        return result

    async def get_recent_submissions(self, username: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Fetches the user's recent problem submissions.

        Args:
            username: LeetCode profile handle.
            limit: Maximum number of submissions to return (default 20).

        Returns:
            List of recent submissions with status and problem names.
        """
        query = """
        query getRecentSubmissions($username: String!, $limit: Int!) {
          recentSubmissionList(username: $username, limit: $limit) {
            title
            titleSlug
            timestamp
            statusDisplay
            lang
          }
        }
        """
        data = await self._post_graphql(query, {"username": username, "limit": limit})
        submissions = data.get("recentSubmissionList") or []

        formatted: List[Dict[str, Any]] = [
            {
                "title": sub.get("title"),
                "title_slug": sub.get("titleSlug"),
                "timestamp": sub.get("timestamp"),
                "status_display": sub.get("statusDisplay"),
                "language": sub.get("lang"),
                "problem_url": f"https://leetcode.com/problems/{sub.get('titleSlug')}/" if sub.get("titleSlug") else None,
            }
            for sub in submissions
        ]

        logger.info(
            "Fetched recent LeetCode submissions",
            username=username,
            count=len(formatted),
        )
        return formatted
