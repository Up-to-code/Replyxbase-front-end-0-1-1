import { NextResponse } from 'next/server';

// Removed Prisma dependency - using mock response
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agentId, name, email, phone, date, time } = body;

    if (!agentId || !name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock booking creation - no backend needed
    const mockBookingId = `booking-${Date.now()}`;
    
    return NextResponse.json({ 
      success: true, 
      bookingId: mockBookingId,
      message: 'Booking created successfully (mock)'
    });

  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
