import React, { useState } from 'react';
import { Agent } from '../types/Agent';

interface TaskAssignerProps {
  agent: Agent;
  onAssignTask: (agentId: string, description: string) => Promise<any>;
}

export const TaskAssigner: React.FC<TaskAssignerProps> = ({ agent, onAssignTask }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const suggestedTasks = {
    general: [
      "Analyze current market trends",
      "Generate a summary report",
      "Review documentation",
      "Perform data analysis"
    ],
    researcher: [
      "Research recent developments in AI",
      "Fact-check claims about climate change",
      "Summarize academic papers",
      "Find statistics on renewable energy"
    ],
    assistant: [
      "Schedule meeting for next week",
      "Organize project files",
      "Create reminder list",
      "Plan weekly agenda"
    ],
    analyst: [
      "Calculate financial metrics",
      "Create data visualization",
      "Predict future trends",
      "Analyze performance data"
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDescription.trim()) return;

    setIsAssigning(true);
    setLastResult(null);
    
    try {
      const result = await onAssignTask(agent.id, taskDescription.trim());
      setLastResult(result.result);
      setTaskDescription('');
    } catch (error) {
      console.error('Failed to assign task:', error);
      setLastResult('Failed to assign task. Please try again.');
    } finally {
      setIsAssigning(false);
    }
  };

  const currentSuggestions = suggestedTasks[agent.type as keyof typeof suggestedTasks] || suggestedTasks.general;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Assign Task to {agent.name}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-1">
            Task Description
          </label>
          <textarea
            id="task-description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Describe the task you want to assign..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isAssigning}
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!taskDescription.trim() || isAssigning}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAssigning ? 'Assigning Task...' : 'Assign Task'}
          </button>
          
          {isAssigning && (
            <div className="flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm">Agent is working...</span>
            </div>
          )}
        </div>
      </form>

      {/* Suggested Tasks */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Tasks</h4>
        <div className="flex flex-wrap gap-2">
          {currentSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setTaskDescription(suggestion)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              disabled={isAssigning}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Last Result */}
      {lastResult && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="text-sm font-medium text-green-800 mb-2">Task Result</h4>
          <p className="text-sm text-green-700">{lastResult}</p>
        </div>
      )}

      {/* Agent Capabilities */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Agent Capabilities</h4>
        <div className="flex flex-wrap gap-1">
          {agent.capabilities.map((capability) => (
            <span
              key={capability}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};