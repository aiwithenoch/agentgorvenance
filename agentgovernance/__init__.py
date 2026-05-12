"""
Omni-Continental Agent Governance Framework
"""

from .validator import GovernanceEngine, ComplianceAnnihilationError
from .auto_updater import GovernanceUpdater

__all__ = ["GovernanceEngine", "ComplianceAnnihilationError", "GovernanceUpdater"]
