from app.workers.celery_app import celery_app
import asyncio

@celery_app.task(name="app.workers.tasks.roadmap_tasks.generate_roadmap_task")
def generate_roadmap_task(user_id: str, goal_data: dict):
    # Sync wrapper for async logic
    pass

@celery_app.task(name="app.workers.tasks.analytics_tasks.sync_github")
def sync_github_task():
    pass

@celery_app.task(name="app.workers.tasks.analytics_tasks.sync_leetcode")
def sync_leetcode_task():
    pass

@celery_app.task(name="app.workers.tasks.roadmap_tasks.generate_daily_plans")
def generate_daily_plans_task():
    pass
