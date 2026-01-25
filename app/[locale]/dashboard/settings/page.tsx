'use client';

import React from "react";
import { SettingsClient } from "./components/SettingsClient";

// Mock data - no backend needed
const mockUser = {
  id: 'user-1',
  name: 'User',
  email: 'user@example.com',
  image: null,
  emailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockOrganization = {
  id: 'org-1',
  name: 'My Organization',
  slug: 'my-org',
  logo: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  members: [],
};

export default function SettingsPage() {
  return <SettingsClient user={mockUser} organization={mockOrganization} />;
}
