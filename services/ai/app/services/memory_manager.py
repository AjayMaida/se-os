class MemoryManager:
    async def get_memory(self, user_id: str, session_id: str):
        return []
    
    async def save_memory(self, user_id: str, session_id: str, messages: list):
        pass

memory_manager = MemoryManager()
