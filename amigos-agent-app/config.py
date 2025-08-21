# Amigos Agent App Configuration
APP_NAME = "The Soldiers Dream - Amigos Agent App"
VERSION = "1.0.0"

# Agent Configuration
MAX_AGENTS = 10
DEFAULT_TASK_TIMEOUT = 30  # seconds

# Logging Configuration
LOG_LEVEL = "INFO"
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

# Agent Types and Capabilities
AGENT_TYPES = {
    "scout": ["reconnaissance", "information_gathering", "surveillance"],
    "combat": ["tactical_operations", "defense", "offense"],
    "support": ["logistics", "communication", "medical"],
    "command": ["coordination", "strategy", "decision_making"]
}

# Task Types
TASK_TYPES = [
    "reconnaissance",
    "tactical_operations", 
    "communication",
    "logistics",
    "surveillance",
    "defense",
    "offense",
    "coordination"
]