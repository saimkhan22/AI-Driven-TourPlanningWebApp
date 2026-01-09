import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Trip from '@/models/Trip';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Decode JWT to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const trips = await Trip.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ trips });
  } catch (error: any) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch trips' },
      { status: 500 }
    );
  }
}

