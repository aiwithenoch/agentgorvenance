import os
import sys
import contextlib

class ExecutionSandbox:
    """
    Context manager that isolates tool execution to prevent 
    system-wide modifications or root access privilege escalation.
    """
    def __init__(self, sandbox_root: str = None):
        self.sandbox_root = sandbox_root or os.path.join(os.getcwd(), "sandbox")
        if not os.path.exists(self.sandbox_root):
            os.makedirs(self.sandbox_root)

    @contextlib.contextmanager
    def isolate(self):
        """
        Entering this context attempts to restrict file IO and env access.
        """
        # Note: True OS-level sandboxing often requires docker or kernel-level locks.
        # This implementation uses path-prefix enforcement and env-scrubbing.
        
        old_cwd = os.getcwd()
        os.chdir(self.sandbox_root)
        
        # Scrub sensitive env vars
        old_env = os.environ.copy()
        for key in ["AWS_SECRET_ACCESS_KEY", "OPENAI_API_KEY", "SSH_AUTH_SOCK"]:
            if key in os.environ:
                del os.environ[key]
        
        try:
            yield
        finally:
            os.chdir(old_cwd)
            os.environ.clear()
            os.environ.update(old_env)

    def validate_safe_path(self, target_path: str) -> bool:
        """Ensures a path is within the sandbox root."""
        abs_target = os.path.abspath(target_path)
        abs_root = os.path.abspath(self.sandbox_root)
        return abs_target.startswith(abs_root)
