import React from 'react';
import { Agent } from '../types/Agent';

interface AgentDashboardProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
  onDeleteAgent: (agentId: string) => Promise<void>;
  isLoading: boolean;
  onRefresh: () => void;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
  onDeleteAgent,
  isLoading,
  onRefresh,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle':
        return 'bg-green-100 text-green-800';
      case 'working':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async (agentId: string, agentName: string) => {
    if (window.confirm(`Are you sure you want to delete agent "${agentName}"?`)) {
      try {
        await onDeleteAgent(agentId);
      } catch (error) {
        alert('Failed to delete agent');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Agent Dashboard</h2>
        <button
          onClick={onRefresh}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Refresh
        </button>
      </div>

      {agents.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">No agents created yet</div>
          <div className="text-gray-500 text-sm">Create your first agent to get started</div>
        </div>
      ) : (
        <div className="space-y-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedAgent?.id === agent.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onSelectAgent(agent)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        agent.status
                      )}`}
                    >
                      {agent.status}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {agent.type}
                    </span>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex space-x-4">
                      <span>Tasks: {agent.completedTasks}/{agent.totalTasks}</span>
                      <span>Created: {formatDate(agent.created)}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map((capability) => (
                      <span
                        key={capability}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                      >
                        {capability}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(agent.id, agent.name);
                  }}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};