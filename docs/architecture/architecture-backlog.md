# Architecture Backlog & Technical Spikes

This document tracks identified architectural debt, evaluation spikes, and planned refactors for future iterations of **SE-OS**.

---

## 📋 Architectural Spikes & Explorations

| Spike ID | Title | Domain | Priority | Target Sprint | Description |
|---|---|---|---|---|---|
| `SPIKE-01` | Piston vs. Judge0 Benchmark | Practice | High | Sprint 3 | Evaluate latency and security isolation between self-hosted Piston vs Judge0 for code execution. |
| `SPIKE-02` | WebRTC SFU Selection | Practice | High | Sprint 4 | Benchmark LiveKit vs daily.co for multi-stream audio/video recording and latency in Interview Studio. |
| `SPIKE-03` | Local Whisper vs OpenAI API | AI Platform | Medium | Sprint 4 | Test Whisper Turbo v3 on GPU instance vs OpenAI Whisper API for cost and transcription speed. |
| `SPIKE-04` | Event-Sourced Progress Ledger | Analytics | Medium | Sprint 5 | Explore event-sourcing with Kafka/RabbitMQ replay for historical streak recalculation. |

---

## 🛠️ Technical Debt Backlog

- **`TECHDEBT-01`**: Migrate from temporary mock tokens to full NextAuth JWT session exchange.
- **`TECHDEBT-02`**: Replace direct in-process template loading with pre-compiled template bundles.
- **`TECHDEBT-03`**: Add connection pooling tuning for asyncpg under high concurrent background job loads.
