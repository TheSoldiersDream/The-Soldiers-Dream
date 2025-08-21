import React, { useState, useEffect } from 'react';
import { AgentDashboard } from './components/AgentDashboard';
import { AgentCreator } from './components/AgentCreator';
import { TaskAssigner } from './components/TaskAssigner';
import { Header } from './components/Header';
import { Agent } from './types/Agent';
import { ApiService } from './services/ApiService';
import './App.css';

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadAgents = async () => {
    setIsLoading(true);
    try {
      const fetchedAgents = await ApiService.getAgents();
      setAgents(fetchedAgents);
    } catch (error) {
      console.error('Failed to load agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAgent = async (name: string, type: string) => {
    try {
      const newAgent = await ApiService.createAgent(name, type);
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    }
  };

  const handleAssignTask = async (agentId: string, description: string) => {
    try {
      const result = await ApiService.assignTask(agentId, description);
      await loadAgents(); // Refresh agents to get updated stats
      return result;
    } catch (error) {
      console.error('Failed to assign task:', error);
      throw error;
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    try {
      await ApiService.deleteAgent(agentId);
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
      if (selectedAgent?.id === agentId) {
        setSelectedAgent(null);
      }
    } catch (error) {
      console.error('Failed to delete agent:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Creation Panel */}
          <div className="lg:col-span-1">
            <AgentCreator onCreateAgent={handleCreateAgent} />
          </div>

          {/* Agent Dashboard */}
          <div className="lg:col-span-2">
            <AgentDashboard
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={setSelectedAgent}
              onDeleteAgent={handleDeleteAgent}
              isLoading={isLoading}
              onRefresh={loadAgents}
            />
          </div>
        </div>

        {/* Task Assignment Panel */}
        {selectedAgent && (
          <div className="mt-8">
            <TaskAssigner
              agent={selectedAgent}
              onAssignTask={handleAssignTask}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
