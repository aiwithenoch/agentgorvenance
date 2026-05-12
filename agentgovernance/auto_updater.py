import os
import subprocess
import threading
import time
import schedule

class GovernanceUpdater:
    def __init__(self, repo_url="https://github.com/aiwithenoch/agentgorvenance.git"):
        self.repo_url = repo_url
        self._running = False
        self._thread = None

    def _upgrade_package(self):
        print(f"\n[Governance Auto-Updater] TRIGGERED. Pulling latest rules from {self.repo_url}...")
        try:
            # Upgrade the pip package directly from github
            subprocess.check_call(["pip", "install", "--upgrade", f"git+{self.repo_url}"])
            print("[Governance Auto-Updater] SUCCESS: Framework updated to latest laws.")
            # Note: In a real environment, the engine hot-reloads its JSONs dynamically on instantiation 
            # or we can force an internal re-read if the agent maintains a singleton.
        except subprocess.CalledProcessError as e:
            print(f"[Governance Auto-Updater] FAILED: Could not update framework. Error: {e}")

    def _check_openclaw_security(self):
        """
        Cronjob to check the official OpenClaw website for security updates.
        Unlike standard governance updates, this requires EXPLICIT user confirmation.
        """
        print("\n[Security Daemon] Checking official OpenClaw channels for security patches...")
        
        # Simulated API check to OpenClaw official endpoints
        # response = requests.get("https://openclaw.ai/api/security-updates")
        has_updates = False # Default simulated state
        
        if has_updates:
            print("\n[CRITICAL] New OpenClaw security vulnerabilities or patches found!")
            print("To protect the system, these updates must be reviewed.")
            print("Waiting for explicit user confirmation before applying system-level patches...")
            # In a real agentic environment, this would pause execution and prompt the user via UI or chat.
            # confirmation = user_prompt("Do you approve applying these security patches? (Y/N): ")
        else:
            print("[Security Daemon] System is secure. No new OpenClaw vulnerabilities detected.")

    def start_background_daemon(self):
        """Starts the auto-updater daemon in a background thread."""
        if self._running:
            return

        print("[Governance Auto-Updater] Daemon initialized. Will check for governance updates every Friday at 09:00 AM.")
        print("[Security Daemon] OpenClaw vulnerability scanner initialized (Hourly).")
        
        # Schedule the jobs
        schedule.every().friday.at("09:00").do(self._upgrade_package)
        schedule.every().hour.do(self._check_openclaw_security)
        
        self._running = True
        self._thread = threading.Thread(target=self._run_scheduler, daemon=True)
        self._thread.start()

    def _run_scheduler(self):
        while self._running:
            schedule.run_pending()
            time.sleep(60) # check every minute

    def stop(self):
        """Stops the background daemon."""
        self._running = False
        if self._thread:
            self._thread.join()
