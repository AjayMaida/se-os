"""Unit tests for notifications service."""

import pytest
from app.config import settings
from app.email import EmailService
from app.consumer import NotificationConsumer


def test_settings_initialization():
    assert settings.APP_NAME == "SE-OS Notifications"
    assert settings.NOTIFICATIONS_EXCHANGE == "notifications"
    assert settings.NOTIFICATIONS_QUEUE == "notifications_queue"


def test_render_welcome_template():
    service = EmailService()
    html = service.render_template("welcome.html", {"name": "Alice", "dashboard_url": "http://localhost:3000/dashboard"})
    assert "Welcome to SE-OS" in html
    assert "Alice" in html
    assert "Launch Your Dashboard" in html


def test_render_daily_reminder_template():
    service = EmailService()
    html = service.render_template(
        "daily_reminder.html",
        {
            "name": "Bob",
            "date": "2026-10-04",
            "streak_count": 5,
            "tasks": ["Solve 2 LeetCode problems", "Review System Design Chapter 3"],
            "plan_url": "http://localhost:3000/dashboard/daily",
        },
    )
    assert "Your Plan for Today is Ready" in html
    assert "Bob" in html
    assert "5-Day Streak Active" in html
    assert "Solve 2 LeetCode problems" in html


def test_render_milestone_template():
    service = EmailService()
    html = service.render_template(
        "milestone.html",
        {
            "name": "Charlie",
            "milestone_title": "Distributed Systems Mastery",
            "roadmap_title": "Senior Backend Track",
            "completion_percentage": 50,
            "next_step": "Build a Raft consensus engine",
            "roadmap_url": "http://localhost:3000/dashboard/roadmap",
        },
    )
    assert "MILESTONE UNLOCKED" in html
    assert "Distributed Systems Mastery" in html
    assert "50% of your target roadmap completed" in html


def test_render_streak_at_risk_template():
    service = EmailService()
    html = service.render_template(
        "streak_at_risk.html",
        {
            "name": "Dana",
            "current_streak": 7,
            "hours_remaining": 3,
            "action_url": "http://localhost:3000/dashboard/daily",
        },
    )
    assert "STREAK ALERT" in html
    assert "7-Day Streak" in html
    assert "3 hours remaining" in html


@pytest.mark.asyncio
async def test_email_service_send_mock(monkeypatch):
    service = EmailService(api_key="re_CHANGE_ME")
    res = await service.send_email(
        to="test@example.com",
        subject="Test Subject",
        html_content="<p>Test</p>",
    )
    assert res["status"] == "simulated"
    assert res["subject"] == "Test Subject"
