import os
from typing import Dict, Any

class MemoryManager:
    """
    Advanced memory context enforcer that ensures the agent remains 
    tethered to the user's permanent business context.
    """
    def __init__(self, memory_file: str):
        self.memory_file = memory_file
        self.cached_memory = ""
        self.load_memory()

    def load_memory(self):
        """Loads and caches the contents of memory.md."""
        if os.path.exists(self.memory_file):
            with open(self.memory_file, "r", encoding="utf-8") as f:
                self.cached_memory = f.read()

    def get_enforced_context(self) -> str:
        """
        Returns the memory context formatted for system prompt injection.
        """
        if not self.cached_memory:
            return "WARNING: NO CORE BUSINESS CONTEXT FOUND. PROCEED WITH EXTREME CAUTION."
        
        return f"\n[CORE BUSINESS CONTEXT - PERMANENT]\n{self.cached_memory}\n[END CORE CONTEXT]\n"

    def audit_memory_drift(self, agent_output: str) -> bool:
        """
        Analyzes agent output to ensure it hasn't drifted from core 
        business memory instructions.
        """
        # Placeholder for drift detection logic (semantic similarity)
        return True
