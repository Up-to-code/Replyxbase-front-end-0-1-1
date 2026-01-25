// Removed Prisma dependency - using mock auth handlers
import { NextRequest, NextResponse } from "next/server";

// Mock auth handlers - no backend needed
export async function GET(req: NextRequest) {
  // Return mock session for get-session requests
  if (req.nextUrl.pathname.includes('get-session')) {
    return NextResponse.json({
      user: {
        id: 'mock-user-id',
        name: 'Mock User',
        email: 'user@example.com',
        image: null,
      },
      session: {
        activeOrganizationId: 'mock-org-id',
      },
    });
  }
  
  return NextResponse.json({ message: 'Auth endpoint (mock)' });
}

export async function POST(req: NextRequest) {
  // Return mock responses for auth actions
  return NextResponse.json({ 
    success: true,
    message: 'Auth action completed (mock)'
  });
}
