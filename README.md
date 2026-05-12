# Omni-Continental Agent Governance Framework (2026 Edition)

**Contact**: aiwithenoch@gmail.com

This repository serves as a **planetary-scale** source of truth for AI agent governance. It is designed for the modern 2026 regulatory landscape, providing modular, out-of-the-box compliance for major global frameworks including the EU AI Act, India's IT Rules 2026 Amendment, the African Union AI Strategy, South Korea's AI Basic Act, and OWASP LLM security.

## Installation

```bash
pip install git+https://github.com/aiwithenoch/agentgorvenance.git
```

## How It Works

Instead of a single rigid file, the framework is composed of dozens of specialized JSON modules categorized by continent. An agent initializes the governance engine by declaring its operating regions, and the engine seamlessly merges those laws into a single strict compliance shield.

### Supported Regions & Frameworks (Partial List)
- **Africa**: AU AI Strategy, South Africa POPIA, Kenya AI Bill 2026, Nigeria NDPR.
- **Asia**: India IT Rules Amendment (Feb 2026), Vietnam Law on AI, South Korea AI Basic Act, China GenAI Measures, Singapore Agentic AI.
- **Middle East**: UAE Dubai AI Ethics, Saudi Arabia SDAIA.
- **Europe**: EU AI Act, GDPR.
- **Americas**: USA NIST AI RMF, HIPAA, Canada AIDA, Brazil LGPD.
- **Global**: OWASP LLM Top 10, MITRE ATLAS.

### Python Example

```python
from agentgovernance import GovernanceEngine

# Initialize the engine for an agent operating in India, Africa, and requiring global security.
engine = GovernanceEngine(regions=[
    "asia.in_it_rules_2026", 
    "africa", 
    "global_standards.owasp_llm"
])

# Get the compiled governance system prompts and append them to your agent's identity
prompts = engine.get_system_prompts()
agent.append_system_prompt(prompts)

# Before taking an action, validate it against the combined regional laws
intended_action = "cross_border_data_transfer_without_consent"

if engine.is_action_compliant(intended_action):
    agent.execute(intended_action)
else:
    print(f"Action '{intended_action}' blocked by Governance Framework.")
```

## Modifying Rules
All rules are stored as JSON in the `rules/` directory, categorized by continent. You can submit pull requests to add new national or regional frameworks as they are legislated.
