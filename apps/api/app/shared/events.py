from dataclasses import dataclass, field
from datetime import datetime, timezone
import uuid
from typing import Any, Dict

@dataclass
class DomainEvent:
    event_id: uuid.UUID = field(default_factory=uuid.uuid4)
    occurred_at: datetime = field(default_factory=lambda: datetime.now(timezone.utc))
    user_id: uuid.UUID = None
    payload: Dict[str, Any] = field(default_factory=dict)
    
    @property
    def event_type(self) -> str:
        return self.__class__.__name__

@dataclass
class UserRegistered(DomainEvent): pass
@dataclass
class UserProfileUpdated(DomainEvent): pass
@dataclass
class OnboardingCompleted(DomainEvent): pass

@dataclass
class RoadmapCreated(DomainEvent): pass
@dataclass
class RoadmapUpdated(DomainEvent): pass
@dataclass
class MilestoneCompleted(DomainEvent): pass
@dataclass
class DailyPlanGenerated(DomainEvent): pass

@dataclass
class PracticeSessionCompleted(DomainEvent): pass
@dataclass
class InterviewSessionSubmitted(DomainEvent): pass

@dataclass
class JobApplicationSubmitted(DomainEvent): pass
@dataclass
class ResumeUpdated(DomainEvent): pass
