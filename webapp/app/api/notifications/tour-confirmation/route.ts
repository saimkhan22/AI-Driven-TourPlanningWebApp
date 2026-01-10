import { NextResponse } from 'next/server';
import { sendTourConfirmation } from '@/lib/notificationService';
import { verifyToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    // Verify authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    // Get user details
    const user = await User.findById(decoded.userId).select('name email phone');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get tour details from request
    const tourDetails = await req.json();

    // Validate required fields
    if (!tourDetails.destination || !tourDetails.duration) {
      return NextResponse.json(
        { error: 'Missing required tour details' },
        { status: 400 }
      );
    }

    // Send notifications
    const results = await sendTourConfirmation(
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      tourDetails
    );

    return NextResponse.json({
      success: true,
      message: 'Tour confirmation sent successfully',
      results,
    });
  } catch (error: any) {
    console.error('Tour confirmation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send tour confirmation' },
      { status: 500 }
    );
  }
}

