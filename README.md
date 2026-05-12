# Agent Governance Framework

**Contact**: aiwithenoch@gmail.com

This repository serves as a centralized source of truth for AI agent governance, compliance, and behavioral rules. Instead of hardcoding ethical boundaries and operational rules into every individual AI agent, organizations can maintain them here. Agents will "install" or consume this repository to ensure they operate within approved guidelines.

## Installation

Agents can install this framework directly from GitHub using pip:

```bash
pip install git+https://github.com/aiwithenoch/agentgorvenance.git
```

## How to Use It in Your Agents

You can integrate the Governance Engine directly into your agent's decision loop. Before your agent executes an action (e.g., executing a command or purchasing a service), pass the action through the validator.

### Python Example

```python
from agentgovernance import GovernanceEngine

# Initialize the engine (automatically loads rules from the package)
engine = GovernanceEngine()

# Get the governance system prompts and append them to your agent's identity
prompts = engine.get_system_prompts()
agent.append_system_prompt(prompts)

# Before taking an action, validate it
intended_action = "execute_sudo_command"

if engine.is_action_compliant(intended_action):
    agent.execute(intended_action)
else:
    print(f"Action '{intended_action}' blocked by Governance Framework.")
```

## Modifying Rules

All core rules are located in the `rules/` directory:
- `rules/compliance.json`: Define allowed/forbidden actions, privacy protocols, and financial limits.
- `rules/system_prompts.md`: Define the core ethical prompts that all agents must adopt.
