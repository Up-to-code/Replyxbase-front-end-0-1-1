'use client';

import React from 'react';
import { DashboardLayoutClient } from "./components/DashboardLayoutClient";

// Simplified: 1 organization = 1 agent
// No backend calls needed - agent is implicit with organization
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Pass empty agents array - sidebar will not show agent switching
  return <DashboardLayoutClient agents={[]}>{children}</DashboardLayoutClient>;
};

export default DashboardLayout;

