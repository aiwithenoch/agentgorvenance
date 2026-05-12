import json
import os
from typing import Dict, Any, List

class GovernanceEngine:
    def __init__(self, rules_path: str = None):
        """
        Initialize the Governance Engine.
        If rules_path is not provided, it attempts to load from the default repository structure.
        """
        if rules_path is None:
            # Assume we are in a package installed from the repo, find the rules file relative to __file__ or CWD
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            self.rules_path = os.path.join(base_dir, "rules", "compliance.json")
        else:
            self.rules_path = rules_path
            
        self.rules = self._load_rules()
        
    def _load_rules(self) -> Dict[str, Any]:
        """Loads the compliance.json rules file."""
        if not os.path.exists(self.rules_path):
            raise FileNotFoundError(f"Governance rules file not found at {self.rules_path}")
            
        with open(self.rules_path, "r", encoding="utf-8") as f:
            return json.load(f)
            
    def is_action_compliant(self, action_name: str, context: Dict[str, Any] = None) -> bool:
        """
        Check if a specific action is allowed under current governance rules.
        """
        if action_name in self.rules.get("forbidden_actions", []):
            return False
            
        # Check specific modules like financial
        if "purchase" in action_name.lower() or "buy" in action_name.lower():
            fin_limits = self.rules.get("financial_limits", {})
            if fin_limits.get("require_approval_for_purchases", True):
                # In a real scenario, this might trigger an approval flow. Here we just strictly evaluate
                return False
                
        # Handle default policy
        default_policy = self.rules.get("default_policy", "deny_unknown")
        if default_policy == "deny_unknown" and action_name not in self.rules.get("allowed_actions", []):
            return False
            
        return True
        
    def get_system_prompts(self) -> str:
        """
        Returns the core system prompts that should be injected into the agent's context.
        """
        prompt_path = os.path.join(os.path.dirname(self.rules_path), "system_prompts.md")
        if not os.path.exists(prompt_path):
            return ""
            
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()

