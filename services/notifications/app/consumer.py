"""RabbitMQ consumer for SE-OS notification events."""

import asyncio
import json
from typing import Any, Dict, Optional
import aio_pika
from aio_pika.abc import AbstractIncomingMessage
import structlog

from app.config import settings
from app.email import email_service
from app.push import push_service

logger = structlog.get_logger(__name__)


class NotificationConsumer:
    """Consumes domain events from RabbitMQ and triggers email and push notifications."""

    def __init__(self):
        self.connection: Optional[aio_pika.RobustConnection] = None
        self.channel: Optional[aio_pika.RobustChannel] = None
        self.queue: Optional[aio_pika.RobustQueue] = None
        self.exchange: Optional[aio_pika.RobustExchange] = None
        self.running: bool = False

    async def connect(self) -> None:
        """Establishes robust connection with RabbitMQ and binds queues to the exchange."""
        logger.info("Connecting to RabbitMQ", url=settings.RABBITMQ_URL.split("@")[-1])
        self.connection = await aio_pika.connect_robust(settings.RABBITMQ_URL)
        self.channel = await self.connection.channel()
        await self.channel.set_qos(prefetch_count=settings.RABBITMQ_PREFETCH_COUNT)

        # Declare topic exchange for notifications
        self.exchange = await self.channel.declare_exchange(
            name=settings.NOTIFICATIONS_EXCHANGE,
            type=aio_pika.ExchangeType.TOPIC,
            durable=True,
        )

        # Declare durable queue
        self.queue = await self.channel.declare_queue(
            name=settings.NOTIFICATIONS_QUEUE,
            durable=True,
        )

        # Routing keys to listen for (supporting both snake_case and PascalCase domain events)
        routing_keys = [
            "#",  # Catch-all on topic exchange
            "daily_plan_ready",
            "DailyPlanGenerated",
            "DailyPlanReady",
            "milestone_completed",
            "MilestoneCompleted",
            "user_registered",
            "UserRegistered",
            "streak_at_risk",
            "StreakAtRisk",
        ]

        for routing_key in routing_keys:
            await self.queue.bind(self.exchange, routing_key=routing_key)

        logger.info(
            "RabbitMQ connection established and queue bound",
            exchange=settings.NOTIFICATIONS_EXCHANGE,
            queue=settings.NOTIFICATIONS_QUEUE,
        )

    async def handle_user_registered(self, payload: Dict[str, Any]) -> None:
        """Sends welcome email and optional push notification when a user registers."""
        user_email = payload.get("email")
        if not user_email:
            logger.warning("user_registered event missing email", payload=payload)
            return

        name = payload.get("name") or payload.get("first_name", "Engineer")
        dashboard_url = payload.get("dashboard_url") or f"{settings.WEB_APP_URL}/dashboard"

        html_body = email_service.render_template(
            "welcome.html",
            {"name": name, "dashboard_url": dashboard_url},
        )
        await email_service.send_email(
            to=user_email,
            subject="Welcome to SE-OS — Your AI Career Operating System",
            html_content=html_body,
        )

        # Send push notification if subscription present
        push_sub = payload.get("push_subscription")
        if push_sub:
            await push_service.send_push_notification(
                subscription_info=push_sub,
                title="Welcome to SE-OS!",
                body=f"Welcome aboard, {name}. Your career roadmap awaits.",
                url=dashboard_url,
            )

    async def handle_daily_plan_ready(self, payload: Dict[str, Any]) -> None:
        """Sends daily reminder email and push notification when a daily action plan is ready."""
        user_email = payload.get("email")
        if not user_email:
            logger.warning("daily_plan_ready event missing email", payload=payload)
            return

        name = payload.get("name", "there")
        date_str = payload.get("date", "Today")
        tasks = payload.get("tasks", [])
        streak_count = payload.get("streak_count", 0)
        plan_url = payload.get("plan_url") or f"{settings.WEB_APP_URL}/dashboard/daily"

        html_body = email_service.render_template(
            "daily_reminder.html",
            {
                "name": name,
                "date": date_str,
                "tasks": tasks,
                "streak_count": streak_count,
                "plan_url": plan_url,
            },
        )
        await email_service.send_email(
            to=user_email,
            subject=f"SE-OS: Your Daily Plan for {date_str} is Ready ⚡",
            html_content=html_body,
        )

        push_sub = payload.get("push_subscription")
        if push_sub:
            task_preview = f"{len(tasks)} tasks queued" if tasks else "Focus areas ready"
            await push_service.send_push_notification(
                subscription_info=push_sub,
                title="Today's Plan is Ready",
                body=f"Good morning, {name}. {task_preview} for today.",
                url=plan_url,
            )

    async def handle_milestone_completed(self, payload: Dict[str, Any]) -> None:
        """Sends congratulations email and push notification when a milestone is completed."""
        user_email = payload.get("email")
        if not user_email:
            logger.warning("milestone_completed event missing email", payload=payload)
            return

        name = payload.get("name", "Engineer")
        milestone_title = payload.get("milestone_title") or payload.get("title", "Milestone Completed")
        roadmap_title = payload.get("roadmap_title", "")
        completion_percentage = payload.get("completion_percentage")
        next_step = payload.get("next_step")
        roadmap_url = payload.get("roadmap_url") or f"{settings.WEB_APP_URL}/dashboard/roadmap"

        html_body = email_service.render_template(
            "milestone.html",
            {
                "name": name,
                "milestone_title": milestone_title,
                "roadmap_title": roadmap_title,
                "completion_percentage": completion_percentage,
                "next_step": next_step,
                "roadmap_url": roadmap_url,
            },
        )
        await email_service.send_email(
            to=user_email,
            subject=f"🏆 Milestone Unlocked: {milestone_title}",
            html_content=html_body,
        )

        push_sub = payload.get("push_subscription")
        if push_sub:
            await push_service.send_push_notification(
                subscription_info=push_sub,
                title="Milestone Completed! 🏆",
                body=f"Awesome work! You completed '{milestone_title}'.",
                url=roadmap_url,
            )

    async def handle_streak_at_risk(self, payload: Dict[str, Any]) -> None:
        """Sends reminder notification when a user's streak is at risk of expiring."""
        user_email = payload.get("email")
        if not user_email:
            logger.warning("streak_at_risk event missing email", payload=payload)
            return

        name = payload.get("name", "there")
        current_streak = payload.get("current_streak", 1)
        hours_remaining = payload.get("hours_remaining", 4)
        action_url = payload.get("action_url") or f"{settings.WEB_APP_URL}/dashboard/daily"

        html_body = email_service.render_template(
            "streak_at_risk.html",
            {
                "name": name,
                "current_streak": current_streak,
                "hours_remaining": hours_remaining,
                "action_url": action_url,
            },
        )
        await email_service.send_email(
            to=user_email,
            subject=f"🔥 Keep your {current_streak}-day streak alive!",
            html_content=html_body,
        )

        push_sub = payload.get("push_subscription")
        if push_sub:
            await push_service.send_push_notification(
                subscription_info=push_sub,
                title="Don't lose your streak! 🔥",
                body=f"{hours_remaining}h left to extend your {current_streak}-day streak.",
                url=action_url,
            )

    async def dispatch_event(self, event_type: str, payload: Dict[str, Any]) -> None:
        """Routes the event to its corresponding notification handler."""
        normalized = event_type.lower().replace("-", "_")

        if normalized in ("daily_plan_ready", "dailyplangenerated", "daily_plan_generated"):
            await self.handle_daily_plan_ready(payload)
        elif normalized in ("milestone_completed", "milestonecompleted"):
            await self.handle_milestone_completed(payload)
        elif normalized in ("user_registered", "userregistered"):
            await self.handle_user_registered(payload)
        elif normalized in ("streak_at_risk", "streakatrisk"):
            await self.handle_streak_at_risk(payload)
        else:
            logger.debug("Unhandled event type; skipping notification", event_type=event_type)

    async def on_message(self, message: AbstractIncomingMessage) -> None:
        """Callback invoked when a message arrives from RabbitMQ."""
        async with message.process(requeue=False):
            try:
                body_str = message.body.decode()
                data = json.loads(body_str)
                event_type = data.get("event_type") or message.routing_key
                payload = data.get("payload", {})
                
                # If message body is a flat dictionary without nested payload, use data directly
                if not payload and isinstance(data, dict):
                    payload = data

                logger.info(
                    "Processing notification event",
                    event_type=event_type,
                    event_id=data.get("event_id"),
                )

                await self.dispatch_event(event_type, payload)

            except json.JSONDecodeError as exc:
                logger.error("Failed to decode JSON message", error=str(exc), body=message.body[:100])
            except Exception as exc:
                logger.exception("Error processing notification event", error=str(exc))

    async def start(self) -> None:
        """Starts consuming messages from RabbitMQ."""
        self.running = True
        while self.running:
            try:
                await self.connect()
                logger.info("Notifications consumer waiting for messages...")
                await self.queue.consume(self.on_message)
                
                # Keep running until cancelled
                while self.running and not self.connection.is_closed:
                    await asyncio.sleep(1)

            except asyncio.CancelledError:
                logger.info("Notification consumer task cancelled")
                break
            except Exception as exc:
                logger.warning(
                    "RabbitMQ connection lost, retrying in 5s...",
                    error=str(exc),
                )
                await asyncio.sleep(settings.RABBITMQ_RECONNECT_INTERVAL)
            finally:
                await self.close()

    async def close(self) -> None:
        """Closes channel and connection cleanly."""
        try:
            if self.channel and not self.channel.is_closed:
                await self.channel.close()
            if self.connection and not self.connection.is_closed:
                await self.connection.close()
        except Exception as exc:
            logger.debug("Error during consumer shutdown", error=str(exc))


consumer = NotificationConsumer()
