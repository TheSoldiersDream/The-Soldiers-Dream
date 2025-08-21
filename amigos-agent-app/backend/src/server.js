const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Store active agents
const agents = new Map();

// Agent class for autonomous behavior
class Agent {
  constructor(id, name, type = 'general') {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = 'idle';
    this.tasks = [];
    this.capabilities = this.getCapabilities(type);
    this.created = new Date();
  }

  getCapabilities(type) {
    const baseCapabilities = ['communicate', 'analyze', 'report'];
    
    switch (type) {
      case 'researcher':
        return [...baseCapabilities, 'research', 'summarize', 'fact-check'];
      case 'assistant':
        return [...baseCapabilities, 'schedule', 'remind', 'organize'];
      case 'analyst':
        return [...baseCapabilities, 'calculate', 'visualize', 'predict'];
      default:
        return baseCapabilities;
    }
  }

  async executeTask(task) {
    this.status = 'working';
    this.tasks.push({
      id: uuidv4(),
      description: task.description,
      status: 'in-progress',
      startTime: new Date()
    });

    // Simulate agent work
    const workTime = Math.random() * 3000 + 1000; // 1-4 seconds
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const taskIndex = this.tasks.length - 1;
        this.tasks[taskIndex].status = 'completed';
        this.tasks[taskIndex].endTime = new Date();
        this.tasks[taskIndex].result = this.generateResult(task);
        this.status = 'idle';
        
        resolve(this.tasks[taskIndex]);
      }, workTime);
    });
  }

  generateResult(task) {
    const responses = [
      `Task "${task.description}" completed successfully. Analysis shows positive outcomes.`,
      `Research completed for "${task.description}". Found relevant insights and recommendations.`,
      `Process "${task.description}" executed. Generated comprehensive report with findings.`,
      `Assignment "${task.description}" finished. Delivered actionable results and next steps.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getStats() {
    const completedTasks = this.tasks.filter(t => t.status === 'completed');
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      status: this.status,
      totalTasks: this.tasks.length,
      completedTasks: completedTasks.length,
      capabilities: this.capabilities,
      created: this.created,
      lastActive: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].endTime : this.created
    };
  }
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'CREATE_AGENT':
          const agent = new Agent(uuidv4(), data.name, data.agentType);
          agents.set(agent.id, agent);
          ws.send(JSON.stringify({
            type: 'AGENT_CREATED',
            agent: agent.getStats()
          }));
          break;
          
        case 'ASSIGN_TASK':
          const targetAgent = agents.get(data.agentId);
          if (targetAgent) {
            const result = await targetAgent.executeTask(data.task);
            ws.send(JSON.stringify({
              type: 'TASK_COMPLETED',
              agentId: data.agentId,
              task: result
            }));
          }
          break;
          
        case 'GET_AGENTS':
          const agentStats = Array.from(agents.values()).map(agent => agent.getStats());
          ws.send(JSON.stringify({
            type: 'AGENTS_LIST',
            agents: agentStats
          }));
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// REST API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    agents: agents.size
  });
});

app.get('/api/agents', (req, res) => {
  const agentStats = Array.from(agents.values()).map(agent => agent.getStats());
  res.json(agentStats);
});

app.post('/api/agents', (req, res) => {
  const { name, type } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Agent name is required' });
  }
  
  const agent = new Agent(uuidv4(), name, type || 'general');
  agents.set(agent.id, agent);
  
  res.status(201).json(agent.getStats());
});

app.post('/api/agents/:id/tasks', async (req, res) => {
  const agent = agents.get(req.params.id);
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  const { description } = req.body;
  
  if (!description) {
    return res.status(400).json({ error: 'Task description is required' });
  }
  
  try {
    const result = await agent.executeTask({ description });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Task execution failed' });
  }
});

app.get('/api/agents/:id', (req, res) => {
  const agent = agents.get(req.params.id);
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  res.json(agent.getStats());
});

app.delete('/api/agents/:id', (req, res) => {
  const deleted = agents.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  res.json({ message: 'Agent deleted successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Agent Amigos Backend Server running on port ${PORT}`);
  console.log(`📡 WebSocket Server ready for agent connections`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});