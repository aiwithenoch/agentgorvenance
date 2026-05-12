import os
import json
import hashlib
import glob

def compute_file_hash(filepath):
    """Computes the SHA-256 hash of a file."""
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def generate_signatures():
    """Scans the rules and core logic to generate a signatures.json file."""
    print("[Signer] Starting cryptographic signing of all compliance assets...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    signatures = {}

    # 1. Sign all regional rules
    rules_dir = os.path.join(base_dir, "rules")
    json_files = glob.glob(os.path.join(rules_dir, "**", "*.json"), recursive=True)
    
    # 2. Sign core governance logic (Router, Sandbox, Memory Manager, Engine)
    core_files = glob.glob(os.path.join(base_dir, "agentgovernance", "*.py"))
    
    # 3. Sign the Universal Constitution
    prompt_files = glob.glob(os.path.join(base_dir, "prompts", "*.md"))

    all_files = json_files + core_files + prompt_files
    
    for filepath in all_files:
        # Ignore signatures.json if it exists
        if os.path.basename(filepath) == "signatures.json":
            continue
            
        rel_path = os.path.relpath(filepath, base_dir).replace("\\", "/")
        file_hash = compute_file_hash(filepath)
        signatures[rel_path] = file_hash
        print(f"[Signer] Signed {rel_path} -> {file_hash[:8]}...")

    sig_path = os.path.join(base_dir, "signatures.json")
    with open(sig_path, "w", encoding="utf-8") as f:
        json.dump(signatures, f, indent=4)
        
    print(f"\n[Signer] SUCCESS! {len(signatures)} assets cryptographically locked.")

if __name__ == "__main__":
    generate_signatures()
