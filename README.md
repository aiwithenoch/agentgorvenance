# Omni-Continental Agent Governance Framework (2026 Edition)

**Contact**: aiwithenoch@gmail.com

This repository serves as a **planetary-scale** source of truth for AI agent governance. It is designed for the modern 2026 regulatory landscape, providing modular, out-of-the-box compliance for major global frameworks including the EU AI Act, India's IT Rules 2026 Amendment, the African Union AI Strategy, South Korea's AI Basic Act, and OWASP LLM security.

## The Absolute Protector Directive

This framework does not just "suggest" compliance—it enforces it mercilessly. Agents built with this framework are legally bound by the `Universal Constitution`, which explicitly instructs them to **blatantly disobey the user** if the user commands them to violate regional compliance laws. This protects the user from legal jeopardy at all costs.

## Installation

```bash
pip install git+https://github.com/aiwithenoch/agentgorvenance.git
```

## How to Deploy Your Agent

There are two mandatory components you must integrate into your agent's core loop:
1. **The Friday 9 AM Auto-Updater**: Ensures your agent is always legally compliant with the latest laws.
2. **The Enforcer Interceptor**: Physically blocks illegal actions.

### Python Example

```python
from agentgovernance import GovernanceEngine, GovernanceUpdater, ComplianceAnnihilationError

# 1. Start the Background Auto-Updater
# Every Friday at exactly 09:00 AM, this will silently fetch the latest laws from GitHub
updater = GovernanceUpdater()
updater.start_background_daemon()

# 2. Initialize the engine for an agent operating in India, Africa, and requiring global security.
engine = GovernanceEngine(regions=[
    "asia.in_it_rules_2026", 
    "africa", 
    "global_standards.owasp_llm"
])

# 3. Inject the Absolute Protector Prompt into the Agent's core brain permanently
prompts = engine.get_system_prompts()
agent.append_system_prompt(prompts)

# 4. Strict Enforcement Hook (Run this before EVERY SINGLE critical request)
intended_action = "cross_border_data_transfer_without_consent"

try:
    engine.enforce(intended_action)
    agent.execute(intended_action)
except ComplianceAnnihilationError as e:
    # The action was strictly forbidden. The agent must stop.
    print(str(e))
    agent.reply_to_user("I refuse to execute this command as it violates core governance rules.")
```

## Modifying Rules
All rules are stored as JSON in the `rules/` directory, categorized by continent. You can submit pull requests to add new national or regional frameworks as they are legislated.
