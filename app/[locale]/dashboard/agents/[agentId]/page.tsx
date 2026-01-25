'use client';

import React from 'react';
import AgentDetailsClient from './components/AgentDetailsClient';

// Mock agent data - in production, this would come from an API
const mockAgent = {
  id: 'default-agent',
  name: 'My Agent',
  role: 'assistant',
  status: 'active' as const,
  isWebsiteEnabled: false,
  isWhatsappEnabled: false,
  isDmEnabled: false,
  config: {},
  organizationId: 'default-org',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastActive: 'Just now',
  conversations: 0,
  conversion: '0%',
  stats: {
    conversations: 0,
    users: 0,
    satisfaction: 0,
  }
};

export default function AgentDashboardPage() {
  return <AgentDetailsClient agent={mockAgent} />;
}
