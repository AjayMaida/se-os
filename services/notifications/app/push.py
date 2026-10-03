"""Web Push notification delivery service for SE-OS."""

import json
from typing import Any, Dict, Optional
import structlog

from app.config import settings

logger = structlog.get_logger(__name__)

try:
    from pywebpush import WebPushException, webpush
    HAS_PYWEBPUSH = True
except ImportError:
    HAS_PYWEBPUSH = False
    WebPushException = Exception  # type: ignore


class PushNotificationService:
    """Manages delivery of Web Push notifications via VAPID keys."""

    def __init__(
        self,
        vapid_private_key: Optional[str] = None,
        vapid_public_key: Optional[str] = None,
        vapid_subject: Optional[str] = None,
    ):
        self.vapid_private_key = vapid_private_key or settings.VAPID_PRIVATE_KEY
        self.vapid_public_key = vapid_public_key or settings.VAPID_PUBLIC_KEY
        self.vapid_subject = vapid_subject or settings.VAPID_SUBJECT

    def is_configured(self) -> bool:
        """Checks if VAPID keys are properly set."""
        if not self.vapid_private_key or self.vapid_private_key == "CHANGE_ME":
            return False
        return bool(self.vapid_public_key and self.vapid_public_key != "CHANGE_ME")

    async def send_push_notification(
        self,
        subscription_info: Dict[str, Any],
        title: str,
        body: str,
        url: Optional[str] = None,
        tag: Optional[str] = None,
        data: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Sends a web push notification to a browser push subscription."""
        payload = {
            "title": title,
            "body": body,
            "icon": "/icons/icon-192x192.png",
            "badge": "/icons/badge-72x72.png",
            "url": url or settings.WEB_APP_URL,
            "tag": tag or "se-os-notification",
            "data": data or {},
        }
        payload_json = json.dumps(payload)

        if not self.is_configured():
            logger.warning(
                "VAPID keys not configured; simulated push notification delivery",
                title=title,
                endpoint=subscription_info.get("endpoint", "")[:30] + "...",
            )
            return {
                "status": "simulated",
                "title": title,
                "body": body,
            }

        if not HAS_PYWEBPUSH:
            logger.error("pywebpush library is not installed")
            return {"status": "error", "message": "pywebpush not installed"}

        vapid_claims = {
            "sub": self.vapid_subject,
        }

        try:
            response = webpush(
                subscription_info=subscription_info,
                data=payload_json,
                vapid_private_key=self.vapid_private_key,
                vapid_claims=vapid_claims,
                ttl=3600,
            )
            logger.info(
                "Web push notification sent",
                title=title,
                status_code=response.status_code if hasattr(response, "status_code") else 200,
            )
            return {"status": "delivered", "title": title}
        except WebPushException as exc:
            logger.error(
                "Failed to send web push notification",
                error=str(exc),
                endpoint=subscription_info.get("endpoint"),
            )
            raise


push_service = PushNotificationService()
