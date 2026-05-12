import json
import os

base_dir = r"C:\Users\USER\.gemini\antigravity\scratch\agentgorvenance"

configs = {
    # AFRICA
    "rules/africa/au_ai_strategy_2026.json": {
        "region": "Africa",
        "framework": "AU Continental AI Strategy (2026 implementation)",
        "allowed_actions": ["read_data", "process_local_data"],
        "forbidden_actions": ["cross_border_data_transfer_without_consent"],
        "data_privacy": {"enforce_au_data_policy": True}
    },
    "rules/africa/za_popia.json": {
        "region": "South Africa",
        "framework": "POPIA",
        "data_privacy": {"require_opt_in_consent": True, "block_pii_egress": True, "mandatory_data_breach_reporting": True}
    },
    "rules/africa/ke_ai_bill_2026.json": {
        "region": "Kenya",
        "framework": "Artificial Intelligence Bill 2026",
        "regulatory_compliance": {"risk_based_tiering": True, "health_data_localization_required": True, "mandatory_human_oversight": True}
    },
    "rules/africa/ng_ndpr.json": {
        "region": "Nigeria",
        "framework": "NDPR",
        "data_privacy": {"data_subject_rights_enforced": True, "foreign_transfer_restrictions": True}
    },
    
    # ASIA & INDIA
    "rules/asia/in_it_rules_2026.json": {
        "region": "India",
        "framework": "IT Rules Amendment (Feb 2026) & Digital India Act",
        "content_moderation": {"embed_metadata_in_sgi": True, "label_deepfakes": True, "strict_takedown_compliance_2hr": True},
        "data_privacy": {"require_notice_and_consent": True, "data_fiduciary_obligations": True}
    },
    "rules/asia/vn_law_on_ai_2026.json": {
        "region": "Vietnam",
        "framework": "Law on Artificial Intelligence (March 2026)",
        "compliance": {"human_oversight": True, "content_labeling": True, "high_risk_bans": True}
    },
    "rules/asia/kr_ai_basic_act_2026.json": {
        "region": "South Korea",
        "framework": "AI Basic Act (Jan 2026)",
        "compliance": {"transparency_obligations": True, "high_impact_risk_management": True}
    },
    "rules/asia/cn_cybersecurity_ai_2026.json": {
        "region": "China",
        "framework": "Cybersecurity Law AI Amendment (Jan 2026)",
        "content_moderation": {"adhere_to_core_socialist_values": True, "block_regime_subversion": True},
        "transparency": {"algorithm_registry_required": True, "strict_penalties_enabled": True}
    },
    "rules/asia/sg_agentic_ai_2026.json": {
        "region": "Singapore",
        "framework": "Agentic AI Governance Framework (Jan 2026)",
        "ethics": {"explainability": True, "robustness": True, "agentic_accountability": True}
    },
    
    # MIDDLE EAST
    "rules/middle_east/ae_ai_ethics.json": {
        "region": "UAE",
        "framework": "Dubai AI Ethics",
        "ethics": {"inclusive_ai": True, "benefit_humanity": True}
    },
    "rules/middle_east/sa_sdaia.json": {
        "region": "Saudi Arabia",
        "framework": "SDAIA Ethics Principles",
        "ethics": {"fairness": True, "reliability": True}
    },
    
    # EUROPE
    "rules/europe/eu_ai_act_2026.json": {
        "region": "Europe",
        "framework": "EU AI Act (2026 enforced)",
        "operational_safety": {"prohibit_social_scoring": True, "prohibit_subliminal_manipulation": True},
        "transparency": {"mandatory_ai_disclosure": True, "human_oversight_required_for_high_risk": True}
    },
    "rules/europe/eu_gdpr.json": {
        "region": "Europe",
        "framework": "GDPR",
        "data_privacy": {"right_to_be_forgotten": True, "data_minimization": True, "strict_consent": True}
    },
    
    # NORTH AMERICA
    "rules/north_america/us_nist_rmf.json": {
        "region": "USA",
        "framework": "NIST AI RMF",
        "security": {"measure_and_manage_risk": True, "explainability": True}
    },
    "rules/north_america/us_hipaa.json": {
        "region": "USA",
        "framework": "HIPAA",
        "data_privacy": {"block_ephi_transmission": True, "require_baas_for_third_party": True}
    },
    "rules/north_america/ca_aida.json": {
        "region": "Canada",
        "framework": "AIDA",
        "transparency": {"impact_assessment_required": True}
    },
    
    # SOUTH AMERICA
    "rules/south_america/br_lgpd.json": {
        "region": "Brazil",
        "framework": "LGPD",
        "data_privacy": {"legal_basis_for_processing": True, "anonymization_protocols": True}
    },
    
    # GLOBAL
    "rules/global_standards/owasp_llm.json": {
        "region": "Global",
        "framework": "OWASP LLM Top 10",
        "security": {"sanitize_prompt_injections": True, "verify_plugin_endpoints": True, "prevent_data_poisoning": True}
    },
    "rules/global_standards/mitre_atlas.json": {
        "region": "Global",
        "framework": "MITRE ATLAS",
        "security": {"adversarial_ml_defense": True, "model_evasion_protection": True}
    }
}

for path, data in configs.items():
    full_path = os.path.join(base_dir, path.replace("/", os.sep))
    with open(full_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

print("2026 JSON generation complete")
