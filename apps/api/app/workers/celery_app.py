from celery import Celery
from celery.schedules import crontab
from app.config import settings

celery_app = Celery(
    "se_os_worker",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

celery_app.conf.beat_schedule = {
    "generate-daily-plans": {
        "task": "app.workers.tasks.roadmap_tasks.generate_daily_plans",
        "schedule": crontab(hour=6, minute=0),
    },
    "sync-github-profiles": {
        "task": "app.workers.tasks.analytics_tasks.sync_github",
        "schedule": crontab(minute=0),
    },
    "sync-leetcode-stats": {
        "task": "app.workers.tasks.analytics_tasks.sync_leetcode",
        "schedule": crontab(minute=0, hour="*/4"),
    },
    "send-weekly-reports": {
        "task": "app.workers.tasks.notification_tasks.send_weekly_report",
        "schedule": crontab(day_of_week=1, hour=9, minute=0),
    },
}
