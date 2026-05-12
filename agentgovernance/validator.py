import json
import os
import glob
from typing import Dict, Any, List

class GovernanceEngine:
    def __init__(self, regions: List[str] = None):
        """
        Initialize the Governance Engine with specific regions.
        Example: engine = GovernanceEngine(regions=["africa", "asia.in_it_rules_2026", "global_standards"])
        """
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.rules_dir = os.path.join(self.base_dir, "rules")
        
        # Load all applicable rules
        self.compiled_rules = self._load_regional_rules(regions)
        
    def _load_regional_rules(self, regions: List[str]) -> Dict[str, Any]:
        compiled = {
            "allowed_actions": set(),
            "forbidden_actions": set(),
            "data_privacy": {},
            "security": {},
            "ethics": {},
            "content_moderation": {},
            "transparency": {},
            "compliance": {}
        }
        
        if not regions:
            # If no regions specified, we might want to default to global or raise
            return compiled

        for region in regions:
            parts = region.split('.')
            target_dir = os.path.join(self.rules_dir, parts[0])
            
            if len(parts) == 1:
                # Load all JSONs in that region folder
                json_files = glob.glob(os.path.join(target_dir, "*.json"))
            else:
                # Load specific file
                json_files = [os.path.join(target_dir, f"{parts[1]}.json")]

            for json_file in json_files:
                if os.path.exists(json_file):
                    with open(json_file, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        self._merge_rules(compiled, data)

        return compiled

    def _merge_rules(self, compiled: Dict, new_data: Dict):
        # Merge sets
        if "allowed_actions" in new_data:
            compiled["allowed_actions"].update(new_data["allowed_actions"])
        if "forbidden_actions" in new_data:
            compiled["forbidden_actions"].update(new_data["forbidden_actions"])
            
        # Merge dicts (strict mode: if any region requires True, it becomes True globally)
        for key in ["data_privacy", "security", "ethics", "content_moderation", "transparency", "compliance"]:
            if key in new_data:
                for k, v in new_data[key].items():
                    if isinstance(v, bool):
                        compiled[key][k] = compiled[key].get(k, False) or v
                    else:
                        compiled[key][k] = v

    def is_action_compliant(self, action_name: str, context: Dict[str, Any] = None) -> bool:
        """
        Check if a specific action is allowed under the compiled regional governance rules.
        """
        if action_name in self.compiled_rules["forbidden_actions"]:
            return False
            
        # Check specific modules based on context or action name
        # ... logic mapping action_name to data_privacy or security checks ...
        return True

    def get_system_prompts(self) -> str:
        """
        Returns the core system prompts compiled from the regions.
        """
        prompts = "# Omni-Continental Agent Governance Directives\n"
        prompts += "You are operating under strict global compliance constraints. You must abide by the compiled rules spanning your designated operating regions.\n"
        
        # In a full implementation, we would load and merge from prompts/regions/
        return prompts
