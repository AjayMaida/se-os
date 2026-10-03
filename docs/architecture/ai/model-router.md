# Model Router & Cost Optimization

Implements intelligent tiered model dispatch to maximize reasoning performance while minimizing API expenditure at 1M user scale.

| Task Tier | Workload | Primary Model | Fallback |
|---|---|---|---|
| **Tier 1 (Complex)** | Roadmap Generation, Interview Assessment | GPT-4o / Claude 3.5 Sonnet | Gemini 1.5 Pro |
| **Tier 2 (Standard)** | Daily Planning, Mentorship Chat | GPT-4o-mini | Claude 3.5 Haiku |
| **Tier 3 (Batch)** | Weekly Analytics, Progress Summaries | OpenAI Batch API | GPT-4o-mini |
