export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'idle' | 'working' | 'error';
  totalTasks: number;
  completedTasks: number;
  capabilities: string[];
  created: string;
  lastActive: string;
}

export interface Task {
  id: string;
  description: string;
  status: 'in-progress' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  result?: string;
}

export interface CreateAgentRequest {
  name: string;
  type: string;
}

export interface AssignTaskRequest {
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}