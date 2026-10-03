"""Main entry point for SE-OS Notifications Worker Service."""

import asyncio
import logging
import signal
import sys
import structlog

from app.config import settings
from app.consumer import consumer


def configure_logging() -> None:
    """Configures structured JSON/console logging for the service."""
    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=log_level,
    )
    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.JSONRenderer() if settings.APP_ENV == "production" else structlog.dev.ConsoleRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(log_level),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=True,
    )


async def main() -> None:
    """Runs the notifications consumer service event loop."""
    configure_logging()
    logger = structlog.get_logger(__name__)
    logger.info(
        "Starting SE-OS Notifications Service",
        env=settings.APP_ENV,
        rabbitmq_url=settings.RABBITMQ_URL.split("@")[-1],
    )

    loop = asyncio.get_running_loop()
    stop_event = asyncio.Event()

    def handle_exit_signal(sig):
        logger.info(f"Received exit signal {sig.name}, shutting down gracefully...")
        consumer.running = False
        stop_event.set()

    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            loop.add_signal_handler(sig, handle_exit_signal, sig)
        except NotImplementedError:
            # Signal handlers not implemented on some non-Unix platforms
            pass

    consumer_task = asyncio.create_task(consumer.start())

    try:
        await stop_event.wait()
    except asyncio.CancelledError:
        pass
    finally:
        consumer.running = False
        consumer_task.cancel()
        await consumer.close()
        logger.info("Notifications service shutdown complete")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        pass
