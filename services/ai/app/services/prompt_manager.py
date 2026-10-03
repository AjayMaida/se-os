class PromptManager:
    def get_template(self, template_name: str) -> str:
        return "You are a helpful assistant."

prompt_manager = PromptManager()
