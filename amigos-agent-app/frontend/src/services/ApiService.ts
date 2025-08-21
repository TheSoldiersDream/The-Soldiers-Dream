import axios from 'axios';
import { Agent, Task, CreateAgentRequest, AssignTaskRequest } from '../types/Agent';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiService {
  static async getAgents(): Promise<Agent[]> {
    try {
      const response = await api.get('/agents');
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw new Error('Failed to fetch agents');
    }
  }

  static async createAgent(name: string, type: string): Promise<Agent> {
    try {
      const request: CreateAgentRequest = { name, type };
      const response = await api.post('/agents', request);
      return response.data;
    } catch (error) {
      console.error('Error creating agent:', error);
      throw new Error('Failed to create agent');
    }
  }

  static async assignTask(agentId: string, description: string): Promise<Task> {
    try {
      const request: AssignTaskRequest = { description };
      const response = await api.post(`/agents/${agentId}/tasks`, request);
      return response.data;
    } catch (error) {
      console.error('Error assigning task:', error);
      throw new Error('Failed to assign task');
    }
  }

  static async getAgent(agentId: string): Promise<Agent> {
    try {
      const response = await api.get(`/agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      throw new Error('Failed to fetch agent');
    }
  }

  static async deleteAgent(agentId: string): Promise<void> {
    try {
      await api.delete(`/agents/${agentId}`);
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw new Error('Failed to delete agent');
    }
  }

  static async checkHealth(): Promise<{ status: string; timestamp: string; agents: number }> {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw new Error('Failed to check server health');
    }
  }
}