import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Trip from '@/models/Trip';

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const {
      destination,
      startDate,
      endDate,
      duration,
      budget,
      travelers,
      interests,
      vehicle,
      itinerary,
      estimatedCost,
    } = body;

    const trip = await Trip.create({
      userId: decoded.userId,
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      duration,
      budget,
      travelers,
      interests: interests || [],
      vehicle: vehicle || null,
      itinerary: itinerary || {},
      estimatedCost: estimatedCost || {
        accommodation: 0,
        transportation: 0,
        food: 0,
        activities: 0,
        total: 0,
      },
      status: 'planned',
    });

    return NextResponse.json({
      message: 'Trip created successfully',
      trip,
    });
  } catch (error: any) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create trip' },
      { status: 500 }
    );
  }
}

