"""Unit tests for GitHub and LeetCode integration clients."""

import pytest
import httpx
from app.github import GitHubClient, GitHubAuthError, GitHubNotFoundError
from app.leetcode import LeetCodeClient, LeetCodeUserNotFoundError


@pytest.mark.asyncio
async def test_github_get_user_profile(monkeypatch):
    client = GitHubClient()

    async def mock_get(self, url, headers=None, params=None):
        request = httpx.Request("GET", url)
        return httpx.Response(
            200,
            json={
                "id": 12345,
                "login": "octocat",
                "name": "The Octocat",
                "email": "octocat@github.com",
                "public_repos": 8,
                "followers": 20,
                "following": 0,
            },
            request=request,
        )

    monkeypatch.setattr(httpx.AsyncClient, "get", mock_get)

    profile = await client.get_user_profile("mock-token")
    assert profile["login"] == "octocat"
    assert profile["public_repos"] == 8


@pytest.mark.asyncio
async def test_github_auth_error(monkeypatch):
    client = GitHubClient()

    async def mock_get(self, url, headers=None, params=None):
        request = httpx.Request("GET", url)
        return httpx.Response(
            401,
            json={"message": "Bad credentials"},
            request=request,
        )

    monkeypatch.setattr(httpx.AsyncClient, "get", mock_get)

    with pytest.raises(GitHubAuthError):
        await client.get_user_profile("bad-token")


@pytest.mark.asyncio
async def test_leetcode_get_user_stats(monkeypatch):
    client = LeetCodeClient()

    async def mock_post(self, url, headers=None, json=None):
        request = httpx.Request("POST", url)
        mock_data = {
            "data": {
                "matchedUser": {
                    "username": "tourist",
                    "profile": {"ranking": 42, "reputation": 100},
                    "submitStatsGlobal": {
                        "acSubmissionNum": [
                            {"difficulty": "All", "count": 450, "submissions": 800},
                            {"difficulty": "Easy", "count": 150, "submissions": 200},
                            {"difficulty": "Medium", "count": 200, "submissions": 400},
                            {"difficulty": "Hard", "count": 100, "submissions": 200},
                        ]
                    },
                    "userCalendar": {"streak": 14, "totalActiveDays": 90},
                }
            }
        }
        return httpx.Response(200, json=mock_data, request=request)

    monkeypatch.setattr(httpx.AsyncClient, "post", mock_post)

    stats = await client.get_user_stats("tourist")
    assert stats["username"] == "tourist"
    assert stats["total_solved"] == 450
    assert stats["easy_solved"] == 150
    assert stats["medium_solved"] == 200
    assert stats["hard_solved"] == 100
    assert stats["streak"] == 14


@pytest.mark.asyncio
async def test_leetcode_user_not_found(monkeypatch):
    client = LeetCodeClient()

    async def mock_post(self, url, headers=None, json=None):
        request = httpx.Request("POST", url)
        mock_data = {"data": {"matchedUser": None}}
        return httpx.Response(200, json=mock_data, request=request)

    monkeypatch.setattr(httpx.AsyncClient, "post", mock_post)

    with pytest.raises(LeetCodeUserNotFoundError):
        await client.get_user_stats("nonexistent_user_123")
