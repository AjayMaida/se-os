"""Configuration settings for SE-OS Notifications Service."""

from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration for notification event processing, email, and web push."""

    # Application & Environment
    APP_NAME: str = "SE-OS Notifications"
    APP_ENV: str = "development"
    LOG_LEVEL: str = "INFO"
    WEB_APP_URL: str = "http://localhost:3000"

    # Message Broker (RabbitMQ)
    RABBITMQ_URL: str = "amqp://guest:guest@localhost:5672/"
    NOTIFICATIONS_EXCHANGE: str = "notifications"
    NOTIFICATIONS_QUEUE: str = "notifications_queue"
    RABBITMQ_PREFETCH_COUNT: int = 10
    RABBITMQ_RECONNECT_INTERVAL: int = 5

    # Email Service (Resend)
    RESEND_API_KEY: str = ""
    RESEND_API_URL: str = "https://api.resend.com/emails"
    EMAIL_FROM: str = "noreply@se-os.app"
    EMAIL_FROM_NAME: str = "SE-OS"

    # Web Push Notifications (VAPID)
    VAPID_PUBLIC_KEY: Optional[str] = None
    VAPID_PRIVATE_KEY: Optional[str] = None
    VAPID_SUBJECT: str = "mailto:support@se-os.app"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
