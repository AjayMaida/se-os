import aio_pika
import json
from app.config import settings
from app.shared.events import DomainEvent

class RabbitMQPublisher:
    def __init__(self):
        self.connection = None
        self.channel = None

    async def connect(self):
        self.connection = await aio_pika.connect_robust(settings.RABBITMQ_URL)
        self.channel = await self.connection.channel()

    async def disconnect(self):
        if self.connection:
            await self.connection.close()

    async def publish_event(self, event: DomainEvent):
        if not self.channel:
            await self.connect()
        message_body = json.dumps({
            "event_id": str(event.event_id),
            "event_type": event.event_type,
            "user_id": str(event.user_id) if event.user_id else None,
            "occurred_at": event.occurred_at.isoformat(),
            "payload": event.payload
        }).encode()
        
        message = aio_pika.Message(body=message_body)
        await self.channel.default_exchange.publish(
            message,
            routing_key=event.event_type
        )

publisher = RabbitMQPublisher()

async def get_publisher() -> RabbitMQPublisher:
    return publisher
