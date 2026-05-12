import os
import sys

# Ensure the local package is in the path for testing
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agentgovernance import GovernanceEngine

def main():
    print("--- Testing Agent Governance Framework ---")
    
    # Initialize the engine
    engine = GovernanceEngine()
    
    # Simulate an agent trying to take actions
    actions_to_try = [
        "read_file",
        "search_web",
        "delete_file_without_backup",
        "execute_sudo_command",
        "send_message",
        "make_aws_purchase"
    ]
    
    for action in actions_to_try:
        is_compliant = engine.is_action_compliant(action)
        status = "✅ ALLOWED" if is_compliant else "❌ BLOCKED"
        print(f"Action: {action:<30} -> {status}")
        
    print("\n--- Testing System Prompts Retrieval ---")
    prompts = engine.get_system_prompts()
    print(f"Loaded {len(prompts)} characters of system prompts.")
    print("Agent is ready and compliant!")

if __name__ == "__main__":
    main()
