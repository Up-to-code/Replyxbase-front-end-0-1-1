// Removed Prisma dependency - using mock session
export const getSession = async () => {
  // Mock session - no backend needed
  return {
    user: {
      id: 'mock-user-id',
      name: 'Mock User',
      email: 'user@example.com',
      image: null,
    },
    session: {
      activeOrganizationId: 'mock-org-id',
    },
  };
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user || null;
};