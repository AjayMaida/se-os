"""Resend API email client and template rendering for SE-OS."""

from pathlib import Path
from typing import Any, Dict, List, Optional, Union
import httpx
from jinja2 import Environment, FileSystemLoader, select_autoescape
import structlog

from app.config import settings

logger = structlog.get_logger(__name__)

# Template engine setup
TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"
jinja_env = Environment(
    loader=FileSystemLoader(str(TEMPLATES_DIR)),
    autoescape=select_autoescape(["html", "xml"]),
)


class EmailService:
    """Handles email rendering and delivery via Resend API."""

    def __init__(self, api_key: Optional[str] = None, api_url: Optional[str] = None):
        self.api_key = api_key or settings.RESEND_API_KEY
        self.api_url = api_url or settings.RESEND_API_URL
        self.sender = f"{settings.EMAIL_FROM_NAME} <{settings.EMAIL_FROM}>"

    def render_template(self, template_name: str, context: Dict[str, Any]) -> str:
        """Renders an HTML email template with given variables."""
        template = jinja_env.get_template(template_name)
        return template.render(**context)

    async def send_email(
        self,
        to: Union[str, List[str]],
        subject: str,
        html_content: str,
        text_content: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Dispatches an email via Resend API using httpx."""
        recipients = [to] if isinstance(to, str) else to

        if not self.api_key or self.api_key.startswith("re_CHANGE_ME") or self.api_key == "change_me":
            logger.warning(
                "Resend API key is not configured; skipping actual HTTP call in development mode",
                to=recipients,
                subject=subject,
            )
            return {
                "id": "mock-email-id-dev",
                "status": "simulated",
                "to": recipients,
                "subject": subject,
            }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": "SE-OS-Notifications/0.1.0",
        }

        payload: Dict[str, Any] = {
            "from": self.sender,
            "to": recipients,
            "subject": subject,
            "html": html_content,
        }
        if text_content:
            payload["text"] = text_content

        async with httpx.AsyncClient(timeout=15.0) as client:
            try:
                response = await client.post(self.api_url, headers=headers, json=payload)
                response.raise_for_status()
                data = response.json()
                logger.info(
                    "Email sent successfully",
                    email_id=data.get("id"),
                    to=recipients,
                    subject=subject,
                )
                return data
            except httpx.HTTPStatusError as exc:
                logger.error(
                    "Resend API error",
                    status_code=exc.response.status_code,
                    response_text=exc.response.text,
                    to=recipients,
                    subject=subject,
                )
                raise
            except httpx.RequestError as exc:
                logger.error(
                    "Network error connecting to Resend API",
                    error=str(exc),
                    to=recipients,
                    subject=subject,
                )
                raise


email_service = EmailService()
