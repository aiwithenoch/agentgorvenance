import os
import json
from typing import List, Dict, Any

class SemanticRouter:
    """
    Advanced routing engine that intercepts agent prompts and determines 
    which regional compliance rules must be strictly enforced.
    """
    def __init__(self, engine):
        self.engine = engine
        self.region_keywords = {
            "india": ["india", "it rules", "deepfake", "synthetic content"],
            "africa": ["africa", "au", "kenya", "nigeria", "south africa", "popia"],
            "europe": ["europe", "eu", "gdpr", "ai act"],
            "usa": ["usa", "america", "fcc", "nist"],
            "asia": ["asia", "vietnam", "singapore", "korea"]
        }

    def route_request(self, user_prompt: str) -> List[str]:
        """
        Analyzes the user's prompt and returns a list of required regions 
        to load into the GovernanceEngine.
        """
        detected_regions = ["global_standards.owasp_llm"] # Always include global security
        
        prompt_lower = user_prompt.lower()
        for region, keywords in self.region_keywords.items():
            if any(kw in prompt_lower for kw in keywords):
                # Mapping simple names to actual rule paths
                if region == "india":
                    detected_regions.append("asia.in_it_rules_2026")
                elif region == "africa":
                    detected_regions.append("africa")
                elif region == "europe":
                    detected_regions.append("europe")
                elif region == "asia":
                    detected_regions.append("asia")
                else:
                    detected_regions.append(region)

        return list(set(detected_regions))

    def pre_filter(self, prompt: str):
        """
        Pre-execution filter to detect intent-based compliance violations.
        """
        # Example: Detecting deepfake generation intent in India context
        if "generate" in prompt.lower() and "face" in prompt.lower():
            # Check if India rules are active and enforce strict metadata
            pass
