#!/usr/bin/env python3
"""
Amigos Agent App - The Soldiers Dream
An autonomous agents application framework
"""

import asyncio
import logging
from typing import List, Dict, Any
import config

# Configure logging
logging.basicConfig(
    level=getattr(logging, config.LOG_LEVEL),
    format=config.LOG_FORMAT
)
logger = logging.getLogger(__name__)

class Agent:
    """Base class for autonomous agents"""
    
    def __init__(self, name: str, capabilities: List[str] = None):
        self.name = name
        self.capabilities = capabilities or []
        self.is_active = False
        
    async def start(self):
        """Start the agent"""
        self.is_active = True
        logger.info(f"Agent {self.name} started with capabilities: {self.capabilities}")
        
    async def stop(self):
        """Stop the agent"""
        self.is_active = False
        logger.info(f"Agent {self.name} stopped")
        
    async def execute_task(self, task: Dict[str, Any]):
        """Execute a task"""
        if not self.is_active:
            logger.warning(f"Agent {self.name} is not active")
            return False
            
        logger.info(f"Agent {self.name} executing task: {task.get('description', 'Unknown')}")
        # Simulate task execution
        await asyncio.sleep(1)
        return True

class AgentManager:
    """Manager for coordinating multiple agents"""
    
    def __init__(self):
        self.agents: List[Agent] = []
        
    def add_agent(self, agent: Agent):
        """Add an agent to the system"""
        self.agents.append(agent)
        logger.info(f"Added agent: {agent.name}")
        
    async def start_all_agents(self):
        """Start all agents"""
        for agent in self.agents:
            await agent.start()
            
    async def stop_all_agents(self):
        """Stop all agents"""
        for agent in self.agents:
            await agent.stop()
            
    async def assign_task(self, task: Dict[str, Any], agent_name: str = None):
        """Assign a task to an agent"""
        if agent_name:
            agent = next((a for a in self.agents if a.name == agent_name), None)
            if agent:
                return await agent.execute_task(task)
            else:
                logger.error(f"Agent {agent_name} not found")
                return False
        else:
            # Assign to first available agent
            for agent in self.agents:
                if agent.is_active:
                    return await agent.execute_task(task)
            logger.warning("No active agents available")
            return False

async def main():
    """Main application entry point"""
    logger.info(f"Starting {config.APP_NAME} v{config.VERSION}")
    
    # Create agent manager
    manager = AgentManager()
    
    # Create agents based on configuration
    scout_agent = Agent("Scout", config.AGENT_TYPES["scout"])
    combat_agent = Agent("Combat", config.AGENT_TYPES["combat"])
    support_agent = Agent("Support", config.AGENT_TYPES["support"])
    command_agent = Agent("Command", config.AGENT_TYPES["command"])
    
    # Add agents to manager
    manager.add_agent(scout_agent)
    manager.add_agent(combat_agent)
    manager.add_agent(support_agent)
    manager.add_agent(command_agent)
    
    # Start all agents
    await manager.start_all_agents()
    
    # Execute some example tasks
    tasks = [
        {"description": "Gather intelligence on enemy positions", "type": "reconnaissance"},
        {"description": "Provide tactical support", "type": "tactical_operations"},
        {"description": "Establish communication link", "type": "communication"},
        {"description": "Coordinate team movements", "type": "coordination"}
    ]
    
    for task in tasks:
        await manager.assign_task(task)
        await asyncio.sleep(0.5)
    
    # Stop all agents
    await manager.stop_all_agents()
    
    logger.info(f"{config.APP_NAME} completed successfully")

if __name__ == "__main__":
    asyncio.run(main())