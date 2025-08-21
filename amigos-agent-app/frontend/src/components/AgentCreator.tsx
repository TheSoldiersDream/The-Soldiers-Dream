import React, { useState } from 'react';

interface AgentCreatorProps {
  onCreateAgent: (name: string, type: string) => Promise<any>;
}

export const AgentCreator: React.FC<AgentCreatorProps> = ({ onCreateAgent }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('general');
  const [isCreating, setIsCreating] = useState(false);

  const agentTypes = [
    { value: 'general', label: 'General Assistant', description: 'Basic communication and analysis' },
    { value: 'researcher', label: 'Research Agent', description: 'Specialized in research and fact-checking' },
    { value: 'assistant', label: 'Personal Assistant', description: 'Scheduling and organization tasks' },
    { value: 'analyst', label: 'Data Analyst', description: 'Calculations and data visualization' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsCreating(true);
    try {
      await onCreateAgent(name.trim(), type);
      setName('');
      setType('general');
    } catch (error) {
      console.error('Failed to create agent:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Agent</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 mb-1">
            Agent Name
          </label>
          <input
            id="agent-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter agent name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isCreating}
          />
        </div>

        <div>
          <label htmlFor="agent-type" className="block text-sm font-medium text-gray-700 mb-1">
            Agent Type
          </label>
          <select
            id="agent-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isCreating}
          >
            {agentTypes.map((agentType) => (
              <option key={agentType.value} value={agentType.value}>
                {agentType.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {agentTypes.find(t => t.value === type)?.description}
          </p>
        </div>

        <button
          type="submit"
          disabled={!name.trim() || isCreating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isCreating ? 'Creating Agent...' : 'Create Agent'}
        </button>
      </form>
    </div>
  );
};