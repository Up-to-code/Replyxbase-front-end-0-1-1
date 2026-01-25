'use client';

import React, { useState, useEffect } from 'react';
import AgentInitForm from './components/AgentInitForm';
import AgentManagement from './components/AgentManagement';

export default function AgentPage() {
  const [agentExists, setAgentExists] = useState<boolean | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Check if agent exists in localStorage (mock check)
    if (typeof window === 'undefined') {
      setAgentExists(false);
      return;
    }
    const agentData = localStorage.getItem('agent_data');
    setAgentExists(!!agentData);

    // Listen for storage changes (when agent is saved)
    const handleStorageChange = () => {
      const agentData = localStorage.getItem('agent_data');
      setAgentExists(!!agentData);
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      const agentData = localStorage.getItem('agent_data');
      const exists = !!agentData;
      if (exists !== agentExists) {
        setAgentExists(exists);
        setRefreshKey(prev => prev + 1);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [agentExists]);

  if (agentExists === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005bbc]"></div>
      </div>
    );
  }

  // If agent exists, show management view, otherwise show init form
  return agentExists ? <AgentManagement key={refreshKey} /> : <AgentInitForm />;
}
