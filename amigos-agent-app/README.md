# Agent Amigos App

A modern autonomous agent management platform built with React, TypeScript, and Node.js.

## Overview

Agent Amigos is a sophisticated application for creating, managing, and interacting with autonomous agents. Each agent has specific capabilities and can be assigned tasks to execute independently.

## Features

- **Agent Creation**: Create custom agents with different types and capabilities
- **Task Assignment**: Assign tasks to agents and monitor their progress
- **Real-time Updates**: WebSocket integration for live agent status updates
- **Agent Types**: Support for different agent specializations (General, Researcher, Assistant, Analyst)
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Architecture

### Frontend (React + TypeScript)
- Modern React application with TypeScript
- Tailwind CSS for styling
- Component-based architecture
- Real-time WebSocket integration

### Backend (Node.js + Express)
- RESTful API with Express.js
- WebSocket server for real-time communication
- In-memory agent management
- Autonomous task execution simulation

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 3001) and frontend (port 3000) servers concurrently.

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api/health

### Development

#### Frontend Development
```bash
cd amigos-agent-app/frontend
npm start
```

#### Backend Development
```bash
cd amigos-agent-app/backend
npm run dev
```

#### Build for Production
```bash
npm run build
```

## Agent Types

### General Assistant
- Basic communication and analysis capabilities
- Suitable for general-purpose tasks

### Research Agent
- Specialized in research and fact-checking
- Advanced summarization capabilities

### Personal Assistant
- Scheduling and organization tasks
- Reminder and planning features

### Data Analyst
- Calculations and data visualization
- Predictive analysis capabilities

## API Endpoints

### Agents
- `GET /api/agents` - List all agents
- `POST /api/agents` - Create new agent
- `GET /api/agents/:id` - Get agent details
- `DELETE /api/agents/:id` - Delete agent

### Tasks
- `POST /api/agents/:id/tasks` - Assign task to agent

### Health
- `GET /api/health` - Server health check

## WebSocket Events

### Client → Server
- `CREATE_AGENT` - Create new agent
- `ASSIGN_TASK` - Assign task to agent
- `GET_AGENTS` - Request agents list

### Server → Client
- `AGENT_CREATED` - Agent creation confirmation
- `TASK_COMPLETED` - Task completion notification
- `AGENTS_LIST` - Current agents list

## Configuration

### Environment Variables

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
```

#### Backend (.env)
```
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, WebSocket
- **Development**: VS Code, ESLint, Prettier
- **Build Tools**: Create React App, npm scripts

## VS Code Integration

The project includes VS Code configuration for:
- Debugging both frontend and backend
- Task running (install, dev, build)
- TypeScript IntelliSense
- ESLint and Prettier integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details