import json
import os
import glob
from typing import Dict, Any, List

class ComplianceAnnihilationError(Exception):
    """
    An uncatchable error raised when the agent attempts to execute an action
    that violates severe governance compliance protocols. 
    """
    pass

class TamperEvidentError(Exception):
    """
    Fatal error raised when compliance rules have been cryptographically altered.
    """
    pass

class GovernanceEngine:
    def __init__(self, regions: List[str] = None):
        """
        Initialize the Governance Engine with specific regions and perform a cryptographic integrity check.
        """
        self.base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.rules_dir = os.path.join(self.base_dir, "rules")
        
        # 1. Perform Cryptographic Lock Check
        self._verify_cryptographic_integrity()
        
        # 2. Load all applicable rules
        self.compiled_rules = self._load_regional_rules(regions)

    def _verify_cryptographic_integrity(self):
        """Computes SHA-256 hashes of all rules and compares them to the master signature file."""
        import hashlib
        sig_path = os.path.join(self.base_dir, "signatures.json")
        if not os.path.exists(sig_path):
            raise TamperEvidentError("[FATAL] signatures.json missing. The Governance framework cannot verify its own integrity.")
            
        with open(sig_path, "r", encoding="utf-8") as f:
            master_signatures = json.load(f)
            
        json_files = glob.glob(os.path.join(self.rules_dir, "**", "*.json"), recursive=True)
        for filepath in json_files:
            rel_path = os.path.relpath(filepath, self.base_dir).replace("\\", "/") # Normalize path separators
            
            sha256_hash = hashlib.sha256()
            with open(filepath, "rb") as f:
                for byte_block in iter(lambda: f.read(4096), b""):
                    sha256_hash.update(byte_block)
            current_hash = sha256_hash.hexdigest()
            
            # Find matching signature regardless of path separators
            matched_hash = None
            for stored_path, stored_hash in master_signatures.items():
                if stored_path.replace("\\", "/") == rel_path:
                    matched_hash = stored_hash
                    break
                    
            if matched_hash is None:
                raise TamperEvidentError(f"[FATAL] Unsigned governance rule detected: {rel_path}. System compromised.")
            if current_hash != matched_hash:
                raise TamperEvidentError(f"[FATAL] Cryptographic mismatch in {rel_path}. Governance rules have been tampered with.")
        
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
        if "allowed_actions" in new_data:
            compiled["allowed_actions"].update(new_data["allowed_actions"])
        if "forbidden_actions" in new_data:
            compiled["forbidden_actions"].update(new_data["forbidden_actions"])
            
        for key in ["data_privacy", "security", "ethics", "content_moderation", "transparency", "compliance"]:
            if key in new_data:
                for k, v in new_data[key].items():
                    if isinstance(v, bool):
                        compiled[key][k] = compiled[key].get(k, False) or v
                    else:
                        compiled[key][k] = v

    def enforce(self, action_name: str, context: Dict[str, Any] = None):
        """
        STRICT ENFORCEMENT HOOK: Must be called before EVERY critical action.
        If the action fails compliance, this raises a ComplianceAnnihilationError,
        physically stopping the agent process.
        """
        if action_name in self.compiled_rules.get("forbidden_actions", set()):
            raise ComplianceAnnihilationError(
                f"\n[ABSOLUTE PROTECTOR] BLOCKED! The action '{action_name}' violates core regional governance protocols. "
                "Execution terminated to protect the user from compliance annihilation. Do not proceed."
            )
            
        # Example dynamic check: if action implies cross border transfer
        if "cross_border" in action_name.lower():
            if self.compiled_rules["forbidden_actions"].intersection({"cross_border_data_transfer_without_consent"}):
                raise ComplianceAnnihilationError("[ABSOLUTE PROTECTOR] BLOCKED! Cross-border transfer without explicit consent violates AU Strategy rules.")

    def is_action_compliant(self, action_name: str, context: Dict[str, Any] = None) -> bool:
        """Passive check (Legacy). Use enforce() for strict protection."""
        try:
            self.enforce(action_name, context)
            return True
        except ComplianceAnnihilationError:
            return False

    def get_system_prompts(self) -> str:
        """
        Returns the ABSOLUTE PROTECTOR core system prompts.
        """
        prompt_path = os.path.join(self.base_dir, "prompts", "universal_constitution.md")
        if os.path.exists(prompt_path):
            with open(prompt_path, "r", encoding="utf-8") as f:
                return f.read()
        return "CRITICAL WARNING: CONSTITUTION NOT FOUND. FALLBACK TO PROTECT USER AT ALL COSTS."
