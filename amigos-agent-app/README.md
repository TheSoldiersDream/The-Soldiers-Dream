# Amigos Agent App

The Soldiers Dream - Autonomous Agents Application

## Overview

This is an autonomous agents framework called "Amigos Agent App" that allows multiple AI agents to work together on various tasks. The application simulates military-style coordination between different types of agents.

## Features

- **Multi-Agent System**: Supports multiple autonomous agents working in coordination
- **Agent Types**: Scout, Combat, Support, and Command agents with different capabilities
- **Task Management**: Automatic task assignment and execution
- **Async Operations**: Built with Python asyncio for concurrent operations

## Agent Types

- **Scout Agent**: Reconnaissance, information gathering, surveillance
- **Combat Agent**: Tactical operations, defense, offense
- **Support Agent**: Logistics, communication, medical support
- **Command Agent**: Coordination, strategy, decision making

## Usage

Run the application:

```bash
cd amigos-agent-app
python main.py
```

## Requirements

- Python 3.7+
- asyncio
- typing

## Installation

```bash
pip install -r requirements.txt
```

## Project Structure

```
amigos-agent-app/
├── main.py          # Main application entry point
├── config.py        # Configuration settings
├── requirements.txt # Python dependencies
└── README.md       # This file
```