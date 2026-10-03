# Memory Management

Hybrid short-term and long-term memory architecture:
- **Working Memory:** In-memory LangGraph thread states and active session context.
- **Episodic Memory:** Postgres-backed conversation histories and interview transcripts.
- **Semantic Memory:** pgvector embeddings representing past user struggles and masteries.
